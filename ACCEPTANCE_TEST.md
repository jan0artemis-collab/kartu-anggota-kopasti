# Acceptance Test Checklist

## Prerequisites
- [ ] Spreadsheet configured with correct headers
- [ ] Apps Script deployed and URL configured
- [ ] Frontend deployed and accessible
- [ ] Sample data imported (minimum 3 members)

## Test Cases

### 1. Data Retrieval
- [ ] Open homepage, verify members list displays
- [ ] Search by name works correctly
- [ ] Search by nomor_induk works correctly
- [ ] Filter by angkatan displays correct results
- [ ] Filter by satuan_terminal displays correct results
- [ ] Pagination buttons work (if > 20 members)
- [ ] Next/Previous page navigation works correctly

### 2. Member Card Display
- [ ] Click on member from list opens member page
- [ ] Member card shows correct photo (or placeholder)
- [ ] All member details display correctly:
  - [ ] Nomor induk
  - [ ] Nama
  - [ ] Jabatan
  - [ ] Satuan terminal
  - [ ] Angkatan
- [ ] QR code generates correctly
- [ ] Average score displays if valid scores exist

### 3. QR Code Functionality
- [ ] QR code on card is scannable
- [ ] Scan QR code with external app opens correct member page
- [ ] Click "Scan QR" button on homepage opens camera
- [ ] Camera permission requested correctly
- [ ] Scanning QR redirects to correct member page
- [ ] Invalid QR shows error message

### 4. Performance Chart
- [ ] Radar chart displays on member page
- [ ] Chart has correct number of axes (= number of criteria)
- [ ] All valid criteria values shown correctly
- [ ] Empty/null criteria excluded from chart
- [ ] Chart tooltip shows label + value + percentage
- [ ] Chart is responsive on mobile

### 5. Chart Interaction
- [ ] Click on chart point opens detail modal
- [ ] Modal shows:
  - [ ] Criterion name
  - [ ] Score value
  - [ ] Percentage (0-100%)
  - [ ] Performance level (Rendah/Sedang/Baik)
  - [ ] Performance description
  - [ ] Cell reference (e.g., Sheet1!J5)
  - [ ] "Lihat di Spreadsheet" link
- [ ] Click spreadsheet link opens correct cell (if permissions allow)
- [ ] Close modal button works

### 6. Criteria Table
- [ ] Table displays all 8 criteria
- [ ] Each row shows:
  - [ ] Criterion label
  - [ ] Score (or N/A)
  - [ ] Performance level badge
  - [ ] Cell reference
  - [ ] Detail button
- [ ] Click Detail button opens modal
- [ ] Performance level colors correct:
  - [ ] Red (≤40)
  - [ ] Yellow (41-70)
  - [ ] Green (71-100)
- [ ] Average score displays correctly at bottom

### 7. Print Functionality
- [ ] Click "Cetak Kartu" button
- [ ] Print preview shows card only (no UI elements)
- [ ] Card fits A6 size (105mm x 148mm)
- [ ] Print output is clear and readable

### 8. Responsive Design
- [ ] Homepage displays correctly on mobile
- [ ] Member page displays correctly on mobile
- [ ] Chart readable on mobile
- [ ] Buttons accessible on mobile
- [ ] Modal displays properly on mobile

### 9. Dark Mode
- [ ] Toggle dark mode button works
- [ ] All pages render correctly in dark mode
- [ ] Text remains readable
- [ ] Colors maintain proper contrast

### 10. Data Sync
- [ ] Update value in spreadsheet
- [ ] Refresh web app
- [ ] Verify updated value displays correctly
- [ ] Verify chart updates accordingly
- [ ] Verify average score recalculates

### 11. Error Handling
- [ ] Invalid member ID shows error message
- [ ] Network error displays user-friendly message
- [ ] Empty search results handled gracefully
- [ ] Invalid QR code shows error alert

### 12. Performance
- [ ] Homepage loads < 3 seconds
- [ ] Member page loads < 2 seconds
- [ ] Chart renders smoothly
- [ ] No console errors
- [ ] No broken images

## Edge Cases
- [ ] Member with all N/A values displays correctly
- [ ] Member with no photo shows placeholder
- [ ] Long names don't break layout
- [ ] Special characters in names display correctly
- [ ] Very high/low scores display properly

## Browser Compatibility
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Chrome mobile
- [ ] Safari iOS
- [ ] Samsung Internet

## Final Verification
- [ ] All features working end-to-end
- [ ] No critical bugs
- [ ] Documentation complete
- [ ] Sample data verified
- [ ] Ready for production use
