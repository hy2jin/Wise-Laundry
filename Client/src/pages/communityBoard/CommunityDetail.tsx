/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import styled from 'styled-components';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';
import { themeState } from '../../store/state/theme';
import { getCommunityDetail, postComment, delComment, delBoard, putView } from '../../store/api/community';
import defaultImg from './images/ironing.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface Istate {
  board: {
    boardId: number,
    userId: number,
    userNick: string,
    userImg: string,
    kakaoImg: string,
    boardName: string,
    boardImgs: string[],
    boardContent: string,
    boardDate: number[],
    comments: {
      commentId: number,
      userImg: string,
      kakaoImg: string,
      userNick: string,
      userId: number,
      commentContent: string,
      commentDate: number[],
      message: string
    }[]
  }
}

const CommunityDetail = () => {

  const { boardId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [board, setBoard] = useState<Istate['board']>({
    boardId: 0,
    userId: 0,
    userNick: '',
    userImg: '',
    kakaoImg: '',
    boardName: '',
    boardImgs: [],
    boardContent: '',
    boardDate: [],
    comments: [
      {
        commentId: 0,
        userImg: '',
        kakaoImg: '',
        userNick: '',
        userId: 0,
        commentContent: '',
        commentDate: [],
        message: ''
      }
    ]
  })
  const [imgIdx, setImgIdx] = useState(0)

  let boardSrc = board.userImg ? `/images/${board.userImg}` : board.kakaoImg
  boardSrc = boardSrc || defaultImg

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputText.trim()) {
        createComment()
      } else {
        setInputText('')
      }
    }
  }

  const deleteBoard = () => {
    Swal.fire({
      title: `${board.boardName}`,
      text: '글을 삭제하겠습니까?',
      confirmButtonText: '삭제',
      confirmButtonColor: 'red',
      showDenyButton: true,
      denyButtonText: `아니요`,
      denyButtonColor: `gray`,
    })
    .then(({ value }) => {
      if (value) {
        delBoard(Number(boardId))
        .then(() => {
          navigate('/community')
        })
        .catch(err => console.log('deleteBoard error:💧', err))
      }
    })
  }

  const createComment = () => {
    const data = {
      userId: user.userId,
      boardId: boardId,
      commentContent: inputText
    }
    postComment(data)
    .then(res => {
      console.log('🎲postComment: ', res);
      setBoard({...board, comments: [...board.comments, res]})
    })
    .catch(err => console.log('createComment error:💧', err))
    setInputText('')
  }

  const deleteComment = (commentId: number) => {
    delComment(commentId)
    .then(() => {
      Swal.fire({
        icon: 'success',
        text: '댓글을 삭제했습니다',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
      })
      const newComments = board.comments.filter(c => c.commentId !== commentId)
      setBoard({...board, comments: newComments})
    })
    .catch(err => console.log('deleteComment error:💧', err))
  }

  const changeIdx = (num: number) => {
    const idx = imgIdx + num
    const maxIdx = board.boardImgs.length - 1
    if (idx < 0) {
      setImgIdx(maxIdx)
    } else if (idx > maxIdx) {
      setImgIdx(0)
    } else {
      setImgIdx(idx)
    }
  }

  const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg;
  };

  useEffect(() => {
    getCommunityDetail(Number(boardId))
    .then(res => {
      console.log('🎲getCommunityDetail: ', res);
      // const testImgs = [
      //   'https://i1.sndcdn.com/artworks-W7SabP4lUpcuE7G5-TIxM7Q-t500x500.jpg',
      //   'https://images.coplusk.net/project_images/208626/image/2019-11-27-210127-burger.jpg',
      //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf7WOLBD7t1VG3rkJq4CuLa8LDfuvcsUXutZ3hbV33SGPaW7_aFgN9S_IZITCsIGr9EiM&usqp=CAU'
      // ]
      // setBoard({...res, boardImgs: testImgs})
      setBoard(res)
    })
    .then(() => {
      putView(Number(boardId))
    })
    .catch(err => console.log('getCommunityDetail err:💧', err))
  }, [boardId])

  return (
    <Wrapper>
      <Board>
        <BoardContent>
          {board.boardImgs.length > 0 ?
          <div className='top'>
            <p className='img-page'>{`${imgIdx+1} / ${board.boardImgs.length}`}</p>
            <img src={board.boardImgs[imgIdx]} alt={`사진${imgIdx+1}`} />
            {board.boardImgs.length > 1 && <>
            <ArrowBackIosNewIcon className='left' onClick={() => changeIdx(-1)} />
            <ArrowForwardIosIcon className='right' onClick={() => changeIdx(1)} />
            </>}
          </div> :
          <div className='top-no'>
            이미지가 없습니다❌
          </div>
          }
          <div className='middle'>
            <div className='user'>
              <img src={boardSrc} onError={imageOnErrorHandler} alt='프로필' />
              <p>{board.userNick}</p>
            </div>
            <p className='date'><span>작성일 : </span>{String(board.boardDate[0]).slice(-2)}.{board.boardDate[1]}.{board.boardDate[2]}</p>
          </div>
          <hr />
          <div className='bottom'>
            <p className='title'>{board.boardName}</p>
            <p className='content'>{
              board.boardContent.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)
            }</p>
          </div>
        </BoardContent>
        <hr />
        <Comments>
          {board.comments.map((comment, i) => {
            let userSrc = comment.userImg ? `/images/${comment.userImg}` : comment.kakaoImg
            userSrc = userSrc || defaultImg
            return (
            <div className='comment' key={i}>
              <img src={userSrc} onError={imageOnErrorHandler} alt='프로필' />
              <p className='nick' title={comment.userNick}>{comment.userNick}</p>
              <div className='content' style={{backgroundColor: `${theme.listBgColor[i%3]}`}}>
                <p>{comment.commentContent}</p>
                {comment.userId === user.userId && 
                <RemoveCircleOutlineIcon onClick={() => deleteComment(comment.commentId)} />
                }
              </div>
              <p className='date'>{String(comment.commentDate[0]).slice(-2)}.{comment.commentDate[1]}.{comment.commentDate[2]}</p>
            </div>
            )
          }
          )}
        </Comments>
        <CreateComment>
          <input value={inputText} placeholder='댓글을 입력하세요'
            onChange={e => setInputText(e.target.value)} onKeyUp={e => handleKeyUp(e)}
          />
          <button onClick={() => createComment()}><span />등록</button>
        </CreateComment>
      </Board>
      <Btns>
        <button className='active' onClick={() => navigate('/community')}><span />목록</button>
        {board.userId === user.userId && <>
        <button className='active' onClick={() => navigate(`/board/${board.boardId}`)}><span />수정</button>
        <button className='inactive' onClick={() => deleteBoard()}><span />삭제</button>
        </>}
      </Btns>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 50vw;
  margin: auto;
  padding: 3rem 0;
  button {
    user-select: none;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: none;
    border-radius: 4px;
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
        right: 0;
      }
    }
  }
  @media screen and (max-width: 1400px) {
    width: 70vw;
  }
  @media screen and (max-width: 800px) {
    width: 80vw;
    padding: 0;
    padding-top: 5rem;
  }
  `
const Board = styled.section`
  background-color: ${props => props.theme.containerColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 2vh 4vw;
`
const BoardContent = styled.div`
  .top-no {
    text-align: center;
    padding: 5rem 0;
  }
  .top {
    width: 80%;
    margin: auto;
    position: relative;
    p {
      position: absolute;
      right: 45%;
      bottom: -1em;
      margin: 0;
    }
    img {
      width: 100%;
    }
    svg {
      cursor: pointer;
      position: absolute;
      height: 100%;
      font-size: 1.5rem;
      &.left {
        left: 0;
        padding-left: .3rem;
      }
      &.right {
        right: 0;
        padding-right: .3rem;
      }
      &:hover{
        transition: .5s;
        transform: scale(2);
      }
    }
    .img-page {
      text-align: center;
    }
  }
  .middle {
    height: 5vh;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    margin-top: 1rem;
    .user {
      display: flex;
      img {
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        margin-right: .5rem;
      }
    }
  }
  .bottom {
    padding: 0 1rem;
    .title {
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 800px) {
    .top {
      width: 100%;
      p {
        font-size: .5rem;
      }
      svg:hover {
        transform: none;
      }
    }
    .middle .date span {
      display: none;
    }
  }
`
const Comments = styled.div`
  padding: 0 1rem;
  .comment {
    cursor: default;
    height: 5vh;
    display: flex;
    margin: 1rem 0;
    p {
      margin: 0;
      height: 5vh;
      line-height: 5vh;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.nick {width: 10vw;}
      &.date {width: 15%;}
    }
    img {
      height: 4vh;
      aspect-ratio: 1/1;
      border-radius: 50%;
      margin-right: .5rem;
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: .5rem;
      border-radius: 10px;
      margin-right: .5rem;
      svg {cursor: pointer;}
    }
  }
  @media screen and (max-width: 800px) {
    .date {
      display: none;
    }
  }
`
const CreateComment = styled.div`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  input {
    height: 85%;
    width: 80%;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding-left: .5rem;
    color: ${props => props.theme.fontColor};
    background-color: ${props => props.theme.bgColor};
  }
  button {
    font-size: 1rem;
    width: 15%;
  }
  @media screen and (max-width: 800px) {
    input {width: 70%;}
    button {width: 20%;}
  }
`
const Btns = styled.section`
  display: flex;
  justify-content: center;
  button {
    margin: 2rem 1rem 0 1rem;
    width: 15vw;
    height: 5vh;
    &.inactive {
      background-color: ${props => props.theme.inactiveBtnColor};
      span {
        background-color: ${props => props.theme.hoverInactiveBtnColor};
      }
    }
  }
  @media screen and (max-width: 800px) {
    padding-bottom: 70px;
    button {
      height: 4vh;
    }
  }
`

export default CommunityDetail;