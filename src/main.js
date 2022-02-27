import {
  loadFontsAsync,
  once,
  on,
  showUI,
} from "@create-figma-plugin/utilities"

// import { StartHandler, NameScreenHandler } from "./types"
import { getSpreadsheet, updateLink } from "./api"

export default function () {
  let _spreadsheet = []
  let _spreadsheetName = ""
  let _spreadsheetId = ""
  once("START", async (link) => {
    const response = await getSpreadsheet(link)

    _spreadsheet = response[0].values
    _spreadsheetName = response[0].range.split("!")[0]
    _spreadsheetId = response[1]
    console.log(_spreadsheetId)
    showUI({ width: 320, height: 480 }, { _spreadsheet: _spreadsheet })
  })

  showUI({ width: 320, height: 480 }, { _spreadsheet: _spreadsheet })

  on("NAME_FRAME", (frameName) => {
    console.log(figma.currentPage.selection)
    if (figma.currentPage.selection.length > 1) {
      console.log("error, you can only select one frame")
    } else if (figma.currentPage.selection[0].type !== "FRAME") {
      console.log("error you can only name a frame")
    } else {
      const newFramename = frameName.join("-")
      figma.currentPage.selection[0].name = newFramename
      const id = figma.currentPage.selection[0].id.replace(":", "%3A")
      const frameURL = `https://www.figma.com/file/${figma.fileKey}/${figma.root.name}?node-id=${id}`
      const range = ""
      // updateLink(_spreadsheetId, _spreadsheetName, frameURL, range)
    }
  })
}
