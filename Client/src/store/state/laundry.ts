import { atom } from "recoil";

interface Istate{
  careLabel:
  {
    "careLabelId": number
    "careLabelName": string
    "careLabel": string
  }
}

export const labelState = atom<Istate['careLabel'][]>({
  key:'careLabels',
  default:[]
})