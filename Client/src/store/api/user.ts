import axios from 'axios'

const baseURL = process.env.REACT_APP_BASEURL

// const setToken = () => {
//   const token = localStorage.getItem('jwt')
//   const config = {
//     Authorization:`Bearer ${token}`
//   }
//   return config
// }

const token = sessionStorage.getItem('jwt')

const apiClient = axios.create({
  baseURL: baseURL,
  headers:{
    "Content-type": "application/json",
    'Authorization':`Bearer ${token}`
  }
})

export const postLogin = async (id:string, password:string) => {
  const response = await apiClient.post<any>(
    '/users/login',
    {
      'id':id,
      'password':password,
    }
  ) 
  console.log('로그인진행중')
  return response.data
}

export const getLogout = async () => {
  const response = await apiClient.post<any>(
    '/users/logout',
  ) 
  console.log('로그아웃진행중')
  return response.data
}

