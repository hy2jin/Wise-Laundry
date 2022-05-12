import { Slider  } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PopUpLaundry from './PopUpLaundry';
import sun2 from './images/해2.png'
import water from './images/습도.png'
import rain from './images/우산2.png'
import washer from './images/세탁기2.png'
import wind from './images/바람.png'
import rainy from './images/비구름2.png'
import cloud from './images/구름.png'
import smallcloud from './images/구름조금.png'
import Rain from './Rain';
import Cloud from './Cloud';
import PartlyCloud from './PartlyCloud';

const Wrapper = styled.div `
  position: relative;
  display: flex;
  width: 80vw;
  height: 70vh;
  background-color: ${props => props.theme.activeBtnColor};
  background: ${props => props.theme.weatherColor};
  /* background:linear-gradient(170deg,#aad9ff,#8bc6f7,#36a4ff,#75c0fe);//홍 */
  background-size: 400% 400%;
  animation : backgoundChange 5s ease-in infinite;
  box-shadow: ${props=>props.theme.boxShadowBox};
  border-radius: 15px;
  margin: auto;
  margin-top: 5vh;
  @media screen and (max-width: 800px) {
    height: 60vh;
    flex-flow: nowrap column;
  }
  @keyframes backgoundChange {
    0%{
      background-position: 0 50%;
    }
    50%{
      background-position: 100% 50%;
    }
    100%{
      background-position: 0 50%;
    }
  }
  overflow-y: hidden;
  overflow-x: hidden; 
`

const LeftPart = styled.div`
  display: flex;
  width: 28vw;
  flex-flow: nowrap column;
  .temperature{
    font-size: 3rem;

  }
  .weatherTime {
    font-size: 2.5rem;
    padding-top: 10vh;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    flex-flow: wrap column;
    .weatherTime {
      font-size: 1.3rem;
      padding-top: 4vh;
      padding-left: 3vw;
      text-align: left;
    }
  }
`

const LeftImgPart = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: nowrap column;
  height: 70vh;
  justify-content: space-evenly;

  .weatherImg {
    height: 25vh;
    aspect-ratio: 1/1;
    margin-bottom: 7vh;
    animation: motion 0.6s linear 0s infinite alternate; 

  }

  .temperature {
    font-size: 2rem;
    text-align: center;
    padding-bottom: 3vh;
  }
  @keyframes motion {
    0% {}
    100% {
      transform: translateY(-20px);
    }
  }
  @media screen and (max-width: 800px) {
    flex-flow: nowrap row;
    height: 10vh;
    width: 80vw;
    margin-top: 1.5vh;
    .weatherImg {
      height: 11vh;
      margin-bottom: 0;
      margin-top: 0;
    }
    .temperature {
      font-size: 2rem;
      padding-bottom: 0;
    }
  }
`

const RightPart = styled.div `
  display: flex;
  flex-flow: nowrap column;
  width: 70%;
  justify-content: center;
  align-content: center;
  margin: 3vh 0 ;
  @media screen and (max-width: 800px) {
    width: 80vw;
    height: 45vh;
    margin: 0 4vw;
  }
  article{
    display: flex;
    align-items: center;
    padding: 7px 0;
    margin: 0 3vw;
    justify-content: space-around;
  }
  
  .Img {
    height: 11vh;
    aspect-ratio: 1/1;
    @media screen and (max-width: 800px) {
        height: 7vh;
        aspect-ratio: 1/1;
    }
  }
  
`
const ScorePart = styled.article`
  progress {
    width : 70%;
    appearance: none; 
    &::-webkit-progress-bar 
    { 
      background:#f0f0f0; 
      border-radius:10px; 
      box-shadow: inset 3px 3px 10px #ccc; 
    } 
    &#progress1{
      width: 60%;
    }
  }
  
  #progress1::-webkit-progress-value 
  { 
    border-radius:10px; 
    background: #1D976C; 
    background: -webkit-linear-gradient(to right, #93F9B9, #1D976C); 
    background: linear-gradient(to right, #93F9B9, #1D976C); 
  }
 
  #progress2::-webkit-progress-value 
  { 
    border-radius:10px; 
    background: #ffcb62; 
    background: -webkit-linear-gradient(to right, #e1be77, #ffcb62); 
    background: linear-gradient(to right, #e1be77, #ffcb62); 
  }
  
  #progress3::-webkit-progress-value 
  { 
    border-radius:10px; 
    background: #ff5959; 
    background: -webkit-linear-gradient(to right, #ff9b9b, #ff5959); 
    background: linear-gradient(to right, #ff9b9b, #ff5959); 
  }
  
  #progress4::-webkit-progress-value 
  { 
    border-radius:10px; 
    background: #e056ff; 
    background: -webkit-linear-gradient(to right, #eea4ff, #e056ff); 
    background: linear-gradient(to right, #eea4ff, #e056ff); 
  }
`


interface IProps{
  data :{
    time: number;
    chanceOfRain: number;
    humidity: number;
    laundry: number;
    temperature: number;
    weather: string;
    wind: number;
  }
}

const WeatherBox:React.FC<IProps>= ({data}) => {
  const [showPopUp, setShowPopUp] = useState(false)
  //sunny,cloudy,partly_cloudy,rain

  useEffect(() => {
    const popUpNotShow = sessionStorage.getItem('expirePopUp') || ''; // ISO
    const popUpNotShowUNIX = Date.parse(popUpNotShow); // UNIX
    const whenWillBeExpired = popUpNotShowUNIX +  24 * 60 * 60 * 1000; // 24시간(하루)

    const currentUNIX = Math.floor(new Date().getTime());

    if (Number.isNaN(popUpNotShowUNIX)) {
      setShowPopUp(true);
    }

    // 제한 시간을 지났으므로 팝업을 띄울 것
    if (whenWillBeExpired < currentUNIX) {
      setShowPopUp(true);
    }
  }, []);

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
      <Wrapper >
        {data.weather==='cloudy' &&<Cloud/>}
        {data.weather==='partly_cloudy' &&<PartlyCloud/>}
        {data.weather==='rain' &&<Rain/>}
          <LeftPart>
            <div className='weatherTime'>{changeDate(String(data.time))} </div>
            <LeftImgPart>
              {data.weather==='sunny' &&<img className='weatherImg' src={sun2} alt="" />}
              {data.weather==='cloudy' &&<img className='weatherImg' src={cloud} alt="" />}
              {data.weather==='partly_cloudy' &&<img className='weatherImg' src={smallcloud} alt="" />}
              {data.weather==='rain' &&<img className='weatherImg' src={rainy} alt="" />}
              <div className='temperature'>{data.temperature}℃</div>
            </LeftImgPart>
          </LeftPart>
          <RightPart>
            <ScorePart>
              <img className='Img' src={washer} alt="" />
              <progress id="progress1" value={data.laundry} max="100"/>
              :{data.laundry}점
            </ScorePart>
            <ScorePart>
              <progress id="progress2" value={data.wind} max="15"/>
              <img className='Img' src={wind} alt="" />
            </ScorePart>
            <ScorePart>
              <progress id="progress3" value={data.humidity} max="100"/>
              <img className='Img' src={rain} alt="" />
            </ScorePart>
            <ScorePart>
              <progress id="progress4" value={data.humidity} max="100"/>
              <img className='Img' src={water} alt="" />
            </ScorePart>
            {/* </RightScoreImg> */}
          </RightPart>
      {showPopUp && <PopUpLaundry showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      </Wrapper>
      )
}

export default WeatherBox