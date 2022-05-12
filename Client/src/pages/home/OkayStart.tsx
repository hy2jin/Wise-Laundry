import { useState } from 'react';
import styled from 'styled-components';
import Okay from './Okay'

interface Istate {
  detectLabel: {
    bbox: number[]
    class: number
    label: string
    score: string
  }
  tempLabel: {
    class: number
    label: string
  }
}

const OkayStart = () => {
  // const [myLabel, setMyLabel] = useState<string[]>([])

  // const updateArray = (arr: Istate["detectLabel"][]) => {
  //   arr.filter(v => !myLabel.includes(v.label))
  //   setMyLabel(arr.map(v => v.label))
  // }

  const [tmp, setTmp] = useState<string[]>(['a', 'b', 'c'])
  const temp = (arr: Istate["tempLabel"][]) => {
    const aa = arr.filter(v => !tmp.includes(v.label))
    console.log('aa: ', aa);
    const bb = aa.map(v => v.label)
    console.log('bb: ', bb);
    setTmp([...tmp, ...bb])
  }

  return (
    <Wrapper>
      <Okay />
      <button onClick={() => temp([{'class': 0, 'label': 'd'}, {'class': 2, 'label': 'c'}, {'class': 2, 'label': 'f'}])}>test</button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  
`

export default OkayStart;