import axios from "axios"
import Swal from 'sweetalert2'

const baseURL = process.env.REACT_APP_BASEURL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json"
  },
}); 
apiClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)
const fileApiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});
fileApiClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)

export const getProductAll = async () => {
  const response = await apiClient.get<any>(
    '/laundry/all/', 
  );
  return response.data
}

export const getProductMine = async (userId:number) => {
  const response = await apiClient.get<any>(
    `/laundry/${userId}/all`, 
  );
  return response.data
}

export const getLaundryDetail = async (laundryId:number) => {
  const response = await apiClient.get<any>(
    `/laundry/${laundryId}/`, 
  );
  return response.data
}



export const deleteLaundry = async (laundryId:number) => {
  const response = await apiClient.delete<any>(
    `/laundry/${laundryId}/`, 
  );
  return response.data
}

export const AddLaundry = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    '/laundry',
    formdata
  )
  return response.data
}

export const UpdateLaundry = async (formdata:any) => {
  const response = await fileApiClient.put<any>(
    '/laundry/',
    formdata
  )
  return response.data
}
export const getCareLabel = async ()=>{
  const response = await fileApiClient.get<any>(
    '/laundry/carelabel'
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
fileApiClient.interceptors.response.use(
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