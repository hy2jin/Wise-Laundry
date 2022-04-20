import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { detailitem } from './dummy';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.article`
  width: 70vw;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  svg{
    margin: 30px 0;
    font-size: 4vh;
    color: ${props => props.theme.fontColor};
  }
  @media screen and (max-width:800px) {
    width: 90vw;
  }
  /* height: 120vh; */
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 600px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  @media screen and (max-width:800px) {
    height: auto;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 400px;
    width: 35vw;
    margin-left: 3vw;
    margin-top: 5vh;
  }
  @media screen and (max-width:800px) {
    display: inline;
    margin: auto;
    img{
      height: 250px;
      width: 90%;
      margin-top: 2vh;
      margin-left: 5vw;
    }
  }
`
const InfoBox = styled.div`
  width: 100%;
  .inform{
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    justify-content: center;
    padding-right: 20px;
  }
  .title{
    text-align: center;
    margin-top: 40px;
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  .content{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 1.3rem;
  }
`
const Info = styled.div`
  margin: auto;
  width: 80%;
  
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 70px;
  width: 80%;
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
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
const ButtonBox = styled.div`
  width: 70vw;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 300px;
    border: none;
    border-radius: 10px;
    margin-top: 50px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
  }
  @media screen and (max-width:800px) { 
    button{
    margin-top: 10px;
    height: 30px;
    width: 150px;
    }
  }
  @media screen and (max-width:700px) { 
    button{
    margin-top: 10px;
    height: 30px;
    width: 100px;
    }
  }
  .updateBtn{
    background-color:${props => props.theme.activeBtnColor};
  }
  .deleteBtn{
    background-color:${props => props.theme.inactiveBtnColor};
  }
`
interface Istate{
  laundry:{
    laundryId: number
    careLabel: string[]
    laundryInfo: string[]
    laundryImg: string
    laundryOwnerNick: string
    laundryOwnerId: number
  }
}

const LaundryDetail = () => {
  const [laundry,setLaundry] = useState<Istate['laundry']>(detailitem)
  const navigate = useNavigate()
  return (
    <Wrapper>
      <KeyboardBackspaceIcon style={{"cursor":"pointer"}} onClick={()=>{navigate('/laundry')}}/>
      <DetailBox>
        <Top>
          <img alt='옷사진' src={laundry.laundryImg}/>
          <InfoBox>
            <Info>
              <div className='title'>제품 설명 태그</div>
              <div className='inform'>
                {laundry.laundryInfo.map((info,idx)=>{
                  return(
                    <div key={idx} className='content'># {info}</div>
                  )
                })}
              </div>
            </Info>
            <LabelBox>
              <div className='title'>세탁 주의 사항</div>
              <div className='careLabel'>
              {laundry.careLabel.map((label,idx)=>{
                return(<Label key={idx} className='label'> {label}</Label>)})}
              </div>
            </LabelBox>
          </InfoBox>
        </Top>
        <ButtonBox>
          <button className='updateBtn'>수정하기</button>
          <button className='deleteBtn'>삭제하기</button>
        </ButtonBox>
      </DetailBox>
    </Wrapper>
  );
};

export default LaundryDetail;