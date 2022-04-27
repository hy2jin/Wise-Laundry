import React, { useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import profile from './images/profile-image.png';
import camera from './images/camera-free-icon-font.png';
import { useNavigate } from 'react-router-dom';
import { postSignUp, getEmailcheck, getNicknamecheck } from '../../store/api/user';


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

const SmallBox = styled.div `
  min-height: 100vh;

  .LoginBtn {
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

  .SignupBtn{
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

    .ConfirmBtn {
    border: none;
    width : 100%;
    height: 5vh;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    margin-top: 0.5rem;
  }

  .LoginBtn {
    border: none;
    width : 100%;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: ${props => props.theme.inactiveBtnColor};
    margin-top: 0.5rem;
  }

  .SignupBtn {
    border: none;
    width : 100%;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
    }
  }
`

const SignupForm = styled.div `
  min-height: 100vh;
  /* width: 80%; */
  display: flex;
  justify-content: center;
  flex-flow: nowrap column;
  
  h1 {
    display: flex;
    margin-bottom: 40px;
    justify-content: center;
    margin-right: 25px;
  }

  @media screen and (max-width: 800px) {
    /* width: 50%; */

    label {
      font-size: 0.8rem;
    }
    
    h1 {
      display: flex;
      justify-content: center;
      margin-top: 15vh;
      /* margin-bottom: 30px; */
      margin-left: 5vw;
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
  width: 25vw;
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
    border: none;
    width : 50px;
    height: 30px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: white;
    max-width: 800px;
    background-color: ${props => props.theme.activeBtnColor};
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    /* height: 2vh; */
    margin-bottom: 0.5rem;
    /* 인풋박스 크기 조절 여기서 */
    width: 50vw;

    .ConfirmBtn {
      position: relative;
      bottom: 0.3rem;
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
    cursor: pointer;
  }

  .cameraImg {
    width: 1.5vw;
    max-width: 800px;
    height: 2.5vh;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 5vh;

    .ProfileImg {
      width: 15vw;
      margin-left: 5vw;
    }

    .cameraImg {
      width: 2.5vw;
      height: 2.3vh;
    }
  }
`

const FormBox = styled.div `

  .LabelTitle {
    position: relative;
    bottom: 1vh;
  }

  .EmailNickBox {
    display: flex;
    justify-content: center;
    flex-flow: nowrap row;
  }

  .NickBox {
    margin-left: 4vw;
  }

  .PasswordsBox {
    display: flex;
    justify-content: center;
    flex-flow: nowrap row;
  }

  .PasswordCheckBox {
    margin-left: 4vw;
  }

  .BtnPosition {
    display: flex;
    justify-content: center;
  }

  .LoginBtnBox {
    width: 100%;
    margin-left: 4vw;
  }
  
  .SignupBtnBox {
    width: 100%;
  }

  @media screen and (max-width: 800px) {

    .LabelTitle {
      position: relative;
      bottom: 0.2vh;
    }

    .EmailNickBox {
      display: flex;
      justify-content: center;
      flex-flow: column;
    }

    .PasswordsBox {
      display: flex;
      justify-content: center;
      flex-flow: column;
      margin-left: 0;
    }

    .NickBox {
      margin-left: 0;
    }

    .PasswordCheckBox {
      margin-left: 0;
    }

    .LoginBtnBox {
      margin-left: 0;
    }

    .BtnPosition {
      display: flex;
      flex-flow: column;
      margin-top: 1rem;
    }
  }
`


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailChecked, setEmailChecked] = useState(false)
  const [nickChecked, setNickChecked] = useState(false)
  const navigate = useNavigate();

  // 이메일, 닉네임 확인하는거
  // 체크는했는데 이메일을 또 바꾸는 걸 방지하기
  // 바꾸면 확인했던거 다시 false로 바꾸면 됨

  const isValid = () => {
    const chkEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (email.match(chkEmail)) {
      console.log('이메일 딩동댕')
    } else {
      console.log('이메일 땡')
    }
  }

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isValid()
  }

  const onSubmit = () => {
    postSignUp(password, email, nickname)
    .then(() => {
      console.log('회원가입성공')
      navigate('/login')
      }
    )
    .catch((err) => console.log(err))
  }

  // const onSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault()
  //   if(password !== confirmPassword) {
  //     return alert('비밀번호가 일치하지 않습니다.')
  //   }
  // }
  const emailDuplicationCheck = () => {
    // setEmailChecked(true)
    getEmailcheck(email)
    .then((res) => {
      const emailCheckMessage = res.message
      console.log(emailCheckMessage, '중복 확인')
      if (emailCheckMessage === 'Unavailable') {
        alert('이미 가입된 이메일 입니다.')
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const nicknameDuplicationCheck = () => {
    getNicknamecheck(nickname)
    .then((res) => {
      const nickCheckMessage = res.message
      console.log(nickCheckMessage, '중복 확인')
      if (nickCheckMessage === 'Unavailable') {
        alert('사용중인 닉네임 입니다.')
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }



  return (
    <Wrapper>
      <Logobox>
        <img src={logo} alt="빨랫줄" />
      </Logobox>
      <SmallBox>
        <SignupForm>
          <h1>SIGNUP</h1>
          <ImgBox>
            <img className='ProfileImg' src={profile} alt="프로필 업로드" />
            <img className='cameraImg' src={camera} alt="카메라 아이콘" />
          </ImgBox>
          {/* <section> */}
          <FormBox>
              {/* 이메일 */}
              <div className='EmailNickBox'>
              <form onSubmit={(e) => onSignup(e)}>
                <div className='EmailBox'>
                  <label htmlFor='email'>
                    <span className='LabelTitle'>이메일</span>
                    <InputForm>
                      <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} 
                        placeholder='이메일을 입력하세요'
                      />
                      <button className='ConfirmBtn' onClick={() => emailDuplicationCheck()}>확인</button>
                    </InputForm>
                  </label>
                </div>
              </form>
              
                

                <div className='NickBox'>
                  <label htmlFor='nickName'>
                  <span className='LabelTitle'>닉네임</span>
                    <InputForm>
                      <input type='text' id='nickName'
                        placeholder='닉네임을 입력하세요'
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                      />
                      <button className='ConfirmBtn' onClick={() => nicknameDuplicationCheck()}>확인</button>
                    </InputForm>
                  </label>
                </div>
              </div>

                {/* 비밀번호 */}
              <div className='PasswordsBox'>
                <div className='PasswordBox'>
                  <label htmlFor='password'>
                    <span className='LabelTitle'>비밀번호</span>
                    <InputForm>
                      <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} 
                        placeholder='비밀번호를 입력하세요'
                      />
                    </InputForm>
                  </label>
                </div>

                {/* 비밀번호 확인 */}
                <div className='PasswordCheckBox'>
                  <label htmlFor='passwordCheck'>
                    <span className='LabelTitle'>비밀번호 확인</span> 
                    <InputForm >
                      <input type='password' id='passwordCheck' 
                        placeholder='비밀번호를 한 번 더 입력하세요'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </InputForm>
                  </label>
                </div>
              </div>
              <div className='BtnPosition'>
                <div className='SignupBtnBox'>
                  <button className="SignupBtn" onClick={() => onSubmit()}>가입하기</button>
                </div>
                <div className='LoginBtnBox'>
                  <button className="LoginBtn" onClick={() => navigate('/login')} >로그인</button>
                </div>
              </div>
            {/* </form> */}
          </FormBox>
          {/* </section> */}
        </SignupForm>
      </SmallBox>
    </Wrapper>
  )
}

export default Signup