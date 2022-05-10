import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface Iprops{
  laundry:{
    laundryId: number
    careLabel: {careLabelId: number, careLabelName:string, careLabel:string}[]
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
  border-radius: 3px;
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
  border-radius:5px 0 5px 0;
  font-size: 0.8rem;
  background-color: #b3eaef;
  align-items: center;
  p{
    margin-top: 1px;
  }
  &#label1{
    background-color: #82d64a;
  }
  &#label2{
    background-color: #f2be70;
  }
  &#label3{
    background-color: #f4ffac;
  }
  &#label4{
    background-color: #fea5e6;
  }
  &#label5{
    background-color: #fdce8d;
  }
  &#label6{
    background-color: #ccffa8;
  }
  &#label7{
    background-color: #5bc9b9;
  }
  &#label8{
    background-color: #eaf69d;
  }
  &#label9{
    background-color: #fba7e5;
  }
  &#label10{
    background-color: #fc6ce4;
  }
  &#label11{
    background-color: #e3a44c;
  }
  &#label12{
    background-color: #cccfa3;
  }
  &#label13{
    background-color: #5fbe7a;
  }
  &#label14{
    background-color: #b49bff;
  }
  &#label15{
    background-color: #7346fd;
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
  return (
    <Wrapper onClick={()=>{navigate(`${laundry.laundryId}`)}}>
      <ImgWrapper>
        <img src={src} alt='사진' onError={imageOnErrorHandler}/>
      </ImgWrapper>
      {filter==="my"&&
      <LabelBox>
        {laundry.careLabel.map(((label,idx)=>{
          return(
            <Label  id={`label${String(label.careLabelId)}`} key={idx}><p>{label.careLabel}</p></Label>
          )
        }))}
      </LabelBox>}
      {filter==="all"&&
      <LabelBox>
        {laundry.laundryInfo.map(((info,idx)=>{
          return(
            <Info key={idx}><p>#{info}</p></Info>
          )
        }))}
      </LabelBox>}
    </Wrapper>
  )
}

export default LaundryCard