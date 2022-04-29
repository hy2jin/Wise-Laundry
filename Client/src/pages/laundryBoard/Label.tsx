import React, {  useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: black;
  height:1rem;
  margin: 10px 5px 0 5px;
  padding: 2px 5px 2px 5px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: ${props=>props.color};
  align-items: center;
  p{
    margin-top: 1px;
  }
  input{
    background: none;
    border: none;
    width: 100px;
    &:focus{
      outline: none;
    }
  }
`

interface Iprops{
  label:string
  setLabels : React.Dispatch<React.SetStateAction<string[]>>
  idx:number
  labels:string[]
  color:string
}

const Label:React.FC<Iprops> = ({label,color,idx,setLabels,labels}) => {
  const [value,setValue] = useState(label)
  const [inputMode,setInputMode] = useState(false)
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setInputMode(false)
      var newLabels = labels
      newLabels[idx] = value
      setLabels(newLabels)
    }
  };
  const handleEnterNew = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      if (value!==''){
      setInputMode(false)
      setLabels([...labels,value])
      setValue('')
      }
      if (value===''){
        setInputMode(false)
        setValue('')
      }
    }
  };
  return (
    <Wrapper color={color} onClick={()=>{setInputMode(true)}}>
      {label!=='' &&
      (inputMode ? 
      <input
      autoFocus
      onChange={(e)=>{setValue(e.target.value)}} 
      value={value}
      onKeyUp={e => handleEnter(e)} 
      />:<p>{value}</p>)}

      {label==='' &&
      (inputMode ? 
      <input
      autoFocus
      placeholder='press Enter'
      onChange={(e)=>{setValue(e.target.value)}} 
      value={value}
      onKeyUp={e => handleEnterNew(e)} 
      />:<p>+</p>)}
      
    </Wrapper>
  )
}

export default Label