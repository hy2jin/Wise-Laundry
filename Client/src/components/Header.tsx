import { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../store/state/user'
import ToggleSwitch from './ToggleSwitch'
import LogoW from './images/logoW.png'
import LogoB from './images/logoB.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SlideMenu from './SlideMenu'


const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeCheck, setThemeCheck] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  if (window.location.pathname === '/') 
  return null;

  return (
    <Wrapper>
      <HeaderNav>
        {/* <Link to='/okaylaundry'>OKAY LAUNDRY</Link> */}
        <Link to='/laundry'>MY LAUNDRY</Link>
        <Link to='/weather'>WHEATHER</Link>
        <Link to='/community'>COMMUNITY</Link>
        <Link to='/home'><img src={themeCheck ? LogoW : LogoB} alt='logo'/></Link>
        <Link to='/near'>NEAR</Link>
        <Link to='/profile'>{user.userNick}님</Link>
        {/* <Link to='/profile'>LOGOUT</Link> */}
        <ToggleTop className='toggle' ><ToggleSwitch themeCheck={themeCheck} setThemeCheck={setThemeCheck} /></ToggleTop>
      </HeaderNav>
      <HamburgerNav>
        <img onClick={() => {setMenuOpen(false);navigate('/home')}} src={themeCheck ? LogoW : LogoB} alt='logo'/>
        {menuOpen ? <>
          <CloseIcon onClick={() => setMenuOpen(false)} />
          <SlideMenu setMenuOpen={setMenuOpen} themeCheck={themeCheck} setThemeCheck={setThemeCheck} /></>
          :
          <MenuIcon onClick={() => setMenuOpen(true)} />
        }
      </HamburgerNav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  top:0;
  z-index: 2;
`
const HeaderNav = styled.nav`
  background-color: ${props => props.theme.navColor}; 
  width: 100%; 
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: space-around;
  border-radius: 0 0 15px 15px;
  a {
    flex: 1;
    text-decoration:none;
    text-align: center;
    font-size: 14px;
    color: ${props => props.theme.fontColor};
  }
  img {
    margin-top: 15px;
    height: 50px;
    cursor: pointer;
  }
  .toggle{
    flex: 1;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`
const HamburgerNav = styled.nav`
  display: none;
  position: relative;
  background-color: ${props => props.theme.navColor};
  svg {
    margin-right: .5rem;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const ToggleTop = styled.div`
  border: none;
  cursor: pointer;
  color: ${props => props.theme.fontColor};
  margin-top: 11px;
`
export default Header