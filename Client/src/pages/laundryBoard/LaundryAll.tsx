import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LaundryCard from './LaundryCard';
import styled from 'styled-components';
import { getProductAll, getProductMine } from '../../store/api/laundry';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/state/user';

interface Istate{
  laundry:{
    laundryId: number
    laundryImg: string
    careLabel: {careLabelId: number, careLabelName:string, careLabel:string}[]
    laundryInfo: string[]
  }
}
const Wrapper = styled.section`
  padding-bottom: 10vh;
`
const Header = styled.article`
  margin-top: -10px;
  background-color: ${props => props.theme.containerColor};
  width: 100%;
  height: 280px;
`
const Title = styled.div`
  display: flex;
  width: 400px;
  margin: auto;
  color : #63a1ff;
  justify-content: center;
  .box{
    background-color: white;
    border-radius: 10px;
    margin: 40px;
    width: 100px;
    height: 100px;
    text-align: center;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      width: 80px;
      height: 80px;
  }
  }
  p{
    margin-top: 15px;
    margin-bottom: 0;
    font-size: 25px;
    @media screen and (max-width: 800px) {
      font-size: 15px;
  }
  }
  #filter{
    color : white;
    background-color: #63a1ff ;
  }
  @media screen and (max-width: 800px) {
    width:100%;
  }
 
`
const SearchBox = styled.article`
  display: flex;
  margin: auto;
  width: 800px;
  justify-content: center;
 
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`
const SearchBar = styled.section`
  width: 600px;
  height: 25px;
  padding: 14px;
  border: 1px solid #e9e9e9;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgb(32 32 32 / 8%);
  input {
    width: 90%;
    border: none;
    font-size: 1rem;
    background-color: white;
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
    color: #333;
  }
  @media screen and (max-width: 800px) {
    width: 200px;
  }
`

const SubmitBtn = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 15px;
  background-color: #6ca6fd ;
  margin-left: 50px;
  text-align: center;
  cursor: pointer;
  &:hover{
    background-color: #5086d9 ;
  }
  svg{
    font-size: 1.8rem;
    margin-top: 12px;
    color: white;
  }
  @media screen and (max-width: 800px) {
    margin-left: 20px;
  }
`

const LaundryBox = styled.section`
  width: 70vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  section{
    margin-left: 1vw;
    margin-right: 1vw;
  }
  .no{
    font-size: 2rem;
  }
`


const LaundryAll = () => {
  const [allRaw,setAllRaw] = useState<Istate['laundry'][]>([])
  const [myRaw,setMyRaw] = useState<Istate['laundry'][]>([])

  const [allLaundries,setAllLaundries] = useState<Istate['laundry'][]>([])
  const [myLaundries,setMyLaundries] = useState<Istate['laundry'][]>([])


  const [filter,setFilter] = useState('all') // my <=> all
  const [inputText,setInputText] = useState('')
  
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter"){
      search()
    }
  }
  useEffect(()=>{
    const userId = JSON.parse(sessionStorage.getItem('userInfo')||"").userId
    getProductMine(userId).then((res)=>{
      if(res.list===null){
        setMyLaundries([])
        setMyRaw([])
      }
      else{
        setMyLaundries(res.list)
        setMyRaw(res.list)
      }
    })
    getProductAll().then((res)=>{
      if(res.list===null){
        setAllLaundries([])
        setAllRaw([])
      }
      else{
        setAllLaundries(res.list)
      setAllRaw(res.list)
      }
    })
  },[])

  const search = ()=>{
    if (inputText===""){ // 검색창이 비었고
      if (filter==='all'){ // 전체 목록이라면
        if(allRaw!==[])
          setAllLaundries(allRaw)
          else
            setAllLaundries([])
      }
      else{ 
        if(myRaw!==[])
          setMyLaundries(myRaw)
        else setMyLaundries([])
      }
    }
    else{ // 인풋창이 차있고
      if (filter==='all') { // all 일때
        var newlist:Istate['laundry'][] =[]
        if(allRaw!==[]){
          allRaw.map((each)=>{
          each.laundryInfo.map(info=>{
            if ( info.includes(inputText)){
              if(!newlist.includes(each)){
                newlist.push(each)
              }
            }
          })
        })}
        setAllLaundries(newlist)
        }

    if (filter==='my'){
      var newlist:Istate['laundry'][] =[]
      if(myRaw!==[]){
        myRaw.map((each)=>{
        each.careLabel.map(info=>{
          if ( info.careLabel.includes(inputText)){
            if(!newlist.includes(each)){
              newlist.push(each)
            }
          }
        })
      })}
      setMyLaundries(newlist)
      }
    }
  }
  

  useEffect(()=>{
    if(filter==='all'){
      if(allRaw===[])
        setAllLaundries([])
      else
        setAllLaundries(allRaw)
      }
    else{
      if(myRaw===[]){
        setMyLaundries([])    
      }
      else
        setMyLaundries(myRaw)
    }
  },[filter])
  
  return (
    <Wrapper>
      <Header>
        <Title>
          <div id={filter==='all'?'filter':''} onClick={()=>{setFilter('all')}} className='box'>
          <p>모두의</p>
          <p>옷장</p>
          </div>
          <div onClick={()=>{setFilter('my')}} id={filter==='my'?'filter':''} className='box'>
            <p>나만의 </p>
            <p>옷장</p>
          </div>
        </Title>
        <SearchBox>
          <SearchBar>
            <input 
              value={inputText} 
              placeholder='세탁물을 검색하세요' 
              onChange={e => setInputText(e.target.value)} 
              onKeyUp={e => handleEnter(e)} />
          </SearchBar>
          <SubmitBtn onClick={()=>{search()}}><SearchIcon/></SubmitBtn>
        </SearchBox>

      </Header>
      <LaundryBox>
        {filter==='my' &&
          (myLaundries.length===0?
            <p className='no'>아직 등록된 옷이 없어요</p> :
            myLaundries.map((laundry,idx)=>{return(<LaundryCard filter={filter} key={laundry.laundryId}  laundry={laundry}/>)})
        )}
        
        {filter==='all'&&
          (allLaundries.length===0?
            <p className='no'>아직 등록된 옷이 없어요</p>
            :
            allLaundries.map((laundry,idx)=>{return(<LaundryCard key={laundry.laundryId} filter={filter}   laundry={laundry}/>)}))
        }
      </LaundryBox>
    </Wrapper>
  );
};

export default LaundryAll;