import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteLaundry, getLaundryDetail } from '../../store/api/laundry';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';

const Wrapper = styled.article`
  width: 80vw;
  max-width: 1200px;
  min-width: 280px;
  margin: auto;
  margin-top: 1vh;
  background-color: ${props => props.theme.bgColor};
  overflow-x: hidden;

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
  height: 700px;
  box-shadow: ${props => props.theme.boxShadowBox} ;
  /* border-radius: 50px 0 50px 0; */
  margin-top: 10vh;
  @media screen and (max-width: 800px) {
    height: auto;
    margin-top: 0;
  }
`
const Top = styled.div`
  display: flex;
  img{
    height: 500px;
    width: 50vw;
    margin-left: 3vw;
    margin-top: 10vh;
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
    margin-top: 20px;
    justify-content: center;
    padding-right: 20px;
    height: 100px;
    overflow-y: auto;
    @media screen and (max-width: 800px) { 
    height: auto;
    }
  }
  .title{
    text-align: center;
    margin: auto;
    margin-top: 40px;
    font-size: 1.2rem;
    width: 200px;
    color : ${props => props.theme.activeBtnColor};
    padding-bottom: 15px;
    border-bottom: 2px solid #275788;
  }
  .content{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 1.3rem;
  }
`
const Info = styled.div`
  margin: auto;
  width: 60%;
  @media screen and (max-width: 800px) { 
    height: auto;
    width: 90%;
  }
`
const LabelBox = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 60%;
  height: 220px;
  overflow-y: auto;
  .careLabel{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;
    justify-content: center;
  }
  @media screen and (max-width: 800px) { 
    height: auto;
    width: 90%;

  }
`
const Label = styled.div`
  color: black;
  height:1rem;
  margin: 10px 5px 0 5px;
  padding: 5px 5px 3px 5px;
  border-radius:5px 0 5px 0;
  font-size: 0.8rem;
  background-color: #e9f9fb;
  align-items: center;
  p{
    margin-top: 1px;
  }
  
  &#label1{
    background-color: #82d64a;
  }
  &#label2{
    background-color: #f2be70;
  }
  &#label3{
    background-color: #f4ffac;
  }
  &#label4{
    background-color: #fea5e6;
  }
  &#label5{
    background-color: #fdce8d;
  }
  &#label6{
    background-color: #ccffa8;
  }
  &#label7{
    background-color: #5bc9b9;
  }
  &#label8{
    background-color: #eaf69d;
  }
  &#label9{
    background-color: #fba7e5;
  }
  &#label10{
    background-color: #fc6ce4;
  }
  &#label11{
    background-color: #e3a44c;
  }
  &#label12{
    background-color: #cccfa3;
  }
  &#label13{
    background-color: #5fbe7a;
  }
  &#label14{
    background-color: #b49bff;
  }
  &#label15{
    background-color: #7346fd;
  }
`
const ButtonBox = styled.div`
  width: 60vw;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  button{
    width: 300px;
    border: none;
    border-radius: 2px;
    margin-top: 20px;
    height: 50px;
    font-size:1.1rem;
    cursor: pointer;
    color: white;
  }
  @media screen and (max-width: 800px) { 
    button{
    margin-top: 10px;
    height: 30px;
    width: 150px;
    }
  }
  .updateBtn{
    background-color:${props => props.theme.activeBtnColor};
    &:hover{
      background-color: ${props=>props.theme.hoverActiveBtnColor};
    }
  }
  .deleteBtn{
    background-color:#f17388;
    &:hover{
      background-color: #f45872;
    }
  }
`
const Memo = styled.div`
  margin-top: 50px;
  text-align: center;
  .mtitle{
    text-align: center;
    margin: auto;
    font-size: 1.2rem;
    width: 200px;
    color : ${props => props.theme.activeBtnColor};
    padding-bottom: 15px;
    border-bottom: 2px solid #275788;
  }
  .memo{
    padding-left: 10px;
    height: 50px;
    width: 18vw;
    overflow-y: auto;
    word-break:break-all;
    margin: auto;
    margin-top: 30px;
    justify-content: center;
    padding-bottom: 5vh;
    @media screen and (max-width: 800px) { 
    height: auto;
    width: 60%;
    }
  }
`
interface Istate{
  laundry:{
    laundryId: number
    careLabels: {careLabelId: number, careLabelName:string, careLabel:string}[]
    laundryInfo: string[]
    laundryImg: string
    laundryOwnerNick: string
    laundryOwnerId: number
    laundryMemo:string
  }
}

const LaundryDetail = () => {
  const [laundry,setLaundry] = useState<Istate['laundry']>()
  const navigate = useNavigate()
  const {laundryId} = useParams()
  const [user,setUser] = useRecoilState(userState)
  useEffect(()=>{
    getLaundryDetail(Number(laundryId)).then((res)=>{
      setLaundry(res.list)
    })
  },[])
  const imageOnErrorHandler = (
    // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "https://www.pngplay.com/wp-content/uploads/12/Basic-Half-Sleeve-T-Shirt-PNG-Free-File-Download.png";
  };
  const goDelete =()=>{
    Swal.fire({
      title: '정말로 지우시겠습니까?',
      text: "지우면 복구하실 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e66a6a',
      cancelButtonColor: '#5ca4e8',
      confirmButtonText: '네 지울래요!',
      cancelButtonText:'돌아가기',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '삭제완료!',
          '세탁물이 삭제되었습니다.',
          'success'
          )
          deleteLaundry(Number(laundryId))
          navigate(-1)
        }
    })
  }

 
  
  
  return (
    <Wrapper>
      {laundry !==undefined &&
      <DetailBox>
        <Top>
          <img onError={imageOnErrorHandler} alt='옷사진' src={`/images/${laundry.laundryImg}`} />
          <InfoBox>
            <LabelBox>
              <div className='title'>세탁 주의 사항</div>
              <div className='careLabel'>
              {laundry.careLabels.map((label,idx)=>{
                return(<Label id={`label${String(label.careLabelId)}`} key={idx} className='label'> {label.careLabel}</Label>)})}
              </div>
            </LabelBox>
            <Info>
              <div className='title'>제품 설명 태그</div>
              <div className='inform'>
                {laundry.laundryInfo.map((info,idx)=>{
                  return(
                    <div key={idx} className='content'># {info}</div>
                  )
                })}
              </div>
            </Info>
            <Memo>
              <div className='mtitle'>메모 </div>
              <div className='memo'>
                {laundry.laundryMemo}
              </div>
            </Memo>
          </InfoBox>
        </Top>
      </DetailBox>
      }
      {laundry !==undefined &&user.userId ===laundry.laundryOwnerId &&
      <ButtonBox>
        <button className='updateBtn' onClick={()=>{navigate(`/laundry/${laundryId}/update`)}}>수정하기</button>
        <button className='deleteBtn' 
        onClick={()=>{ goDelete()}}>
          삭제하기</button>
      </ButtonBox>}
    </Wrapper>
  );
};

export default LaundryDetail;