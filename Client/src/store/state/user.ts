import { atom } from "recoil";

interface Istate{
  user:{
    kakaoImg: string|null,
    // 패스워드 빼주기
    password: string|null,
    userEmail: string,
    userId: number,
    userImg: string|null,
    userNick: string,
  },
  isLogin: boolean,
}

export const userState = atom<Istate['user']>({
  key : 'user',
  default: {
    kakaoImg: null,
    password: null,
    userEmail: 'aaa@bbb.com',
    userId: 0,
    userImg: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg',
    userNick: 'laun',
  },
})

export const loginState = atom<Istate['isLogin']>({
  key : 'isLogin',
  default: false,
}) 