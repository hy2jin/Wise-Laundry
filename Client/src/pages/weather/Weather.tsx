import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import WeatherBox from './WeatherBox'
import dummydatas from './data'
import { useNavigate } from 'react-router-dom'
import { getWeather } from '../../store/api/near'
import LoadingGraph from './LoadingGraph'
import Graphs from './Graphs'

const Wrapper = styled.section`
`

interface Istate{
  data :{
    time : string
    chanceOfRain: number
    humidity: number
    laundry: number
    temperature: number
    weather: string
    wind:number
  }
  newdata:{
    time : number
    chanceOfRain: number
    humidity: number
    laundry: number
    temperature: number
    weather: string
    wind:number
  }
}

const LoadingEnd = styled.article`
  
`
const Weather = () => {
  const [lat,setLat] = useState(37)
  const [long,setLong] = useState(127)
  const [fourDatas,setFourDatas] = useState<Istate['newdata'][]>([])
  const [graphData,setGraphData] = useState(dummydatas)
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [date,setDate] = useState<string[]>([])
  const [count,setCount] = useState(0)
  const [dataPick,setDataPick] = useState(0)
  const [allowLocation,setAllowLocation] = useState(false)
  useEffect(()=>{
    getLocation()
  },[])
  useEffect(()=>{
    if(allowLocation)
      changeData()
  },[allowLocation])
  useEffect(()=>{
    if(fourDatas.length===4 && isLoading)
      getNewGraph()
  },[fourDatas])
  const getLocation = async()=>{ // 내 위치 찾기 ✨
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude) // 경도 위도 정해주기
          setLong(position.coords.longitude)
          xyConvert(position.coords.latitude,position.coords.longitude)
          .then((res)=>{
            getApi(res.x,res.y)
            setAllowLocation(true)
          })
      }, function(error) {
        alert('위치정보서비스 오류');
        navigate('/home')
      }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
      });
    } else {
        alert('GPS를 지원하지 않습니다');
        return;
    }
  }
  const getApi = async(x:any,y:any)=>{
    getWeather(x,y).then(res=>{
      var newlist:Istate['newdata'][] = []
      res.weathers.map((weather:Istate['data'])=>{
        newlist.push({...weather,time:Number(weather.time.replace(" ",""))})
      })
      newlist.sort((a:any,b:any)=>{
        return b.time -a.time
      })
      newlist.reverse()
      newlist = newlist.filter((list,idx)=>
        idx%2===1
      )
      setFourDatas(newlist)
    })
  }
  const xyConvert = async( v1:any, v2:any) => {
    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)
    var DEGRAD = Math.PI / 180.0;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs:any = {};
    
    rs['lat'] = v1;
    rs['lng'] = v2;
    var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    return rs;
  }
  const getNewGraph = ()=>{
    var newGraph:any = []
    var newDate:string[] =[]
    fourDatas.map((data,idx)=>{
      var weather:string|number = 'sunny'
      var time= String(data.time)
      switch(data.weather){
        case 'sunny':
          weather =100
          break
        case 'partly_cloudy':
          weather = 70
          break
        case 'cloudy':
        weather = 50
        break
        case 'rain':
        weather = 30
        break
        default:
          weather = 20
      }
      var newtmp =
      [
        {
          "category":"chanceOfRain",
          [time] : 100 - data.chanceOfRain // 비올확률이 낮을수록 좋다.
        },
        {
          "category":"humidity",
          [time] :100 - data.humidity // 습도도 낮을수록 좋다.
        },
        {
          "category":"wind",
          [time] : data.wind *20 // 바람은 클수록 좋다
        },
        {
          "category":"temperature",
          [time] : 50 + data.temperature // 온도는 높을수록 좋다. 최고 40도라고 생각하면 + 50 
        },
        {
          "category":"weather",
          [time] : weather
        },
      ]
      newGraph.push(newtmp)
      newDate.push(time)
    })
    setGraphData(newGraph)
    setDate(newDate)
  }
  const changeData = ()=>{ // 그래프 변동시키기
    const array = [... new Array(20)].map((_,i)=>i)
    array.map((ele)=>{
      setTimeout(()=>{setCount(ele%10)},ele*200)
    })
    setTimeout(()=>{ 
      setIsLoading(false)
    },4100)
  }

  
  return (
    <Wrapper>
      {isLoading ?<LoadingGraph count={count}/> :
      fourDatas.length>0 ?
    <LoadingEnd>
      <WeatherBox data ={fourDatas[dataPick]}/>
      <Graphs fourDatas={fourDatas} setDataPick ={setDataPick} graphData={graphData} date={date} />
    </LoadingEnd>
  :
  allowLocation?
  <h1>현재 기상청의 서버 문제로 날씨를 불러올 수 없습니다</h1>
  :
  <h1>현재 위치정보를 켜주세요</h1>  
  }
    </Wrapper>
  )
}
export default Weather