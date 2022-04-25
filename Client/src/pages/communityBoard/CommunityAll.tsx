/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { dataall } from './data';

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

const Wrapper = styled.article`
  width: 80vw;
  margin: auto;
  padding-top: 5vh;
  @media screen and (max-width: 800px) {
    padding: 0;
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
const Pagenation = styled.section`
  display: flex;
  justify-content: center;
  .pagenation {
    border: 1px solid #56586C;
    border-radius: 4px;
    width: 18rem;
    height: 2rem;;
    display: flex;
    div {
      height: 100%;
      cursor: pointer;
      position: relative;
      &:first-child,
      &:last-child {
        width: 12.5%;
      }
      &.active {
        font-weight: bold;
      }
      p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`

const CommunityAll = () => {
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [boards, setboards] = useState<Istate["board"][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(5)

  const navigate = useNavigate()
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(inputText, '검색요청 보냅니다아🎷')
      setInputText('')
    }
  }
  const makePageList = () => {
    let arr = []
    if (totalPage < 5) {
      // 1부터 totalPage까지
      for (let i = 1; i < totalPage+1; i++) {arr.push(i)}
    } else if (currentPage > totalPage-2) {
      // totalPage -4부터 totalPage까지 
      for (let i = totalPage-4; i < totalPage+1; i++) {arr.push(i)}
    } else if (currentPage < 3) {
      // 1부터 5까지
      for (let i = 1; i < 6; i++) {arr.push(i)}
    } else {
      // currentPage -2부터 +2까지
      for (let i = currentPage-2; i < currentPage+3; i++) {arr.push(i)}
    }
    return arr
  }

  const changePage = (num: number) => {
    const newPage = currentPage + num
    if (newPage < 1 || newPage > totalPage) {
      alert('NOPE❌')
    } else {
      setCurrentPage(newPage)
    }
  }

  useEffect(() => {
    setboards(dataall)
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
          <img src={board.userImg} alt='사진' />
          <p className='nick'>{board.userNick}</p>
          <div className='board' style={{ backgroundColor: `${theme.listBgColor[i%3]}`}}>
            <div className='name'>{board.boardName}</div>
            <p className='comment'><ChatBubbleOutlineIcon /><span>{board.commentCnt}</span></p>
          </div>
          <p className='date'>{board.boardDate}</p>
        </EachBoard>
        )}
      </section>
      <Pagenation style={{margin: '0'}}>
        <div className='pagenation'>
          <div onClick={() => {changePage(-1)}}><p>&lt;</p></div>
            {makePageList().map((num, idx) => (
              <div className={currentPage === num ? 'active': ''} key={idx} 
                onClick={() => setCurrentPage(num)}
                style={{width: `${totalPage > 4 ? '15%' : `${75/totalPage}%`}`}}
              >
                <p>{num}</p>
              </div>
            ))}
          <div onClick={() => {changePage(1)}}><p>&gt;</p></div>
        </div>
      </Pagenation>
    </Wrapper>
  );
};

export default CommunityAll;