import { EventHandler } from '@create-figma-plugin/utilities'



export interface StartHandler extends EventHandler {
  name: 'START'
  handler: (link: string) => void
}

export interface NameScreenHandler extends EventHandler{
  name: 'NAME_FRAME',
  handler: (data: any)=>void
}

export interface UpdateUrlHandler extends EventHandler{
  name: 'UPDATE_URL',
  handler: (data:any)=>void
}

export interface UpdateSpreadsheetHandler extends EventHandler{
  name: 'UPDATE_SPREADSHEET',
  handler: (data:any)=>void
}