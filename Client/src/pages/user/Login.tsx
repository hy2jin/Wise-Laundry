
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo2.png';
import kakaoLogin from './images/kakaoImg.png';




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
    height: 25vh;max-width: 800px
  }

  @media screen and (max-width: 800px) {
    top: 0;
    img {
    height: 12vh;
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
    height: 5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.inactiveBtnColor};
    cursor: pointer;
  }

  .LoginBtn {
    border: none;
    width : 100%;
    height: 5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
    cursor: pointer;
  }
  max-width: 800px;

  .KakaoBtn {
    border: none;
    width: 100%;
    height: 5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #ffde00;
    color: #181600;
    cursor: pointer;
    margin-top: 20px;
  }

  @media screen and (max-width: 800px) {
    .SignupBtn {
      margin-top: 0.5rem;
    }

    .LoginBtn {
      border: none;
      width : 100%;
      height: 5vh;
      border-radius: 10px;
      font-size: 1rem;
      background-color: ${props => props.theme.activeBtnColor};
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
    margin-top: 0.5rem;
    display: flex;
  }

  .LoginBtnBox {
    width: 100%;
  }
  max-width: 800px;

  .SignupBtnBox {
    width: 100%;
    margin-left: 1.5vw;
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
  height: 2vh;
  padding: 0.8rem;
  border: 1px solid #333333;
  border-radius: 10px;
  display: flex;
  margin-bottom: 2.5rem;
  width: 28vw;
  background-color: ${props => props.theme.bgColor};
  color : ${props => props.theme.fontColor};

  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    max-width: 800px;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.fontColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }


  @media screen and (max-width: 800px) {
    height: 2vh;
    margin-bottom: 20px;
    /* 인풋박스 크기 조절 여기서 */
    width: 30vh;

    input {
      font-size: 0.7rem;
      &::placeholder { 
        font-size: 0.6rem;
      }
    }
  }
`


// const {Kakao}=window;

const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.Kakao.init(process.env.)
  // })
  
  // function loginWithKakao() {
  //   Kakao.Auth.login({
  //     success: function(authObj: any) {
  //       alert(JSON.stringify(authObj))
  //     },
  //     fail: function(err: any) {
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

        <div>
          <a id="custom-login-btn" href="loginWithKakao()">
            <button className='KakaoBtn'>카카오로 시작하기</button>
          </a>
        </div>
        </LoginForm>
      </SmallBox>
    </Wrapper>
  );
};

export default Login;