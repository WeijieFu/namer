console.log(this)
import {
  loadFontsAsync,
  once,
  on,
  showUI,
  emit,
} from "@create-figma-plugin/utilities"

import { StartHandler, NameScreenHandler } from "./types"
import { getSpreadsheet } from "./api"

const main = () => {
  let _spreadsheet:string[][] = []
  // let _spreadsheetName:string = ""
  // let _spreadsheetId:string = ""

  once<StartHandler>("START", async (link) => {
    const response:any = await getSpreadsheet(link)
    console.log(response)
    _spreadsheet = response.spreadsheet

    const processedSpreadsheet:string[][] = []

    _spreadsheet.map(row=>{
      if(row[0]){
        processedSpreadsheet.push(row)
      }
    })

    showUI({ width: 320, height: 480 }, { _spreadsheet: processedSpreadsheet })
  })

  showUI({ width: 320, height: 480 }, { _spreadsheet: _spreadsheet })

  on<NameScreenHandler>("NAME_FRAME", (data) => {


    if (figma.currentPage.selection.length > 1) {
      figma.notify('Please select only one frame', {timeout: 1000, error: true})

    } else if (figma.currentPage.selection[0].type !== "FRAME") {
      figma.notify('Please select a frame', {timeout: 1000, error: true})

    } else {
      const newFramename = data.frameName.join("-")
      figma.currentPage.selection[0].name = newFramename

      //update link
      const id = figma.currentPage.selection[0].id.replace(":", "%3A")
      const frameUrl = `https://www.figma.com/file/${figma.fileKey}/${figma.root.name}?node-id=${id}`
      // send the frame URL to UI
    
      data.spreadsheet[data.index][5] = frameUrl
      // emit("UPDATE_URL", {frameUrl:frameUrl, index: data.index})
      // data.setSpreadsheet(data.spreadsheet)
      emit("UPDATE_SPREADSHEET", {spreadsheet: data.spreadsheet})
    }
  })
}

export default main
