import React from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import profile from './images/profile-image.png';
import camera from './images/camera-free-icon-font.png';


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

  @media screen and (max-width:700px) {
    top: 0;
    img {
    height: 105px;
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
    width: 180px;
    border-radius: 100px;
    border: 1px solid #333333;
    margin-left: 25px;
    cursor: pointer;
  }

  .cameraImg {
    width: 30px;
    height: 30px;
  }

  @media screen and (max-width:700px) {
    margin-bottom: 50px;
    .ProfileImg {
      width: 100px;
      margin-left: 15px;
    }

    .cameraImg {
      width: 20px;
      height: 20px;
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
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    /* color: ${props => props.theme.fontColor}; */
    background-color: #CCCCCC;
    cursor: pointer;
  }

  .SaveBtn {
    border: none;
    width : 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #96BDF3;
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width:700px) {
    .EditPasswordBtn {
    border: none;
    width : 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: #CCCCCC;
    margin-top: 0.5rem;
  }

  .SaveBtn {
    border: none;
    width : 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #96BDF3;
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
    margin-top: 20px;
  }


  @media screen and (max-width:700px) {

    label {
      font-size: 0.8rem;
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    .EditPasswordBox {
    margin-top: 10px;
  }
  }
`

const InputForm = styled.section`
  height: 20px;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 30px;
  width: 400px;

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }

  .ConfirmBtn {
    position: relative;
    bottom: 0.3rem;
    border: none;
    width : 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: white;
    background-color: #96BDF3;
    cursor: pointer;
  }


  @media screen and (max-width:700px) {
    height: 15px;
    margin-bottom: 20px;
    /* 인풋박스 크기 조절 여기서 */
    width: 300px;

    .ConfirmBtn {
      position: relative;
      bottom: 0.5rem;
      font-size: 0.7rem;
    }

    input {
      font-size: 0.7rem;
      &::placeholder { 
        font-size: 0.6rem;
      }
    }
  }
`

const Profile = () => {

  const passwordChangeModal = () => {
    console.log('모달')
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
            <span>닉네임</span>
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
    </Wrapper>
  );
};

export default Profile;