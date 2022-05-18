
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
  const handleCheck = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 19 || e.keyCode === 190) {
      setInputMode(false)
      setValue(value)
      var newinfos = infos
      newinfos[idx] = value
      setInfos(newinfos)
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
  return (
    <Wrapper onClick={()=>{setInputMode(true)}}>
      {info!=='' && 
      (inputMode ? 
        <>#
      <input
      onChange={(e)=>{setValue(e.target.value)}} 
      value={value}
      onKeyDown={e => handleCheck(e)} 
      autoFocus
      /></>:<div>#{value}</div>)}

      {info==='' &&
      (inputMode ? 
        <>#<input
      placeholder='Press Spacebar or Enter'
      onChange={(e)=>{setValue(e.target.value)}} 
      value={value}
      autoFocus
      onKeyDown={e => handleCheckNew(e)} 
      /></>:<div>+</div>)}
    </Wrapper>
  )
}

export default Info