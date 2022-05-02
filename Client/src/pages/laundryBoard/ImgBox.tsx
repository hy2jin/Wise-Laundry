import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  label{
    cursor: pointer;
    img{
      height: 400px;
      width: 30vw;
      margin-left: 3vw;
      margin-top: 5vh;
    }
    @media screen and (max-width: 800px) {
      img{
        height: 250px;
        width: 90%;
        margin-top: 2vh;
        margin-left: 5vw;
      }
    }
    .input-box{
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  input{
    display: none;
  }
`

interface IProps {
  file:any
  setFile:React.Dispatch<any>
  laundryImg:string
}

const ImgBox:React.FC<IProps>= ({file,setFile,laundryImg}) => {
  const [fileSrc, setFileSrc] = useState<string>(laundryImg);
  const encodeMainFileToBasek64 = (fileBlob: any) => {
    const reader: any = new FileReader();
    if (fileBlob) {
      reader.readAsDataURL(fileBlob);
    }
    return new Promise(() => {
      reader.onload = () => {
        setFileSrc(reader.result);
      };
    });
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeMainFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };
  const imageOnErrorHandler = (
    // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "https://www.pngplay.com/wp-content/uploads/12/Basic-Half-Sleeve-T-Shirt-PNG-Free-File-Download.png";
  };
  return (
    <Wrapper>
      <section className='input-box'>
        <label  htmlFor="chooseFile">
         <img alt='옷' onError={imageOnErrorHandler} src={fileSrc}/>
        </label>
        <input
          className="file"
          id="chooseFile"
          type="file"
          onChange={handleFileOnChange}/>
      </section>
    </Wrapper>
  )
}

export default ImgBox