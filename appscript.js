const doPost = (e) => {
  const body = e.postData.contents
  const bodyJSON = JSON.parse(body)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Feature")

  if (bodyJSON.type == "UPDATE_URL") {
    // ws.appendRow([bodyJSON.type, bodyJSON.frameUrl, bodyJSON.index]);
    // ws.setCurrentCell(`F${data.index+2}`);
    const cell = ws.getRange(bodyJSON.index + 2, 6)
    cell.setValue(bodyJSON.frameUrl)
  }
}
