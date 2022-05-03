import React, { useState } from 'react';
import styled from 'styled-components';
import { putUpdateUserInfo } from '../../store/api/user';


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

  .PasswordCheckMessage {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: red;
    font-size: 0.75rem;
  }

  .PasswordCheckMessage2 {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: blue;
    font-size: 0.75rem;
  }

  .PasswordAllowedMsg {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: blue;
    font-size: 0.75rem;
  }

  .PasswordNotAllowedMsg {
    position: relative;
    bottom: 4vh;
    left: 0.5vw;
    color: red;
    font-size: 0.75rem;
  }



  @media screen and (max-width: 800px) {
    .ConfirmBtnBox {
      width: 100%;
      margin-left: 0;
    }

    .PasswordCheckMessage {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: red;
      font-size: 0.5rem;
    }

    .PasswordCheckMessage2 {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: blue;
      font-size: 0.5rem;
    }

    .PasswordAllowedMsg {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: blue;
      font-size: 0.5rem;
    }

    .PasswordNotAllowedMsg {
      position: relative;
      /* bottom: 4vh; */
      top: 0.1vh;
      left: 0.7vw;
      color: red;
      font-size: 0.5rem;
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
  setPassword: React.Dispatch<React.SetStateAction<string>>
}


const PasswordModal:React.FC<IProps> = ({setModalOn}) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [paswordChecked, setPaswordChecked] = useState(false)

  const [allowedPassword, setAllowedPassword] = useState(false)

  const onClose = () => {
    // event.preventDefault();
    setModalOn(false);
    console.log('모달 닫기')

  //   putUpdateUserInfo(formdata)
  //   .then(() => {
  //     console.log('회원정보 수정 성공')
  //     // navigate('/login')
  //     }
  //   )
  //   .catch((err) => console.log(err))
  }

  
  // 비밀번호 정규식 확인
  const passwordVaildCheck = (pwd: string) => {
    setAllowedPassword(false)
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if (regPass.test(pwd)) {
      setAllowedPassword(true)
    }
  }

  // 비밀번호 확인
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    passwordVaildCheck(e.target.value)
    setPaswordChecked(false)
    if (confirmPassword === e.target.value && allowedPassword) {
      setPaswordChecked(true)
    }
  }

  // 비밀번호 확인 확인
  const onConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    setPaswordChecked(false)
    if (password === e.target.value && allowedPassword) {
      setPaswordChecked(true)
    }
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
              <input 
                type="password" 
                id='password'
                name="editPasswordInput" 
                placeholder="변경 할 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => onPasswordHandler(e)} 
              />
            </InputForm>
              {!password ? <p></p> : allowedPassword ? <p className='PasswordAllowedMsg'>사용가능한 비밀번호 입니다</p> : <p className='PasswordNotAllowedMsg'>영문, 숫자, 특수기호 포함 8글자 이상 입력해 주세요</p>}
            </label>
          </div>
          <div>
            <label htmlFor="editPasswordConfirm">
            <span className='LabelTitle'>변경 할 비밀번호 확인</span>
            <InputForm>
              <input 
                type="password"
                id='passwordCheck'
                name="editPasswordConfirmInput" 
                placeholder="변경 할 비밀번호를 한 번 더 입력하세요"
                value={confirmPassword}
                onChange={e => onConfirmPasswordHandler(e)}
              />
            </InputForm>
              {!confirmPassword ? <p></p>: paswordChecked ? <div className="PasswordCheckMessage2">패스워드가 일치합니다</div> : <div className="PasswordCheckMessage">패스워드가 일치하지 않습니다</div>}
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
