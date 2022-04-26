import React, { useEffect } from 'react';
import { getKakaoLogin } from '../../store/api/user';


const KakaoLogin = () => {
  // 인가코드
  
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code") || null
    console.log(code, '코드 확인')
    if (code !== null) {
      getKakaoLogin(code)
    }
  }, []);

  return (
    <div>
      <h1>대기중</h1>
    </div>
  );
};

export default KakaoLogin;