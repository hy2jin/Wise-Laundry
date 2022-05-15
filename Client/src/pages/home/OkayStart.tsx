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
import bleach1 from './images/bleach1.png'
import bleach2 from './images/bleach2.png'
import bleach3 from './images/bleach3.png'
import bleach4 from './images/bleach4.png'
import bleach5 from './images/bleach5.png'
import bleach6 from './images/bleach6.png'
import bleach7 from './images/bleach7.png'

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

      const newMy = newArr.map(v => v.label)
      setMyLabels([...myLabels, ...newMy])

      newMy.map(nv => {
        const lab = defaultLabels.filter(dv => dv.careLabelName === nv)
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
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 사용 가능합니다',
        confirmButtonText: '로그인',
        confirmButtonColor: 'orange',
        showDenyButton: true,
        denyButtonText: `취소`,
        denyButtonColor: `gray`,
      })
      .then(({ value }) => {
        if (value) {
          navigate('/login')
        }
      })
    }
  }

  useEffect(() => {
    setMyLabels([])
    setCareLabels([])
    if (!defaultLabels.length) {
      getCareLabel()
      .then(res => {
        setDefaultLabels(res.list)
      })
    }
  }, [])

  const urlArray = [
    'images/laundry1.png',
    'images/laundry2.png',
    'images/laundry3.png',
    'images/laundry4.png',
    'images/bleach1.png',
    'images/bleach2.png',
    'images/bleach3.png',
    'images/bleach4.png',
    'images/bleach5.png',
    'images/bleach6.png',
    'images/bleach7.png',
    'images/dry1.png',
    'images/dry2.png',
    'images/dry3.png',
    'images/dry4.png',
    'images/ironing1.png',
    'images/ironing2.png',
    'images/ironing3.png',
    'images/dmethod1.png',
    'images/dmethod2.png',
    'images/dmethod3.png',
    'images/dmethod4.png',
    'images/dmethod5.png',
    'images/dmethod6.png',
    'images/dmethod7.png',
    'images/dmethod8.png',
  ]

  return (
    <Wrapper>
      <Okay updateLabels={updateLabels} />
      {myLabels.length > 0 && <div className='care-label'>세탁 라벨</div>}
      <Labels>
        {careLabels.map((v, i) => {
          const url = process.env.PUBLIC_URL + urlArray[v.careLabelId-1]
          return (
            <LabelBox key={i}
              style={{ backgroundColor: `${theme.labelListColor[i%10]}` }}
            >
              <img src={url} alt='label' />
              {/* <div style={{backgroundImage: `url(${url})`}} /> */}
              {/* <img src={url} alt='label' /> */}
              <span>{v.careLabel}</span>
              <DoNotDisturbOnIcon onClick={() => delLabel(v)} />
            </LabelBox>
          )
        }
        )}
      </Labels>
      <BtnBox>
        <button onClick={() => handleBtn()}><span />옷 등록하기</button>
      </BtnBox>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .care-label {
    width: 500px;
    font-size: 1.5rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1rem;
    @media screen and (max-width: 800px) {
      width: 300px;
    }
  }
`
const Labels = styled.section`
  margin: 0 auto;
  user-select: none;
  width: 500px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 800px) {
    width: 300px;
  }
`
const LabelBox = styled.div`
  padding: .3rem 2rem .3rem .5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px 0 10px 0;
  position: relative;

  div {
    width: 3rem;
    height: 3rem;
  }

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

  @media screen and (max-width: 800px) {
    margin-bottom: .7rem;
  }
`
const BtnBox = styled.section`
  margin-top: 1rem;
  text-align: center;
  button {
    font-size: 1.5rem;
    position: relative;
    border: none;
    border-radius: 4px;
    z-index: 1;
    overflow: hidden;
    color: white;
    background-color: ${props => props.theme.activeBtnColor};
    padding: .8rem 0;
    width: 500px;
  
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

  @media screen and (max-width: 800px) {
    margin-top: .8rem;
    button {
      font-size: 1rem;
      width: 300px;
    }
  }
`

export default OkayStart;