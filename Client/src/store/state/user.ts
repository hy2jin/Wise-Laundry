import { atom } from "recoil";

interface Istate{
  user:{
    userId: number,
    userEmail: string,
    userNick: string
    userImg: string
  }
}

export const userState = atom<Istate['user']>({
  key : 'user',
  default: {
    userId: 1,
    userEmail: 'aaa@bbb.com',
    userNick: 'laun',
    userImg: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg'
  },
})
