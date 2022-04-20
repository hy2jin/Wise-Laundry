
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo2.png'


const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
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

const SmallBox = styled.div `
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  .SignupBtn {
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

  .LoginBtn {
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
    .SignupBtn {
    border: none;
    width : 100%;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: #CCCCCC;
    margin-top: 0.5rem;
  }

  .LoginBtn {
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

const LoginForm = styled.div `
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;

  h1 {
    margin-bottom: 40px;
  }

  .BtnPosition {
    margin-top: 1rem;
    display: flex;
  }

  .LoginBtnBox {
    width: 100%;
  }
  
  .SignupBtnBox {
    width: 100%;
    margin-left: 20px;
  }


  @media screen and (max-width:700px) {

    label {
      font-size: 0.8rem;
    }

    .BtnPosition {
      display: flex;
      flex-flow: column;
      margin-top: 1rem;
    }

    .SignupBtnBox {
      width: 100%;
      margin-left: 0;
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
  }
`

const InputForm = styled.section`
  height: 20px;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 2.5rem;
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


  @media screen and (max-width:700px) {
    height: 15px;
    margin-bottom: 20px;
    /* 인풋박스 크기 조절 여기서 */
    width: 300px;

    input {
      font-size: 0.7rem;
      &::placeholder { 
        font-size: 0.6rem;
      }
    }
  }
`



const Login = () => {
  const navigate = useNavigate();

  
  // function loginWithKakao() {
  //   Kakao.Auth.login({
  //     success: function(authObj) {
  //       alert(JSON.stringify(authObj))
  //     },
  //     fail: function(err) {
  //       alert(JSON.stringify(err))
  //     },
  //   })
  // }




  return (
    <Wrapper>
      <Logobox>
        <img src={logo} alt="빨랫줄" />
      </Logobox>
      <SmallBox>
        <LoginForm>
        <h1>LOGIN</h1>
        <div>
          <label htmlFor="email">이메일
          <InputForm>
            <input type="text" name="emailInput" placeholder="이메일을 입력하세요" />
          </InputForm>
          </label>
        </div>
        <div>
          <label htmlFor="passwordInput">비밀번호
          <InputForm>
            <input type="text" name="passwordInput" placeholder="비밀번호를 입력하세요" />
          </InputForm>
          </label>
        </div>
        <div className="BtnPosition">
          <div className='LoginBtnBox'>
            <button className="LoginBtn">로그인</button>
          </div>
          <div className='SignupBtnBox'>
            <button className="SignupBtn" onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        </div>
        {/* <button>임시 카카오 로그인 자리</button> */}

          <a id="custom-login-btn" href="loginWithKakao()">
            <img
              src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
              width="222"
              alt="카카오 로그인 버튼"
            />
          </a>
        </LoginForm>
      </SmallBox>
    </Wrapper>
  );
};

export default Login;