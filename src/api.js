import axios from "axios"
const API_KEY = "AIzaSyDfBK_eKtiD4SWMozxlPi7NQenPG1uQzhg"

export const getSpreadsheet = async (link) => {
  const linkParts = link.split("/")

  const spreadsheetId = linkParts[5]
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:E1000?key=${API_KEY}`
  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.text()
    return [JSON.parse(result), spreadsheetId]
  } catch (err) {
    console.log(err)
  }
}

export const updateLink = async (
  spreadsheetId,
  spreadsheetName,
  frameUrl,
  range
) => {
  // const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${spreadsheetName}!${range}?valueInputOption=USER_ENTERED?key=${API_KEY}`
  const url =
    "https://script.google.com/macros/s/AKfycbzndDJ6pYxPnBrNrVGH7EvtWhrXqpiVAjWkFIwPVbDoOfGIVogLhwgmL2yy-B2GRJcSPw/exec"

  try {
    // fetch(URL,{
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "range": "Feature!A1:D5",
    //     "majorDimension": "ROWS",
    //     "values": [
    //       ["Item", "Cost", "Stocked", "Ship Date"],
    //       ["Wheel", "$20.50", "4", "3/1/2016"],
    //       ["Door", "$15", "2", "3/15/2016"],
    //       ["Engine", "$100", "1", "3/20/2016"],
    //       ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
    //     ],
    //   })
    // })
    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ frameUrl: frameUrl }),
      // body: new Blob([{frameUrl: frameUrl}])
    })
    console.log("try")
    console.log(res.json())
  } catch (err) {
    console.log("error")
    console.log(err)
  }
}
