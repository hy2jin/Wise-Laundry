import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import banner1 from './images/banner1.png'
import banner3 from './images/메인.png'
import banner4 from './images/메인2.png'
import banner5 from './images/메인3.png'
import banner2 from './images/banner2.png'
import OkayLaundry from './OkayLaundry';

const Home = () => {
  return (
    <Wrapper>
      <EventBanner>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          autoplay={{delay: 1000}} 
          speed={2000}
          modules={[Autoplay]} 
        >
          {/* <SwiperSlide><img alt='그림' src={banner1}/></SwiperSlide> */}
          {/* <SwiperSlide><img alt='그림' src={banner3}/></SwiperSlide> */}
          <SwiperSlide><img alt='그림' src={banner4}/></SwiperSlide>
          {/* <SwiperSlide><img alt='그림' src={banner5}/></SwiperSlide> */}
          <SwiperSlide><img alt='그림' src={'https://resource.miricanvas.com/image/web/templates/main/type_thumbnail/web_banner_hor.jpeg?1.9.36hotfix6_1651219226372'}/></SwiperSlide>
          <SwiperSlide><img alt='그림' src={banner2}/></SwiperSlide>
        </Swiper>
      </EventBanner>
      <OkayLaundry />
    </Wrapper>
  )
}

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
    /* height: 35vh; */
    height: 50vh;
    padding-bottom: 5vh;
    object-fit: cover;
    @media screen and (max-width: 800px) {
      width: 100vw;
      height: 200px;
      display: block;
      max-width: 100%;
    }
  }
`
export default Home