import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL
const token = sessionStorage.getItem('token')

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    'Authorization':`Bearer ${token}`
  },
}); 
const fileApiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization':`Bearer ${token}`
  },
});

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
  console.log('삭제되었다.')
  return response.data
}

export const AddLaundry = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    '/laundry',
    formdata
  )
  console.log('등록되었다!')
  return response.data
}

export const UpdateLaundry = async (formdata:any) => {
  const response = await fileApiClient.put<any>(
    '/laundry/',
    formdata
  )
  console.log('수정되었다!')
  return response.data
}
export const getCareLabel = async ()=>{
  const response = await fileApiClient.get<any>(
    '/laundry/carelabel'
  )
  console.log('CARELABEL')
  return response.data
}