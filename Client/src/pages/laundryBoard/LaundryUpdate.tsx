import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { getLaundryDetail, UpdateLaundry } from '../../store/api/laundry'
import { userState } from '../../store/state/user'
import ImgBox from './ImgBox'
import Label from './Label';
import Info from './Info';

const Wrapper = styled.article`
  width: 70vw;
  margin: auto;
  background-color: ${props => props.theme.bgColor};
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
    width: 35vw;
    margin-left: 3vw;
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
    height: 140px;
    overflow-y: auto;
  }
  .title{
    text-align: center;
    margin-top: 40px;
    font-size: 1.2rem;
    color : ${props => props.theme.activeBtnColor}
  }
  .content{
    margin-left: 20px;
    font-size: 1.3rem;
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
  margin-top: 30px;
  
`
const Infos = styled.div`
  margin: auto;
  width: 80%;
  
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 70px;
  width: 80%;
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
`

const ButtonBox = styled.div`
  margin: auto;
  margin-top: 10px;
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
    laundryImg: string
    careLabel: string[]
    laundryInfo: string[]
    laundryOwnerNick: string
    laundryOwnerId: number
    laundryMemo:string
  }
}

const LaundryUpdate = () => {
  const {laundryId} = useParams()
  useEffect(()=>{
    getLaundryDetail(Number(laundryId)).then((res)=>{
      console.log('받아옴')
      console.log(res.list)
      setLaundry(res.list)
      setlaundryInfo(res.list.laundryInfo)
      setLaundryImg(res.list.laundryImg)
      setcareLabelName(res.list.careLabel)
      setLaundryMemo(res.list.laundryMemo)
    })
  },[])
  const [isLoading,setIsLoading] = useState(true)
  const [laundry,setLaundry] = useState<Istate['laundry']>()
  const [laundryInfo,setlaundryInfo] = useState<string[]>([])
  const [careLabelName,setcareLabelName] = useState<string[]>([])
  const [laundryMemo,setLaundryMemo] = useState('')
  const [laundryImg,setLaundryImg] = useState<string>('')
  const [user,setUser] = useRecoilState(userState)
  const [file, setFile] = useState<any>();
  const navigate = useNavigate()

  const submitLaundry = ()=>{
    const formdata = new FormData()
    formdata.append('laundryModifyPostRep',
      new Blob([
        JSON.stringify({
          'careLabelName':careLabelName,
          'laundryId':laundryId,
          'laundryInfo':laundryInfo,
          'laundryMemo':laundryMemo,
        })
      ],{type:'application/json'})
    )
    formdata.append('file',file)
    UpdateLaundry(formdata)
  }
  useEffect(()=>{
    const newarr =careLabelName.filter((care)=>care!==null)
    setcareLabelName(newarr)
    setIsLoading(false)
  },[laundry])
  useEffect(()=>{
    console.log('인포',laundryInfo)
  },[laundryInfo])
  useEffect(()=>{
    console.log('케어라벨!',careLabelName)
  },[careLabelName])
  return (
    <Wrapper>
      {isLoading ? <div>로딩중</div>:
      <DetailBox>
        <Top>
          <ImgBox laundryImg={laundryImg}  file={file} setFile={setFile}   />
          <InfoBox>
            <LabelBox>
              <div className='title'>
                세탁 주의 사항
              </div>
              <div className='careLabel'>
              {careLabelName.map((label,idx)=>{
                if (label!==null){
                return(<Label labels={careLabelName} key={idx} label={label} idx={idx} setLabels={setcareLabelName}/>  )}})}
              <Label labels={careLabelName} label={''} idx={-1} setLabels={setcareLabelName}/>
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
            <input value={laundryMemo} onChange={(e)=>{setLaundryMemo(e.target.value)}}/>
          </InfoBox>
        </Top>
        <ButtonBox>
          <button onClick={()=>{submitLaundry()}} className='saveBtn'>내 옷장에 저장</button>
        </ButtonBox>
      </DetailBox>}
    </Wrapper>
  )
}
  
  export default LaundryUpdate