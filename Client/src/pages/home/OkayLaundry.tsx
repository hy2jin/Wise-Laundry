import React, { useState } from 'react';
import styled from 'styled-components';
import okay1 from './images/okay1.png'
import okay2 from './images/okay2.png'
import okay3 from './images/okay3.png'
import okay4 from './images/okay4.png'

const OkayLaundry = () => {
  const [step,setStep] = useState(1)
  return (
    <Wrapper>
      <Title>
        <div className='empty'/>
        <div className='namebox'>
          <div className='big'><div>슬기로운  세탁 생활</div> <div>시작하기</div></div>
          <div  className='small'>지금부터 당신의 빨래를 관리하세요 </div>
        </div>
        <div className='btnbox'><Button>start</Button></div>
      </Title>
      <Navbar>
        <div id={step===1?'step':''} onClick={()=>{setStep(1)}}>1. 촬영하기</div>
        <div id={step===2?'step':''} onClick={()=>{setStep(2)}}>2. 택 선택하기</div>
        <div id={step===3?'step':''} onClick={()=>{setStep(3)}}>3. 내 옷장 등록</div>
        <div id={step===4?'step':''} onClick={()=>{setStep(4)}}>4. 옷장 관리</div>
      </Navbar>
      <Bar/>

      {step===1&&
      <IntroBox id='step1'>
        <div className='left'>
          <div className='title'>Step 1.</div>
          <div className='bold'> 계획적인 세탁을 위한 첫번째 단계.</div>
          <div className='normal'>휴대폰이나 컴퓨터의 카메라를 이용해</div>
          <div className='normal'>세탁물의 세탁 라벨을 촬영해 주세요.</div>
        </div>
        <div className='right'>
          <img src={okay1} alt='img'/>
        </div>
      </IntroBox>}
      {step===2&&
      <IntroBox id='step2'>
        <div className='left'>
          <div className='title'>Step 2.</div>
          <div className='bold'> 완벽한 세탁을 위한 두번째 단계.</div>
          <div className='normal'>슬기로운 세탁생활이 세탁 라벨을 인식하고  </div>
          <div className='normal'>알려드릴 것입니다.</div>
          <div className='normal'>일치하는 라벨을 선택하고 확인을 눌러주세요.</div>
        </div>
        <div className='right'>
        <img src={okay2} alt='img'/>
        </div>
      </IntroBox>}
      {step===3&&
      <IntroBox id='step3'>
        <div className='left'>
          <div className='title'>Step 3.</div>
          <div className='bold'> 체계적인 세탁을 위한 세번째 단계.</div>
          <div className='normal'>등록된 라벨을 활용해 내 옷장에 저장!</div>
          <div className='normal'>#해시태그 #내옷장 #정보공유</div>
          <div className='normal'>태그를 추가하여 사람들과 공유해 보세요</div>
        </div>
        <div className='right'>
        <img src={okay3} alt='img'/>
        </div>
      </IntroBox>}
      {step===4&&
      <IntroBox id='step4'>
        <div className='left'>
          <div className='title'>Step 4.</div>
          <div className='bold'> 최고의 세탁을 위한 마지막 단계.</div>
          <div className='normal'>옷장 관리를 통해 </div>
          <div className='normal'>내 옷의 세탁 라벨을 무제한으로 확인하고</div>
          <div className='normal'>메모를 통해 기록을 남겨보세요</div>
        </div>
        <div className='right'>
        <img src={okay4} alt='img'/>
        </div>
      </IntroBox>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 95vh;
  width: 70vw;
  margin: auto;
  @media screen and (max-width:1200px) {
    width: 95vw;
    height: auto;
  }
`
const Title = styled.article`
  text-align: center;
  display: flex;
  .empty{
    flex:2;
  }
  .name{
    flex:6;
  }
  .big{
    font-size: 2.5rem;
    margin-top: 50px;
    display: flex;
    justify-content:center;
    div{
      margin: 7px;
    }
  }
  .btnbox{
    flex:2;
  }
  .small{
    font-size: 1.5rem;
    margin-top: 25px;
  }
  @media screen and (max-width: 800px) {
    display: inline;
    .big{
    font-size: 2rem;
    margin-top: 50px;
    display:inline-block ;
    }
    .small{
      font-size: 1.2rem;
      margin-top: 50px;
    }
  }
`
const Navbar = styled.article`
  margin: auto;
  margin-top: 100px;
  display: flex;
  width: 90%;
  div{
    font-size: 1.3rem;
    flex:1;
    text-align: center;
    cursor: pointer;
    padding-bottom: 15px;
    color: #a6a4a4;
    &#step{
      color: ${props => props.theme.fontColor};
      border-bottom: 8px solid #275788;
    }
  }
  @media screen and (max-width: 1200px) {
    margin-top: 60px;
    width: 100%;
    div{
    font-size: 0.7rem;
    }
  }
`
const Bar = styled.div`
  border: 1px solid #275788;
  width: 90%;
  margin: auto;
  /* margin-top: 15px; */
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`
const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: #E2DCDC;
  border: none;
  cursor: pointer;
  border-radius: 10px 0 10px 0;
  font-size: 1.5rem;
  margin-top: 70px;
  /* font-family: 'Times New Roman', Times, serif; */
`
const IntroBox = styled.div`
  width: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: space-around;
  div{
    margin-top: 50px;
  }
  @media screen and (max-width: 1200px) {
    display: inline-block;
  }
  .left{
    .title{
      font-family: 'Times New Roman', Times, serif;
      font-style: italic;
      font-size: 3rem;
      margin-left: 30px;
      color: #c6c6c6;
    }
    .normal{
      margin-top: 30px;
    }
    .bold{
      font-weight: 1200;
      margin-top: 50px;
      font-size: 1.5rem;
    }
    @media screen and (max-width: 1200px) {
      text-align: center;
    }
  }
  .right{
    img{
      width: 500px;
      height: 400px;
    }
    @media screen and (max-width: 1200px) {
      text-align: center;
      margin: auto;
      margin-top: 50px;
      img{
        width: 300px;
        height: 250px;
      }
    }
  }
  
`

export default OkayLaundry;