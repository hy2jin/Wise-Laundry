import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface Iprops{
  laundry:{
    laundryId: number
    careLabel: string[]
    laundryImg: string
  },
}

const Wrapper = styled.section`
  width: 300px;
  height: 370px;
  cursor: pointer;
  margin: auto;
  margin-top: 8vh;
  border-radius: 10px;
  box-shadow: ${props => props.theme.boxShadowBox};
  background-color: ${props => props.theme.containerColor};
  img{
    height: 250px;
    width: 250px;
    margin-top: 20px;
    margin-left: 25px;
  }
  &:hover{
    transform:translateY(-2px);
  }
`
const LabelBox = styled.div`
  width: 230px;
  height: 80px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`
const Label = styled.div`
  color: black;
  height:1rem;
  margin: 10px 5px 0 5px;
  padding: 2px 5px 2px 5px;
  border-radius: 10px;
  font-size: 0.8rem;
  background-color: #b3eaef;
  align-items: center;
  p{
    margin-top: 1px;
  }
`

const LaundryCard:React.FC<Iprops>= ({laundry}) => {
  const navigate = useNavigate()
  return (
    <Wrapper onClick={()=>{navigate(`${laundry.laundryId}`)}}>
      <img src={laundry.laundryImg} alt='사진' />
      <LabelBox>
        {laundry.careLabel.map(((label,idx)=>{
          return(
            <Label key={idx}><p>{label}</p></Label>
          )
        }))}
      </LabelBox>
    </Wrapper>
  )
}

export default LaundryCard