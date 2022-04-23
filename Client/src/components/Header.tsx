import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { themeState } from '../store/state/theme'
import ToggleSwitch from './ToggleSwitch'
import MobileBack from './MobileBack'

const Wrapper = styled.div`
  .backIcon{
    cursor: pointer;
  }
`
const HeaderNav = styled.nav`
  background-color: ${props => props.theme.navColor}; 
  width: 100%; 
  height: 8vh;
  line-height: 8vh;
  display: flex;
  justify-content: space-around;
  border-radius: 0 0 15px 15px;
  a {
    text-decoration:none;
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: ${props => props.theme.fontColor};
  }
  img {
    margin-top: 5px;
    height: 6vh;
    cursor: pointer;
  }
 
  @media screen and (max-width: 800px) {
    display: none;
  }
`

const ToggleTop = styled.div`
    flex:0.5;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.fontColor};
    margin-top: 11px;
    @media screen and (max-width: 800px) {
      margin-top: 20px;
    }
`

const FooterNav = styled.nav`
  background-color: ${props => props.theme.navColor}; 
  width: 100%;
  bottom: 0;
  height: 70px;
  z-index: 1;
  border-radius: 15px 15px 0 0;
  display : none;
  position: fixed;
  a {
    flex:1;
    text-decoration:none;
    text-align: center;
    padding-top: 20px;
    font-size: 1.5vh;
    color: ${props => props.theme.fontColor};
    img {
      height: 30px;
    }
  }
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-around;
  }
`
  

const Header = () => {
  const [theme,setTheme] = useRecoilState(themeState)
  const navigate = useNavigate()
  if (window.location.pathname === '/') 
  return null;
  return (
    <Wrapper>
      <div className='backIcon'>
        <MobileBack/>
      </div>
      <HeaderNav>
        <Link to='/laundry'>MY LAUNDRY</Link>
        <Link to='/okaylaundry'>OKAY LAUNDRY</Link>
        <Link to='/near'>NEAR</Link>
        <img src='https://cdn-icons-png.flaticon.com/512/3238/3238630.png' onClick={() => navigate('/home')} alt='logo'/>
        <Link to='/community'>COMMUNITY</Link>
        <Link to='/profile'>PROFILE</Link>
        <ToggleTop ><ToggleSwitch/></ToggleTop>
      </HeaderNav>
      <FooterNav>
          <Link to='/laundry'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/okaylaundry'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/near'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/community'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <Link to='/profile'><img src='https://cdn-icons-png.flaticon.com/512/821/821528.png' alt='그림'/></Link>
          <ToggleTop ><ToggleSwitch/></ToggleTop>
      </FooterNav>
    </Wrapper>
  )
}

export default Header