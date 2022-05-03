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
        console.log('로그인 성공')
        sessionStorage.setItem('kakao', 'false')
        const token = res.accessToken;
        sessionStorage.setItem("token", `${token}`);
        // console.log(token, 'jwt 토큰 확인')
        navigate('/home')
      })
  
      .catch((err) => {
        console.log(err)
        sessionStorage.setItem('kakao', 'false')
      })
      setIsLogin(true)
    } else {
      sessionStorage.setItem('kakao', 'true')
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      console.log(isLogin, '여기 확인')
      // sessionStorage
      // console.log(, '토큰 확인')
      getUserInfo()
        .then((res) => {
          console.log(res, '😱카카오 유저정보')
          setUser(res.user)
          navigate('/home')
        })
    }
  },[isLogin])

  // 로그인 후 로그인 페이지로 뒤로가기 방지
  useEffect(() => {
    if (isLogin) {
      navigate('/home')
    }
  },[isLogin])
  

  return (
    <div>
      <h1>대기중</h1>
    </div>
  );
};

export default KakaoLogin;
