import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import mark from './images/marker.png'
const {kakao} = window

const Wrapper = styled.div`
  
`
const Map = styled.div`
       width: 100vw ;
       height: 92vh;
       @media screen and (max-width: 800px) {
        height: 85vh;

       }
`

var positions = [
  {
      title: '카카오', 
      latlng: new kakao.maps.LatLng(33.450705, 126.570677)
  },
  {
      title: '생태연못', 
      latlng: new kakao.maps.LatLng(33.450936, 126.569477)
  },
  {
      title: '텃밭', 
      latlng: new kakao.maps.LatLng(33.450879, 126.569940)
  },
  {
      title: '근린공원',
      latlng: new kakao.maps.LatLng(33.451393, 126.570738)
  }
];

const Near = ()=> {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const [lat,setLat] = useState(35.1795543)
  const [long,setLong] = useState(129.0756416)
  var options = {
    center: new kakao.maps.LatLng(lat, long), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  }
  useEffect(()=>{
    getLocation()
    getMarker()
  },[lat,long])
  
  const getMarker = ()=>{
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    var map = new kakao.maps.Map(container.current, options); 
    for (var i = 0; i < positions.length; i ++) {
      
      var imageSize = new kakao.maps.Size(24, 35); 
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);   
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
      }); 
    }
    var markerPosition  = new kakao.maps.LatLng(lat, long); 
    var imageSrc =mark, // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var myMarker = new kakao.maps.Marker({
      position: markerPosition,
      image:markerImage
  });
  myMarker.setMap(map);
  }
    

  const getLocation = () =>{ // 위치 찾고 , 그 위치에 대한 map을 그려주기, 마커로 자기위치 파악
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
//🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈
  
  return (
    <Wrapper>
      <Map
        className="map"
        ref={container}
      ></Map>
      
    </Wrapper>
  );
}

export default Near;