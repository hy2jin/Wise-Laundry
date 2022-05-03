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
        // window.location.replace("/home")
        // console.log(token, 'jwt 토큰 확인')
        navigate('/home')
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
      // location.reload();
    }
  }, []);

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
