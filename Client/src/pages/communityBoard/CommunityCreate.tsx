/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';
import { postBoard } from '../../store/api/community';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface Istate {
  board: {
    boardName: string,
    boardContent: string,
  },
  viewImgs: string[]
}

const CommunityCreate = () => {

  const navigate = useNavigate()
  const [user, setUser] = useRecoilState(userState)
  const [board, setBoard] = useState<Istate['board']>({
    boardName: '',
    boardContent: '',
  })
  const [viewImgs, setViewImgs] = useState<Istate['viewImgs']>([])
  const [fileList, setFileList] = useState<FileList | undefined>()

  const onChangeFiles= (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e
    if (files != null) {
      if (files.length + viewImgs.length < 6) {
        setFileList(files)
        const nowImageUrlList = [...viewImgs]
        Array.from(files).map((file: File) => {
          // console.log('🎲🎲file: ', file);
          nowImageUrlList.push(URL.createObjectURL(file))
        })
        setViewImgs(nowImageUrlList)
      } else {
        Swal.fire({
          icon: 'warning',
          text: '최대 5개의 이미지만 올릴 수 있습니다',
          confirmButtonText: '확인',
          confirmButtonColor: 'orange',
        })
      }
    }
  }

  const makeFormData = () => {
    let formData = new FormData()
    const newData = {
      ...board,
      userId: user.userId
    }
    formData.append(
      "body",
      new Blob([JSON.stringify(newData)], {type: "application/json"})
    )
    if (fileList != null) {
      Array.from(fileList).forEach((f, i) => {
        if (i < 5) {
          formData.append("file", f)
        }
      })
    }
    return formData
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!!!board.boardName.trim() || !!!board.boardContent.trim()) {
      Swal.fire({
        icon: 'warning',
        text: '빈 칸을 채워주세요',
        confirmButtonText: '확인',
        confirmButtonColor: 'orange',
      })
    } else {
      const form = makeFormData()
      postBoard(form)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: `${board.boardName}`,
          text: '글을 작성했습니다',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log('🎲postBoard: ', res);
        navigate(`/community/${res.boardId}`)
      })
      .catch(err => console.log('postBoard err:💧', err))
    }
  }

  const throwImg = (idx: number) => {
    setViewImgs(viewImgs.filter((v, i) => i !== idx))
    if (fileList) {
      const dataTransfer = new DataTransfer()
      Array.from(fileList)
      .filter((v, i) => i !== idx)
      .forEach(file => {
        dataTransfer.items.add(file)
      })
      setFileList(dataTransfer.files)
    }
  }

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)} style={{height: '100%'}}>
        <input type='file' id='image' accept="image/jpg, image/png, image/jpeg"
          onChange={e => onChangeFiles(e)} style={{display: 'none'}} multiple
        />
        <TitleBox htmlFor='title'>
          <p>제목</p>
          <input value={board.boardName} id='title'
            onChange={e => setBoard({...board, boardName: e.target.value})}
          />
        </TitleBox>
        <ImgBox>
          <p>이미지</p>
          <ImgViewBox>
            <label htmlFor='image' className='imgbtn'>
              <CameraAltIcon />
              <p className='imgcnt'>{viewImgs.length}/5</p>
            </label>
            {viewImgs.map((url, idx) => 
            <div className='img' key={idx}>
              <img src={url} alt='옷' />
              <RemoveCircleIcon onClick={() => throwImg(idx)} />
            </div>
            )}
          </ImgViewBox>
        </ImgBox>
        <ContentBox htmlFor='content'>
          <p>내용</p>
          <textarea value={board.boardContent} id='content'
            onChange={e => setBoard({...board, boardContent: e.target.value})}
          />
        </ContentBox>
      </form>
      <Buttons>
        <button className='active' onClick={(e) => handleSubmit(e)}><span />등록</button>
        <button className='inactive' onClick={() => navigate('/community')}><span />취소</button>
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
  @media screen and (max-width: 800px) {
    margin: 4vh 1rem;
  }
`
const TitleBox = styled.label`
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
const ImgBox = styled.div`
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
const ImgViewBox = styled.label`
  width: 90%;
  display: flex;
  align-items: center;

  overflow-x: scroll;
  overflow-y: hidden;

  .imgbtn {
    cursor: pointer;
    height: 90%;
    aspect-ratio: 1/1;
    border: 1px solid #ACAAAA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 150%;
    }
    .imgcnt {
      margin: 0;
      line-height: normal;
      width: auto;
    }
  }
  .img {
    height: 80%;
    margin-left: 1rem;
    position: relative;
    img {
      height: 100%;
    }
    svg {
      color: red;
      position: absolute;
      top: -0.7rem;
      right: -0.7rem;
    }
    @media screen and (max-width: 800px) {
      width: 80%;
    }
  }
`
const ContentBox = styled.label`
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
    width: 20vw;
    height: 5vh;
    margin: 1rem;
    &.inactive {
      background-color: ${props => props.theme.inactiveBtnColor};
      span {
        background-color: ${props => props.theme.hoverInactiveBtnColor};
      }
    }
  }
  @media screen and (max-width: 800px) {
    justify-content: space-between;
    button {
      margin: 1rem 0;
      width: 42vw;
    }
  }
`

export default CommunityCreate;