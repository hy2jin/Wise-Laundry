import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { userState } from '../store/state/user'

interface IProps {
  themeCheck: boolean
  setThemeCheck: React.Dispatch<React.SetStateAction<boolean>>
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SlideMenu: React.FC<IProps> = ({ themeCheck, setThemeCheck, setMenuOpen }) => {
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate()
  const handleClick = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }


  return (
    <Nav>
      <Menu onClick={() => handleClick('/profile')}>{user.userNick} 님</Menu>
      <Menu onClick={() => handleClick('/laundry')}>MY LAUNDRY</Menu>
      <Menu onClick={() => handleClick('/weather')}>WHEATHER</Menu>
      <Menu onClick={() => handleClick('/community')}>COMMUNITY</Menu>
      <Menu onClick={() => handleClick('/near')}>NEAR</Menu>
      <Menu onClick={() => {setThemeCheck(!themeCheck);setMenuOpen(false)}}>{themeCheck ? 'LIGHT MODE' : 'DARK MODE'}</Menu>
    </Nav>
  );
};

const Nav = styled.article`
  @keyframes slider {
    0% {
      opacity: 0.2;
      transform: translateX(50vw);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  position: absolute;
  top: 49px;
  animation: slider 1.5s;
  background-color: ${props => props.theme.navColor}; 
  height: 95vh;
  width: 100%;
`
const Menu = styled.div`
  user-select: none;
  cursor: pointer;
  margin: 2rem 0;
  padding: 1rem 0;
  text-align: center;
  &:hover {
    background-color: ${props => props.theme.hoverActiveBtnColor}; 
  }
`

export default SlideMenu;