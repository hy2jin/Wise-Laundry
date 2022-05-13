import React from 'react'
import styled from 'styled-components'
import './cloud2.css'

const Wrapper = styled.div`
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 150%;
  height: 100%;
	z-index: 2;
` 


const Cloud2 = () => {
  return (
    <Wrapper>
      <div className="x11">
          <div className="cloud"/>
      </div>
      <div className="x21">
          <div className="cloud"/>
      </div>
      <div className="x31">
          <div className="cloud"/>
      </div>
      <div className="x41">
          <div className="cloud"/>
      </div>
      <div className="x51">
          <div className="cloud"/>
      </div>
  </Wrapper>
  )
}

export default Cloud2