import React, { useState } from 'react'
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import styled,{ThemeProvider} from 'styled-components'
import Hong from './pages/Hong'
import Moon from './pages/Moon'
import Jin from './pages/Jin'
import Example from './pages/Example'
import { useRecoilState } from 'recoil'
import Header from './components/Header'
import { themeState } from './store/state/theme'

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
  const [theme,setTheme] = useRecoilState(themeState)
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Wrapper>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/main' element={<Main/>}/>
              <Route path='/Example' element={<Example/>}/>
              <Route path='/Hong' element={<Hong />}/>
              <Route path='/Moon' element={<Moon />}/>
              <Route path='/Jin' element={<Jin />}/>
            </Routes>
          </Wrapper>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App