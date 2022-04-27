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
      getKakaoLogin(code)
      .then((res) => {
        console.log('로그인 성공')
        // navigate('/home')
        const token = res.accessToken;
        sessionStorage.setItem("jwt", `${token}`);
        console.log(token, 'jwt 토큰 확인')
        navigate('/')
      })
  
      .catch((err) => {
        console.log(err)
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