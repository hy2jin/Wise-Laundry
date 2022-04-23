import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide,useSwiper  } from 'swiper/react'
import { EffectFade,Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'

import styled from 'styled-components'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.article`
  /* background-color: #6274fd; */
  background:linear-gradient(#6274fd,#2f387c) ;
  height: 100vh;
  width: 100vw;
  .title{
    min-width: 200px;
    font-size: 5vw;
    color: white;
    position: fixed;
    left: 50%;
    top:300px;
    transform: translate(-50%, 0);
    z-index: 2;
    @media screen and (max-width: 800px) {
      font-size: 40px;
      left: 54%;
      top:300px;
    }
  }
  .up{
    top:100px;
    transition: 1.5s;
    min-width: 200px;
    font-size: 5vw;
    color: white;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    @media screen and (max-width: 800px) {
      font-size: 40px;
      left: 57%;
      top:100px;
    }
  }
  img{
    height: 99.7vh;
    width: 100vw;
    filter: brightness(80%); 
    @media screen and (max-width: 1300px) {
      height: 100vh;
      width: 1300px;
      display: block;
      max-width: 100%;
      object-fit: cover;
    }
  }
  #slow{
    animation: fadein 1.5s;
  }
  @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
const Content = styled.div`
  article{
    position:fixed;
    width: 50vw;
    height: 30vh;
    left: 25%;
    top:350px;
    color:white;
    text-align: center;
    /* transition: 2s; */
    visibility: hidden;
    &.show{
    visibility: visible;
    transform: translateY(-10vh);
    transition: 1.5s;
  }
  }
  p{
    margin-top: 30px;
    font-size: 25px;
    /* transform: translateY(30px); */
    /* line-height: 50px; */
    transition: all 1s ease;
    @media screen and (max-width: 800px) {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1300px) {
    left: 30%;
  }
`
const LoginBox = styled.div`
  visibility: hidden;
  &.show{
    visibility: visible;
    transform: translateY(-10vh);
    transition: 1s;
  }
  position: fixed;
  top:650px;
  display: flex;
  width: 50vw;
  height: 50px;
  justify-content:space-between;
  left: 25%;
  button{
    width: 20vw;
    cursor: pointer;
      border-radius: 10px;
      border: none;
    &.login{
        background-color: skyblue;
        color: #333;
      }
      &.signup{
        background-color: #6274fd;
        color: #333;
      }
  }
  @media screen and (max-width: 1300px) {
    left: 5%;
    width: 90%;
    height: 50px;
    button{
      width: 42vw;      
    }
  }

  
`


const Start = () => {
  const [showImg,setShowImg] = useState(1)
  const [titleUp,setTitleUp ] = useState(false)
  const [showText,setShowText] = useState(false)
  const [showLogin,setShowLogin] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    setTitleUp(false)
    setShowText(false)
    setShowLogin(false)
    setTimeout(() => {
      setShowImg(2) // 첫번째 사진 먼저띄우기
    }, 1500);
    setTimeout(()=>{
      setShowImg(3) // swiper 시작
    },2500)
    setTimeout(() => {
      setShowImg(4) // swiper 끝내고 마지막 사진 올리기
    }, 7700);
    setTimeout(() => {
      setTitleUp(true) // 글자 올리기
    }, 8500);
    setTimeout(() => {
      setShowText(true)
      setShowLogin(true)
    }, 10000);
  },[])
 
  return (
    <Wrapper>
      <div className={titleUp ? 'up':'title'} >
        <div>슬기로운</div>
        <div>세탁생활</div>
      </div>
      {showImg ===2 && <img id='slow' alt='img' src={img1}/>}
      {showImg ===3 && 
        <Swiper 
          className='my-swiper'
          autoplay={{delay: 500}} 
          speed={1000}
          modules={[Autoplay,EffectFade]} 
          loop={false}
          allowTouchMove ={false}
          effect="fade"
          >
        {[img1, img2, img3,img4].map((i, el) => {
          return <SwiperSlide key={el}>
              <img alt='img' src={i}/>
              </SwiperSlide>;
        })}
        </Swiper>
      } 
      {showImg ===4 && <img alt='img' src={img4}/>}
      
        <Content >
        <article className={showText ?"show":""} >
          <p >슬기로운 세탁생활이 처음이신가요?</p>
          <p >바로 가입하고 시작하세요</p>
          <p >로그인 또는 가입하시고 </p>
          <p >'슬세'만의 기능을 확인하세요. </p>
        </article>
          <LoginBox className={showLogin ?"show":""}>
            <button onClick={()=>{navigate('/signup')}} className='signup'>가입하기</button>
            <button onClick={()=>{navigate('/login')}}className='login'>로그인</button>
          </LoginBox>
        </Content>
        
    </Wrapper>
  )
}

export default Start