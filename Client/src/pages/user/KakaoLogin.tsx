import React, { useEffect } from 'react';
import { getKakaoLogin } from '../../store/api/user';
import { useRecoilState } from 'recoil';
import { loginState } from '../../store/state/user';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  // 인가코드
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const navigate = useNavigate()

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code") || null
    const isKakao = sessionStorage.getItem('kakao') || null

    if (isKakao === 'true') {
      console.log(code, '코드 확인')
      sessionStorage.setItem('kakao', 'false')
      // sessionStorage.setItem('newPage', 'true')
      getKakaoLogin(code)
      .then((res) => {
        console.log('로그인 성공')
        sessionStorage.setItem('kakao', 'false')
        // navigate('/home')
        const token = res.accessToken;
        sessionStorage.setItem("jwt", `${token}`);
        console.log(token, 'jwt 토큰 확인')
        // setTimeout(() => {
        //   window.location.href='https://슬기로운세탁.com/'
        // }, 1000); 
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


  return (
    <div>
      <h1>대기중</h1>
    </div>
  );
};

export default KakaoLogin;