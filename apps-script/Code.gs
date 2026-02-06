// Cache configuration
const CACHE_DURATION = 300; // 5 minutes in seconds
const SPREADSHEET_ID = "1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk";
const SHEET_NAME = "Sheet1";

// Criteria configuration
const CRITERIA_KEYS = [
  'kedisiplinan', 'kepemimpinan', 'kerajinan', 'public_speaking',
  'teamwork', 'teknis_kopasti', 'pengambilan_keputusan', 'kreativitas'
];

const CRITERIA_LABELS = {
  'kedisiplinan': 'Kedisiplinan',
  'kepemimpinan': 'Kepemimpinan',
  'kerajinan': 'Kerajinan',
  'public_speaking': 'Public Speaking',
  'teamwork': 'Teamwork',
  'teknis_kopasti': 'Teknis KOPASTI',
  'pengambilan_keputusan': 'Pengambilan Keputusan',
  'kreativitas': 'Kreativitas'
};

function doGet(e) {
  try {
    const params = e.parameter || {};
    const id = params.id;
    
    // Try cache first for list queries
    if (!id) {
      const cacheKey = getCacheKey(params);
      const cache = CacheService.getScriptCache();
      const cached = cache.get(cacheKey);
      
      if (cached) {
        return createJsonResponse(JSON.parse(cached));
      }
    }
    
    // Get data from spreadsheet
    const data = getSpreadsheetData();
    
    // Filter and process
    let result;
    if (id) {
      result = processRequest(data, params);
      // Don't cache individual member requests (they're fast)
    } else {
      result = processRequest(data, params);
      // Cache list results
      const cacheKey = getCacheKey(params);
      const cache = CacheService.getScriptCache();
      try {
        cache.put(cacheKey, JSON.stringify(result), CACHE_DURATION);
      } catch (e) {
        // Cache size exceeded, continue without caching
        console.log('Cache error: ' + e);
      }
    }
    
    return createJsonResponse(result);
    
  } catch (error) {
    console.error('Error in doGet:', error);
    return createJsonResponse({
      error: true,
      message: 'Internal server error: ' + error.toString(),
      timestamp: new Date().toISOString()
    }, 500);
  }
}

function getSpreadsheetData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet not found: ' + SHEET_NAME);
  }
  
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  if (values.length < 2) {
    return [];
  }
  
  const headers = values[0].map(h => String(h).trim());
  const rows = values.slice(1);
  
  return rows.map((row, rowIndex) => {
    const obj = {};
    headers.forEach((header, colIndex) => {
      obj[header] = row[colIndex];
    });
    obj._sheetRow = rowIndex + 2;
    obj._headers = headers;
    return obj;
  }).filter(item => item.id && item.id !== ''); // Filter empty rows
}

function processRequest(data, params) {
  const id = params.id;
  const q = params.q || '';
  const angkatan = params.angkatan || '';
  const satuan_terminal = params.satuan_terminal || '';
  const limit = parseInt(params.limit) || 50;
  const offset = parseInt(params.offset) || 0;
  
  // Single member request
  if (id) {
    const member = data.find(x => String(x.id).trim() === String(id).trim());
    if (!member) {
      return { error: true, message: 'Member not found', id: id };
    }
    return processMember(member);
  }
  
  // List request with filters
  let filtered = data;
  
  // Search filter
  if (q) {
    const searchLower = q.toLowerCase();
    filtered = filtered.filter(x => 
      (x.nama && String(x.nama).toLowerCase().includes(searchLower)) ||
      (x.nomor_induk && String(x.nomor_induk).toLowerCase().includes(searchLower))
    );
  }
  
  // Angkatan filter
  if (angkatan) {
    filtered = filtered.filter(x => String(x.angkatan).trim() === String(angkatan).trim());
  }
  
  // Satuan filter
  if (satuan_terminal) {
    filtered = filtered.filter(x => 
      x.satuan_terminal && 
      String(x.satuan_terminal).toLowerCase().trim() === satuan_terminal.toLowerCase().trim()
    );
  }
  
  const total = filtered.length;
  
  // Process members (add computed fields)
  filtered = filtered.map(m => processMember(m));
  
  // Pagination
  const paginated = filtered.slice(offset, offset + limit);
  
  return {
    data: paginated,
    total: total,
    limit: limit,
    offset: offset,
    timestamp: new Date().toISOString()
  };
}

function processMember(member) {
  const headers = member._headers || [];
  const criteria_list = [];
  let totalScore = 0;
  let validCount = 0;
  
  CRITERIA_KEYS.forEach(key => {
    const value = member[key];
    const colIndex = headers.indexOf(key);
    const colLetter = getColumnLetter(colIndex + 1);
    const cellRef = `${SHEET_NAME}!${colLetter}${member._sheetRow}`;
    
    const numValue = parseFloat(value);
    const isValid = !isNaN(numValue) && numValue !== null && value !== '' && value !== null;
    
    criteria_list.push({
      key: key,
      label: CRITERIA_LABELS[key],
      value: isValid ? numValue : null,
      sheetRow: member._sheetRow,
      sheetCol: colLetter,
      cellRef: cellRef
    });
    
    if (isValid) {
      totalScore += numValue;
      validCount++;
    }
  });
  
  // Clean up internal fields
  const cleanMember = Object.assign({}, member);
  delete cleanMember._headers;
  
  cleanMember.criteria_list = criteria_list;
  cleanMember.average_score = validCount > 0 ? Math.round(totalScore / validCount) : 0;
  
  return cleanMember;
}

function getCacheKey(params) {
  const parts = [
    'members',
    params.q || '',
    params.angkatan || '',
    params.satuan_terminal || '',
    params.limit || '50',
    params.offset || '0'
  ];
  return parts.join('|');
}

function getColumnLetter(column) {
  let temp;
  let letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function createJsonResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Note: Apps Script doesn't support custom HTTP status codes in doGet
  // Status is always 200, so we include error info in response body
  return output;
}

// Utility function to clear cache (can be called manually)
function clearCache() {
  const cache = CacheService.getScriptCache();
  cache.removeAll(['members']);
  return 'Cache cleared';
}
