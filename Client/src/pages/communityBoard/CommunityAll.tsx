/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { getCommunityAll, getSearch } from '../../store/api/community';
import defaultImg from './images/ironing.png'

interface Istate {
  board: {
    boardId: number,
    userId: number,
    userNick: string,
    userImg: string,
    kakaoImg: string,
    boardName: string,
    boardDate: string,
    commentCnt: number
  }
}

const CommunityAll = () => {

  const navigate = useNavigate()
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [boards, setBoards] = useState<Istate["board"][]>([])
  const [lastBoardId, setLastBoardId] = useState(-1)
  const [endflag, setEndFlag] = useState(false)

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(inputText, '검색요청 보냅니다아🎷')
      // getSearch(inputText)
    }
  }

  const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  useEffect(() => {
    getCommunityAll()
    .then(res => {
      setBoards(res.list)
    })
    .catch(err => console.log('getCommunityAll err:💧 ', err))
  }, [])

  return (
    <Wrapper>
      <p className='title'>질문 게시판
        <button onClick={() => navigate('/board')}><span />질문하기</button>
      </p>
      <SearchBar>
        <label htmlFor='search'>
          <SearchIcon />
        </label>
        <div />
        <input value={inputText} placeholder='Search title, and Press Enter' id='search'
          onChange={e => setInputText(e.target.value)} onKeyUp={e => handleKeyUp(e)} />
        <CancelIcon onClick={() => setInputText('')} style={{color: '#cccccc', cursor: 'pointer'}} />
      </SearchBar>
      <section>
        {boards.map((board, i) => {
          let boardSrc = board.userImg ? `/images/${board.userImg}` : board.kakaoImg
          boardSrc = boardSrc || defaultImg
          return (
            <EachBoard key={i}>
              <img src={boardSrc} onError={imageOnErrorHandler} alt='프로필' />
              <p className='nick'>{board.userNick}</p>
              <div className='board' onClick={() => navigate(`/community/${board.boardId}`)} style={{ backgroundColor: `${theme.listBgColor[i%3]}`}}>
                <div className='name'>{board.boardName}</div>
                <p className='comment'><ChatBubbleOutlineIcon /><span>{board.commentCnt}</span></p>
              </div>
              <p className='date'>{board.boardDate[0]}.{board.boardDate[1]}.{board.boardDate[2]}</p>
            </EachBoard>
          )
        }
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 80vw;
  margin: auto;
  padding-top: 5vh;
  p {margin: 0;}
  .title {
    color: #4E7DDA;
    text-align: center;
    font-size: 2.5rem;
    position: relative;
    button {
      user-select: none;
      position: absolute;
      right: 1%;
      height: 100%;
      padding: 0 1.5rem;
      z-index: 1;
      border: none;
      border-radius: 4px;
      overflow: hidden;
      color: white;
      background-color: ${props => props.theme.activeBtnColor};
      span {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: 0.5s;
        right: 100%;
        top: 0;
        z-index: -1;
        background-color: ${props => props.theme.hoverActiveBtnColor};
      }
      &:hover {
        span {
          right: 1%;
        }
      }
    }
  }
  section {
    padding: 0.8rem;
    margin-top: 1.5rem;
  }
  @media screen and (max-width: 800px) {
    padding-top: 5rem;
    padding-bottom: 70px;
    .title {
      font-size: 1.5rem;
      button {
        padding: 0 .3rem;
      }
    }
  }
`
const SearchBar = styled.section`
  height: 25px;
  border: 2px solid #ACAAAA;
  border-radius: 10px;
  display: flex;
  svg {
    user-select: none;
    font-size: 1.8rem;
    margin-top: -2px;
    color: ${props => props.theme.fontColor};
  }
  div {
    user-select: none;
    height: 100%;
    width: 2.5px;
    background-color: #a9a9a9;
    margin: 0 .8rem;
  }
  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    letter-spacing: .1rem;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9;
    }
  }
`
const EachBoard = styled.div`
  cursor: default;
  height: 2.5rem;
  padding: 20px 0;
  display: flex;
  align-items: center;
  img {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin: 0 1rem;
  }
  .nick,
  .date {
    width: 5rem;
  }
  .board {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: wrap;
    border-radius: 10px;
    padding: 0 1rem;
    margin: 0 1rem;
    width: 70vw;
    height: 100%;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    svg {
      font-size: 0.8rem;
    }
  }
  @media screen  and (max-width: 800px) {
    .nick,
    .date,
    .comment {
      display: none;
    }
  }
`

export default CommunityAll;