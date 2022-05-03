import axios from "axios"
import Swal from 'sweetalert2'

const baseURL = process.env.REACT_APP_BASEURL

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
})
const apiImageClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "multipart/form-data",
  },
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
apiImageClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)

// 🌼🌼🌼게시글 전체 => Infinite Scroll 수정 필요
// export const getCommunityAll = async (boardId: number) => {
export const getCommunityAll = async (lastBoardId: number) => {
  const { data } = await apiClient.get<any>(
    // '/community/all', 
    `/community/all/${10}/${lastBoardId}`, 
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
  const res = {...data, boardImgs: imgs}
  delete res.statusCode
  console.log('🌼res: ', res);
  return res
}

// 🌼🌼🌼검색⭕
export const getSearch = async (keyword: string, lastBoardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/search/${keyword}/${10}/${lastBoardId}`
    )
  console.log('🌼getSearch: ', data);
  return data
}

// 🌼🌼🌼게시글 작성⭕
export const postBoard = async (form: any) => {
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
  const { data } = await apiClient.put<any>(
    '/community/update',
    form
  )
  console.log('🌼putBoard: ', data);
  return data
}

// 🌼🌼🌼게시글 삭제⭕
export const delBoard = async (boardId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/${boardId}`,
  )
  console.log('🌼delBoard: ', data)
  return data
}

// 🌼🌼🌼댓글 작성⭕
export const postComment = async (form: any) => {
  const { data } = await apiClient.post<any>(
    '/community/comment/create',
    form
  )
  console.log('🌼postComment: ', data)
  return data
}

// 🌼🌼🌼댓글 삭제⭕
export const delComment = async (commentId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
  )
  console.log('🌼delComment: ', data)
  return data
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
apiImageClient.interceptors.response.use(
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