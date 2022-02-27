import { EventHandler } from '@create-figma-plugin/utilities'



export interface StartHandler extends EventHandler {
  name: 'START'
  handler: (link: string) => void
}

export interface NameScreenHandler extends EventHandler{
  name: 'NAME_FRAME',
  handler: (frameName: string[])=>void
}