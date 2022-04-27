import React, { useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { themeState } from '../store/state/theme'
import ToggleSwitch from './ToggleSwitch'
import MobileBack from './MobileBack'
import IronIcon from '@mui/icons-material/Iron';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ForumIcon from '@mui/icons-material/Forum';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const Wrapper = styled.div`
  .backIcon{
    cursor: pointer;
    /* width: 100px; */
    background-color: yellow;
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
  const [themeCheck,setThemeCheck] = useState(false)

  const navigate = useNavigate()
  if (window.location.pathname === '/') 
  return null;
 
  return (
    <Wrapper>
      <span className='backIcon'>
        <MobileBack/>
      </span>
      <HeaderNav>
        <Link to='/laundry'>MY LAUNDRY</Link>
        <Link to='/okaylaundry'>OKAY LAUNDRY</Link>
        <Link to='/near'>NEAR</Link>
        <img src='https://cdn-icons-png.flaticon.com/512/3238/3238630.png' onClick={() => navigate('/home')} alt='logo'/>
        <Link to='/community'>COMMUNITY</Link>
        <Link to='/profile'>PROFILE</Link>
        <ToggleTop ><ToggleSwitch themeCheck={themeCheck} setThemeCheck={setThemeCheck} /></ToggleTop>
      </HeaderNav>
      <FooterNav>
        <Link to='/laundry'><IronIcon/></Link>
        <Link to='/okaylaundry'><LinkedCameraIcon/></Link>
        <Link to='/near'><LocalLaundryServiceIcon/></Link>
        <Link to='/community'><ForumIcon/></Link>
        <Link to='/profile'><AssignmentIndIcon/></Link>
        <ToggleTop ><ToggleSwitch themeCheck={themeCheck} setThemeCheck={setThemeCheck}/></ToggleTop>
      </FooterNav>
    </Wrapper>
  )
}

export default Header