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
  background-color: seashell;
  margin: 4vh;
  p {margin: 0;}
`
const TitleInput = styled.label`
  height: 2rem;
  display: flex;
  p {
    line-height: 2rem;
    width: 20%;
  }
  input {
    width: 80%;
  }
`
const ImgInput = styled.label`
  height: 2rem;
  line-height: 2rem;
  display: flex;
  p {
    width: 20%;
  }
  div {
    width: 80%;
  }
`

const CommunityCreate = () => {
  const { boardId } = useParams()
  const [board, setBoard] = useState<Istate['board']>({
    boardId: 0,
    userId: 0,
    boardName: '',
    boardImg: '',
    boardContent: '',
  })
  const [uploadImg, setUploadImg] = useState('')
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
        setUploadImg(file.name)
        reader.readAsDataURL(file)
      }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper>
      <form>
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
          <div>{uploadImg}</div>
        </ImgInput>
      </form>
    </Wrapper>
  );
};

export default CommunityCreate;