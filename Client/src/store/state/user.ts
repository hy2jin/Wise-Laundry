import { atom } from "recoil";

interface Istate{
  user:{
    'id':number,
    'nickname':string,
    'url':string
  },
  user2:{
    'id':number,
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
export const user2State = atom<Istate['user2']>({
  key : 'user2',
  default: {
    'id':23,
  },
})