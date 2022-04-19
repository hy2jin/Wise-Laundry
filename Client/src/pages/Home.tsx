import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 30px;
  @media screen and (max-width:500px) {
  }
  div{
    border-radius: 20px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    span{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      color: white;
    }
  }
`
const EventBanner = styled.div`
  height: 300px;
  width: 100%;
  background: url('https://cdn.discordapp.com/attachments/885744368399560725/964572370998263838/unknown.png') center;
  background-repeat: no-repeat;
  margin: auto;

`
const TopLeft = styled.div`
  height: 150px;
  width: 40vw;
  background:url('https://images.pexels.com/photos/1366242/pexels-photo-1366242.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center;
  @media screen and (max-width:500px) {
    width: 85vw;
  }
`
const TopRight = styled.div`
  height: 150px;
  width: 40vw;
  background:url('https://images.pexels.com/photos/3262937/pexels-photo-3262937.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center;
  @media screen and (max-width:500px) {
    width: 85vw;
    margin-top: 50px;
  }
  
`
const BotLeft = styled.div`
  height: 150px;
  width: 40vw;
  background:url('https://images.pexels.com/photos/271711/pexels-photo-271711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center;
  @media screen and (max-width:500px) {
    width: 85vw;
  }
`
const BotRight = styled.div`
  height: 150px;
  width: 40vw;
  background:url('https://images.pexels.com/photos/2347642/pexels-photo-2347642.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center;
  @media screen and (max-width:500px) {
    width: 85vw;
    margin-top: 50px;
  }
`
const FlexBox = styled.div`
  display: flex;
  width: 85vw;
  justify-content: space-between;
  margin: auto;
  margin-top: 50px;
  @media screen and (max-width:500px) {
    flex-wrap: wrap;
    width: 85vw;
    margin: auto;
    margin-top: 50px;
  }
`
const TimerBox = styled.div`
  height: 150px;
  width: 85vw;
  margin: auto;
  background:url('https://images.pexels.com/photos/1209998/pexels-photo-1209998.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center;
  margin-top: 50px;
  p{
    /* padding-top: 60px; */
  }
`
const Home = () => {
  return (
    <Wrapper>
      <EventBanner>
      </EventBanner>
      <FlexBox>
        <TopLeft><span>My Laundry</span></TopLeft>
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