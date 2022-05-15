/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Label from './Label';
import Info from './Info';
import ImgBox from './ImgBox';
import { AddLaundry, getCareLabel } from '../../store/api/laundry';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';
import { labelState, defaultLabelState } from '../../store/state/laundry';



const LaundryCreate = () => {
  const colors = ['#cffbb2','#90fdec','#f4ffac','#fea5e6','#fdce8d','#ccffa8','#90faea','#eaf69d','#fba7e5','#ffd59b']
  const [laundryInfo,setlaundryInfo] = useState<string[]>([])
  const [careLabels,setCareLabels] = useRecoilState(labelState)
  const [laundryMemo,setLaundryMemo] = useState('')
  const [user] = useRecoilState(userState)
  const [file, setFile] = useState<any>();
  const [careLabelsstate,setCareLabelsstate] = useRecoilState(defaultLabelState)

  const navigate = useNavigate()
  const submitLaundry = ()=>{
    const formdata = new FormData()
    formdata.append('laundryRegister',
      new Blob([
        JSON.stringify({
          'laundryInfo':laundryInfo,
          'careLabels':careLabels,
          'laundryMemo':laundryMemo,
          'userId':user.userId,
        })
      ],{type:'application/json'})
    )
    if(file!==undefined){
      formdata.append('file',file)
    }
    AddLaundry(formdata).then((res)=>{
      navigate(`/laundry`)
    })
  }
  useEffect(()=>{
    if (!!user.userEmail) {
      if (!careLabelsstate) {
        getCareLabel().then((res)=>{
          setCareLabelsstate(res.list)
        })
      }
    } else {
      navigate('/login')
    }
  },[])

  return (
    <Wrapper>
      <DetailBox>
        <Top>
          <ImgBox laundryImg='' file={file} setFile={setFile}   />
          <InfoBox>
            <LabelBox>
              <div className='title'>
                세탁 주의 사항
              </div>
              <div className='careLabel'>
              {careLabels.map((label,idx)=>{
                if (label!==null){
                return(<Label idx={idx} color={colors[idx%10]} careLabels={careLabels} key={idx} label={label} setCareLabels={setCareLabels}/>  )}})}
              <Label color='#f7d9a2' careLabels={careLabels} 
              label={{careLabelId: 0,careLabelName: '',careLabel: ''}} idx={-1} setCareLabels={setCareLabels}/>
              </div>
            </LabelBox>
            <Information>
              <Infos>
                <div className='title'>제품 설명 태그</div>
                <div className='inform'>
                  {laundryInfo.map((info,idx)=>{
                    return(
                      <Info infos={laundryInfo} key={idx} info={info} idx={idx} setInfos={setlaundryInfo} />
                    )
                  })}
                  <Info infos={laundryInfo} info={''} idx={-1} setInfos={setlaundryInfo} />
                </div>
              </Infos>
              <div className='gray'>
                <p>옷 태그를 달면 사람들에게 정보가 공유됩니다.</p>
                <p>나와 같은 옷을 찾는 사람들에게 정보를 공유해 보세요.</p>
              </div>
            </Information>
            <Memo>
            <div className='mtitle'>메모 : </div>
              <textarea className='memo' value={laundryMemo} onChange={(e)=>{setLaundryMemo(e.target.value)}}/>
            </Memo>          
          </InfoBox>
        </Top>
        <ButtonBox>
          <button onClick={()=>{submitLaundry()}} className='saveBtn'>내 옷장에 저장</button>
        </ButtonBox>
      </DetailBox>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 70vw;
  max-width: 1200px;
  min-width: 280px;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
  @media screen and (max-width: 800px) {
    width: 90vw;
  }
  padding-bottom: 20vh;

`
const DetailBox = styled.section`
  background-color: ${props => props.theme.containerColor};
  height: 650px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  border-radius: 10px;
  margin-top: 10vh;
  @media screen and (max-width: 800px) {
    height: auto;
    margin-top: 0;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 400px;
    width: 25vw;
    margin-left: 5vw;
    margin-top: 5vh;
  }
  @media screen and (max-width: 800px) {
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
    justify-content: center;
    padding-right: 20px;
    height: 100px;
    overflow-y: auto;
    @media screen and (max-width: 800px) {
      overflow-y: visible;
    }
  }
  .title{
    text-align: center;
    margin-top: 30px;
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  .content{
    margin-left: 20px;
    font-size: 1.2rem;
  }
`
const Information = styled.div`
  margin: auto;
  width: 80%;

  .gray{
    width: 100%;
    height: 80px;
    overflow-y: hidden;
    margin-top: 15px;
    text-align: center;
    font-size: 0.8rem;
    color:#a9a9a9;
  }

`
const Infos = styled.div`
  margin: auto;
  width: 80%;
  height: 120px;
  overflow-y:auto;
  @media screen and (max-width: 800px) {
    height: auto;
  }
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 50px;
  width: 80%;
  height: 200px;
  overflow-y: auto;
  @media screen and (max-width: 800px) {
      overflow-y: visible;
      min-height: 150px;
      height: auto;
  }
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
`

const ButtonBox = styled.div`
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 50vw;
    border: none;
    border-radius: 10px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
    color: white;
  }
 
  @media screen and (max-width: 800px) { 
    button{
    margin-top: 10px;
    width: 70vw;
    }
  }
  .saveBtn{
    background-color:${props => props.theme.activeBtnColor};
    &:hover{
      background-color: ${props=>props.theme.hoverActiveBtnColor};
    }
  }
`
const Memo = styled.div`
  .mtitle{
    width: 45px;
  }
  margin: auto;
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: center;
  .memo{
    padding-left: 10px;
    height: 50px;
    width: 200px;
    overflow-y: auto;
    word-break:break-all;
    resize: none;
  }
`
export default LaundryCreate