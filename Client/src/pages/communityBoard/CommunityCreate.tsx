/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { postBoard, putBoard, getCommunityDetail } from '../../store/api/community';
import { datadetail } from './data';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface Istate {
  board: {
    userId: number,
    boardName: string,
    boardImg: string[],
    boardContent: string,
  }
}

const CommunityCreate = () => {
  const [board, setBoard] = useState<Istate['board']>({
    userId: 0,
    boardName: '',
    boardImg: [],
    boardContent: '',
  })
  const navigate = useNavigate()

  const [fileList, setFileList] = useState<FileList | undefined>()
  const onChangeFiles= (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e
    if (files != null) {
      setFileList(files)
      const nowImageUrlList = [...board.boardImg]
      Array.from(files).map(file => {
        console.log('🎲file: ', file);
        const nowImageUrl = URL.createObjectURL(file)
        nowImageUrlList.push(nowImageUrl)
      })
      setBoard({...board, boardImg: nowImageUrlList})
    }
  }
  const makeFormData = () => {
    let formData = new FormData()
    const content = board.boardContent.replace(/(\n|\r\n)/g, '<br/>')
    const newData = {
      userId: 1,
      boardName: board.boardName,
      boardContent: content
    }
    formData.append(
      "data",
      new Blob([JSON.stringify(newData)], {type: "application/json"})
    )
    if (fileList != null) {
      Array.from(fileList).forEach(f => formData.append("file", f))
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    makeFormData()
    
    // postBoard({...data, userId: board.userId})
    // .then(res => {
    //   navigate(`/community/${board.boardId}`)
    // })
    // .catch(err => {
    //   console.log('postBoard err:', err)
    // })
  }

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)} style={{height: '100%'}}>
        <input type='file' id='image' accept="image/jpg, image/png, image/jpeg"
          onChange={e => onChangeFiles(e)} style={{display: 'none'}} multiple
        />
        <TitleInput htmlFor='title'>
          <p>제목</p>
          <input value={board.boardName} id='title'
            onChange={e => setBoard({...board, boardName: e.target.value})}
          />
        </TitleInput>
        <ImgInput>
          <p>이미지</p>
          <ImgBox>
            <label htmlFor='image' className='imgbtn'>
              <CameraAltIcon />
              <p className='imgcnt'>{board.boardImg.length}/5</p>
            </label>
            {board.boardImg.map((url, idx) => (
              <img src={url} alt='옷' key={idx} />
              ))}
          </ImgBox>
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
const ImgInput = styled.div`
  height: 10rem;
  line-height: 10rem;
  display: flex;
  margin: 1rem 0;
  padding: 0 10vw;
  p {
    width: 10%;
  }
  @media screen and (max-width: 800px) {
    padding: 0;
    p {width: 20%;}
  }
`
const ImgBox = styled.label`
  width: 90%;
  display: flex;
  align-items: center;
  .imgbtn {
    height: 90%;
    aspect-ratio: 1/1;
    border: 1px solid #ACAAAA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2vw;
    }
    .imgcnt {
      margin: 0;
      line-height: normal;
      width: auto;
    }
  }
  img {
    height: 100%;
    margin-left: 1rem;
    @media screen and (max-width: 800px) {
      width: 80%;
    }
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

export default CommunityCreate;