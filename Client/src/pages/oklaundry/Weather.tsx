import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PopUpLaundry from './PopUpLaundry';


const Wrapper = styled.div `
  
`

const LaundryModal = styled.div `
  /* display: flex; */
  
`

const Weather = () => {
  const [showPopUp, setShowPopUp] = useState(false)



  useEffect(() => {
    const popUpNotShow = sessionStorage.getItem('expirePopUp') || ''; // ISO
    const popUpNotShowUNIX = Date.parse(popUpNotShow); // UNIX
    const whenWillBeExpired = popUpNotShowUNIX +  24 * 60 * 60 * 1000; // 24시간(하루)

    const currentUNIX = Math.floor(new Date().getTime());

    // 아무 정보가 없으면 팝업을 띄우자. (처음 들어온 사람)
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
      {/* <div>Weather</div> */}
      <LaundryModal>
        {showPopUp && <PopUpLaundry showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      </LaundryModal>
    </Wrapper>
  )
}

export default Weather