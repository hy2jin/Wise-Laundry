import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myMark from './images/marker.png'
import markerdata from './data.json'
const {kakao} = window

const Wrapper = styled.section`
  width: 100vw; 
  height: 100vh;
`

const Near =() =>{
  const [lat,setLat] = useState(37.624915253753194)
  const [long,setLong]= useState(127.15122688059974)
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(()=>{
    mapscript();
  },[lat,long])
  
  const getLocation = ()=>{ // 내 위치 찾기 ✨
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude) // 경도 위도 정해주기
          setLong(position.coords.longitude)
      }, function(error) {console.error(error);}, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
      });
    } else {
        alert('GPS를 지원하지 않습니다');
        return;
    }
  }

  const mapscript = () => {
    var imageSrc = "https://cdn-icons-png.flaticon.com/512/2094/2094357.png"; 
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(lat, long),
      level:3,
    };

    //map
    const map = new kakao.maps.Map(container, options);
    var imageSize = new kakao.maps.Size(32, 35); 
    markerdata.forEach((el) => { // 위치 찍기
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);   
      new kakao.maps.Marker({
        map: map,//마커가 표시 될 지도
        position: new kakao.maps.LatLng(el.위도, el.경도),//마커가 표시 될 위치
        title: el.상호명,//마커에 hover시 나타날 title
        image : markerImage, // 마커 이미지 ,
      });
    });


    var myMarker = new kakao.maps.Marker({
      position:new kakao.maps.LatLng(lat, long),
      image:new kakao.maps.MarkerImage(myMark, new kakao.maps.Size(50, 50)),
    });
    myMarker.setMap(map);

  };

  return (
  <Wrapper id="map">

  </Wrapper>
  );
}
export default Near;