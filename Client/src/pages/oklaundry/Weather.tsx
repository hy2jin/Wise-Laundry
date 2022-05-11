import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PopUpLaundry from './PopUpLaundry';
import sun1 from './images/해.png'
import sun2 from './images/해2.png'
import water from './images/물방울3.png'
import rain from './images/비.png'
import washer from './images/headerlogo.png'



const Wrapper = styled.div `
  
`

const SmallBox = styled.div `
  display: flex;
  justify-content: center;
  align-content: center;
`

const WeatherBox = styled.div `
  display: flex;
  width: 80vw;
  height: 70vh;
  background-color: ${props => props.theme.activeBtnColor};
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 18%, #c7f9fe 72%);
  box-shadow: 1px 2px 5px 1px #c6c5c5;
  border-radius: 25px;
  margin-top: 5vh;

  @media screen and (max-width: 800px) {
    height: 60vh;
    flex-flow: nowrap column;
  }
`

const LeftPart = styled.div `
  display: flex;
  width: 28vw;
  flex-flow: nowrap column;

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
    aspect-ratio: 1.3/1;
    margin-bottom: 7vh;
  }

  .temperature {
    font-size: 2rem;
    text-align: center;
    padding-bottom: 3vh;
  }

  @media screen and (max-width: 800px) {
    flex-flow: nowrap row;
    height: 10vh;
    /* background-color: red; */
    width: 80vw;
    margin-top: 1.5vh;

    .weatherImg {
      height: 11vh;
      aspect-ratio: 1.3/1;
      margin-bottom: 0;
    }

    .temperature {
      font-size: 1.3rem;
      padding-bottom: 0;
    }
  }
`

const RightPart = styled.div `
  display: flex;
  flex-flow: nowrap column;
  width: 70%;
  /* height: 72vh; */
  justify-content: center;
  align-content: center;
  margin: 3vh 0 ;

  @media screen and (max-width: 800px) {
    /* background-color: yellowgreen; */
    width: 80vw;
    height: 45vh;
  }
`

const ScorePart1 = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  margin: 0 3vw;

  /* 바 그래프 자리 */
  p {
    background-color: #faf7a6;
    height: 20px;
    width: 100%;
  }

  .washerImg {
    height: 11vh;
    aspect-ratio: 1/1;
  }

  @media screen and (max-width: 800px) {
    margin: 0 4vw;

    p {
      background-color: #faf7a6;
      height: 20px;
      width: 100%;
    }

    .washerImg {
      height: 7vh;
      aspect-ratio: 1/1;
    }
  }
`
const ScorePart2 = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  margin: 0 3vw;

  /* 바 그래프 자리 */
  p {
    background-color: #fabfa6;
    height: 20px;
    width: 100%;
  }

  .windImg {
    height: 11vh;
    aspect-ratio: 1.3/1;
  }

  @media screen and (max-width: 800px) {
    margin: 0 4vw;
    
    .windImg {
      height: 7vh;
      aspect-ratio: 1.3/1;
    }
  }
`
const ScorePart3 = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  margin: 0 3vw;

  /* 바 그래프 자리 */
  p {
    background-color: #fabfa6;
    height: 20px;
    width: 100%;
  }

  .rainImg {
    height: 11vh;
    aspect-ratio: 1.3/1;
  }

  @media screen and (max-width: 800px) {
    margin: 0 4vw;

    .rainImg {
      height: 7vh;
      aspect-ratio: 1.3/1;
    }
  }
`
const ScorePart4 = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  margin: 0 3vw;

  /* 바 그래프 자리 */
  p {
    background-color: #fabfa6;
    height: 20px;
    width: 100%;
  }
  
  .wetImg {
    height: 11vh;
    aspect-ratio: 1.3/1;
  }

  @media screen and (max-width: 800px) {
    margin: 0 4vw;

    .wetImg {
      height: 7vh;
      aspect-ratio: 1.3/1;
    }
  }
`


const GraphBox = styled.div `
  
`


const LaundryModal = styled.div `

`


const Weather = () => {
  const [showPopUp, setShowPopUp] = useState(false)



  useEffect(() => {
    const popUpNotShow = sessionStorage.getItem('expirePopUp') || ''; // ISO
    const popUpNotShowUNIX = Date.parse(popUpNotShow); // UNIX
    const whenWillBeExpired = popUpNotShowUNIX +  24 * 60 * 60 * 1000; // 24시간(하루)

    const currentUNIX = Math.floor(new Date().getTime());

    // 아무 정보가 없으면 팝업을 띄우자. (처음 들어온 사람)
    // setTimeout(() => {
    //   if (Number.isNaN(popUpNotShowUNIX)) {
    //     setShowPopUp(true);
    //   }
    // }, 500);
    if (Number.isNaN(popUpNotShowUNIX)) {
      setShowPopUp(true);
    }

    // 제한 시간을 지났으므로 팝업을 띄울 것
    if (whenWillBeExpired < currentUNIX) {
      setShowPopUp(true);
    }
  }, []);



  return (
    <Wrapper>
      <SmallBox>
        <WeatherBox>
          <LeftPart>
            <div className='weatherTime'>시간 : 오후 6시</div>
            <LeftImgPart>
              <img className='weatherImg' src={sun2} alt="" />
              <div className='temperature'>25℃</div>
            </LeftImgPart>
          </LeftPart>
          <RightPart>
            <ScorePart1>
              <img className='washerImg' src={washer} alt="" />
              <p>baaaaaaaaaar</p>
            </ScorePart1>
            <ScorePart2>
              <p>baaaaaaaaaar</p>
              <img className='windImg' src={sun1} alt="" />
            </ScorePart2>
            <ScorePart3>
              <p>baaaaaaaaaar</p>
              <img className='rainImg' src={rain} alt="" />
            </ScorePart3>
            <ScorePart4>
              <p>baaaaaaaaaar</p>
              <img className='wetImg' src={water} alt="" />
            </ScorePart4>
            {/* </RightScoreImg> */}
          </RightPart>
        </WeatherBox>
      </SmallBox>
      <GraphBox>
        <h3>그래프 자리</h3>
      </GraphBox>
      <LaundryModal>
        {showPopUp && <PopUpLaundry showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      </LaundryModal>
    </Wrapper>
  )
}

export default Weather