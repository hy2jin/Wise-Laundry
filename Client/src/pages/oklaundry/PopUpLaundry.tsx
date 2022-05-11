import React, { useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div `
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  /* justify-content: center; */
  transform: translate(0, 0);
  overflow-y: auto;
  top: 50px;
  /* top: 0; */
  left: 100px;
  position: relative;
  /* position: fixed; */
  bottom: 13vh;

  @media screen and (max-width: 800px) {
    justify-content: center;
    left: 0;
  }
`
const PopUpBox = styled.div `
  display: flex;
  flex-flow: nowrap column;
  width: 35vw;
  top: 30px;
  aspect-ratio: 1/1;
  position: fixed;

  .popUpImg {
    /* position: relative; */
    width: 35vw;
    aspect-ratio: 1/1;
    box-shadow: ${props => props.theme.boxShadowBox};
  }
  
  .allDayCloseBtn {
    border: none;
    width : 100%;
    height: 60px;
    font-size: 0.9rem;
    color: white;
    /* color: ${props => props.theme.fontColor}; */
    background-color: ${props => props.theme.activeBtnColor};
  }

  .closeBtn {
    border: none;
    width : 100%;
    height: 60px;
    font-size: 0.9rem;
    background-color: ${props => props.theme.inactiveBtnColor};
    color: white;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    width: 75vw;

    .popUpImg {
      width: 75vw;
      aspect-ratio: 1/1;
    }

    .allDayCloseBtn {
      font-size: 0.7rem;
      height: 40px;
    }

    .closeBtn {
      font-size: 0.7rem;
      height: 40px;
    }
  }
`

const BtnPositon = styled.div `
  display: flex;
  box-shadow: ${props => props.theme.boxShadowBox};

  .allDayBtnPosition {
    width: 100%;
  }

  .closeBtnPosition {
    width: 100%;
  }

  @media screen and (max-width: 800px) {

    .closeBtnPosition {
      margin-left: 0;
    }
  }
`


interface IProps {
  showPopUp: boolean;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}


const PopUpLaundry:React.FC<IProps> = ({showPopUp, setShowPopUp}) => {

  const onPopUpNotShow = () => {
    let now = new Date()
    sessionStorage.setItem('expirePopUp', `${now}`)
    setShowPopUp(false)
    // console.log(now,'모달에서 이거 뜨나?')
  }
  
    return (
      <>
      {showPopUp ? (
        <Wrapper>
          <PopUpBox>
            <img className='popUpImg' src="https://t1.daumcdn.net/cfile/blog/99FFF5505D075BC932" alt="" />
            <BtnPositon>
              <div className='allDayBtnPosition'>
                <button className='allDayCloseBtn' onClick={() => onPopUpNotShow()}>하루 동안 보지 않기</button>
              </div>
              <div className='closeBtnPosition'>
                <button className='closeBtn' onClick={() => setShowPopUp(false)}>닫기</button>
              </div>
            </BtnPositon>
          </PopUpBox>
        </Wrapper>
      ) : (
        ''
      )}
      </>
    );
  }


export default PopUpLaundry;