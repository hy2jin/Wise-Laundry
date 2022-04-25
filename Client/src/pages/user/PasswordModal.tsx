import React, { useState } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div `
  position: absolute;
  top: 20vh;
  background-color: ${props => props.theme.navColor};
  transform: translate(0%, 0%);
  width: 33vw;
  height: 75vh;
  border-radius: 30px;
  box-shadow: ${props => props.theme.boxShadowBox};
  display: flex;
  justify-content: center;

  @media screen and (max-width: 800px) {
    width: 63vw;
    top: 15vh;
    height: 70vh;
  }
`

const SmallBox = styled.div `
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  position: relative;
  bottom: 13vh;

  h1 {
    display: flex;
    justify-content: center;
    margin-bottom: 10vh;
  }

  .LabelTitle {
    position: relative;
    bottom: 5px;
  }

  .BtnPosition {
    margin-top: 0.5rem;
    display: flex;
  }

  .ConfirmBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
    cursor: pointer;
  }


  @media screen and (max-width: 800px) {

    label {
      font-size: 0.8rem;
    }

    .BtnPosition {
      display: flex;
      flex-flow: column;
      margin-top: 1rem;
    }

    .ConfirmBtn {
      border: none;
      border-radius: 10px;
      font-size: 0.9rem;
      background-color: ${props => props.theme.activeBtnColor};
      color: white;
    }
  }
`

const ModalBox = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: nowrap column;

  .ConfirmBtnBox {
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    .ConfirmBtnBox {
      width: 100%;
      margin-left: 0;
    }
  }
`

const InputForm = styled.section`
  height: 2vh;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 2.5rem;
  width: 20vw;
  background-color: ${props => props.theme.bgColor};
  color : ${props => props.theme.fontColor};
  align-items: center;

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.fontColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }


  @media screen and (max-width: 800px) {
    height: 1.5vh;
    margin-bottom: 20px;
    /* 인풋박스 크기 조절 여기서 */
    width: 45vw;

    input {
      font-size: 0.7rem;
      &::placeholder { 
        font-size: 0.6rem;
      }
    }
  }
`

interface IProps {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>
}


const PasswordModal:React.FC<IProps> = ({setModalOn}) => {

  const onClose = () => {
    // event.preventDefault();
    setModalOn(false);
    console.log('모달 닫기')
  }


  return (
    <Wrapper>
      <SmallBox>
        <ModalBox>
          <h1>비밀번호 변경</h1>
          <div>
            <label htmlFor="editPassword">
              <span className='LabelTitle'>변경 할 비밀번호</span>
            <InputForm>
              <input type="text" name="editPasswordInput" placeholder="변경 할 비밀번호를 입력하세요" />
            </InputForm>
            </label>
          </div>
          <div>
            <label htmlFor="editPasswordConfirm">
            <span className='LabelTitle'>변경 할 비밀번호 확인</span>
            <InputForm>
              <input type="text" name="editPasswordConfirmInput" placeholder="변경 할 비밀번호를 한 번 더 입력하세요" />
            </InputForm>
            </label>
          <div className="BtnPosition">
            <div className='ConfirmBtnBox'>
              <button className="ConfirmBtn" onClick={onClose}>확인</button>
            </div>
          </div>
          </div>
        </ModalBox>
      </SmallBox>
    </Wrapper>
  );
};

export default PasswordModal;