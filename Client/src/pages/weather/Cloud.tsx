import React from 'react'
import styled from 'styled-components'
import './cloud.css'

const Wrapper = styled.div`
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
	z-index: 2;
` 


const Cloud = () => {
  return (
    <Wrapper>
      <div className="x1">
          <div className="cloud"/>
      </div>
      <div className="x2">
          <div className="cloud"/>
      </div>
      <div className="x3">
          <div className="cloud"/>
      </div>
      <div className="x4">
          <div className="cloud"/>
      </div>
      <div className="x5">
          <div className="cloud"/>
      </div>
      <div className="x6">
          <div className="cloud"/>
      </div>
  </Wrapper>
  )
}

export default Cloud