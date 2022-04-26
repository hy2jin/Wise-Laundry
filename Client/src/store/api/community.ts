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

// Infinite Scroll 수정 필요🎲 // CommunityAll
export const getCommunityAll = async () => {
  const response = await apiClient.get<any>(
    '/community/all', 
  )
  console.log('getCommunityAll response: ', response)
  return response.data
}

// CommunityDetail, CommunityCreate
export const getCommunityDetail = async (boardId: number) => {
  const response = await apiClient.get<any>(
    `/community/${boardId}`,
    )
  console.log('getCommunityDetail response: ', response)
  return response.data
}

// 201 => 디테일 페이지로🎲 // CommunityCreate
export const postBoard = async (data: any) => {
  const response = await apiClient.post<any>(
    '/community/create',
    data
    )
  console.log('response: ', response);
  return response.data
}

// 201 => 디테일 페이지로🎲 // CommunityCreate
export const putBoard = async (data: any) => {
  const response = await apiClient.put<any>(
    `community/${data.boardId}`,
    data
    )
  console.log('response: ', response);
  return response.data
}

// 204 => 전체목록 페이지로🎲 // CommunityDetail
export const delBoard = async (boardId: number) => {
  const response = await apiClient.delete<any>(
    `/community/${boardId}`,
    )
  console.log('delBoard response: ', response)
  return response
}

// 응답받은 댓글 추가하기🎲 // CommunityDetail
export const postComment = async (data: any) => {
  const response = await apiClient.post<any>(
    '/community/comment/create',
    data
  )
  console.log('postComment response: ', response)
  return response.data
}

// 204 => 댓글 지우고 보이기🎲 // CommunityDetail
export const delComment = async (commentId: number) => {
  const response = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
    )
  console.log('delComment response: ', response)
  return response
}

