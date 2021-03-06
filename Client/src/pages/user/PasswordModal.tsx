import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getUserInfo, putUpdateUserInfo } from '../../store/api/user';
import { userState } from '../../store/state/user';
import Swal from 'sweetalert2'


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
    flex-flow: column;
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

  .CancleBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.inactiveBtnColor};
    color: white;
    margin-top: 0.5rem;
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

    .CancleBtn {
      font-size: 0.9rem;
      
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

  .CancleBtnBox {
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
    /* ???????????? ?????? ?????? ????????? */
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
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [paswordChecked, setPaswordChecked] = useState(false)

  const [allowedPassword, setAllowedPassword] = useState(false)



  const onClose = () => {
    if (!paswordChecked) {
      alert('??????????????? ??????????????????')
    } else {
      setModalOn(false);
      const formdata = new FormData()
      formdata.append('userUpdateInfo',
        new Blob([
          JSON.stringify({
            // ?????? ?????? ???????????? ????????????
            'userEmail': user.userEmail,
            'userNick': user.userNick,
            'password': password,
          })
        ],{type:'application/json'})
      )

      putUpdateUserInfo(formdata)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          text: '?????? ???????????????',
          showConfirmButton: false,
          timer: 1000
        })
        }
      )
    }
  }



  const onCancleUpdate = () => {
    setModalOn(false);
  }

  
  // ???????????? ????????? ??????
  const passwordVaildCheck = (pwd: string) => {
    setAllowedPassword(false)
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if (regPass.test(pwd)) {
      setAllowedPassword(true)
    }
  }

  // ???????????? ??????
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    passwordVaildCheck(e.target.value)
    setPaswordChecked(false)
    if (confirmPassword === e.target.value && allowedPassword) {
      setPaswordChecked(true)
    }
  }

  // ???????????? ?????? ??????
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
          <h1>???????????? ??????</h1>
          <div>
            <label htmlFor="editPassword">
              <span className='LabelTitle'>?????? ??? ????????????</span>
            <InputForm>
              <input 
                type="password" 
                id='password'
                name="editPasswordInput" 
                placeholder="?????? ??? ??????????????? ???????????????"
                value={password}
                onChange={(e) => onPasswordHandler(e)} 
              />
            </InputForm>
              {!password ? <p></p> : allowedPassword ? <p className='PasswordAllowedMsg'>??????????????? ???????????? ?????????</p> : <p className='PasswordNotAllowedMsg'>??????, ??????, ???????????? ?????? 8?????? ?????? ????????? ?????????</p>}
            </label>
          </div>
          <div>
            <label htmlFor="editPasswordConfirm">
            <span className='LabelTitle'>?????? ??? ???????????? ??????</span>
            <InputForm>
              <input 
                type="password"
                id='passwordCheck'
                name="editPasswordConfirmInput" 
                placeholder="?????? ??? ??????????????? ??? ??? ??? ???????????????"
                value={confirmPassword}
                onChange={e => onConfirmPasswordHandler(e)}
              />
            </InputForm>
              {!confirmPassword ? <p></p>: paswordChecked ? <div className="PasswordCheckMessage2">??????????????? ???????????????</div> : <div className="PasswordCheckMessage">??????????????? ???????????? ????????????</div>}
            </label>
          <div className="BtnPosition">
            <div className='ConfirmBtnBox'>
              <button className="ConfirmBtn" onClick={onClose}>??????</button>
            </div>
            <div className='CancleBtnBox'>
              <button className="CancleBtn" onClick={onCancleUpdate}>??????</button>
            </div>
          </div>
          </div>
        </ModalBox>
      </SmallBox>
    </Wrapper>
  );
};

export default PasswordModal;
