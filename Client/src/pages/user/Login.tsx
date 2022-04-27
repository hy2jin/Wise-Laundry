import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo2.png';
import kakaoLogin from './images/kakaoImg.png';
import { postLogin } from '../../store/api/user';


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
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.inactiveBtnColor};
    cursor: pointer;
  }

  .LoginBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
    cursor: pointer;
  }

  .KakaoBtn {
    border: none;
    width: 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #ffde00;
    color: #181600;
    cursor: pointer;
    margin-top: 2vh;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    bottom: 13vh;

    .SignupBtn {
      margin-top: 0.5rem;
    }

    .LoginBtn {
      border: none;
      width : 100%;
      border-radius: 10px;
      font-size: 1rem;
      background-color: ${props => props.theme.activeBtnColor};
      color: white;
      }
    .KakaoBtn {
      margin-top: 1vh;
    }
  }
`

const LoginForm = styled.div `
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;

  .LabelTitle {
    position: relative;
    bottom: 1vh;
  }

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

  .SignupBtnBox {
    width: 100%;
    margin-left: 1.5vw;
  }


  @media screen and (max-width: 800px) {

    label {
      font-size: 0.8rem;
    }

    .LabelTitle {
      position: relative;
      top: 0.5vh;
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
  margin-bottom: 2rem;
  width: 28vw;
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
    height: 2vh;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const onSubmit = () => {
    postLogin(email, password)
    .then((res) => {
      console.log('로그인 성공')
      // navigate('/home')
      const token = res.accessToken;
      sessionStorage.setItem("jwt", `${token}`);
      console.log(token, 'jwt 토큰 확인')
    })

    .catch((err) => {
      console.log(err)
    })
  }

  const CLIENT_ID = "9c4b740a32c840080fcfd4249ec3b331";
  const REDIRECT_URI = "https://슬기로운세탁.com/oauth";
  // const REDIRECT_URI = "http://localhost:3000/oauth";
  const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

  
  // const query = queryString.parse(window.location.search);
  
  // const goKakaoLogin = () => {
  //   navigate(KAKAO_AUTH_URL)
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
          <label htmlFor="email">
            <span className='LabelTitle'>이메일</span>
          <InputForm>
            <input 
              type="email" 
              name="emailInput" 
              placeholder="이메일을 입력하세요" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputForm>
          </label>
        </div>
        <div>
          <label htmlFor="passwordInput">
            <span className='LabelTitle'>비밀번호</span>
          <InputForm>
            <input 
              type="password" 
              name="passwordInput" 
              placeholder="비밀번호를 입력하세요" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputForm>
          </label>
        </div>
        <div className="BtnPosition">
          <div className='LoginBtnBox'>
            <button className="LoginBtn" onClick={() => onSubmit()}>로그인</button>
          </div>
          <div className='SignupBtnBox'>
            <button className="SignupBtn" onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        </div>
        {/* <button>임시 카카오 로그인 자리</button> */}

        <div>
          <a id="custom-login-btn" href={KAKAO_AUTH_URL}>
          {/* <button >카카오</button> */}
            <button id="custom-login-btn" className='KakaoBtn'>카카오로 시작하기</button>
          </a>
        </div>
        </LoginForm>
      </SmallBox>
    </Wrapper>
  );
};

export default Login;
