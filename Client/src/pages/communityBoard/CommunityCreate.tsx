/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { datadetail } from './data';

interface Istate {
  board: {
    boardId: number,
    userId: number,
    boardName: string,
    boardImg: string,
    boardContent: string,
  }
}

const Wrapper = styled.article`
  margin: 4vh;
  p {margin: 0;}
  input, textarea {
    padding: .5rem;
  }
`
const TitleInput = styled.label`
  line-height: 5vh;
  display: flex;
  padding: 1rem 10vw;
  p {
    width: 10%;
  }
  input {
    width: 90%;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor};
    border: 2px solid #ACAAAA;
    border-radius: 4px;
  }
  @media screen and (max-width: 800px) {
    padding: 1rem 0;
    p {
      width: 20%;
    }
    input {
      width: 80%;
    }
  }
`
const ImgInput = styled.label`
  height: 10rem;
  line-height: 10rem;
  display: flex;
  margin: 1rem 0;
  padding: 0 10vw;
  p {
    width: 10%;
  }
  img {
    margin: 0 auto;
  }
  @media screen and (max-width: 800px) {
    padding: 0;
    p {width: 20%;}
  }
`
const ContentInput = styled.label`
  display: flex;
  height: 30vh;
  line-height: 30vh;
  padding: 1rem 10vw;
  p {
    width: 10%;
  }
  textarea {
    width: 90%;
    resize: none;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.fontColor};
    border: 2px solid #ACAAAA;
    border-radius: 4px;
  }
  @media screen and (max-width: 800px) {
    padding: 1rem 0;
    p {
      width: 20%;
    }
    textarea {
      width: 80%;
    }
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem 0;
  button {
    width: 15rem;
    margin: 1rem;
    border: none;
    padding: .5rem 0;
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

const CommunityCreate = () => {
  const { boardId } = useParams()
  const [board, setBoard] = useState<Istate['board']>({
    boardId: 0,
    userId: 0,
    boardName: '',
    boardImg: 'https://i.ibb.co/jZwwWFk/2.jpg',
    boardContent: '',
  })

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // BASE64
    let reader = new FileReader()
    reader.onload = e => {
      const imgUrl = reader.result
      if (imgUrl) {
        setBoard({...board, boardImg: imgUrl.toString()})
      }
    }
    const files = e.target.files
    if (files) {
      const file = files[0]
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const content = board.boardContent.replace(/(\n|\r\n)/g, '<br/>')
    setBoard({...board, boardContent: content})
    if (boardId) {
      console.log(`글 수정: ${JSON.stringify(board)}`);
    } else {
      console.log(`글 작성: ${JSON.stringify(board)}`);
    }
  }

  useEffect(() => {
    if (boardId) {
      const data = {
        boardId: datadetail.boardId,
        userId: datadetail.userId,
        boardName: datadetail.boardName,
        boardImg: datadetail.boardImg,
        boardContent: datadetail.boardContent
      }
      setBoard(data)
    }
  }, [])

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)} style={{height: '100%'}}>
        <input type='file' id='image' accept="image/jpg, image/png, image/jpeg"
          onChange={e => fileUpload(e)} style={{display: 'none'}}
        />
        <TitleInput htmlFor='title'>
          <p>제목</p>
          <input value={board.boardName} id='title'
            onChange={e => setBoard({...board, boardName: e.target.value})}
          />
        </TitleInput>
        <ImgInput htmlFor='image'>
          <p>이미지</p>
          <img src={board.boardImg} alt='옷' />
        </ImgInput>
        <ContentInput htmlFor='content'>
          <p>내용</p>
          <textarea value={board.boardContent} id='content'
            onChange={e => setBoard({...board, boardContent: e.target.value})}
          />
        </ContentInput>
      </form>
      <Buttons>
        <button className='active' onClick={(e) => handleSubmit(e)}>등록</button>
        <button className='inactive'>취소</button>
      </Buttons>
    </Wrapper>
  );
};

export default CommunityCreate;