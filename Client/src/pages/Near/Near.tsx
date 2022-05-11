import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myMark from './images/marker.png'
import datas from './data.js'

const {kakao} = window

const Wrapper = styled.section`
 
`
const MapWrapper = styled.div`
  width: 100vw; 
  height: 100vh;
  .content{
    position:relative;
    bottom:85px;
    border-radius:6px;
    border: 1px solid #ccc;
    border-bottom:2px solid #ddd;
    float:left;
  }
  .label {margin-bottom: 35px;}
  .label * {display: inline-block;vertical-align: top;}
  .label .left {background: url("https://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_l.png") no-repeat;display: inline-block;height: 24px;overflow: hidden;vertical-align: top;width: 7px;}
  .label .center {background: url(https://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_bg.png) repeat-x;display: inline-block;height: 24px;font-size: 12px;line-height: 24px;}
  .label .right {background: url("https://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_r.png") -1px 0  no-repeat;display: inline-block;height: 24px;overflow: hidden;width: 6px;}
`


interface IState{
  data:{
    "": number
    "상호명": string
    "도로명": string
    "위도": number
    "경도": number
  }
}

const Near =() =>{
  const [lat,setLat] = useState(37.624915253753194)
  const [long,setLong]= useState(127.15122688059974)
  const [markdata,setMarkdata] = useState<IState['data'][]>([])

  useEffect(() => {
    getLocation()
  }, []);
  useEffect(()=>{
    mapscript();
  },[lat,long])
  
  const getLocation = async()=>{ // 내 위치 찾기 ✨
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude) // 경도 위도 정해주기
          setLong(position.coords.longitude)
          nearLocation(position.coords.latitude,position.coords.longitude)
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
  const nearLocation = (x:any,y:any)=>{
    let tmp:IState['data'][] = []
    datas.map((el:any)=>{
      if(Math.abs(el.위도-x)<=0.04 && Math.abs(el.경도-y)<=0.04 ){
        tmp.push(el)
      }
    })
    setMarkdata(tmp)
  }
  const mapscript = () => {
    var imageSrc = "https://cdn-icons-png.flaticon.com/512/2094/2094357.png"; 
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(lat, long),
      level:2,
    };

    //map
    const map = new kakao.maps.Map(container, options);
    var imageSize = new kakao.maps.Size(32, 35); 
    markdata.forEach((el) => { // 위치 찍기
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);   
      new kakao.maps.Marker({
        map: map,//마커가 표시 될 지도
        position: new kakao.maps.LatLng(el.위도, el.경도),//마커가 표시 될 위치
        title: el.상호명,//마커에 hover시 나타날 title
        image : markerImage, // 마커 이미지 ,
      });

      var content =
      `<div class ="label"><span class="left"></span><span class="center">${el.상호명}</span><span class="right"></span></div>`
      var position = new kakao.maps.LatLng(el.위도, el.경도);

      new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1 
      });
    });
    var myMarker = new kakao.maps.Marker({
      position:new kakao.maps.LatLng(lat, long),
      image:new kakao.maps.MarkerImage(myMark, new kakao.maps.Size(50, 50)),
    });
    myMarker.setMap(map);
  }
    

  return (
  <Wrapper >
    <MapWrapper id="map"/>
  </Wrapper>
  );
}
export default Near;