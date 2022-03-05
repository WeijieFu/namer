

const API_KEY = "AIzaSyDfBK_eKtiD4SWMozxlPi7NQenPG1uQzhg"

export const getSpreadsheet = async (link:string) => {
  const linkParts = link.split("/")

  const spreadsheetId = linkParts[5]
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:F1000?key=${API_KEY}`
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

// export const updateUrl = async (frameUrl:string, index:number) => {
//   try {
//     const url = "https://script.google.com/macros/s/AKfycbyMP94FwTjREE7hMuPXGQV8VWA4Ju-YJbZgkBXzxvP3Sr1UDGSUDSlOdkR8xM6PH7F5iA/exec"

//     const data = {type:"UPDATE_URL", frameUrl: frameUrl, index: index }
//     console.log(data)
//     const res = await fetch(url, {
//       method: "POST",
//       mode: "no-cors",
//       redirect:"follow",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),

//     })
//     // console.log(res.json())
//   } catch (err) {

//     console.log(err)
//   }

// }

export const updateSpreadsheet = async (spreadsheet: string[][]) => {
  try {
    const url = "https://script.google.com/macros/s/AKfycbwdgrJTXRhqc3pXEhtPACvdzTLAnYiREve2WqKBnpkE1wOJbwgn9PKnwzJpKyX_0AKM0Q/exec"

    for(let i = 0; i< spreadsheet.length; i++){
      for(let j = 0; j < 6; j++){
        if( spreadsheet[i][j] === undefined)
        spreadsheet[i][j] = ''
      }
    }

    const data = {type:"UPDATE_SPREADSHEET", spreadsheet : spreadsheet }

    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      redirect:"follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

    })
    // console.log(res.json())
  } catch (err) {

    console.log(err)
  }

}