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
  let __appscriptUrl: string = ''

  once<StartHandler>("START", async (link) => {
    __appscriptUrl = link
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

    } else if (figma.currentPage.selection[0].type === "FRAME" || "COMPONENT" || "COMPONENT+SET") {
       //name frame
       //// NAME SCREEN 
    
       const screenName = data.frameName.slice(0, 4)
       const newScreenName = screenName.join(' / ')
       
       if(data.frameName.length < 5){
        figma.currentPage.selection[0].name = newScreenName
       }else{
         const newBlockName = `${newScreenName} - ${data.frameName[4]}`
         figma.currentPage.selection[0].name = newBlockName
       }
      
 
       //update link
       const id = figma.currentPage.selection[0].id.replace(":", "%3A")
       const frameUrl = `https://www.figma.com/file/${figma.fileKey}/${figma.root.name}?node-id=${id}`
      
       // send the frame URL to UI
     
       data.spreadsheet[data.index][5] = frameUrl
       emit("UPDATE_SPREADSHEET", {spreadsheet: data.spreadsheet, __appscriptUrl: __appscriptUrl})
     

    } else {
      console.log(figma.currentPage.selection[0].type)
      figma.notify('Please select a frame, component or component set', {timeout: 1000, error: true})
    }
  })
}

export default main
