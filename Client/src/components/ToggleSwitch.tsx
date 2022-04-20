import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { DARKMODE, LIGHTMODE, themeState } from '../store/state/theme'

const Wrapper = styled.div`
width: 60px;
.input_wrapper{
  height: 4.2vh;
  cursor: pointer;
}

.input_wrapper input[type="checkbox"]{
  width: 56px;
  height: 28px;
  cursor: pointer;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: #d2f784  ;
  border-radius: 20px;
  position: relative;
  outline: 0;
  -webkit-transition: all .2s;
  transition: all .2s;
  &:hover{
    transform: scale(1.05);
  }
  @media screen and (max-width:700px) {
    width: 48px;
    height: 24px;
  }
}

.input_wrapper input[type="checkbox"]:after{
  position: absolute;
  content: "";
  top: 2px;
  left: 2px;
  width: 25px;
  height: 25px;
  background:linear-gradient(#c1c1c1, #4b4a4a);;
  z-index: 1;
  border-radius: 100%;
  -webkit-transition: all .35s;
  transition: all .35s;
  box-shadow: ${props => props.theme.boxShadowBox};
  @media screen and (max-width:700px) {
    width: 21px;
    height: 21px;
  }
}

.input_wrapper svg{
  position: absolute;
  top: 50%;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  fill: #fff;
  -webkit-transition: all .35s;
  transition: all .35s;
  z-index: 1;
}

/* Checked State */
.input_wrapper input[type="checkbox"]:checked{
  background: #315e7f;
}

.input_wrapper input[type="checkbox"]:checked:after{
  left: calc(100% - 30px);
}

.input_wrapper input[type="checkbox"]:checked + .is_checked{
  -webkit-transform: translateX(0) translateY(-30%) scale(1);
          transform: translateX(0) translateY(-30%) scale(1);
}

.input_wrapper input[type="checkbox"]:checked ~ .is_unchecked{
  -webkit-transform: translateX(-190%) translateY(-30%) scale(0);
          transform: translateX(-190%) translateY(-30%) scale(0);
}

`


const ToggleSwitch:React.FC= () => {
  const [change,setChange] = useState(false)
  const [theme,setTheme] = useRecoilState(themeState)

  useEffect(()=>{
    if (!change){
      setTheme(LIGHTMODE)}
    else{
      setTheme(DARKMODE)
    }
  },[change])
  return (
    <Wrapper>
      <div className="input_wrapper">
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setChange(e.target.checked)
        }} type="checkbox" className="switch_4"/>
      </div>
    </Wrapper>
  )
}

export default ToggleSwitch