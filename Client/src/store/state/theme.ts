import { atom } from "recoil"

// 1번 타입을 먼저 등록을 해준다 . 🎨
interface Itheme{
  bgColor:string
  fontColor:string
  navColor:string
}
// 2번 색을 지정해준다 => main 색들 넣어주고 다른곳에서 
// color : ${props => props.theme.fontColor}; 이런식으로 사용하기
export const DARKMODE = {
  bgColor: '#1D262B',
  fontColor:'white',
  navColor:'#275788'

}
export const LIGHTMODE = {
  bgColor: 'white',
  fontColor : '#121212',
  navColor:'#E9F2FF'
}

export const themeState = atom<Itheme>({
  key:'theme',
  default:LIGHTMODE
})


