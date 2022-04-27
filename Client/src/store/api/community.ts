import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL
const token = sessionStorage.getItem('jwt')

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    'Authorization': `${token}`
  },
}); 
const apiImageClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "multipart/form-data",
    'Authorization': `${token}`
  },
})

// 🌼🌼🌼게시글 전체 => Infinite Scroll 수정 필요
export const getCommunityAll = async () => {
  const response = await apiClient.get<any>(
    '/community/all', 
  )
  // console.log('getCommunityAll response: ', response)
  return response.data.list
}

// 🌼🌼🌼게시글 한개
export const getCommunityDetail = async (boardId: number) => {
  const response = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  console.log('getCommunityDetail response: ', response)
  return response.data
}

// 🌼🌼🌼게시글 작성
export const postBoard = async (data: any) => {
  // const response = await apiClient.post<any>(
  const response = await apiImageClient.post<any>(
    '/community/create',
    data
  )
  console.log('response: ', response);
  return response.data
}

// 🌼🌼🌼게시글 수정
export const putBoard = async (data: any) => {
  const response = await apiClient.put<any>(
    '/community/update',
    data
  )
  console.log('response: ', response);
  return response.data
}

// 🌼🌼🌼게시글 삭제
export const delBoard = async (boardId: number) => {
  const response = await apiClient.delete<any>(
    `/community/${boardId}`,
  )
  console.log('delBoard response: ', response)
  return response
}

// 🌼🌼🌼댓글 작성
export const postComment = async (data: any) => {
  const response = await apiClient.post<any>(
    '/community/comment/create',
    data
  )
  console.log('postComment response: ', response)
  return response.data
}

// 🌼🌼🌼댓글 삭제
export const delComment = async (commentId: number) => {
  const response = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
  )
  console.log('delComment response: ', response)
  return response
}

