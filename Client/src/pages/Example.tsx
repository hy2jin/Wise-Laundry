import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getProductNew } from '../store/api/product';
import { itemState } from '../store/state/product';



const Example = () => {
  const navigate = useNavigate();
  const [allitems, setAllitems] = useRecoilState(itemState);

  useEffect(() => {
    getProductNew()
    .then((res) => {
      setAllitems(res)
    })
    .catch((err)=>{
      console.log('왜 안되지')
    })
  }, []);

  return (
    <div>
      {allitems.length>0 ? (
        allitems.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <img
                alt="no"
                style={{ height: "100px" }}
                src={item.productThumbnailUrl}
              />
              <p >{item.productTitle}</p>
            </div>
          );
        })
      ) : (
        <p>정보없음</p>
      )}
    </div>
  );
};

export default Example