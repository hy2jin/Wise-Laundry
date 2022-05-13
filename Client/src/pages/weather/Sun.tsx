import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  z-index: 0;
  top: -70px;
  left: -70px;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  .sun{
    width: 200px;
    height: 200px;
    background-color: #ffde00;
    border-radius: 50%;
    box-shadow: 0 0 0 20px #FFDE0080,
    0 0 0 40px #FFDE0040,
    0 0 0 60px #FFDE0020,
    0 0 0 80px #FFDE0010,
    0 0 0 100px #FFDE0000,
    0 0 40px 100px #FFDE0010;
    animation: sunrise 2s infinite linear forwards,rays 2s 2s infinite linear;
    }
  
  @keyframes sunrise {
    0%{
      box-shadow: none;
    }
  }
  @keyframes rays {
    0%{
      box-shadow: 
      0 0 0 0 #FFDE0080,
        0 0 0 20px #FFDE0080,
        0 0 0 40px #FFDE0040,
        0 0 0 60px #FFDE0020,
        0 0 0 80px #FFDE0010,
        0 0 40px 100px #FFDE0010;
    }
    100%{
      box-shadow: 0 0 0 20px #FFDE0080,
        0 0 0 40px #FFDE0040,
        0 0 0 60px #FFDE0020,
        0 0 0 80px #FFDE0010,
        0 0 0 100px #FFDE0000,
        0 0 40px 100px #FFDE0010;
    }
  }
`


const Sun = () => {
  return (
    <Wrapper>
      <div className='sun'/>
    </Wrapper>
  )
}

export default Sun