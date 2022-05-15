import React, { useEffect } from 'react';
import { getKakaoLogin, getUserInfo } from '../../store/api/user';
import { useRecoilState } from 'recoil';
import { loginState, userState } from '../../store/state/user';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const KakaoLogin = () => {
  // 인가코드
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [user, setUser] = useRecoilState(userState)

  const navigate = useNavigate()

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code") || null
    const isKakao = sessionStorage.getItem('kakao') || null

    if (isKakao === 'true') {
      sessionStorage.setItem('kakao', 'false')
      
      getKakaoLogin(code)
        .then((res) => {          
          sessionStorage.setItem('kakao', 'false')
          const token = res.accessToken;
          sessionStorage.setItem("token", `${token}`);

          Swal.fire({
            icon: 'success',
            text: '로그인 되었습니다',
            showConfirmButton: false,
            timer: 1000
          })
        
        
          getUserInfo()
            .then((res) => {
              const userInfo = {...res};
              delete userInfo.message
              delete userInfo.statusCode
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              setUser(userInfo)
              navigate('/home')
              window.location.reload();
            })
        })
  
        .catch((err) => {
          sessionStorage.setItem('kakao', 'false')
        })
        setIsLogin(true)
    } else {
      sessionStorage.setItem('kakao', 'true')      
      window.location.reload();
    }
  }, []);
  

  return (
    <div>
      <h1>카카오 로그인 진행중</h1>
    </div>
  );
};

export default KakaoLogin;
