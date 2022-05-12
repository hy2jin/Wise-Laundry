import { ResponsiveRadar } from '@nivo/radar'
import React, { useEffect } from 'react'
import styled from 'styled-components'



const Wrapper =  styled.article`
  width: 90vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
  justify-content: center;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
`
const Graph = styled.div`
  cursor: pointer;
  position: relative;
  margin: 20px;
  flex: 1;
  height: 300px;
  width: 300px;
  background-color: ${props => props.theme.weatherBox};
  border: 1px solid #d4d1d1;
  margin-bottom: 5vh;
  .score{
    font-size: 1.2rem;
    position: absolute;
    left: 50%;
    top:52%;
    transform: translate(-50%, 0);
    z-index: 1;
    color:#474646;
  }
  .date{
    font-size: 1.0rem;
    position: absolute;
    left: 50%;
    bottom: 2%;
    transform: translate(-50%, 0);
    z-index: 1;
    color:#474646;
  }
`
const ScoreBox = styled.div`
    width: 5.5rem;
    background-color: aliceblue;
    border-bottom: 1px solid #d4d1d1;
    border-left: 1px solid #d4d1d1;
    font-size: 0.8rem;
    color:#474646;
    position: absolute;
    right: 0;
    top:0;
    z-index: 1;
    div{
      padding: 0.5px;
    }
`
interface IProps {
  fourDatas:{
    time: number;
    chanceOfRain: number;
    humidity: number;
    laundry: number;
    temperature: number;
    weather: string;
    wind: number;
}[]
  graphData:{
    category: string;
    date: number;
    date2: number;
  }[][]
  date:string[]
  setDataPick:React.Dispatch<React.SetStateAction<number>>
}
const Graphs:React.FC<IProps> = ({fourDatas,graphData,date,setDataPick}) => {
  const colors =['red','blue','purple','orange']
  const changeDate = (date:any)=>{
    var tmp = date.slice(8)
    var numtmp = Number(tmp)
    if (1200<=numtmp&&numtmp<2200){
      tmp = String(numtmp-1200)
      return (`오후 ${tmp.slice(0,1)}시`)
    }
    if (2200<=numtmp && numtmp<=2400){
      tmp = String(numtmp-1200)
      return (`오후 ${tmp.slice(0,2)}시`)
    }
    else{
      if(tmp[0]==='0')
        return (`오전 ${tmp.slice(1,2)}시`)
      else
        return (`오전 ${tmp.slice(0,2)}시`)
    }
  }
  const changeWeather = (weather:string)=>{
    switch(weather){
      case 'sunny':
        return '맑음'
        break
      case 'cloudy':
        return '흐림'
        break
      case 'partly_cloudy':
        return '조금흐림'
         break
      case 'rain':
        return '비'
        break
      default:
        return ''
    }
  }
  return (
    <Wrapper>     
        {[0,1,2,3].map((ele)=>
          {return(
            <Graph onClick={()=>{setDataPick(ele)}} key={ele}>
              <div className='score'>{fourDatas[ele].laundry}점</div>
              <div className='date'>{changeDate(date[ele])}</div>
              <ScoreBox>
                <div>날씨 :{changeWeather(fourDatas[ele].weather)} </div>
                <div>온도 :{fourDatas[ele].temperature}°C </div>
                <div>비올확률 :{fourDatas[ele].chanceOfRain}%</div>
                <div>습도 :{fourDatas[ele].humidity}% </div>
                <div>바람 :{fourDatas[ele].wind.toFixed(1)} </div>
              </ScoreBox>
            <ResponsiveRadar
              data={graphData[ele]}
              keys={[date[ele]]}
              indexBy="category"
              valueFormat=">-.2f"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={colors[ele]}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={colors[ele]}
              dotBorderWidth={2}
              colors={colors[ele]}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[ 
                {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#2a2929',
                symbolSize: 12,
                symbolShape: 'triangle',
                effects: [{on: 'hover',style: {itemTextColor: '#0f2040'}}]}]}
              />
            </Graph>
          )})}
    </Wrapper>
  )
}

export default Graphs