import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import 마크1 from './images/마크1.png'
import 마크2 from './images/마크2.png'
interface IProps{
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}
const LabelInfo:React.FC<IProps> = ({setShowModal}) => {
  return (
    <Wrapper>
      <CloseIcon onClick={()=>{setShowModal(false)}} className='close'/>
      <img src={마크1} alt='' />
      <img src={마크2} alt='' />
    </Wrapper>
  )
}

export default LabelInfo

const Wrapper = styled.article`
  position:fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 20vh;
  height: 600px;
  width: 500px;
  background-color: ${props=>props.theme.navColor};
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  .close{
    margin-top: 5px;
    margin-left:90%;
    cursor: pointer;
    color: ${props => props.theme.fontColor};
  }
  img{
    width:490px;
    margin: auto;
  }
  z-index: 1;
  @media screen and (max-width: 800px) {
    width: 290px;
    height: 400px;
    img{
    width: 300px;
    margin: auto;
  }
  }
`