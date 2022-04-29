/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import NotImage from './404.png'
import NotImage from './4043.png'

const Wrapper = styled.article`
  padding: 10vh 10vw;
  background-color: ${props => props.theme.bgColor};
`
const Icon = styled.div`
  /* aspect-ratio: 1/1; */
  aspect-ratio: 1.5/1;
  width: 20vw;
  img {
  width: 100%;
  height: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 40vw;
  }
`
const Letter = styled.div`
  .title {font-size: 3rem;}
  .desc {font-size: 1.5rem;}
  @media screen and (max-width: 800px) {
    .title {font-size: 2rem;}
    .desc {font-size: 1rem;}
  }
`
const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.activeBtnColor};
`

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Icon>
        <img src={NotImage} alt='404' />
      </Icon>
      <Letter>
        <p className='title'>페이지를 찾을 수 없습니다.</p>
        <p className='desc'>원하시는 결과를 찾을 수 없습니다.</p>
        <p className='desc'>올바른 URL을 입력하였는지 확인하세요.</p>
      </Letter>
      <Button onClick={() => navigate('/home')}>메인으로 돌아가기</Button>
    </Wrapper>
  );
};

export default NotFound;