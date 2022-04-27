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
        // 세션에 값을 또 하나 추가하고 변경감지가 되면 로그인tsx에서 
        sessionStorage.setItem('newPage', 'true')
        // navigate('/home')
        const token = res.accessToken;
        sessionStorage.setItem("jwt", `${token}`);
        console.log(token, 'jwt 토큰 확인')
        navigate('/')
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