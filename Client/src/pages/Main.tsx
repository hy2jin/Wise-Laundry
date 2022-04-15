import React from 'react'
import { useRecoilState } from 'recoil'
import { itemState } from '../store/state/product'
import { userState } from '../store/state/user'

const Main = () => {
  const [user,setUser] = useRecoilState(userState)
  const [allitems, setAllitems] = useRecoilState(itemState);
  return (
    <div>
      {user.id}
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
    
  )
}

export default Main