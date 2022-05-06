import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo2.png';
import PasswordModal from './PasswordModal';
import UserImgBox from './UserImgBox';
import { getNicknamecheck, getUserInfo, putUpdateUserInfo } from '../../store/api/user';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';
import { AltRouteTwoTone } from '@mui/icons-material';
import defaultImg from './images/profile-image.png'
import Swal from 'sweetalert2'



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
  margin-bottom: 5vh;
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
  }

  .SaveBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: ${props => props.theme.activeBtnColor};
    color: white;
  }

  .logoutBtn {
    border: none;
    width : 100%;
    height: 5.5vh;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #f17388;
    color: white;
  }

  @media screen and (max-width: 800px) {
    position: relative;
    /* bottom: 13vh; */

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

    .logoutBtn {
      margin-top: 0.5rem;
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

  .BtnPosition2 {
    margin-top: 0.8rem;
    display: flex;
  }

  .SaveBtnBox {
    width: 100%;
  }
  
  .EditPasswordBox {
    width: 100%;
  }

  .logoutBox {
    width: 100%;
    margin-left: 0.8vw;
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

    .BtnPosition2 {
      display: flex;
      flex-flow: column;
      margin-top: 0;
    }

    .logoutBox {
      
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
    max-width: 800px;
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
  const [user, setUser] = useRecoilState(userState)
  // const [user, setUser] = useState<Istate['user']>({})

  const navigate = useNavigate();

  const [nickname, setNickname] = useState('')
  const [usingNickname, setUsingNickname] = useState('')
  const [nickChecked, setNickChecked] = useState(true)

  const [profileImg, setProfileImg] = useState('')

  const [modalOn, setModalOn] = useState(false);

  const [file, setFile] = useState<any>();

  const [editCheck, setEditCheck] = useState(false)

  // const [kakaoProfileImg, setKakaoProfileImg] = useState('')

  const passwordChangeModal = () => {
    setModalOn(true);
    console.log(modalOn,' 모달 열기')
  }


  // 회원 정보 변경
  const updateUser = () => {
    if (!nickChecked) {
      alert('변경할 닉네임을 입력해주세요')
    } else {
      console.log('정보 변경 실행')
      const formdata = new FormData()
      formdata.append('userUpdateInfo',
        new Blob([
          JSON.stringify({
            'userEmail': user.userEmail,
            'userNick': nickname,
            'password': '',
          })
        ],{type:'application/json'})
      )
      if(file!==undefined){
        formdata.append('file', file)
      }

      putUpdateUserInfo(formdata)
      .then(() => {
        console.log('닉네임 수정 성공')

        Swal.fire({
          icon: 'success',
          text: '변경 되었습니다',
          showConfirmButton: false,
          timer: 1000
        })
        // setEditCheck(true)
        getUserInfo()
          .then((res) => {
            console.log(res, '프로필 유저정보')
            const userInfo = {...res};
            delete userInfo.message
            delete userInfo.statusCode
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            setUser(userInfo)
            // navigate('/home')
          })
          .catch((err) => {
            console.log(err)
          })
        // navigate('/login')
        }
      )
      .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    const Uuser =JSON.parse(sessionStorage.getItem('userInfo')|| "" )
    setUser(Uuser)
    setNickname(Uuser.userNick)
    let profileImg2 = Uuser.userImg ? `/images/${Uuser.userImg}` : Uuser.kakaoImg
    profileImg2 = profileImg2 || defaultImg
    setProfileImg(profileImg2)
  },[])

  const onHandelNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setNickChecked(false)
    if (usingNickname === e.target.value) {
      setNickChecked(true)
    }
  }

  // 닉네임 중복 확인
  const nicknameDuplicationCheck = () => {
    if (nickname.length > 6 || nickname.length < 2) {
      alert('2글자 이상 6글자 이하로 입력해주세요')
    } else {
      getNicknamecheck(nickname)
      .then((res) => {
        const nickCheckMessage = res.message
        if (nickname) {
          if (nickCheckMessage === 'Unavailable') {
            setNickChecked(false)
            alert('사용중인 닉네임 입니다.')
          } else {
            setNickChecked(true)
            setUsingNickname(nickname)
            alert('사용가능한 닉네임 입니다.')
          }
        } else {
          alert('닉네임을 입력해주세요')
          setNickChecked(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setNickChecked(false)
      })
    }
  }

  const onLogout = () => {
    // console.log('로그아웃!!')
    sessionStorage.clear()
    Swal.fire({
      icon: 'success',
      text: '로그아웃 되었습니다',
      showConfirmButton: false,
      // confirmButtonColor: 'red',
      timer: 1000
    })
    navigate('/home')
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
            <UserImgBox userImg={profileImg} file={file} setFile={setFile} />
          </ImgBox>
          <div className='NickBox'>
            <label htmlFor='nickName'>
            <span className='LabelTitle'>닉네임</span>
              <InputForm>
                <input type='text' id='nickName'
                  placeholder='닉네임을 입력하세요'
                  value={nickname}
                  onChange={(e) => onHandelNick(e)}
                />
                <button className='ConfirmBtn' onClick={() => nicknameDuplicationCheck()}>확인</button>
              </InputForm>
            </label>
          </div>

          <div className='BtnPosition'>
            <div className='SaveBtnBox'>
              <button className="SaveBtn" onClick={updateUser}>확인</button>
            </div>
          </div>
          <div className='BtnPosition2'>
            <div className='EditPasswordBox'>
              <button className="EditPasswordBtn" onClick={passwordChangeModal}>비밀번호 수정</button>
            </div>
            <div className='logoutBox'>
              <button className="logoutBtn" onClick={onLogout}>로그아웃</button>
            </div>
          </div>
        </EditForm>
      </SmallBox>
      {modalOn && <PasswordModal setModalOn={setModalOn} />}
    </Wrapper>
  );
};

export default Profile;