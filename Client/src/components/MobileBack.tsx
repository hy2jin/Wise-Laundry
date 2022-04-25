import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Back = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    padding: 2rem 0 .5rem 3rem;
    display: block;
  }
  svg {
    color: ${props => props.theme.activeBtnColor};
  }
`

const MobileBack = () => {
  const navigate = useNavigate()
  return (
    <Back>
      <ArrowBackIosIcon onClick={() => navigate(-1)} />
    </Back>
  );
};

export default MobileBack;