import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { DARKMODE, LIGHTMODE,themeState } from '../store/state/theme'
// import logo from './images/logo.png'
import ToggleSwitch from './ToggleSwitch'

const Wrapper = styled.div`
  
`
const HeaderNav = styled.div`
  /* background-color: #E9F2FF; */
  background-color: ${props => props.theme.navColor}; 
  /* 이런식으로 사용가능 */
  width: 100%; 
  height: 60px;
  display: flex;
  justify-content: space-around;
  border-radius: 0 0 15px 15px;
  a{
    text-decoration:none;
    flex: 1;
    text-align: center;
    padding-top: 20px;
    font-size: 1.8vw;
    color: ${props => props.theme.fontColor};
  }
  img{
    height: 50px;
  }
  @media screen and (max-width:500px) {
    display: none;
  }
`
const ToggleTop = styled.div`
    border: none;
    cursor: pointer;
    width: 100px;
    color: ${props => props.theme.fontColor};
    padding-top: 20px;
    position: fixed;
    top: 100px;
    right: 0;
    z-index: 1;
`

const ToggleBot = styled.div`
    border: none;
    cursor: pointer;
    width: 100px;
    color: ${props => props.theme.fontColor};
    padding-top: 20px;
    position: fixed;
    bottom: 100px;
    right: 0;
`
const FooterNav = styled.div`
  background-color: ${props => props.theme.navColor}; 
  width: 100%;
  bottom: 0;
  height: 70px;
  z-index: 1;
  border-radius: 15px 15px 0 0;
  display : none;
  position: fixed;
  a{
    text-decoration:none;
    text-align: center;
    padding-top: 20px;
    font-size: 1.5vh;
    color: ${props => props.theme.fontColor};
    img{
      height: 30px;
    }
  }
  @media screen and (max-width:500px) {
    display: inline;
    display: flex;
  justify-content: space-around;
  }
`
  

const Header = () => {
  const [theme,setTheme] = useRecoilState(themeState)
  return (
    <Wrapper>
      <HeaderNav>
        <Link to='/'>MY LAUNDRY</Link>
        <Link to='/main'>OKAY LAUNDRY</Link>
        <Link to='/Example'>NEAR</Link>
        <img src='https://cdn-icons-png.flaticon.com/512/3238/3238630.png' alt='logo'/>
        <Link to='/Hong'>COMMUNITY</Link>
        <Link to='/Moon'>PROFILE</Link>
        <Link to='/Jin'>LOGOUT</Link>
        <ToggleTop ><ToggleSwitch/></ToggleTop>
      </HeaderNav>
      <FooterNav>
          <Link to='/'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/main'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/Example'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/Hong'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/Moon'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/Jin'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <ToggleBot onClick={()=>{setTheme(LIGHTMODE)}}><ToggleSwitch/></ToggleBot>
      </FooterNav>
    </Wrapper>
  )
}

export default Header