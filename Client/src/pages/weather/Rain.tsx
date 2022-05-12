import React, { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  .snowWrapper{
    width: 100%;
    height: 100%;
    z-index: 2;
    margin: auto;
  }
  .snow{
    width: 4px;
    border-radius: 10px 10px 0 0;
    height: 20px;
    opacity: 1;
    background:#e3ebf7;
    border-radius: 50%;
    animation:snow 2s linear infinite;
  @keyframes snow{
    0%{
      opacity: 1;
      transform: translateY(0);
    } 
    40%{
      opacity: 1;
      transform: translate(15px,40vh);
    }
    80%{
      opacity: 1;
      transform: translate(0,80vh);
    }
    100%{
      opacity: 1;
      transform: translateY(100vh);
    }
    }
  }
  
  .snow:nth-of-type(30n){
    animation-duration: 1.1s;
    animation-delay: 1.1s;
  }
  
  .snow:nth-of-type(10n+1){
    animation-duration: 1.1s;
    animation-delay: 1.1s;
  }
  .snow:nth-of-type(10n+3){
    animation-duration: 1.2s;
    animation-delay: 1.2s;
  }
  .snow:nth-of-type(10n+2){
    animation-duration: 1.6s;
    animation-delay: 1.4s;
  }
  .snow:nth-of-type(10n+4){
    animation-duration: 1.5s;
    animation-delay: 1.5s;
  }
  .snow:nth-of-type(10n+5){
    animation-duration: 1.4s;
    animation-delay: 1.2s;
  }
  .snow:nth-of-type(10n+6){
    animation-duration: 1.1s;
    animation-delay: 1.4s;
  }
  .snow:nth-of-type(10n+7){
    animation-duration: 1.3s;
    animation-delay: 1.2s;
  }
  .snow:nth-of-type(10n+8){
    animation-duration: 1.2s;
    animation-delay: 1s;
  }
  .snow:nth-of-type(10n+9){
    animation-duration: 1.3s;
    animation-delay: 0.8s;
  }

`

const Rain = () => {
  const createSnow=()=>{
    return(
    <div className='snow' 
    style={{'marginLeft':randomPosition()+'px' }}
    />)
  }
  const randomPosition = ()=>{
    return Math.floor(Math.random()*window.innerWidth);
  }
  
  const array = [... new Array(300)].map((_,i)=>i)

  
  return (
    <Wrapper>
      <div className='snowWrapper'>
          {
            array.map((idx)=>createSnow())
          }
      </div>
    </Wrapper>
  )
}

export default Rain