/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import styled,{ThemeProvider} from 'styled-components'
import { useRecoilState } from 'recoil'
import { themeState } from './store/state/theme'
import { loginState,userState } from './store/state/user'
import Header from './components/Header'
import Home from './pages/main/Home'
import Near from './pages/Near/Near'
import OkayLaundry from './pages/oklaundry/OkayLaundry'
import CommunityAll from './pages/communityBoard/CommunityAll'
import CommunityDetail from './pages/communityBoard/CommunityDetail'
import CommunityCreate from './pages/communityBoard/CommunityCreate'
import LaundryAll from './pages/laundryBoard/LaundryAll'
import LaundryDetail from './pages/laundryBoard/LaundryDetail'
import Signup from './pages/user/Signup'
import Profile from './pages/user/Profile'
import Login from './pages/user/Login'
import LaundryCreate from './pages/laundryBoard/LaundryCreate'
import Start from './pages/main/Start'
import KakaoLogin from './pages/user/KakaoLogin'
import NotFound from './pages/notfound/NotFound'
import CommunityUpdate from './pages/communityBoard/CommunityUpdate'
import LaundryUpdate from './pages/laundryBoard/LaundryUpdate'
import Weather from './pages/oklaundry/Weather'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor}; 
  color :  ${props => props.theme.fontColor}; 
  @font-face {
    font-family: 'twayair';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  } 
  @font-face {
    font-family: 'Times New Roman', sans-serif;
    src: url('http://fonts.cdnfonts.com/css/times-new-roman') format('woff');
    font-weight: normal;
    font-style: normal;
  } 
  * {  
    font-family: 'twayair';
  }
  h1 {
    margin-top: 0;
    padding-top:10px;
  }
  input[type=password] {
    font-family: 'Malgun gothic', 'dotum', 'sans-serif';
    &::placeholder {
      font-family: 'twayair';
    }
  }
  button {
    cursor: pointer;
  }

  * {
      &::-webkit-scrollbar {
      height: .4rem;
      width: .4rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3.5px;
      background-color: ${props => props.theme.scrollThumbColor};
      &:hover {
        background-color: ${props => props.theme.scrollThumbHoverColor};
      }
    }
    &::-webkit-scrollbar-track {
      background-color: ${props => props.theme.bgColor};
    }
  }

`
declare global {
  interface Window {
    kakao: any;
  }
}

const App= (props: any) => {
  const [theme, setTheme] = useRecoilState(themeState)
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    const newuser = sessionStorage.getItem('userInfo')||""
    if (!!newuser) {
      setUser(JSON.parse(newuser))
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  },[])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Wrapper>
          {isLogin && <Header />}
          <Routes>
            <Route path='/' element={<Start />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/near' element={<Near />}/>
            <Route path='/okaylaundry' element={<OkayLaundry />}/>
            <Route path='/community' element={<CommunityAll />}/>
            <Route path='/community/:boardId' element={<CommunityDetail />}/>
            <Route path='/board' element={<CommunityCreate />}/>
            <Route path='/board/:boardId' element={<CommunityUpdate />}/>
            <Route path='/laundry' element={<LaundryAll />}/>
            <Route path='/laundry/:laundryId' element={<LaundryDetail />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="/oauth" element={<KakaoLogin />}/>
            <Route path='/*' element={<NotFound />} />
            <Route path='/laundry/:laundryId/update' element={<LaundryUpdate />}/>
            <Route path='/laundry/create' element={<LaundryCreate />}/>
            <Route path='/weather' element={<Weather />}/>
          </Routes>
        </Wrapper>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App