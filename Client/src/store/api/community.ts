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
  console.log('🌼getCommunityAll: ', response.data.list)
  return response.data.list
}

// 🌼🌼🌼게시글 한개 조회
export const getCommunityDetail = async (boardId: number) => {
  const response = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  // console.log('🌼getCommunityDetail: ', response.data)
  const imgs = response.data.boardImgs.map((img: { boardImg: string }) => img.boardImg)
  // console.log('imgs: ', imgs);
  const res = {...response.data, boardImgs: imgs}
  delete res.statusCode
  delete res.message
  // console.log('🌼res: ', res);
  return res
}

// 🌼🌼🌼게시글 작성
export const postBoard = async (data: any) => {
  // const response = await apiClient.post<any>(
  const response = await apiImageClient.post<any>(
    '/community/create',
    data
  )
  console.log('🌼postBoard: ', response);
  return response.data
}

// 🌼🌼🌼게시글 수정용 조회
export const getCommunityUpdate = async (boardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  // console.log('🌼getCommunityUpdate: ', data)
  const imgs = data.boardImgs.map((img: { boardImg: string }) => `/images/${img.boardImg}`)
  // console.log('🌼imgs: ', imgs);
  const res = {
    boardId: data.boardId,
    boardContent: data.boardContent,
    boardImgs: imgs,
    boardName: data.boardName
  }
  console.log('🌼res: ', res);
  return res
}

// 🌼🌼🌼게시글 수정
export const putBoard = async (data: any) => {
  const response = await apiClient.put<any>(
    '/community/update',
    data
  )
  console.log('🌼putBoard: ', response);
  return response.data
}

// 🌼🌼🌼게시글 삭제⭕
export const delBoard = async (boardId: number) => {
  const response = await apiClient.delete<any>(
    `/community/${boardId}`,
  )
  // console.log('🌼delBoard: ', response)
  return response
}

// 🌼🌼🌼댓글 작성⭕
export const postComment = async (data: any) => {
  const response = await apiClient.post<any>(
    '/community/comment/create',
    data
  )
  // console.log('🌼postComment: ', response.data)
  return response.data
}

// 🌼🌼🌼댓글 삭제⭕
export const delComment = async (commentId: number) => {
  const response = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
  )
  // console.log('🌼delComment: ', response)
  return response
}

