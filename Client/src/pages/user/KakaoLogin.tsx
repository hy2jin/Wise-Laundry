import React, { useEffect } from 'react';
import { getKakaoLogin, getUserInfo } from '../../store/api/user';
import { useRecoilState } from 'recoil';
import { loginState, userState } from '../../store/state/user';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  // 인가코드
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code") || null
    const isKakao = sessionStorage.getItem('kakao') || null

    if (isKakao === 'true') {
      // console.log(code, '코드 확인')
      sessionStorage.setItem('kakao', 'false')
      
      // sessionStorage.setItem('newPage', 'true')
      getKakaoLogin(code)
        .then((res) => {
          console.log('카카오 로그인 성공')
          
          sessionStorage.setItem('kakao', 'false')
          const token = res.accessToken;
          sessionStorage.setItem("token", `${token}`);
          console.log(token, '🎆토큰 1')
        
        
          getUserInfo()
            .then((res) => {
              console.log(res, '💐카카오 유저정보💐')
              const userInfo = {...res};
              delete userInfo.message
              delete userInfo.statusCode
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              setUser(userInfo)
              navigate('/home')
            })
            .catch((err) => {
              console.log(err)
              console.log('정보 가져오기 에러')
            })
        })
  
        .catch((err) => {
          console.log(err)
          sessionStorage.setItem('kakao', 'false')
          console.log('카카오 로그인 실패')
          
          // window.location.replace("/login")
        })
        setIsLogin(true)
      // navigate('/home')
    } else {
      sessionStorage.setItem('kakao', 'true')
      console.log('카카오')
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      console.log(isLogin, '카카오로그인에서 확인')

      getUserInfo()
        .then((res) => {
          console.log(res, '🍫유저정보 카카오 222🍫')
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
  

  return (
    <div>
      <h1>대기중</h1>
    </div>
  );
};

export default KakaoLogin;
