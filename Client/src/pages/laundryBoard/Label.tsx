import React, {  useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { labelState as labelStore } from '../../store/state/laundry'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'
import Swal from 'sweetalert2';
const Wrapper = styled.section`
  cursor: pointer;
  color: black;
  height:1rem;
  margin: 10px 5px 0 5px;
  padding: 2px 5px 2px 5px;
  border-radius: 10px;
  background-color: ${props=>props.color};
  align-items: center;
  font-size: 0.8rem;
  p{
    padding: 1px;
    margin-top: 1px;
  }
  input{
    background: none;
    border: none;
    border: 1px solid #e9e9e9;
    width: 120px;
    &:focus{
      outline: none;
    }
    box-shadow: 0 8px 16px 0 rgb(32 32 32 / 8%);
  }
`
const InputBox = styled.div`
  display: flex;
  .submitBtn{
    width: 35px;
    height: 35px;
    border-radius: 10px;
    background-color: #6ca6fd ;
    text-align: center;
    cursor: pointer;
    &:hover{
      background-color: #5086d9 ;
    }
    svg{
      font-size: 1.8rem;
      margin-top: 5px;
      color: white;
    }
  }
`
const Labels = styled.div`
   margin-left: 20px;
    overflow-y: auto;
    height: 300px;
    width: 92%;
    display: flex;
    flex-wrap: wrap;
   
`
const LabelBox = styled.div`
    width: 23%;
    height: 55px;
    background-color:${props => props.color};
    border-radius: 10px;
    margin: 10px;
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #333;
    padding-left: 2px;
    padding-right: 2px;
`
const Modal = styled.article`
  cursor:default ;
  position:fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 30vh;
  height: 400px;
  width: 300px;
  background-color: ${props=>props.theme.navColor};
  border-radius: 10px;
  .close{
    margin-top: 5px;
    margin-left:90%;
    cursor: pointer;
    color: ${props => props.theme.fontColor};
  }
  input{
    padding-left: 10px;
    border-radius: 10px;
    margin:0 20px 20px 20px ;
    height: 30px;
    width: 60%;
    background-color: white;
    font-size: 1rem;
  }
  
`
interface Iprops{
  label:{
    careLabelId: number;
    careLabelName: string;
    careLabel: string;
  }
  setCareLabels: React.Dispatch<React.SetStateAction<{
    careLabelId: number;
    careLabelName: string;
    careLabel: string;
  }[]>>
  idx:number
  careLabels:{
    careLabelId: number;
    careLabelName: string;
    careLabel: string;
  }[]
  color:string
}

const Label:React.FC<Iprops> = ({label,color,idx,setCareLabels,careLabels}) => {
  const colors = 
  ['#cffbb2','#90fdec','#f4ffac','#fea5e6','#fdce8d',
  '#8fdab9','#acd682','#bac3f0','#d8db86','#db829b']
  const [labelstate,setLabelState] = useRecoilState(labelStore)
  const [showLabel,setShowLabel] = useState<Iprops['careLabels']>([])
  const [showModal,setShowModal] = useState(false)
  const [value,setValue] = useState('')
  const getdelete = ()=>{
    const newCareLabels = careLabels.filter((label,index)=>index!==idx)
    setCareLabels(newCareLabels)
  }
  
  useEffect(()=>{
    searchLabel()
  },[value,labelstate])
  const selectLabel = (label:any)=>{
    var flag =true
    careLabels.map((labels)=>{
      if(labels.careLabel===label.careLabel){
        Swal.fire('이미 있는 라벨입니다.')
        flag=false
      }
    })
    if (flag){
      setCareLabels([...careLabels,label])
      setShowModal(false)
      setValue('')
    }
  }
  const searchLabel = ()=>{
    if(value===''){
      setShowLabel(labelstate)
    }
    else{
      var newshow:Iprops['careLabels'] = []
      labelstate.map((label)=>{
        if(label.careLabel.includes(value))
        {
          newshow.push(label)
          console.log(value)
      }})
      setShowLabel(newshow)
    }
  }
  return (
    <Wrapper color={color} >
      { label.careLabel!=='' ? 
      <p onClick={()=>{getdelete()}}>{label.careLabel}</p>:  
      <div className='plus' onClick={()=>{setShowModal(true)}}>+</div>}
      {showModal && 
        <Modal>
          <CloseIcon onClick={()=>{setShowModal(false);setValue('')}} className='close'/>
          <InputBox>
            <input value={value} onChange={(e)=>{setValue(e.target.value)}}/>
            <div className='submitBtn'><SearchIcon/></div>
          </InputBox>
          <Labels>
            {labelstate.length>0 && showLabel.map((label,idx)=>{return(
              <LabelBox onClick={()=>{selectLabel(label)}} key={idx} color={colors[idx%10]}>
                {label.careLabel}
              </LabelBox>
            )})}
          </Labels>
        </Modal> 
        }
    </Wrapper>
  )
}

export default Label