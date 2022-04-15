import axios from "axios"

const apiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const postProductLike = async (productId : number ) => {
  const response = await apiClient.post<any>(
    `/favorites/${productId}`,
  )
  return response.data
}