/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getCareLabel } from '../../store/api/laundry'
import { themeState } from '../../store/state/theme';
import { labelState, defaultLabelState } from '../../store/state/laundry'
import Okay from './Okay'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Swal from 'sweetalert2'

interface Istate {
  detectLabel: {
    bbox: number[]
    class: number
    label: string
    score: string
  }
  label : {
    careLabelId: number
    careLabelName: string
    careLabel: string
  }
}

const OkayStart = () => {
  const navigate = useNavigate()
  const [myLabels, setMyLabels] = useState<string[]>([])
  const [defaultLabels, setDefaultLabels] = useRecoilState(defaultLabelState)
  const [careLabels, setCareLabels] = useRecoilState(labelState)
  const [theme] = useRecoilState(themeState)

  const updateLabels = (arr: Istate["detectLabel"][]) => {
    const newArr = arr.filter(v => !myLabels.includes(v.label))
    if (newArr.length > 0) {
      console.log('🎲newArr:\n', newArr);

      const newMy = newArr.map(v => v.label)
      setMyLabels([...myLabels, ...newMy])

      newMy.map(nv => {
        const lab = defaultLabels.filter(dv => dv.careLabelName === nv)
        console.log('🎲🎲lab:\n', lab[0]);
        setCareLabels([...careLabels, lab[0]])
        return lab[0]
      })
    }
  }

  const delLabel = (v: Istate["label"]) => {
    setMyLabels(myLabels.filter(mv => mv !== v.careLabelName))
    setCareLabels(careLabels.filter(cv => cv.careLabelId !== v.careLabelId))
  }

  const handleBtn = () => {
    const token = sessionStorage.getItem('token')
    if (!!token) {
      Swal.fire({
        icon: 'success',
        text: '옷 등록 페이지로 이동합니다',
        showConfirmButton: false,
        timer: 1000
      })
      .then(() => navigate('/laundry/create'))
    } else {
      console.log('로그인으로 ㄱㄱ')
    }
  }

  useEffect(() => {
    if (!defaultLabels.length) {
      getCareLabel()
      .then(res => {
        setDefaultLabels(res.list)
        console.log('🎲res.list:\n', res.list);
      })
    }
    return () => {
      setMyLabels([])
      setCareLabels([])
    }
  }, [])

  return (
    <Wrapper>
      <Okay updateLabels={updateLabels} />
      <Labels>
        {careLabels.map((v, i) =>
        <span className='label' key={i}
          style={{ backgroundColor: `${theme.labelListColor[i%10]}` }}
        >
          <span>{v.careLabel}</span>
          <DoNotDisturbOnIcon onClick={() => delLabel(v)} />
        </span>
        )}
      </Labels>
      <BtnBox>
        <button onClick={() => handleBtn()}><span />옷 등록하기</button>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 0 10vw;
`
const Labels = styled.section`
  user-select: none;
  padding-bottom: 2rem;
  .label {
    padding: .3rem 2rem .3rem .5rem;
    margin-right: 1rem;
    border-radius: 10px 0 10px 0;
    position: relative;
  
    svg {
      cursor: pointer;
      color: red;
      position: absolute;
      top: 1px;
      right: 1.3px;
      &:hover {
        transform: scale(.9);
        transition: .5s;
      }
    }
  }
`
const BtnBox = styled.section`
  text-align: end;
  button {
    position: relative;
    border: none;
    border-radius: 4px;
    z-index: 1;
    overflow: hidden;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    padding: .8rem 1.5rem;
  
    span {
      position: absolute;
      top: 0;
      right: 100%;
      width: 100%;
      height: 100%;
      transition: 0.5s;
      z-index: -1;
      background-color: ${props => props.theme.hoverActiveBtnColor};
    }
  
    &:hover {
      span {
        right: 0;
      }
    }
  }
`

export default OkayStart;