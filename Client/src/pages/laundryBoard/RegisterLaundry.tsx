import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { detailitem } from './dummy';
import { useNavigate } from 'react-router-dom';
import Label from './Label';
import Info from './Info';

const Wrapper = styled.article`
  width: 70vw;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  svg{
    margin: 30px 0;
    font-size: 4vh;
    color: ${props => props.theme.fontColor};
  }
  @media screen and (max-width:800px) {
    width: 90vw;
  }
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 600px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  @media screen and (max-width:800px) {
    height: auto;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 400px;
    width: 35vw;
    margin-left: 3vw;
    margin-top: 5vh;
  }
  @media screen and (max-width:800px) {
    display: inline;
    margin: auto;
    img{
      height: 250px;
      width: 90%;
      margin-top: 2vh;
      margin-left: 5vw;
    }
  }
`
const InfoBox = styled.div`
  width: 100%;
  .inform{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: center;
    padding-right: 20px;
    width: 100%;
    height: 100px;
    overflow-y: auto;
  }
  .title{
    text-align: center;
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  
`
const Information = styled.div`
  margin: auto;
  width: 80%;
  .gray{
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    margin-top: 5vh;
    text-align: center;
    font-size: 0.9rem;
    color:#a9a9a9;
  }
  margin-top: 30px;
  
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 40px;
  width: 80%;
  height: 100px;
  overflow-y: auto;

  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
`

const ButtonBox = styled.div`
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 50vw;
    border: none;
    border-radius: 10px;
    margin-top: 50px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
  }
 
  @media screen and (max-width:800px) { 
    button{
    margin-top: 10px;
    width: 70vw;
    }
  }
  .saveBtn{
    background-color:${props => props.theme.activeBtnColor};
  }
`
interface Istate{
  laundry:{
    laundryId: number
    careLabel: string[]
    laundryInfo: string[]
    laundryImg: string
    laundryOwnerNick: string
    laundryOwnerId: number
  }
}
const RegisterLaundry = () => {
  const [laundry,setLaundry] = useState<Istate['laundry']>(detailitem)
  const [infos,setInfos] = useState(['폴로','스웨터','꽈배기','울니트','1992'])
  const [labels,setLabels] = useState(['세탁불가','다리미','물빨래','손세탁','허리업','비싸요'])
  const navigate = useNavigate()
  return (
    <Wrapper>
      <KeyboardBackspaceIcon style={{"cursor":"pointer"}} onClick={()=>{navigate('/laundry')}}/>
      <DetailBox>
        <Top>
          <img alt='옷사진' src={laundry.laundryImg}/>
          <InfoBox>
            <LabelBox>
              <div className='title'>
                세탁 주의 사항
              </div>
              <div className='careLabel'>
              {labels.map((label,idx)=>{
                return(<Label labels={labels} key={idx} label={label} idx={idx} setLabels={setLabels}/>  )})}
              <Label labels={labels} label={''} idx={-1} setLabels={setLabels}/>
              </div>
            </LabelBox>
            <Information>
              <div className='title'>제품 설명 태그</div>
              <div className='inform'>
                {infos.map((info,idx)=>{
                  return(
                    <Info infos={infos} key={idx} info={info} idx={idx} setInfos={setInfos} />
                  )
                })}
                <Info infos={infos} info={''} idx={-1} setInfos={setInfos} />
              </div>
              <div className='gray'>
                <p>옷 태그를 달면 사람들에게 정보가 공유됩니다.</p>
                <p>나와 같은 옷을 찾는 사람들에게 정보를 공유해 보세요.</p>
              </div>
            </Information>
          </InfoBox>
        </Top>
        <ButtonBox>
          <button className='saveBtn'>내 옷장에 저장</button>
        </ButtonBox>
      </DetailBox>
    </Wrapper>
  )
}

export default RegisterLaundry