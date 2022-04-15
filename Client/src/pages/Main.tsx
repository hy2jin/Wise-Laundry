import React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../store/state/user'

const Main = () => {
  const [user,setUser] = useRecoilState(userState)
  return (
    <div>{user.id}</div>
  )
}

export default Main