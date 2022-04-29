/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../store/state/theme';
import { getCommunityDetail, postComment, delComment, delBoard } from '../../store/api/community';
import defaultImg from './images/ironing.png'

interface Istate {
  board: {
    boardId: number,
    userId: number,
    userNick: string,
    userImg: string,
    boardName: string,
    boardImgs: string[],
    boardContent: string,
    boardDate: number[],
    comments: {
      commentId: number,
      userImg: string,
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
  const [theme, setTheme] = useRecoilState(themeState)
  const [inputText, setInputText] = useState('')
  const [board, setBoard] = useState<Istate['board']>({
    boardId: 0,
    userId: 0,
    userNick: '',
    userImg: '',
    boardName: '',
    boardImgs: [],
    boardContent: '',
    boardDate: [],
    comments: [
      {
        commentId: 0,
        userImg: '',
        userNick: '',
        userId: 0,
        commentContent: '',
        commentDate: [],
        message: ''
      }
    ]
  })
  const [imgIdx, setImgIdx] = useState(0)

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createComment()
    }
  }
  const deleteBoard = () => {
    delBoard(Number(boardId))
    .then(() => {
      // console.log(`${boardId}번 글 삭제 성공🎲`);
      navigate('/community')
    })
    .catch(err => {
      console.log('deleteBoard error:🎲', err)
    })
  }
  const createComment = () => {
    const data = {
      userId: 15,
      boardId: boardId,
      commentContent: inputText
    }
    postComment(data)
    .then(res => {
      setBoard({...board, comments: [...board.comments, res]})
    })
    .catch(err => {
      console.log('createComment error:🎲', err)
    })
    setInputText('')
  }
  const deleteComment = (commentId: number) => {
    delComment(commentId)
    .then(() => {
      const newComments = board.comments.filter(c => c.commentId !== commentId)
      setBoard({...board, comments: newComments})
    })
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

  useEffect(() => {
    getCommunityDetail(Number(boardId))
    .then(res => {
      setBoard(res)
      // setBoard({...res, boardImgs: [
      //   'https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?w=2000',
      //   'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
      //   'https://cdn.custom-cursor.com/cursors/pack2069.png',
      //   'https://i.ytimg.com/vi/nGIYtetr2u0/maxresdefault.jpg'
      // ]})
      console.log('🎲getCommunityDetail: ', res);
    })
    .catch(err => {
      console.log('getCommunityDetail err:🎲', err)
    })
  }, [boardId])

  return (
    <Wrapper>
      <Board>
        <BoardContent>
          {board.boardImgs.length > 0 ?
          (<div className='top'>
            <img src={board.boardImgs[imgIdx]} alt={`사진${imgIdx+1}`} />
            {board.boardImgs.length > 1 && <>
            <div className='left' onClick={() => changeIdx(-1)}>◀</div>
            <div className='right' onClick={() => changeIdx(1)}>▶</div>
            </>}
          </div>) :
          (<div className='top-no'>
            이미지가 없습니다❌
          </div>)
          }
          <div className='middle'>
            <div className='user'>
              <img src={board.userImg || defaultImg} alt='프로필' />
              <p>{board.userNick}</p>
            </div>
            <p className='date'>작성일 : {board.boardDate[0]}.{board.boardDate[1]}.{board.boardDate[2]}</p>
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
          {board.comments.map((comment, i) => (
            <div className='comment' key={i}>
              <img src={comment.userImg || defaultImg} alt='프로필' />
              <div className='content' style={{backgroundColor: `${theme.listBgColor[i%3]}`}}>
                <p>{comment.commentContent}</p>
                {comment.userId === 10 && 
                <RemoveCircleOutlineIcon onClick={() => deleteComment(comment.commentId)} />
                }
              </div>
              <p>{String(comment.commentDate[0]).slice(-2)}.{comment.commentDate[1]}.{comment.commentDate[2]}</p>
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
        <button className='inactive' onClick={() => deleteBoard()}>삭제</button>
      </Btns>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 50vw;
  margin: auto;
  padding: 3rem 0;
  @media screen and (max-width: 1400px) {
    width: 70vw;
  }
  @media screen and (max-width: 800px) {
    width: 80vw;
    padding: 0;
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
    padding-top: 1rem;
    position: relative;
    img {
      width: 100%;
      /* aspect-ratio: 1/1; */
    }
    div {
      position: absolute;
      top: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      &.left {
        left: -2rem;
      }
      &.right {
        right: -2rem;
      }
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
    background-color: ${props => props.theme.bgColor};
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
const Btns = styled.section`
  display: flex;
  justify-content: center;
  button {
    margin: 2rem 1rem 0 1rem;
    width: 15vw;
    height: 5vh;
    border: none;
    border-radius: 4px;
    color: white;
    &.active {
      background-color: ${props => props.theme.activeBtnColor};
    }
    &.inactive {
      background-color: ${props => props.theme.inactiveBtnColor};
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