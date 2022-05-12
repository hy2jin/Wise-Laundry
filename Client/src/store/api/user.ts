import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = process.env.REACT_APP_BASEURL

const token = sessionStorage.getItem('token')

const apiClient = axios.create({
  baseURL: baseURL,
  headers:{
    "Content-type": "application/json",
    'Authorization':`Bearer ${token}`
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
  return response.data
}

export const getLogout = async () => {
  const response = await apiClient.post<any>(
    '/user/logout',
  ) 
  return response.data
}


export const postSignUp = async (formdata:any) => {
  const response = await apiNoneTokenClient.post<any>(
    '/user/signup',
    formdata
  )
  return response.data
}

export const getNickcheck = async (userNick: string) => {
  const response = await apiNoneTokenClient.get<any>(
    '/user/nickcheck',
  )
  return response.data
}

export const getEmailcheck = async (userEmail: string) => {
  const response = await apiNoneTokenClient.get<any>(
    `/user/emailcheck?email=${userEmail}`,
  )
  return response.data
}

export const getUserInfo = async () => {
  const response = await apiClient.get<any>(
    '/user/info',
  )
  return response.data
}

export const getKakaoLogin = async (code:any) => {
  const response = await apiNoneTokenClient.get<any>(
    `/oauth/login?code=${code}`,
  )
  return response.data
}

export const getNicknamecheck = async (userNick: string) => {
  const response = await apiNoneTokenClient.get<any>(
    `/user/nickcheck?nick=${userNick}`,
  )
  return response.data
}


export const putUpdateUserInfo = async (formdata:any) => {
  const response = await apiClient.put<any>(
    '/user/update',
    formdata
  )
  return response.data
}

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      sessionStorage.clear()
      Swal.fire({
        icon: 'error',
        text: '로그인 후 사용해주세요',
        confirmButtonText: '확인',
        confirmButtonColor: 'red',
      })
      .then(() => window.location.href = '/login')
    }
    return Promise.reject(err)
  }
)


apiNoneTokenClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      sessionStorage.clear()
      Swal.fire({
        icon: 'error',
        text: '로그인 정보를 확인해주세요',
        confirmButtonText: '확인',
        confirmButtonColor: 'red',
      })
      .then(() => window.location.href = '/login')
    }
    return Promise.reject(err)
  }
)