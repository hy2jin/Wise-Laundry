/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { getCommunityAll, getSearch, getView } from '../../store/api/community';
import defaultImg from './images/ironing.png'

interface Istate {
  board: {
    userId: number,
    userNick: string,
    userImg: string,
    kakaoImg: string,
    boardId: number,
    view: number,
    boardName: string,
    boardDate: number[],
    commentCnt: number
  }
}

const CommunityAll = () => {

  const navigate = useNavigate()
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [boards, setBoards] = useState<Istate["board"][]>([])
  const [sortBtn, setSortBtn] = useState(false)
  const [lastBoardId, setLastBoardId] = useState(-1)
  const [endFlag, setEndFlag] = useState(false)
  const [fetching, setFetching] = useState(false)

  const changeLastIdx = (flag: boolean, array: Istate["board"][]) => {
    if (!!!flag) {
      const lastIdx = array.length - 1
      setLastBoardId(array[lastIdx].boardId)
    } else {
      setLastBoardId(-1)
    }
    setEndFlag(flag)
  }

  const getBoard = async (first: boolean, lastId: number, keyword: string, isSort: boolean) => {
    setFetching(true)
    // 조회순 요청
    if (isSort) {
      setSortBtn(true)
      setLastBoardId(-1)
      if (first) {
        getView(0)
        .then(res => {
          // console.log('🎲getView: ', res)
          setBoards(res.list)
          changeLastIdx(res.endFlag, res.list)
        })
      } else {
        getView(boards.length)
        .then(res => {
          // console.log('🎲More getView: ', res)
          const newBoard = [...boards].concat(res.list)
          setBoards(newBoard)
          changeLastIdx(res.endFlag, res.list)
        })
      }
    }
    // 검색 요청
    else if (!!keyword) {
      setSortBtn(false)
      getSearch(keyword, lastId)
      .then(res => {
        if (first) {
          // console.log('🎲getSearch: ', res);
          setBoards(res.list)
        } else {
          // console.log('🎲More getSearch: ', res);
          const newBoard = [...boards].concat(res.list)
          setBoards(newBoard)
        }
        changeLastIdx(res.endFlag, res.list)
      })
      .catch(err => console.log('More getSearch err:💧 ', err))
    }
    // 일반 요청
    else {
      setSortBtn(false)
      getCommunityAll(lastId)
      .then(res => {
        if (first) {
          // console.log('🎲getCommunityAll: ', res);
          setBoards(res.list)
        } else {
          // console.log('🎲More getCommunityAll: ', res);
          const newBoard = [...boards].concat(res.list)
          setBoards(newBoard)
        }
        changeLastIdx(res.endFlag, res.list)
      })
      .catch(err => console.log('More getCommunityAll err:💧 ', err))
    }
    setFetching(false)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!!inputText.trim()) {
        getBoard(true, -1, inputText, false)
      } else {
        setInputText('')
      }
    }
  }

  const onClickCancel = () => {
    setInputText('')
    setLastBoardId(-1)
    getBoard(true, -1, '', false)
  }

  const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  }

  const handleScroll = () => {
    const veiw = document.documentElement
    const scrollHeight = veiw.scrollHeight
    const scrollTop  = veiw.scrollTop 
    const clientHeight  = veiw.clientHeight
    if (!endFlag && scrollTop + clientHeight >= scrollHeight && !fetching) {
      getBoard(false, lastBoardId, inputText, sortBtn)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    getBoard(true, -1, '', false)
  }, [])

  return (
    <Wrapper>
      <p className='title'>
        <span>게시판</span>
        <TopBtn className='left' onClick={() => getBoard(true, -1, '', true)}><span />조회순</TopBtn>
        <TopBtn className='right' onClick={() => navigate('/board')}><span />질문하기</TopBtn>
      </p>
      <SearchBar>
        <label htmlFor='search'>
          <SearchIcon />
        </label>
        <div />
        <input value={inputText} placeholder='Search title, and Press Enter' id='search'
          onChange={e => setInputText(e.target.value)} onKeyUp={e => handleKeyUp(e)} />
        <CancelIcon onClick={() => onClickCancel()} style={{color: '#cccccc', cursor: 'pointer'}} />
      </SearchBar>
      {!!boards.length
      ? <section className='boards'>
        {boards.map((board, i) => {
          let boardSrc = board.userImg ? `/images/${board.userImg}` : board.kakaoImg
          boardSrc = boardSrc || defaultImg
          return (
            <EachBoard key={i}>
              <img src={boardSrc} onError={imageOnErrorHandler} alt='프로필' />
              <p className='nick'>{board.userNick}</p>
              <div className='board' onClick={() => navigate(`/community/${board.boardId}`)} style={{ backgroundColor: `${theme.listBgColor[i%3]}`}}>
                <div className='name'>{board.boardName}</div>
                <p>
                  <span className='comment'><ChatBubbleOutlineIcon /><span> {board.commentCnt}</span></span>
                  <span className='view'><RemoveRedEyeIcon /><span> {board.view}</span></span>
                </p>
              </div>
              <p className='date'>{board.boardDate[0]}.{board.boardDate[1]}.{board.boardDate[2]}</p>
            </EachBoard>
          )
        }
        )}
      </section>
      : <section className='no-boards'>
          게시글이 없습니다❌
      </section>
      }
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
  }
  .boards {
    padding: 0.8rem;
  }
  .no-boards {
    text-align: center;
    margin: 2rem 0;
  }
  @media screen and (max-width: 800px) {
    width: auto;
    margin: 0;
    padding-top: 5rem;
    padding-bottom: 70px;
    .boards {
      padding: 0;
    }
    .title {
      height: 2rem;
      font-size: 1.5rem;
      margin: 0 1rem;
      span {
      line-height: 2rem;
      }
    }
  }
`
const SearchBar = styled.section`
  height: 25px;
  border: 2px solid #ACAAAA;
  border-radius: 10px;
  display: flex;
  padding: 0.8rem;
  margin-top: 1.5rem;
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
  @media screen and (max-width: 800px) {
    margin: 1rem 1rem .5rem  1rem;
    padding: .8rem;
    input {
      &::placeholder {letter-spacing: 0;}
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
  .nick {
    width: 7rem;
    overflow: hidden;
    text-overflow: ellipsis;
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
    width: 90vw;
    height: 100%;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .view {
      margin-left: .5rem;
    }
    svg {
      font-size: 0.8rem;
    }
  }
  .date {
    color: ${props => props.theme.boardDateColor};
  }
  @media screen and (max-width: 800px) {
    .nick,
    .date {
      display: none;
    }
    .board {
      height: 150%;
      margin-left: 0;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
    }
  }
`
const TopBtn = styled.button`
  user-select: none;
  position: absolute;
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
  &.right {
    right: 0;
  }
  &.left {
    left: 0;
    /* background-color: ${props => props.theme.inactiveBtnColor}; */
    background-color: #cccccc;
    span {
      /* background-color: ${props => props.theme.hoverInactiveBtnColor}; */
      background-color: #bbbbbb;
    }
  }
  &:hover {
    span {
      right: 1%;
    }
  }
  @media screen and (max-width: 800px) {
    padding: 0 1rem;
    &.left {
      left: auto;
      right: 0;
      top: -2.5rem;
      padding: 0 1.35rem;
    }
  }
`

export default CommunityAll;