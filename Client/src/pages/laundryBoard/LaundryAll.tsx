import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LaundryCard from './LaundryCard';
import { items as itms } from './dummy';
import { items2 as itms2 } from './dummy';
import styled from 'styled-components';
interface Istate{
  laundry:{
    laundryId: number
    careLabel: string[]
    laundryImg: string
  }
}

const Wrapper = styled.article`
  width: 70vw;
  /* background-color: yellow; */
  margin: auto;
`

const Title = styled.div`
  display: flex;
  /* margin-top: 5vh; */
  p{
    font-size: 25px;
    margin-left: 5vh;
    cursor: pointer;
  }
  #filter{
    color :  ${props => props.theme.activeBtnColor}; 
  }
`
const SearchBar = styled.section`
  height: 25px;
  padding: 0.8rem;
  border: 2px solid #ACAAAA;
  border-radius: 10px;
  display: flex;
  svg{
    font-size: 1.8rem;
    margin-top: -2px;
    color:${props => props.theme.fontColor};
  }
  div {
    height: 100%;
    width: 2.5px;
    background-color: #a9a9a9;
    margin: 0 .8rem;
  }
  input {
    border: none;
    width: 100%;
    font-size: 1rem;
    background-color:${props => props.theme.bgColor};
    &:focus { outline: none; }
    &::placeholder { 
      font-size: 0.8rem;
      color: #a9a9a9; 
    }
  }
`

const LaundryBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  section{
    margin-left: 1vw;
    margin-right: 1vw;
  }
`
const LaundryAll = () => {
  const [myLaundries,setMyLaundries] = useState<Istate['laundry'][]>(itms)
  const [allLaundries,setAllLaundries] = useState<Istate['laundry'][]>(itms2)
  const [filter,setFilter] = useState('my') // my <=> all
  const [inputText,setInputText] = useState('')
  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // submit
    }
  };
  useEffect(()=>{
    // setLaundries , setAllLaundries
  },[])

  return (
    <Wrapper>
      <Title>
        <p id={filter==='my'?'filter':''} onClick={()=>{setFilter('my')}}>내 옷장</p>
        <p id={filter==='all'?'filter':''}onClick={()=>{setFilter('all')}}>세탁정보 공유</p>
      </Title>

      <SearchBar>
        <SearchIcon
        />
        <div />
        <input 
          value={inputText} 
          placeholder='Search title or laundry, and Press Enter' 
          onChange={e => setInputText(e.target.value)} 
          onKeyUp={e => handleEnter(e)} />
      </SearchBar>

      <LaundryBox>
        {filter==='my' ? 
          myLaundries.map((laundry,idx)=>{return(<section key={laundry.laundryId}><LaundryCard  laundry={laundry}/></section>)}):
          allLaundries.map((laundry,idx)=>{return(<section key={laundry.laundryId}><LaundryCard  laundry={laundry}/></section>)})
        }
      </LaundryBox>
    </Wrapper>
  );
};

export default LaundryAll;