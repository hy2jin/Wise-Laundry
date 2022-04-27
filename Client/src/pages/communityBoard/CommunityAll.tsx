/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { getCommunityAll } from '../../store/api/community';
import defaultImg from './images/ironing.png'

interface Istate {
  board: {
    boardId: number,
    userId: number,
    userNick: string,
    userImg: string,
    boardName: string,
    boardDate: string,
    commentCnt: number
  }
}

const CommunityAll = () => {
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [boards, setBoards] = useState<Istate["board"][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(5)

  const navigate = useNavigate()
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(inputText, '검색요청 보냅니다아🎷')
      setInputText('')
    }
  }

  useEffect(() => {
    getCommunityAll()
    .then(res => {
      setBoards(res)
    })
    .catch(err => {
      console.log('🎲getCommunityAll err:', err)
    })
  }, [])

  return (
    <Wrapper>
      <p className='title'>질문 게시판<button onClick={() => navigate('/board')}>질문하기</button></p>
      <SearchBar>
        <SearchIcon
          fontSize ='large'
          color='disabled' />
        <div />
        <input value={inputText} placeholder='Search title or laundry, and Press Enter' 
          onChange={e => setInputText(e.target.value)} onKeyUp={e => handleKeyUp(e)} />
      </SearchBar>
      <section>
        {boards.map((board, i) => 
        <EachBoard key={i} onClick={() => navigate(`/community/${board.boardId}`)}>
          <img src={board.userImg || defaultImg} alt='프로필' />
          <p className='nick'>{board.userNick}</p>
          <div className='board' style={{ backgroundColor: `${theme.listBgColor[i%3]}`}}>
            <div className='name'>{board.boardName}</div>
            <p className='comment'><ChatBubbleOutlineIcon /><span>{board.commentCnt}</span></p>
          </div>
          <p className='date'>{board.boardDate[0]}.{board.boardDate[1]}.{board.boardDate[2]}</p>
        </EachBoard>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 80vw;
  margin: auto;
  padding-top: 5vh;
  @media screen and (max-width: 800px) {
    padding-top: 0;
    padding-bottom: 70px;
  }
  p {margin: 0;}
  .title {
    color: #4E7DDA;
    text-align: center;
    font-size: 2rem;
    position: relative;
    button {
      position: absolute;
      right: .5rem;
      height: 2rem;
      border: none;
      border-radius: 4px;
      background-color: ${props => props.theme.activeBtnColor};
    }
  }
  section {
    padding: 0.8rem;
    margin-top: 1.5rem;
  }
`
const SearchBar = styled.section`
  height: 25px;
  border: 2px solid #ACAAAA;
  border-radius: 10px;
  display: flex;
  svg{
    font-size: 1.8rem;
    margin-top: -2px;
    color: ${props => props.theme.fontColor};
  }
  div {
    height: 100%;
    width: 2.5px;
    background-color: #a9a9a9;
    margin: 0 .8rem;
  }
  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    background-color: ${props => props.theme.bgColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }
`
const EachBoard = styled.div`
  height: 2.5rem;
  padding: 20px 0;
  display: flex;
  align-items: center;
  @media screen  and (max-width: 800px) {
    .nick,
    .date,
    .comment {
      display: none;
    }
  }
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
`

export default CommunityAll;