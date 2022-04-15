import { atom } from "recoil";

interface Istate{
  user:{
    'id':number,
    'nickname':string,
    'url':string
  }
}

export const userState = atom<Istate['user']>({
  key : 'user',
  default: {
    'id':23,
    'nickname':'hi',
    'url':'123415'
  },
})
