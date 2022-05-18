import React, { useState } from 'react';
import styled from 'styled-components';
import 팝업 from './images/팝업.png'

const PopUpBox = styled.div `
  top: 10vh;
  left: 150px;
  position: fixed;
  z-index: 5;
  @media screen and (max-width: 800px) {
    left: 10vw;
  }
  display: flex;
  flex-flow: nowrap column;
  width: 30vw;
  aspect-ratio: 1/1;

  .popUpImg {
    width: 30vw;
    aspect-ratio: 1/1;
  }
  
  .allDayCloseBtn {
    border: none;
    width : 100%;
    height: 60px;
    font-size: 0.9rem;
    color: white;
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
    width: 80vw;

    .popUpImg {
      width: 80vw;
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
  }
  
    return (
      <>
        {showPopUp && 
          <PopUpBox>
            <img className='popUpImg' src={팝업} alt="" />
            <BtnPositon>
              <div className='allDayBtnPosition'>
                <button className='allDayCloseBtn' onClick={() => onPopUpNotShow()}>하루 동안 보지 않기</button>
              </div>
              <div className='closeBtnPosition'>
                <button className='closeBtn' onClick={() => setShowPopUp(false)}>닫기</button>
              </div>
            </BtnPositon>
          </PopUpBox>}
      </>
    );
  }


export default PopUpLaundry;