import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getProductNew } from '../store/api/product';
import { postProductLike } from '../store/state/product';



const Example = () => {
  const item = {productId:3}
  const navigate = useNavigate()
  const { isLoading:ILC, data:allitems } = useQuery<any>(
    "getProductNew",
    async () => {return (await (getProductNew()))},
  );
  const addLike = useMutation<any, Error>(
    "addLike",
    async () => {
      return await postProductLike(item.productId);
    },
    {
      onSuccess: async (res) => {
        console.log("좋아요 성공", res);
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
        console.log(err, "에러발생");
      },
    }
  ); 
  
  return (
    <div>
      {allitems!==undefined ?
        allitems.map((item:any,idx:number)=>{
          return(<>
            <img alt='no' style={{height:"100px"}} src={item.productThumbnailUrl}/>
          <p key={idx}>{item.productTitle}</p>
          </>)
        }):<p>정보없음</p>
      }</div>
  )
}

export default Example