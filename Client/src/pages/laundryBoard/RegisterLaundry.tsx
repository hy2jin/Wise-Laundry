import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { detailitem } from './dummy';
import { useNavigate } from 'react-router-dom';
import Label from './Label';
import Info from './Info';
import ImgBox from './ImgBox';
import { AddLaundry } from '../../store/api/laundry';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';

const Wrapper = styled.article`
  width: 70vw;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  svg{
    margin: 30px 0;
    font-size: 4vh;
    color: ${props => props.theme.fontColor};
  }
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 600px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`
const Top = styled.div`
  display: flex;
  @media screen and (max-width: 800px) {
    display: inline;
    margin: auto;
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
 
  @media screen and (max-width: 800px) { 
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
const [laundryInfo,setlaundryInfo] = useState<string[]>([])
const [careLabelName,setcareLabelName] = useState<string[]>([])
  // const [laundryInfo,setlaundryInfo] = useState(['폴로','스웨터','꽈배기','울니트','1992'])
  // const [careLabelName,setcareLabelName] = useState(['세탁불가','다리미','물빨래','손세탁','허리업','비싸요'])
  const [laundryMemo,setLaundryMemo] = useState('')
  const [user,setUser] = useRecoilState(userState)
  const [file, setFile] = useState<any>();
  const navigate = useNavigate()
  const submitLaundry = ()=>{
    const formdata = new FormData()
    formdata.append('laundryRegister',
      new Blob([
        JSON.stringify({
          'laundryInfo':laundryInfo,
          'careLabelName':careLabelName,
          'laundryMemo':laundryMemo,
          'userId':user.userId,
        })
      ],{type:'application/json'})
    )
    formdata.append('file',file)
    AddLaundry(formdata)
  }
  return (
    <Wrapper>
      <KeyboardBackspaceIcon style={{"cursor":"pointer"}} onClick={()=>{navigate('/laundry')}}/>
      <DetailBox>
        <Top>
          <ImgBox file={file} setFile={setFile}   />
          <InfoBox>
            <LabelBox>
              <div className='title'>
                세탁 주의 사항
              </div>
              <div className='careLabel'>
              {careLabelName.map((label,idx)=>{
                return(<Label labels={careLabelName} key={idx} label={label} idx={idx} setLabels={setcareLabelName}/>  )})}
              <Label labels={careLabelName} label={''} idx={-1} setLabels={setcareLabelName}/>
              </div>
            </LabelBox>
            <Information>
              <div className='title'>제품 설명 태그</div>
              <div className='inform'>
                {laundryInfo.map((info,idx)=>{
                  return(
                    <Info infos={laundryInfo} key={idx} info={info} idx={idx} setInfos={setlaundryInfo} />
                  )
                })}
                <Info infos={laundryInfo} info={''} idx={-1} setInfos={setlaundryInfo} />
              </div>
              <div className='gray'>
                <p>옷 태그를 달면 사람들에게 정보가 공유됩니다.</p>
                <p>나와 같은 옷을 찾는 사람들에게 정보를 공유해 보세요.</p>
              </div>
            </Information>
            <input value={laundryMemo} onChange={(e)=>{setLaundryMemo(e.target.value)}}/>
          </InfoBox>
        </Top>
        <ButtonBox>
          <button onClick={()=>{submitLaundry()}} className='saveBtn'>내 옷장에 저장</button>
        </ButtonBox>
      </DetailBox>
    </Wrapper>
  )
}

export default RegisterLaundry