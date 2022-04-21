import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled,{ThemeProvider} from 'styled-components'
import { useRecoilState } from 'recoil'
import { themeState } from './store/state/theme'
import Header from './components/Header'
import Home from './pages/Home'
import Near from './pages/Near'
import OkayLaundry from './pages/laundryBoard/OkayLaundry'
import CommunityAll from './pages/communityBoard/CommunityAll'
import CommunityDetail from './pages/communityBoard/CommunityDetail'
import CommunityCreate from './pages/communityBoard/CommunityCreate'
import LaundryAll from './pages/laundryBoard/LaundryAll'
import LaundryDetail from './pages/laundryBoard/LaundryDetail'
import Signup from './pages/user/Signup'
import Profile from './pages/user/Profile'
import Login from './pages/user/Login'
import RegisterLaundry from './pages/laundryBoard/RegisterLaundry'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  /* height: 100vh; */
  background-color: ${props => props.theme.bgColor}; 
  color :  ${props => props.theme.fontColor}; 
  @font-face {
    font-family: 'twayair';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  } 
  *{  
    font-family: 'twayair';
    }
  h1{
    margin-top: 0;
    padding-top:10px;
  }
`

const App= (props:any) => {
  const [theme, setTheme] = useRecoilState(themeState)
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Wrapper>
          <Header/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/near' element={<Near />}/>
              <Route path='/okaylaundry' element={<OkayLaundry />}/>
              <Route path='/community' element={<CommunityAll />}/>
              <Route path='/community/:boardId' element={<CommunityDetail />}/>
              <Route path='/board' element={<CommunityCreate />}/>
              <Route path='/board/:boardId' element={<CommunityCreate />}/>
              <Route path='/laundry' element={<LaundryAll />}/>
              <Route path='/laundry/:laundryId' element={<LaundryDetail />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/laundry/register' element={<RegisterLaundry />}/>
            </Routes>
          </Wrapper>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App