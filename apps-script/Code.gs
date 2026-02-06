function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById("1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk");
    const sheet = ss.getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();
    
    // Parse data with sheet row references
    const data = rows.map((r, rowIndex) => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = r[i];
      });
      obj._sheetRow = rowIndex + 2; // Account for header row
      return obj;
    });
    
    // Get query parameters
    const id = e.parameter.id;
    const q = e.parameter.q || '';
    const angkatan = e.parameter.angkatan || '';
    const satuan_terminal = e.parameter.satuan_terminal || '';
    const limit = parseInt(e.parameter.limit) || 50;
    const offset = parseInt(e.parameter.offset) || 0;
    
    // Filter data
    let filtered = data;
    
    if (id) {
      filtered = data.filter(x => String(x.id) === String(id));
    } else {
      // Apply search filter
      if (q) {
        const searchLower = q.toLowerCase();
        filtered = filtered.filter(x => 
          (x.nama && String(x.nama).toLowerCase().includes(searchLower)) ||
          (x.nomor_induk && String(x.nomor_induk).toLowerCase().includes(searchLower))
        );
      }
      
      // Apply angkatan filter
      if (angkatan) {
        filtered = filtered.filter(x => String(x.angkatan) === String(angkatan));
      }
      
      // Apply satuan_terminal filter
      if (satuan_terminal) {
        filtered = filtered.filter(x => 
          x.satuan_terminal && String(x.satuan_terminal).toLowerCase() === satuan_terminal.toLowerCase()
        );
      }
    }
    
    // Process each member
    const criteriaKeys = [
      'kedisiplinan', 'kepemimpinan', 'kerajinan', 'public_speaking',
      'teamwork', 'teknis_kopasti', 'pengambilan_keputusan', 'kreativitas'
    ];
    
    const criteriaLabels = {
      'kedisiplinan': 'Kedisiplinan',
      'kepemimpinan': 'Kepemimpinan',
      'kerajinan': 'Kerajinan',
      'public_speaking': 'Public Speaking',
      'teamwork': 'Teamwork',
      'teknis_kopasti': 'Teknis KOPASTI',
      'pengambilan_keputusan': 'Pengambilan Keputusan',
      'kreativitas': 'Kreativitas'
    };
    
    filtered = filtered.map(member => {
      const criteria_list = [];
      let totalScore = 0;
      let validCount = 0;
      
      criteriaKeys.forEach((key, index) => {
        const value = member[key];
        const colIndex = headers.indexOf(key);
        const colLetter = getColumnLetter(colIndex + 1);
        const cellRef = `Sheet1!${colLetter}${member._sheetRow}`;
        
        if (value !== '' && value !== null && value !== undefined && !isNaN(value)) {
          const numValue = Number(value);
          criteria_list.push({
            key: key,
            label: criteriaLabels[key],
            value: numValue,
            sheetRow: member._sheetRow,
            sheetCol: colLetter,
            cellRef: cellRef
          });
          totalScore += numValue;
          validCount++;
        } else {
          criteria_list.push({
            key: key,
            label: criteriaLabels[key],
            value: null,
            sheetRow: member._sheetRow,
            sheetCol: colLetter,
            cellRef: cellRef
          });
        }
      });
      
      member.criteria_list = criteria_list;
      member.average_score = validCount > 0 ? Math.round(totalScore / validCount) : 0;
      
      return member;
    });
    
    // Apply pagination
    let result;
    if (id) {
      result = filtered.length > 0 ? filtered[0] : null;
    } else {
      const total = filtered.length;
      const paginated = filtered.slice(offset, offset + limit);
      result = {
        data: paginated,
        total: total,
        limit: limit,
        offset: offset
      };
    }
    
    const output = JSON.stringify(result || {});
    return ContentService.createTextOutput(output)
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const errorResponse = {
      error: true,
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
