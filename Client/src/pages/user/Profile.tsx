import React, { useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import profile from './images/profile-image.png';
import camera from './images/camera-free-icon-font.png';
import PasswordModal from './PasswordModal';


const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-content: center;
`

const Logobox = styled.span `
  position: absolute;
  right: 0;
  top: 8vh;

  img {
    height: 25vh;
  }

  @media screen and (max-width: 800px) {
    top: 0;
    img {
      height: 12vh;
    }
  }
`

const ImgBox = styled.div `
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: baseline;
  margin-bottom: 80px;

  .ProfileImg {
    width: 10vw;
    border-radius: 100vh;
    border: 1px solid #333333;
    margin-left: 2vh;
    cursor: pointer;
  }

  .cameraImg {
    width: 1.5vw;
    height: 2.5vh;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 5vh;
    
    .ProfileImg {
      width: 18vw;
    }

    .cameraImg {
      width: 3vw;
      height: 2vh;
    }
  }
`

const SmallBox = styled.div `
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  .EditPasswordBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    /* color: ${props => props.theme.fontColor}; */
    background-color: ${props => props.theme.inactiveBtnColor};
    cursor: pointer;
  }

  .SaveBtn {
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
    position: relative;
    bottom: 13vh;

    .EditPasswordBtn {
      border: none;
      width : 100%;
      border-radius: 10px;
      font-size: 1rem;
      color: white;
      background-color: ${props => props.theme.inactiveBtnColor};
      margin-top: 0.5rem;
    }

    .SaveBtn {
      border: none;
      width : 100%;
      border-radius: 10px;
      font-size: 1rem;
      background-color: ${props => props.theme.activeBtnColor};
      color: white;
    }
  }
`

const EditForm = styled.div `
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;

  h1 {
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
    margin-right: 15px;
  }

  .LabelTitle {
    position: relative;
    bottom: 1vh;
  }

  .BtnPosition {
    margin-top: 1rem;
    flex-flow: column;
    display: flex;
  }

  .SaveBtnBox {
    width: 100%;
  }
  
  .EditPasswordBox {
    width: 100%;
    margin-top: 0.5rem;
  }


  @media screen and (max-width: 800px) {

    label {
      font-size: 0.8rem;
    }

    .LabelTitle {
      position: relative;
      /* top: 1vh; */
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      margin-left: 2.5vw;
    }

    .EditPasswordBox {
      margin-top: 0;
    }
  }
`

const InputForm = styled.section`
  height: 2vh;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 30px;
  width: 30vw;
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

  .ConfirmBtn {
    position: relative;
    /* bottom: 0.5rem; */
    border: none;
    width : 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    cursor: pointer;max-width: 800px
  }


  @media screen and (max-width: 800px) {
    /* height: 15px; */
    margin-bottom: 1rem;
    /* 인풋박스 크기 조절 여기서 */
    width: 55vw;

    .ConfirmBtn {
      position: relative;
      /* align-items: center; */
      font-size: 0.7rem;
    }

    input {
      font-size: 0.8rem;
      &::placeholder { 
        font-size: 0.8rem;
      }
    }
  }
`

const Profile = () => {
  const [modalOn, setModalOn] = useState(false);

  const passwordChangeModal = () => {
    setModalOn(true);
    console.log(modalOn,' 모달 열기')
  }



  return (
    <Wrapper>
      <Logobox>
        <img src={logo} alt="빨랫줄" />
      </Logobox>
      <SmallBox>
        <EditForm>
          <h1>EDIT</h1>

          <ImgBox>
            <img className='ProfileImg' src={profile} alt="프로필 업로드" />
            <img className='cameraImg' src={camera} alt="카메라 아이콘" />
          </ImgBox>

          <div className='NickBox'>
            <label htmlFor='nickName'>
            <span className='LabelTitle'>닉네임</span>
              <InputForm>
                <input type='text' id='nickName'
                  
                  placeholder='닉네임을 입력하세요'
                />
                <button className='ConfirmBtn'>확인</button>
              </InputForm>
            </label>
          </div>

          <div className='BtnPosition'>
            <div className='SaveBtnBox'>
              <button className="SaveBtn">확인</button>
            </div>
            <div className='EditPasswordBox'>
              <button className="EditPasswordBtn" onClick={passwordChangeModal}>비밀번호 수정</button>
            </div>
          </div>
        </EditForm>
      </SmallBox>
      {modalOn && <PasswordModal setModalOn={setModalOn}/>}
    </Wrapper>
  );
};

export default Profile;