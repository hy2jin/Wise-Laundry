import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import {data } from './data.js'
const {kakao} = window

const Yas = () => {
  // 주소-좌표 변환 객체를 생성합니다
  var washers = data
  var geocoder = new kakao.maps.services.Geocoder();
  var newData:{title:string,y:number,x:number}[] = []
  const [end,setEnd] = useState(false)
  useEffect(()=>{
    washers.map(washer=>
      {
         p2(washer)
    }
  )
  setEnd(true)
  },[])
  useEffect(()=>{
    if(end){
      console.log(newData)
    }
  },[end])
  async function p2(washer:any){
    var name = washer['도로명'];
    geocoder.addressSearch(name, async function(result:any, status:any) {
      if (status === kakao.maps.services.Status.OK) {
        const coord =  await new kakao.maps.LatLng(result[0].y, result[0].x)
        if (coord!== undefined){
        var tmp = {title:washer['상호명'],y:coord.La,x: coord.Ma,}
        newData.push(tmp)
      }  
      } 
    }
    ) 
  }
  return (
    <div>

    </div>
  )
}

export default Yas