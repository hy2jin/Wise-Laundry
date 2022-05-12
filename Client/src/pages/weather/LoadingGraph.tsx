import { ResponsiveRadar } from '@nivo/radar'
import React from 'react'
import styled from 'styled-components'
import dummydatas from './data'

interface Iprops{
  count:number
}
const Wrapper = styled.article`
  position: fixed;
  text-align: center;
   margin: 0 auto;
   left: 0;
   right: 0;
   top:25vh;
  height: 500px;
  width: 500px;
  margin: auto;
  @media screen and (max-width: 800px) {
    top:10vh;
    height: 80vw;
    width: 80vw;
  }
`
const Progress = styled.div`
  width: 500px;
  margin: auto;
  @media screen and (max-width: 800px) {
    width: 60vw;
  }
  .progress{
    position: relative;
    height: 10px;
    width: 500px;
    border: 6px solid #9cf9fe;
    border-radius: 15px;
    @media screen and (max-width: 800px) {
    width: 60vw;
    }
  }
  .color{
    position: absolute;
    background: linear-gradient(to right, #b1d5fa, #3594f3);
    width: 0px;
    height: 10px;
    border-radius: 15px;
    animation: progres 4s linear;    
  }
  @keyframes progres{
      0%{
        width: 0%;
      }
      25%{
          width: 50%;
      }
      50%{
          width: 75%;
      }
      75%{
          width: 85%;
      }
      100%{
          width: 100%;
      }
  };
`

const LoadingGraph:React.FC<Iprops> = ({count}) => {

  return (
    <Wrapper>
      <h1>빨래지수를 계산중입니다</h1>
      <h1>기다리세요!</h1>
      <ResponsiveRadar
          data={dummydatas[count]}
          keys={['date','date2']}
          indexBy="category"
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: 'color' }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          colors={{ scheme: 'nivo' }}
          blendMode="multiply"
          motionConfig="wobbly"
          />
      
      <Progress >
        <div className="progress">
          <div className="color"/>
        </div>
      </Progress>  

    </Wrapper>
  )
}

export default LoadingGraph