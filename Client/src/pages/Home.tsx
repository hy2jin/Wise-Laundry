import React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../store/state/user'

const Home = () => {
  const [user,setUser] = useRecoilState(userState)
  return (
    <div>
      <h1>Home</h1>
      <p>{user.id}</p>
      <button onClick={()=>{setUser({...user,id:500})}}>클릭!</button>
      <button onClick={()=>{setUser({...user,id:200})}}>클릭2!</button>
    </div>
  )
}

export default Home