import React from 'react'
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import styled from 'styled-components'
import Hong from './pages/Hong'
import Moon from './pages/Moon'
import Jin from './pages/Jin'
import Example from './pages/Example'

const Header = styled.div`
  background-color: yellow;
  display: flex;
  width: 400px;
  justify-content: space-around;
`

const App= (props:any) => {
  return (
    <BrowserRouter>
      <Header>
        <Link to='/'>홈</Link>
        <Link to='/main'>메인</Link>
        <Link to='/Example'>Example</Link>
        <Link to='/Hong'>Hong</Link>
        <Link to='/Moon'>Moon</Link>
        <Link to='/Jin'>Jin</Link>
      </Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/Example' element={<Example/>}/>
        <Route path='/Hong' element={<Hong />}/>
        <Route path='/Moon' element={<Moon />}/>
        <Route path='/Jin' element={<Jin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App