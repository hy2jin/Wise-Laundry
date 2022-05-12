import { atom } from "recoil";

interface Istate{
  user:{
    kakaoImg: string|null,
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
    userEmail: '',
    userId: 0,
    userImg: '',
    userNick: '',
  },
})

export const loginState = atom<Istate['isLogin']>({
  key : 'isLogin',
  default: false,
}) 