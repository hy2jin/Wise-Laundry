import { atom } from "recoil"

// 1번 타입을 먼저 등록을 해준다 . 🎨
interface Itheme {
  bgColor: string
  fontColor: string
  navColor: string
  activeBtnColor: string
  inactiveBtnColor: string
  containerColor: string
  boxShadowBox :string
}
// 2번 색을 지정해준다 => main 색들 넣어주고 다른곳에서 
// color : ${props => props.theme.fontColor}; 이런식으로 사용하기
export const DARKMODE = {
  bgColor: '#1D262B',
  fontColor: 'white',
  navColor: '#275788',
  activeBtnColor: '#005AB5',
  inactiveBtnColor: '#CCCCCC',
  containerColor: '#151B20',
  boxShadowBox:'5px 5px 10px #121212'
}
export const LIGHTMODE = {
  bgColor: 'white',
  fontColor: '#121212',
  navColor: '#E9F2FF',
  activeBtnColor: '#96BDF3',
  inactiveBtnColor: '#CCCCCC',
  containerColor: '#F8F8F8',
  // boxShadowBox: '-10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%)'
  boxShadowBox:'0px 4px 4px rgba(0, 0, 0, 0.25)'
}

export const themeState = atom<Itheme>({
  key: 'theme',
  default: LIGHTMODE
})


