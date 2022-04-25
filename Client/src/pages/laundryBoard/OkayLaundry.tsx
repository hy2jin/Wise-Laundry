import React from 'react';
import styled from 'styled-components';
import tack from './images/laundryLabel.jpg'
const Wrapper = styled.article`
  padding-top: 2vh;
  width: 70vw;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  svg{
    margin: 30px 0;
    font-size: 4vh;
    color: ${props => props.theme.fontColor};
  }
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  /* height: 120vh; */
  padding-bottom: 20vh;

`
const ContainerBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 650px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  .title{
    font-size: 4vw;
    text-align: center;
    padding-top: 50px;
  }
  img{
    height: 450px;
    width: 25vw;
    margin-left: 10vw;
    margin-top: 5vh;
    border-radius: 10px;
    border: 2px solid #6b6b6b;
  }
  @media screen and (max-width: 1200px) {
    height: auto;
    img{
      height: 45vh;
      width: 30vw;
      margin-top: 5vh;
      margin-left:5vw;
    }
    .title{
      font-size: 30px;
    }
  }
  @media screen and (max-width: 800px) {
    height: auto;
    img{
      height: 40vh;
      width: 90%;
      margin-top: 5vh;
      margin-left:5vw;
    }
    .title{
      font-size: 30px;
    }
  }
`
const FlexBox = styled.div`
  display: flex;
  @media screen and (max-width: 800px) {
    display: inline;
  }
`
const InformBox = styled.div`
  width: 30vw;
  margin: auto;
  margin-top: 5vh;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;
  .inform{
    overflow-y: auto;
    height: 45vh;
    flex:9;
  }
  @media screen and (max-width: 800px) {
    font-size: 14px;
    width: 80vw;
    height: auto;
    text-align: center;
  }
  padding-bottom: 5vh;
`
const Button = styled.button`
  background-color: ${props => props.theme.activeBtnColor};
  width: 30vw;
  height: 50px;
  border: none;
  border-radius: 10px;
  margin: auto;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    margin-top: 50px;
    width: 70vw;
  }
`
const OkayLaundry = () => {
  return (
    <Wrapper>
      <ContainerBox>
        <div className='title'>Okay Laundry</div>
        <FlexBox>
          <img src={tack} alt='tack'/>
          <InformBox>
            <div className='inform'>
              <p>Okay Laundry(어케 빨래)는 </p>
              <p>육성재 Company만의 머신러닝을 이용한 인공지능 기술입니다.  </p>
              <p>웹, 모바일의 카메라를 이용해 세탁을 원하는 </p>
              <p>  의류의 택을 좌측의 예시처럼 찍어주세요. </p>
              <p>흔들리거나 흐릿한 이미지일 경우 인식하지 못할 수 있습니다. </p>
              <p>(단 숫자,문자는 직접 기입해주셔야 합니다.)</p>
              <p>Okay Laundry로 인식하면 내 세탁으로 손 쉽게 등록할 수 있습니다. </p>
            </div>
            <Button>📷 카메라 ON</Button>
          </InformBox>
        </FlexBox>
      </ContainerBox>
    </Wrapper>
  );
};

export default OkayLaundry;