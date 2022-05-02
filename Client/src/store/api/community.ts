import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL
const token = sessionStorage.getItem('token')

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    'Authorization': `Bearer ${token}`
  },
})
const apiImageClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "multipart/form-data",
    'Authorization': `Bearer ${token}`
  },
})

// 🌼🌼🌼게시글 전체 => Infinite Scroll 수정 필요
export const getCommunityAll = async () => {
  const { data } = await apiClient.get<any>(
    '/community/all', 
  )
  console.log('🌼getCommunityAll: ', data)
  return data
}

// 🌼🌼🌼게시글 한개 조회⭕
export const getCommunityDetail = async (boardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  console.log('🌼getCommunityDetail: ', data)
  const imgs = data.boardImgs.map((img: { boardImg: string }) => `/images/${img.boardImg}`)
  // console.log('🌼imgs: ', imgs);
  const res = {...data, boardImgs: imgs}
  delete res.statusCode
  // console.log('🌼res: ', res);
  return res
}

// 🌼🌼🌼게시글 작성⭕
export const postBoard = async (form: any) => {
  // const response = await apiClient.post<any>(
  const { data } = await apiImageClient.post<any>(
    '/community/create',
    form
  )
  console.log('🌼postBoard: ', data);
  return data
}

// 🌼🌼🌼게시글 수정용 조회⭕
export const getCommunityUpdate = async (boardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  console.log('🌼getCommunityUpdate: ', data)
  const imgs = data.boardImgs.map((img: { boardImg: string }) => img.boardImg)
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

// 🌼🌼🌼게시글 수정⭕
export const putBoard = async (form: any) => {
  const response = await apiClient.put<any>(
    '/community/update',
    form
  )
  console.log('🌼putBoard: ', response.data);
  return response.data
}

// 🌼🌼🌼게시글 삭제⭕
export const delBoard = async (boardId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/${boardId}`,
  )
  // console.log('🌼delBoard: ', data)
  return data
}

// 🌼🌼🌼댓글 작성⭕
export const postComment = async (form: any) => {
  const { data } = await apiClient.post<any>(
    '/community/comment/create',
    form
  )
  // console.log('🌼postComment: ', data)
  return data
}

// 🌼🌼🌼댓글 삭제⭕
export const delComment = async (commentId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
  )
  // console.log('🌼delComment: ', data)
  return data
}

