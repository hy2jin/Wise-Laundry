import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo2.png';
import { getUserInfo, postLogin } from '../../store/api/user';
import { useRecoilState } from 'recoil';
import { loginState, userState } from '../../store/state/user';
import Swal from 'sweetalert2'


const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`
const Logobox = styled.span `
  position: absolute;
  right: 0;
  top: 0;

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
  }

  .LoginBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
  }

  .KakaoBtn {
    border: none;
    width: 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #ffde00;
    color: #181600;
    margin-top: 2vh;
  }

  @media screen and (max-width: 800px) {
    position: relative;
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


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [isLogin, setIsLogin] = useRecoilState(loginState)

  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate();
  

  const onSubmit = () => {
    postLogin(email, password)
    .then((res) => {
      const token = res.accessToken;
      sessionStorage.setItem("token", `${token}`);
      Swal.fire({
        icon: 'success',
        text: '로그인 되었습니다',
        showConfirmButton: false,
        timer: 1000
      })
      setIsLogin(true)
    })

    .catch((err) => {
      console.log(err)
    })
  }
  

  useEffect(() => {
    if (isLogin) {
      getUserInfo()
        .then((res) => {
          const userInfo = {...res};
          delete userInfo.message
          delete userInfo.statusCode
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUser(userInfo)
          navigate('/home')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },[isLogin])


  const onKeyupEnter = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  // 로그인 후 로그인 페이지로 뒤로가기 방지
  useEffect(() => {
    if (isLogin) {
      navigate('/home')
    }
  },[isLogin])



  const CLIENT_ID = "9c4b740a32c840080fcfd4249ec3b331";
  const REDIRECT_URI = "https://슬기로운세탁.com/oauth";
  const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

  const submitKakao = () => {
    sessionStorage.setItem('kakao', 'false')
  }


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
              onKeyPress={onKeyupEnter}
            />
          </InputForm>
          </label>
        </div>
        <div className="BtnPosition">
          <div className='LoginBtnBox'>
            <button className="LoginBtn" onClick={() => onSubmit()} >로그인</button>
          </div>
          <div className='SignupBtnBox'>
            <button className="SignupBtn" onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        </div>

        <div>
          <a id="custom-login-btn" href={KAKAO_AUTH_URL} onClick={() => submitKakao()}>
            <button id="custom-login-btn" className='KakaoBtn'>카카오로 시작하기</button>
          </a>
        </div>
        </LoginForm>
      </SmallBox>
    </Wrapper>
  );
};

export default Login;
