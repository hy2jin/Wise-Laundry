import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  img{
    height: 400px;
    width: 35vw;
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
`

interface IProps {
  file:any
  setFile:React.Dispatch<any>
}

const ImgBox:React.FC<IProps>= ({file,setFile}) => {
  const [fileSrc, setFileSrc] = useState<string>("");
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

  return (
    <Wrapper>
      <img alt='옷' src={fileSrc}/>
      <input
        className="file"
        id="chooseFile"
        type="file"
        onChange={handleFileOnChange}/>
    </Wrapper>
  )
}

export default ImgBox