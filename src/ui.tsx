import {
  Button,
  Container,
  render,
  VerticalSpace,
  Textbox,
  Text,
  Divider,
  Modal,
  Inline

} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useState, useEffect} from 'preact/hooks'
import { updateSpreadsheet} from "./api.js"

import styles from './styles.css'
import { StartHandler } from './types'
import {UpdateSpreadsheetHandler} from './types'
import {on} from "@create-figma-plugin/utilities"







function Plugin(props: { _spreadsheet: string[][] }) {
 
  const [spreadsheet, setSpreadsheet] = useState<string[][]>(props._spreadsheet)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [frameName, setFrameName] = useState<string[]>(['Your Frame Name'])
  useEffect(()=>{
    setSpreadsheet(props._spreadsheet)
    if(props._spreadsheet.length>0){
      setCurrentPage('epic')
    }
  }, [props._spreadsheet])
  
  useEffect(()=>{
    on<UpdateSpreadsheetHandler>("UPDATE_SPREADSHEET", (data)=>{
      setSpreadsheet(data.spreadsheet)
      updateSpreadsheet(data.spreadsheet)
    })
  },[])



  return (
  
    <Container>
      <VerticalSpace space="small" />
      {currentPage !== '' &&<div>
        {       
          frameName.map((value, index)=>{
            if(index < 3){
              return <Tag text={value}/>
            }
          })
        }
        </div>
      }
       <VerticalSpace space="small" />
      <Divider />
      {/* Main UI */}
        { currentPage === '' && <LaunchPage/>}
        { currentPage === 'epic' && <EpicPage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'feature' && <FeaturePage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'flow' && <FlowPage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'screen' && <ScreenPage spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        
      {/* Main UI END */}
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)

const ScreenPage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void, setSpreadsheet:(value:string[][])=>void})=>{



  const nameScreen = (event: any, index: number)=>{
    
    const frameName = props.spreadsheet[index].slice(0,4)
    // console.log(props.spreadsheet)
     emit('NAME_FRAME', {frameName: frameName, index:index, spreadsheet: props.spreadsheet})

  }

  const nameBlock = async (event: any, screen:string, index:number)=>{

    const frameName = props.spreadsheet[index].slice(0,5)
    // console.log(props.spreadsheet)
    emit('NAME_FRAME', {frameName:frameName, index:index, spreadsheet: props.spreadsheet})
  }

  const handleBackClick = (event: any)=>{
    if(props.frameName.length === 3){
      props.frameName.pop()
    }
    if(props.frameName.length === 4){
      props.frameName.pop()
      props.frameName.pop()
    }
    if(props.frameName.length === 5){
      props.frameName.pop()
      props.frameName.pop()
      props.frameName.pop()
    }
    props.setCurrentPage('flow')
  }


  //MODAL ADD NEW SCREEN
  const style = { padding: '12px', width: '240px' }
  const [isAddScreenModalOpen, setIsAddScreenModalOpen] = useState(false)
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleAddScreen = ()=>{
    setIsAddScreenModalOpen(true)
  }
 
  const handleAddBlock = (index:number)=>{
    setIsAddBlockModalOpen(true)
    props.frameName[3] = props.spreadsheet[index][3]
  }

  const handleInput = (event:any)=> {
    const newValue = event.currentTarget.value
    setValue(newValue)
  }

  const handleAddScreenConfirm = ()=>{
    if(value){
      for(let index = 0; index<props.spreadsheet.length; index++ ){
        if(
            props.spreadsheet[index][0] === props.frameName[0]  && 
            props.spreadsheet[index][1] === props.frameName[1] &&
            props.spreadsheet[index][2] === props.frameName[2] &&
            value !== props.spreadsheet[index][3]
          ){
          if(props.spreadsheet[index].length < 4){
            props.spreadsheet[index].push(value)
            break
          }else if(index === props.spreadsheet.length - 1){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], props.frameName[2], value])
            break
           
          }else if(
              props.spreadsheet[index][2] !== props.spreadsheet[index+1][2]
            ){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], props.frameName[2], value])
            break
          }
        }  
      }

      setValue('')
      setIsAddScreenModalOpen(false)
    }
  }

  const handleAddBlockConfirm = ()=>{
    if(value){
      for(let index = 0; index<props.spreadsheet.length; index++ ){
        if(
            props.spreadsheet[index][0] === props.frameName[0]  && 
            props.spreadsheet[index][1] === props.frameName[1]  &&
            props.spreadsheet[index][2] === props.frameName[2]  &&
            props.spreadsheet[index][3] === props.frameName[3] &&
            value !== props.spreadsheet[index][4]
          ){
          if(index === props.spreadsheet.length - 1){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], props.frameName[2], props.frameName[3], value])
            break
           
          }else if(
              // props.spreadsheet[index][0] !== props.spreadsheet[index+1][0] &&
              // props.spreadsheet[index][1] !== props.spreadsheet[index+1][1] &&
              // props.spreadsheet[index][2] !== props.spreadsheet[index+1][2] &&
              props.spreadsheet[index][3] !== props.spreadsheet[index+1][3] 
            ){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], props.frameName[2], props.frameName[3], value])
            break
          }
        }  
      }

      setValue('')
      setIsAddBlockModalOpen(false)
    }
  }

  const handleCancel = ()=>{
    setIsAddScreenModalOpen(false)
    setIsAddBlockModalOpen(false)
    setValue('')
  }



  return ( <div>
    
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <span className={styles.back} onClick={handleBackClick}>
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8L8 1" stroke="black"/>
        </svg>
      </span>
      <Text bold>Name Your Screen!</Text>
    </div>

    <VerticalSpace space="medium" />
    <div className={styles['scroll-wrapper']}>
    {props.spreadsheet.map((row, index)=>{
      if(row[0] === props.frameName[0] && row[1] === props.frameName[1] && row[2] === props.frameName[2] && row.length > 3){
        if(index<1 || row[3]!== props.spreadsheet[index-1][3]){
          return ( <div>
            <span onClick={(event)=>{
              if(!row[4]){ 
                nameScreen(event, index)}}
            }>
              <ScreenButton text={row[3]} />
            </span>
            <VerticalSpace space="small" />
            <span onClick={ ()=>{handleAddBlock(index)}}>
              <AddBlockButton text="add new block" />
            </span>
          
            <VerticalSpace space="small" /> 
            { !!row[4] &&( <div>
                <span  onClick={(event)=>{ nameBlock(event, row[3], index)}}>
                  <BlockButton text={row[4]}/>
                </span> 
                <VerticalSpace space="small" />
              </div>
            )}
            
          </div>
        )
        }else if(row[3] === props.spreadsheet[index-1][3] && row[4] !== undefined){
          return ( <div>
            <span onClick={(event)=>{ nameBlock(event, row[3], index)}}>
              <BlockButton text={row[4]} />
            </span>
           
            <VerticalSpace space="small" />
          </div>
          )
        }
      } 
    })}

    </div>
   
  

    <span className={styles['bottom']} onClick={handleAddScreen}>  
      <PrimaryButton text={'ADD NEW SCREEN'} />
    </span>


    <Modal isOpen={isAddScreenModalOpen} title="New Screen">
      <div style={style}>
    
        <VerticalSpace space="medium" />
        <Textbox onInput={handleInput} value={value} />
        <VerticalSpace space="small" />
        
        <div className={styles['button-group']}>
          <Button onClick={handleCancel} secondary>Cancel</Button>
          <Button onClick={handleAddScreenConfirm}>Confirm</Button>
        </div>
              
        <VerticalSpace space="medium" />       
      </div>
    </Modal>


    <Modal isOpen={isAddBlockModalOpen} title="New Block">
      <div style={style}>
    
        <VerticalSpace space="medium" />
        <Textbox onInput={handleInput} value={value} />
        <VerticalSpace space="small" />
        
        <div className={styles['button-group']}>
          <Button onClick={handleCancel} secondary>Cancel</Button>
          <Button onClick={handleAddBlockConfirm}>Confirm</Button>
        </div>
              
        <VerticalSpace space="medium" />       
      </div>
    </Modal>



  </div>
  )
}

const FlowPage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{

  const handleFlowClick = (event: any)=>{
    
    props.setCurrentPage('screen')

    props.frameName.push(event.target.innerText)
    props.setFrameName(props.frameName)
  }

  const handleBackClick = (event: any)=>{
    props.frameName.pop()
    props.setCurrentPage('feature')
  }


  //Modal
  const style = { padding: '12px', width: '240px' }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleAddFlow = ()=>{
    setIsOpen(true)
  }
 
  const handleInput = (event:any)=> {
    const newValue = event.currentTarget.value
    setValue(newValue)
  }

  const handleConfirm = ()=>{
    if(value){
      for(let index = 0; index<props.spreadsheet.length; index++ ){
        if(
            props.spreadsheet[index][0] === props.frameName[0]  && 
            props.spreadsheet[index][1] === props.frameName[1]  &&
            value !== props.spreadsheet[index][2]
          ){
          if(props.spreadsheet[index].length < 3){
            props.spreadsheet[index].push(value)
            break
          }else if(index === props.spreadsheet.length - 1){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], value])
            break
           
          }else if(
              props.spreadsheet[index][0] !== props.spreadsheet[index+1][0] &&
              props.spreadsheet[index][1] !== props.spreadsheet[index+1][1]
            ){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], props.frameName[1], value])
            break
          }
        }  
      }
      setValue('')
      setIsOpen(false) 
    }
  }

  const handleCancel = ()=>{
    setIsOpen(false)
    setValue('')
  }





  return ( <div>
    
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <span className={styles.back} onClick={handleBackClick} >
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8L8 1" stroke="black"/>
        </svg>
      </span>
      <Text bold>Flow</Text>
    </div>
   
    <VerticalSpace space="medium" />

    <div className={styles['scroll-wrapper']}>
      {props.spreadsheet.map((row, index)=>{
        if(row[0] === props.frameName[0] && row[1] === props.frameName[1] && row.length > 2){
          if(index<1 || row[2]!== props.spreadsheet[index-1][2]){
            return ( <div>
              <span onClick={handleFlowClick}>
                <MenuButton text={row[2]} />
              </span>
              <VerticalSpace space="small" />
            </div>
          )
          }
        }

          
      })}
    </div>
 
  <span className={styles['bottom']} onClick={handleAddFlow}>  
    <PrimaryButton text={'ADD NEW FLOW'} />
  </span>

  <Modal isOpen={isOpen} title="New Flow">
    <div style={style}>
  
      <VerticalSpace space="medium" />
      <Textbox onInput={handleInput} value={value} />
      <VerticalSpace space="small" />
      
      <div className={styles['button-group']}>
        <Button onClick={handleCancel} secondary>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
            
      <VerticalSpace space="medium" />       
    </div>
  </Modal>
    
  </div>
  )
}

const FeaturePage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{


  const handleFeatureClick = (event: any)=>{
    
    props.setCurrentPage('flow')

    props.frameName.push(event.target.innerText)
    props.setFrameName(props.frameName)
  }

  const handleBackClick = (event: any)=>{
    props.frameName[0]='Your Frame Name'
    props.setCurrentPage('epic')
  }

  //Modal

  const style = { padding: '12px', width: '240px' }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleAddFeature = ()=>{
    setIsOpen(true)
  }
 
  const handleInput = (event:any)=> {
    const newValue = event.currentTarget.value
    setValue(newValue)
  }

  const handleConfirm = ()=>{
    if(value){
    
      for(let index = 0; index<props.spreadsheet.length; index++ ){
        if(props.spreadsheet[index][0] === props.frameName[0] &&
          value !== props.spreadsheet[index][1]){
          if(props.spreadsheet[index].length < 2){
            props.spreadsheet[index].push(value)
            break
          }else if(index === props.spreadsheet.length - 1){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], value])
            break
           
          }else if(props.spreadsheet[index][0] !== props.spreadsheet[index+1][0]){
            props.spreadsheet.splice(index+1, 0, [props.frameName[0], value])
            break
          }
        }  
      }

      setValue('')
      setIsOpen(false) 
    }
  }

  const handleCancel = ()=>{
    setIsOpen(false)
    setValue('')
  }

  return ( <div>
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <span className={styles.back} onClick={handleBackClick}>
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8L8 1" stroke="black"/>
        </svg>
      </span>
      <Text bold>Feature</Text>
    </div>
   
    <VerticalSpace space="medium" />

    <div className={styles['scroll-wrapper']}>
      {props.spreadsheet.map((row, index)=>{
        if(row[0] === props.frameName[0]){
          if(index<1 || row[1]!== props.spreadsheet[index-1][1] && row.length>1){
            return ( <div>
              <span onClick={handleFeatureClick}>
                <MenuButton text={row[1]} />
              </span>
              <VerticalSpace space="small" />
            </div>
          )
          }
        }
          
          
      })}
    </div>
 
  <span className={styles['bottom']} onClick={handleAddFeature}>  
    <PrimaryButton text={'ADD FEATURE'} />
  </span>
  
  <Modal isOpen={isOpen} title="New Feature">
      <div style={style}>
    
        <VerticalSpace space="medium" />
        <Textbox onInput={handleInput} value={value} />
        <VerticalSpace space="small" />
        
        <div className={styles['button-group']}>
          <Button onClick={handleCancel} secondary>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
             
        <VerticalSpace space="medium" />       
      </div>
    </Modal>




  </div>
  )
}

const EpicPage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{
  
 


  const handleEpicClick = (event: any)=>{
    props.setCurrentPage('feature')
    props.frameName = []
    props.frameName.push(event.target.innerText)
    props.setFrameName(props.frameName)
  }


  // MODAL 


  const style = { padding: '12px', width: '240px' }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleAddEpic = ()=>{
    setIsOpen(true)

  }
 
  const handleInput = (event:any)=> {
    const newValue = event.currentTarget.value
    setValue(newValue)
  }

  const handleConfirm = ()=>{
    if(value){
      for(let index = 0; index<props.spreadsheet.length; index++ ){
        if(value === props.spreadsheet[index][0]){
          break
        }else if(index === props.spreadsheet.length - 1){
          const newEpic = [value]
          props.spreadsheet.push(newEpic)

        }
      }
      
      setValue('')
      setIsOpen(false)
    }
  }

  const handleCancel = ()=>{
    setIsOpen(false)
    setValue('')
  }


  //UI
  return ( <div>
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <Text bold>Epic</Text>
    </div>
    <VerticalSpace space="medium" />

    <div className={styles['scroll-wrapper']}>
      {props.spreadsheet.map((row, index)=>{
          if(index<1 || row[0]!== props.spreadsheet[index-1][0]){
            return ( <div>
              <span onClick={handleEpicClick}>
                <MenuButton text={row[0]} />
              </span>
              <VerticalSpace space="small" />
            </div>
          )
          }
          
      })}
    </div>
    <span className={styles['bottom']} onClick={handleAddEpic}>  
      <PrimaryButton text={'ADD EPIC'} />
    </span>
    
      <Modal isOpen={isOpen} title="New Epic">
        <div style={style}>
     
          <VerticalSpace space="medium" />
          <Textbox onInput={handleInput} value={value} />
          <VerticalSpace space="small" />
          
          <div className={styles['button-group']}>
            <Button onClick={handleCancel} secondary>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
          
         
        
          <VerticalSpace space="medium" />

  
          
        </div>
     </Modal>

  </div>
  )
}

const LaunchPage = ()=>{
  const [link, setLink] = useState('')
  function handleLinkInput(event:any) {
    const newValue = event.currentTarget.value
    setLink(newValue)
  }
  const handleStartButtonClick  = () => {
    emit<StartHandler>('START', link)
  }
  return (
    <div>
    <Textbox onInput={handleLinkInput} value={link} />
    <VerticalSpace space="large" />
    <Button fullWidth onClick={handleStartButtonClick}>
      Start Namet
    </Button>
    </div>
  )
}


const MenuButton = (props:{text:string})=>{
  return (
    <div className={styles['menu-button']}>
      <span className={styles['menu-button__text']}>{props.text}</span>
      <span>
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L8 8L1 15" stroke="black"/>
        </svg>
      </span>
    </div>
  )
}

const ScreenButton = (props:{text:string})=>{
  return (
    <div className={styles['menu-button']}>
      <span className={styles['menu-button__text']}>{props.text}</span>
    </div>
  )
}

const AddBlockButton = (props:{text:string})=>{
  return (
    <div className={styles['block-button']}>
      <span className={styles['add-button__text']}>{props.text}</span>
    </div>
  )
}


const BlockButton = (props:{text:string})=>{
  return (
    <div className={styles['block-button']}>
      <span className={styles['menu-button__text']}>{props.text}</span>
    </div>
  )
}

const PrimaryButton = (props:{text:string})=>{
  
  return (
    <div className={styles['primary-button']}>
      <span>{props.text}</span>
    </div>
  )
}

const Tag = (props:{text:string})=>{
  return(
    <span className={props.text==='Your Frame Name'?styles['tag-placeholder']:styles.tag}>{props.text}</span>
  )
}