import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade,Autoplay } from 'swiper';
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import nearImg from './images/near.jpg'
import timerImg from './images/timer.jpg'
import comImg from './images/community.jpeg'
import washerImg from './images/washer.jpeg'
import clothImg from './images/cloth.jpeg'
const Wrapper = styled.div`
  margin: auto;
  article{
    padding-top: 30px;
    border-radius: 20px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    cursor: pointer;
    span{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: white;
      &.black{
        color:#333;
      }
    }
    @media screen and (max-width: 800px) {
      border-radius: 10px;

    }
  }
`
const EventBanner = styled.div`
  border-radius: 0;
  width: 100%;
  margin: auto;
  img{
    width: 100vw;
    height: 35vh;
    object-fit: cover;
    @media screen and (max-width: 800px) {
      width: 100vw;
      height: 200px;
      display: block;
      max-width: 100%;
    }
  }
`
const TopLeft = styled.article`
  height: 150px;
  width: 40vw;
  background:url("${clothImg}") center;
  background-position: 0% 30%;
  .black{
    color: #333;
  }
  @media screen and (max-width: 800px) {
    width: 85vw;
  }
`
const TopRight = styled.article`
  height: 150px;
  width: 40vw;
  background:url(${washerImg}) center;
  @media screen and (max-width: 800px) {
    width: 85vw;
    margin-top: 50px;
  }
  
`
const BotLeft = styled.article`
  height: 150px;
  width: 40vw;
  background:url("${comImg}") center;
  @media screen and (max-width: 800px) {
    width: 85vw;
  }
`
const BotRight = styled.article`
  height: 150px;
  width: 40vw;
  background:url(${nearImg}) center;
  @media screen and (max-width: 800px) {
    width: 85vw;
    margin-top: 50px;
  }
`
const FlexBox = styled.article`
  display: flex;
  width: 85vw;
  justify-content: space-between;
  margin: auto;
  margin-top: 50px;
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
    width: 85vw;
    margin: auto;
    margin-top: 50px;
  }
`
const TimerBox = styled.article`
  height: 250px;
  width: 85vw;
  margin: auto;
  background:url(${timerImg}) center;
  margin-top: 50px;
  background-position: 0% 80%;
  margin-bottom: 50px;
  @media screen and (max-width: 800px) {
    height: 150px;

  }
`
const Home = () => {
  return (
    <Wrapper>
      <EventBanner>
       <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{delay: 1000}} 
          speed={2000}
          modules={[Autoplay]} 
        >
          <SwiperSlide><img alt='그림' src={'https://media.istockphoto.com/vectors/red-carpet-event-banner-design-template-vector-id638184328'}/></SwiperSlide>
          <SwiperSlide><img alt='그림' src={'https://resource.miricanvas.com/image/web/templates/main/type_thumbnail/web_banner_hor.jpeg?1.9.36hotfix6_1651219226372'}/></SwiperSlide>
          <SwiperSlide><img alt='그림' src={'https://blog.kakaocdn.net/dn/bv1duH/btqZqot50kj/DEgWpku3mpMibIotilkqjK/img.jpg'}/></SwiperSlide>
      </Swiper>
      </EventBanner>
      <FlexBox>
        <TopLeft><span className='black' >My Laundry</span></TopLeft>
        <TopRight><span>Okay Laundry</span></TopRight>
      </FlexBox>
      <FlexBox>
        <BotLeft><span>Community</span></BotLeft>
        <BotRight><span>Near</span></BotRight>
      </FlexBox>
      <TimerBox><span>Timer</span></TimerBox>
    </Wrapper>
  )
}

export default Home