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

  // const urlArray = [
  //   'images/laundry1.png',
  //   'images/laundry2.png',
  //   'images/laundry3.png',
  //   'images/laundry4.png',
  //   'images/bleach1.png',
  //   'images/bleach2.png',
  //   'images/bleach3.png',
  //   'images/bleach4.png',
  //   'images/bleach5.png',
  //   'images/bleach6.png',
  //   'images/bleach7.png',
  //   'images/dry1.png',
  //   'images/dry2.png',
  //   'images/dry3.png',
  //   'images/dry4.png',
  //   'images/ironing1.png',
  //   'images/ironing2.png',
  //   'images/ironing3.png',
  //   'images/dmethod1.png',
  //   'images/dmethod2.png',
  //   'images/dmethod3.png',
  //   'images/dmethod4.png',
  //   'images/dmethod5.png',
  //   'images/dmethod6.png',
  //   'images/dmethod7.png',
  //   'images/dmethod8.png',
  // ]
  const urlArray = [
    'https://i.ibb.co/MsnMSQG/laundry1.png',
    'https://i.ibb.co/mGdBBwH/laundry2.png',
    'https://i.ibb.co/J3wsMNp/laundry3.png',
    'https://i.ibb.co/B6PnQLy/laundry4.png',
    'https://i.ibb.co/B2rbjY8/bleach1.png',
    'https://i.ibb.co/X2CZMYg/bleach2.png',
    'https://i.ibb.co/6yQDDv6/bleach3.png',
    'https://i.ibb.co/YPkYVz8/bleach4.png',
    'https://i.ibb.co/KVXKwFh/bleach5.png',
    'https://i.ibb.co/MgbGqVS/bleach6.png',
    'https://i.ibb.co/b37mmpc/bleach7.png',
    'https://i.ibb.co/JvPLLDz/dry1.png',
    'https://i.ibb.co/QrsqD1s/dry2.png',
    'https://i.ibb.co/gjN0LLR/dry3.png',
    'https://i.ibb.co/Mkt96ZC/dry4.png',
    'https://i.ibb.co/n3mR6Nr/ironing1.png',
    'https://i.ibb.co/HHxp9X9/ironing2.png',
    'https://i.ibb.co/mvfwJQq/ironing3.png',
    'https://i.ibb.co/qkjD5RW/dmethod1.png',
    'https://i.ibb.co/tmww3mc/dmethod2.png',
    'https://i.ibb.co/zX3wf9H/dmethod3.png',
    'https://i.ibb.co/vPzV7qS/dmethod4.png',
    'https://i.ibb.co/nR63MnR/dmethod5.png',
    'https://i.ibb.co/6Z3XTbP/dmethod6.png',
    'https://i.ibb.co/VD5cbv6/dmethod7.png',
    'https://i.ibb.co/ScN39wC/dmethod8.png',
  ]

  return (
    <Wrapper>
      <Okay updateLabels={updateLabels} />
      {myLabels.length > 0 && <div className='care-label'>세탁 라벨</div>}
      <Labels>
        {careLabels.map((v, i) => {
          // const url = process.env.PUBLIC_URL + urlArray[v.careLabelId-1]
          const url = urlArray[v.careLabelId-1]
          return (
            <LabelBox key={i}
              style={{ backgroundColor: `${theme.labelListColor[i%10]}` }}
            >
              <img src={url} alt='label' />
              {/* <div style={{backgroundImage: `url(${url})`}} /> */}
              {/* <img src={url} alt='label' /> */}
              <div className='careLabel'>
                <p>{v.careLabel}</p>
              </div>
              <DoNotDisturbOnIcon onClick={() => delLabel(v)} />
            </LabelBox>
          )
        }
        )}
      </Labels>
      <InfoBox>
        <p>세탁마크를 인식시키고 </p>
        <p>일치하지 않으면 삭제해주세요</p>
        <p>여기에 없는 세탁마크는  </p>
        <p>옷 등록 화면에서 추가 가능합니다  </p>
      </InfoBox>
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
  justify-content:space-around;
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
  width: auto;
  min-width: 150px;
  display: flex;
  img {
    width: 3rem;
    height: 3rem;
  }
  .careLabel{
    text-align: center;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
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
  padding-bottom: 5vh;
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
const InfoBox  = styled.div`
  text-align: center;
`

export default OkayStart;