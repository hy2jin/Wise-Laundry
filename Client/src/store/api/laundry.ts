import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL
const token = sessionStorage.getItem('jwt')

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    'Authorization':`Bearer ${token}`
  },
}); 

export const getProductNew = async () => {
  const response = await apiClient.get<any>(
    '/products/all/new', 
  );
  return response.data
}