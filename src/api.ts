export const getSpreadsheet = async (link:string) => {

  
  try{
    // const url ="https://script.google.com/macros/s/AKfycbwxvE2MTM-HOhsP6oQHaiuUX0gWRsfVBYND_8-8Hxf8Zcx2YuDf5wK77clcoSCoQPrgzQ/exec"

    const response = await fetch(link)
    const result = await response.text()
    return {spreadsheet : JSON.parse(result)}
  
  }

  catch(err){
    console.log(err)
  }
}

export const updateSpreadsheet = async (spreadsheet: string[][], link:string) => {
  try {
    // const url = "https://script.google.com/macros/s/AKfycbwdgrJTXRhqc3pXEhtPACvdzTLAnYiREve2WqKBnpkE1wOJbwgn9PKnwzJpKyX_0AKM0Q/exec"

    for(let i = 0; i< spreadsheet.length; i++){
      for(let j = 0; j < 6; j++){
        if( spreadsheet[i][j] === undefined)
        spreadsheet[i][j] = ''
      }
    }

    const data = {type:"UPDATE_SPREADSHEET", spreadsheet : spreadsheet }

    const res = await fetch(link, {
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