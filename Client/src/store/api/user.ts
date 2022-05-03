import axios from 'axios'

const baseURL = process.env.REACT_APP_BASEURL

// const setToken = () => {
//   const token = localStorage.getItem('jwt')
//   const config = {
//     Authorization:`Bearer ${token}`
//   }
//   return config
// }

const token = sessionStorage.getItem('token')

const apiClient = axios.create({
  baseURL: baseURL,
  headers:{
    "Content-type": "application/json",
    'Authorization':`Bearer ${token}`
    // 'token':`Bearer ${token}`,
    // 'token': `${token}`,
  }
})

apiClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)

const apiNoneTokenClient = axios.create({
  baseURL: baseURL,
  headers:{
    "Content-type": "application/json",
  }
})

export const postLogin = async (userEmail:string, userPassword:string) => {
  const response = await apiNoneTokenClient.post<any>(
    '/user/login',
    {
      'userEmail': userEmail,
      'userPassword': userPassword,
    }
  ) 
  console.log('로그인 진행중')
  return response.data
}

export const getLogout = async () => {
  const response = await apiClient.post<any>(
    '/user/logout',
  ) 
  console.log('로그아웃 진행중')
  return response.data
}


export const postSignUp = async (formdata:any) => {
  const response = await apiNoneTokenClient.post<any>(
    '/user/signup',
    formdata
  )
  console.log('회원가입 진행중')
  return response.data
}

export const getNickcheck = async (userNick: string) => {
  const response = await apiNoneTokenClient.get<any>(
    '/user/nickcheck',
  )
  console.log('닉네임 중복확인')
  return response.data
}

export const getEmailcheck = async (userEmail: string) => {
  const response = await apiNoneTokenClient.get<any>(
    `/user/emailcheck?email=${userEmail}`,
  )
  console.log('이메일 중복확인')
  return response.data
}

export const getUserInfo = async () => {
  const response = await apiClient.get<any>(
    '/user/info',
  )
  console.log('유저 정보 불러오기')
  return response.data
}

export const getKakaoLogin = async (code:any) => {
  const response = await apiNoneTokenClient.get<any>(
    `https://xn--ok0by6qomhppbr9ieqr.com/api/oauth/login?code=${code}`,
  )
  console.log('카카오 로그인')
  return response.data
}

export const getNicknamecheck = async (userNick: string) => {
  const response = await apiNoneTokenClient.get<any>(
    `/user/nickcheck?nick=${userNick}`,
  )
  console.log('이메일 중복확인')
  return response.data
}

// export const putUpdateUserInfo =async (password: string, userEmail: string, userNick: string) => {
//   const response = await apiClient.put<any>(
//     `/user/update`,
//     {
//       'password': password,
//       'userEmail': userEmail,
//       'userNick': userNick,
//     }
//   )
//   console.log('회원정보 변경 중')
//   return response.data
// }

export const putUpdateUserInfo = async (formdata:any) => {
  const response = await apiClient.put<any>(
    '/user/update',
    formdata
  )
  console.log('회원 정보 변경 중')
  return response.data
}

