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
    careLabel: string[]
    laundryImg: string
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
  const [allLaundries,setAllLaundries] = useState<Istate['laundry'][]>([])
  const [myLaundries,setMyLaundries] = useState<Istate['laundry'][]>([])
  const [filter,setFilter] = useState('all') // my <=> all
  const [inputText,setInputText] = useState('')
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // submit
    }
  };
  const [user,getUser] = useRecoilState(userState)

  useEffect(()=>{
    getProductAll().then((res)=>{
      setAllLaundries(res.list)
    })
    getProductMine(user.userId).then((res)=>{
      setMyLaundries(res.list)
    })
  },[])

  return (
    <Wrapper>
      <Header>
        <Title>
          <div id={filter==='all'?'filter':''}onClick={()=>{setFilter('all')}} className='box'>
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
          <SubmitBtn onClick={()=>{}}><SearchIcon/></SubmitBtn>
        </SearchBox>

      </Header>
      <LaundryBox>
        {filter==='my' ? 
          (myLaundries!==null?
          myLaundries.map((laundry,idx)=>{return(<section key={laundry.laundryId}><LaundryCard  laundry={laundry}/></section>)}):
          <p className='no'>아직 등록된 옷이 없어요</p> )
          :
          (allLaundries!==null?
          allLaundries.map((laundry,idx)=>{return(<section key={laundry.laundryId}><LaundryCard  laundry={laundry}/></section>)})
          :
          <p className='no'>아직 등록된 옷이 없어요</p>)
        }
      </LaundryBox>
    </Wrapper>
  );
};

export default LaundryAll;