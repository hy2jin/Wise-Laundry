
import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 1.2rem;  
  cursor: pointer;
  input{
    font-size: 1rem;  
    background: none;
    height: 1.2rem;
    border: none;
    border-bottom: 2px solid gray;
    width: 100px;
    /* margin-top: 10px; */
    margin-left: 5px;
    color: ${props => props.theme.fontColor};
    &:focus{
      outline: none;
    }
  }
  .submitbtn{
    border-radius: 4px;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    border: none;
    font-size: 0.8rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
`
interface Iprops {
  info:string
  infos:string[]
  idx:number
  setInfos:React.Dispatch<React.SetStateAction<string[]>>
}
const Info:React.FC<Iprops>= ({info,infos,idx,setInfos}) => {
  const [value,setValue] = useState(info)
  const [inputMode,setInputMode] = useState(false)
  const handleCheck = () => {
    if (value!==''){
      setInputMode(false)
      setInfos([...infos,value])
      setValue('')
      }
      if (value===''){
        setInputMode(false)
        setValue(value)
        setValue('')
    }
  };
  const handleCheckNew = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 19 || e.keyCode === 190) {
      if (value!==''){
      setInputMode(false)
      setInfos([...infos,value])
      setValue('')
      }
      if (value===''){
        setInputMode(false)
        setValue(value)
        setValue('')
      }
    }
  };
  const handleClick = ()=>{
    if(info==='')
      setInputMode(true)
    else{
      const newInfo = infos.filter((info,index)=>index!==idx)
      setInfos(newInfo)
    }
  }

  return (
    <Wrapper onClick={()=>{handleClick()}}>
      {info!=='' && 
      <div>#{value}</div>}
      {info==='' && //'' 가 온다면 아예 아무 
      (inputMode ? 
        <>#<input
      placeholder='Press Enter'
      onChange={(e)=>{setValue(e.target.value)}} 
      value={value}
      autoFocus
      onKeyDown={e => handleCheckNew(e)} 
      />
      <button className='submitbtn' onClick={()=>{handleCheck()}}>등록</button>
      </>:<div>+</div>)}
    </Wrapper>
  )
}

export default Info