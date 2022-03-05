const doGet = (e) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ws = ss.getSheetByName("Feature")

  const range = ws.getRange(2, 1, 1000, 6)
  const values = range.getValues()

  return ContentService.createTextOutput(JSON.stringify(values)).setMimeType(
    ContentService.MimeType.JSON
  )
}

const doPost = (e) => {
  const body = e.postData.contents
  const bodyJSON = JSON.parse(body)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ws = ss.getSheetByName("Feature")

  if (bodyJSON.type == "UPDATE_SPREADSHEET") {
    const range = ws.getRange(2, 1, bodyJSON.spreadsheet.length, 6)
    range.setValues(bodyJSON.spreadsheet)
  }
}
