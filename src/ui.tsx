import {
  Button,
  Container,
  render,
  VerticalSpace,
  Textbox,
  Text,
  Divider,
  Inline,
  IconArrowLeft16

} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useState, useEffect} from 'preact/hooks'


import styles from './styles.css'
import { StartHandler } from './types'



function Plugin(props: { _spreadsheet: string[][] }) {
 
  const [spreadsheet, setSpreadsheet] = useState<string[][]>(props._spreadsheet)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [frameName, setFrameName] = useState<string[]>(['Your Frame Name'])
  useEffect(()=>{
    setSpreadsheet(props._spreadsheet)
    if(props._spreadsheet.length>0){
      setCurrentPage('feature')
    }

  }, [props._spreadsheet])

  useEffect(()=>{
  }, [frameName])

  return (
    <Container>

      <VerticalSpace space="small" />
      {currentPage !== '' &&<div>
        {
          frameName.map((value, index)=>{
            return <Tag text={value}/>
          })
        }
        </div>
      }
       <VerticalSpace space="small" />
      <Divider />
      {/* Main UI */}
        { currentPage === '' && <LaunchPage/>}
        { currentPage === 'feature' && <FeaturePage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'subfeature' && <SubFeaturePage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'flow' && <FlowPage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        { currentPage === 'screen' && <ScreenPage spreadsheet={spreadsheet} setCurrentPage={setCurrentPage} frameName={frameName} setFrameName={setFrameName}/>}
        
      {/* Main UI END */}
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)

const ScreenPage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{

  const nameScreen = (event: any)=>{
     const frameName = props.frameName.slice()
     frameName.push(event.target.innerText)
     emit('NAME_FRAME', frameName)
  }

  const nameBlock = (event: any, screen:string)=>{
    const frameName = props.frameName.slice()
    frameName.push(screen)
    frameName.push(event.target.innerText)
    emit('NAME_FRAME', frameName)
  }

  const handleAddScreen = (event:any)=>{

  }
  const handleBackClick = (event: any)=>{
    props.frameName.pop()
    props.setCurrentPage('flow')
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
      if(row[0] === props.frameName[0] && row[1] === props.frameName[1] && row[2] === props.frameName[2]){
        if(index<1 || row[3]!== props.spreadsheet[index-1][3]){
          return ( <div>
            <span onClick={nameScreen}>
              <ScreenButton text={row[3]} />
            </span>
            <VerticalSpace space="small" />
            <AddBlockButton text="add new block" />
            <VerticalSpace space="small" />
            {row[4] !== undefined  &&( <div>
                <span  onClick={(event)=>{ nameBlock(event, row[3])}}>
                  <BlockButton text={row[4]}/>
                </span> 
                <VerticalSpace space="small" />
              </div>
            )}
            
          </div>
        )
        }else if(row[3] === props.spreadsheet[index-1][3] && row[4] !== undefined){
          return ( <div>
            <span onClick={(event)=>{ nameBlock(event, row[3])}}>
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
    props.setCurrentPage('subfeature')
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
        if(row[0] === props.frameName[0] && row[1] === props.frameName[1]){
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
 
  <span className={styles['bottom']}>  
    <PrimaryButton text={'ADD NEW FLOW'} />
  </span>
    
  </div>
  )
}

const SubFeaturePage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{


  const handleSubFeatureClick = (event: any)=>{
    
    props.setCurrentPage('flow')

    props.frameName.push(event.target.innerText)
    props.setFrameName(props.frameName)
  }

  const handleBackClick = (event: any)=>{
    props.frameName[0]='Your Frame Name'
    props.setCurrentPage('feature')
  }

  return ( <div>
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <span className={styles.back} onClick={handleBackClick}>
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15L1 8L8 1" stroke="black"/>
        </svg>
      </span>
      <Text bold>Subfeature</Text>
    </div>
   
    <VerticalSpace space="medium" />

    <div className={styles['scroll-wrapper']}>
      {props.spreadsheet.map((row, index)=>{
        if(row[0] === props.frameName[0]){
          if(index<1 || row[1]!== props.spreadsheet[index-1][1]){
            return ( <div>
              <span onClick={handleSubFeatureClick}>
                <MenuButton text={row[1]} />
              </span>
              <VerticalSpace space="small" />
            </div>
          )
          }
        }
          
          
      })}
    </div>
 
  <span className={styles['bottom']}>  
    <PrimaryButton text={'ADD NEW SUBFEATURE'} />
  </span>
    
  </div>
  )
}

const FeaturePage = (props:{spreadsheet: string[][], setCurrentPage: (value:string)=>void, frameName:string[],setFrameName: (value: string[])=>void})=>{


  const handleFeatureClick = (event: any)=>{
    
    props.setCurrentPage('subfeature')

    props.frameName = []
    props.frameName.push(event.target.innerText)
    props.setFrameName(props.frameName)
  }

  return ( <div>
    <VerticalSpace space="medium" />
    <div className={styles.title}>
      <Text bold>Feature</Text>
    </div>
    <VerticalSpace space="medium" />

    <div className={styles['scroll-wrapper']}>
      {props.spreadsheet.map((row, index)=>{
          if(index<1 || row[0]!== props.spreadsheet[index-1][0]){
            return ( <div>
              <span onClick={handleFeatureClick}>
                <MenuButton text={row[0]} />
              </span>
              <VerticalSpace space="small" />
            </div>
          )
          }
          
      })}
    </div>
    <span className={styles['bottom']}>  
    <PrimaryButton text={'ADD NEW FEATURE'} />
    </span>
   

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
      Start Namer
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