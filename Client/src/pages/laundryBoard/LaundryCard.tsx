import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface Iprops{
  laundry:{
    laundryId: number
    careLabel: string[]
    laundryImg: string
    laundryInfo:string[]
  },
  filter:string
}

const Wrapper = styled.section`
  width: 300px;
  height: 370px;
  cursor: pointer;
  margin: auto;
  margin-top: 8vh;
  border-radius: 10px;
  box-shadow: ${props => props.theme.boxShadowBox};
  
  &:hover{
    transform:translateY(-2px);
  }
`
const ImgWrapper = styled.article`
  background-color: ${props => props.theme.containerColor};
  border-radius: 10px 10px 0 0;
  img{
    height: 250px;
    width: 250px;
    margin-top: 20px;
    margin-left: 25px;
    border-radius: 10px 10px 0 0;
  }
`
const LabelBox = styled.div`
  width: 230px;
  height: 90px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
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
  &:nth-child(1){
    background-color: #cffbb2;
  }
  &:nth-child(2){
    background-color: #8ad1c6;
  }
  &:nth-child(3){
    background-color: #f4ffac;
  }
  &:nth-child(4){
    background-color: #fea5e6;
  }
  &:nth-child(5){
    background-color: #fdce8d;
  }
  &:nth-child(6){
    background-color: #a3b2fa;
  }
  &:nth-child(7){
    background-color: #c2d096;
  }
  &:nth-child(8){
    background-color: #eaf69d;
  }
  &:nth-child(9){
    background-color: #fba7e5;
  }
  &:nth-child(10){
    background-color: #ffd59b;
  }
`
const imageOnErrorHandler = (
  // 사진이 오류날 시 기본 사진
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src =
    "https://www.pngplay.com/wp-content/uploads/12/Basic-Half-Sleeve-T-Shirt-PNG-Free-File-Download.png";
};

const Info = styled.div`
  color: black;
  margin:0 5px 0 5px;
  padding: 0 5px 0 5px;
  font-size: 1rem;
  /* align-items: center; */
`
const LaundryCard:React.FC<Iprops>= ({laundry,filter}) => {
  const navigate = useNavigate()
  const src = `/images/${laundry.laundryImg}`
  // console.log(`/images/${laundry.laundryImg}`)
  return (
    <Wrapper onClick={()=>{navigate(`${laundry.laundryId}`)}}>
      <ImgWrapper>
        <img src={src} alt='사진' onError={imageOnErrorHandler}/>
      </ImgWrapper>
      {filter==="my"&&
      <LabelBox>
        {laundry.careLabel.map(((label,idx)=>{
          return(
            <Label key={idx}><p>{label}</p></Label>
          )
        }))}
      </LabelBox>}
      {filter==="all"&&
      <LabelBox>
        {laundry.laundryInfo.map(((label,idx)=>{
          return(
            <Info key={idx}><p>#{label}</p></Info>
          )
        }))}
      </LabelBox>}
    </Wrapper>
  )
}

export default LaundryCard