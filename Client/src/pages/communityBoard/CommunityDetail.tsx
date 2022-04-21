import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { datadetail } from './data'
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { useNavigate } from 'react-router-dom';

interface Istate {
  board: {
    boardId: number,
    userId: number,
    userNick: string,
    userImg: string,
    boardName: string,
    boardImg: string,
    boardContent: string,
    boardDate: string,
    comments: {
      commentId: number,
      userImg: string,
      userNick: string,
      userId: number,
      commentContent: string,
      commentDate: string
    }[]
  }
}

const Wrapper = styled.article`
  margin: 4vh 7vw;
  margin-top: 1rem;
  @media screen and (max-width: 700px) {
    padding-bottom: 7vh;
  }
  `
const Board = styled.section`
  background-color: ${props => props.theme.containerColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 2vh 4vw;
`
const Btns = styled.section`
  display: flex;
  justify-content: center;
  button {
    margin: 2rem 1rem 0 1rem;
    border: none;
    padding: .5rem 1.5rem;
    color: white;
    border-radius: 4px;
    &.active {
      background-color: ${props => props.theme.activeBtnColor};
    }
    &.inactive {
      background-color: ${props => props.theme.inactiveBtnColor};
    }
  }
`
const BoardContent = styled.div`
  .picture {
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: 1rem;
  }
  .top {
    height: 5vh;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
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
  .middle {
    padding: 0 1rem;
    .title {
      font-size: 1.3rem;
    }
  }
`
const Comments = styled.div`
  padding: 0 1rem;
  .comment {
    height: 5vh;
    display: flex;
    margin: 1rem 0;
    img {
      height: 100%;
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
      p {
        overflow: auto;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
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
  }
  button {
    font-size: 1rem;
    border: none;
    width: 15%;
    color: white;
    border-radius: 4px;
    background-color: ${props => props.theme.activeBtnColor};
  }
`

const CommunityDetail = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [board, setBoard] = useState<Istate['board']>({
    boardId: 0,
    userId: 0,
    userNick: '',
    userImg: '',
    boardName: '',
    boardImg: '',
    boardContent: '',
    boardDate: '',
    comments: [
      {
        commentId: 0,
        userImg: '',
        userNick: '',
        userId: 0,
        commentContent: '',
        commentDate: ''
      }
    ]})

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createComment()
    }
  }
  const createComment = () => {
    console.log(`댓글작성 보냅니다아🎷 ${board.boardId}번글에 ${inputText} 라고 쓰기`)
    setInputText('')
  }
  const deleteComment = (boardId: number, commentId: number) => {
    console.log(`댓글 지울게요🎷 ${boardId}번글 ${commentId}번댓글`)
  }

  useEffect(() => {
    setBoard(datadetail)
  }, [])
  return (
    <Wrapper>
      <Board>
        <BoardContent>
          <img className='picture' src={board.boardImg} alt='사진' />
          <div className='top'>
            <div className='user'>
              <img src={board.userImg} alt='이미지' />
              <p>{board.userNick}</p>
            </div>
            <p className='date'>작성일 : {board.boardDate}</p>
          </div>
          <hr />
          <div className='middle'>
            <p className='title'>{board.boardName}</p>
            <p className='content'>{board.boardContent}</p>
          </div>
        </BoardContent>
        <hr />
        <Comments>
          {board.comments.map((comment, i) => (
            <div className='comment' key={i}>
              <img src={comment.userImg} alt='프로필' />
              <div className='content' style={{backgroundColor: `${theme.listBgColor[i%3]}`}}>
                <p>{comment.commentContent}</p>
                {board.userNick === comment.userNick && 
                <RemoveCircleOutlineIcon onClick={() => deleteComment(board.boardId, comment.commentId)} />
                }
              </div>
              <p>{comment.commentDate.slice(-8)}</p>
            </div>
          ))}
        </Comments>
        <CreateComment>
          <input value={inputText} placeholder='댓글을 입력하세요'
            onChange={e => setInputText(e.target.value)} onKeyUp={e => handleKeyUp(e)}
          />
          <button onClick={() => createComment()}>등록</button>
        </CreateComment>
      </Board>
      <Btns>
        <button className='active' onClick={() => navigate('/community')}>목록</button>
        <button className='active' onClick={() => navigate(`/board/${board.boardId}`)}>수정</button>
        <button className='inactive'>삭제</button>
      </Btns>
    </Wrapper>
  );
};

export default CommunityDetail;