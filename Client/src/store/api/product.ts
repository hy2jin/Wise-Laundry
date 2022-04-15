import axios from "axios"

const apiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
}); 

export const getProductNew =async () => {
  const response = await apiClient.get<any>(
    '/products/all/new', 
  );
  return response.data
}