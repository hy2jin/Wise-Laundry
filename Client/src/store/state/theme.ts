import { atom } from "recoil"

// 1번 타입을 먼저 등록을 해준다 . 🎨
interface Itheme {
  bgColor: string
  fontColor: string
  navColor: string
  activeBtnColor: string
  hoverActiveBtnColor: string
  inactiveBtnColor: string
  titleColor:string
  hoverInactiveBtnColor: string
  containerColor: string
  boxShadowBox :string
  listBgColor: string[]
  boardDateColor: string
  scrollThumbColor: string
  scrollThumbHoverColor: string
  scrollNavColor: string
  weatherColor:string
  weatherBox:string
  labelListColor: string[]
}
// 2번 색을 지정해준다 => main 색들 넣어주고 다른곳에서 
// color : ${props => props.theme.weatherBox}; 이런식으로 사용하기
export const DARKMODE = {
  bgColor: '#1D262B',
  fontColor: 'white',
  navColor: '#275788',
  activeBtnColor: '#005AB5',
  titleColor: '#6d9ddd',
  hoverActiveBtnColor: '#0265c8',
  inactiveBtnColor: '#bdbdbd',
  hoverInactiveBtnColor: '#d4d4d4',
  containerColor: '#151B20',
  boxShadowBox:'5px 5px 10px #121212',
  listBgColor: ['#0E81F7', '#3B9CFF', '#005BB7'],
  boardDateColor: '#bbbbbb',
  scrollThumbColor: '#999999',
  scrollThumbHoverColor: '#cccccc',
  scrollNavColor: '#2757880',
  weatherColor:'linear-gradient(90deg, #5757e7 , #6363e8,#5e5eda ,#8888fc)',
  weatherBox:'#97b0d1',
  labelListColor: ['#cffbb2', '#90fdec', '#f4ffac', '#fea5e6', '#fdce8d', '#8fdab9',
  '#acd682', '#bac3f0', '#d8db86', '#db829b'],
}

export const LIGHTMODE = {
  bgColor: 'white',
  fontColor: '#333',
  navColor: '#E9F2FF',
  activeBtnColor: '#96BDF3',
  titleColor: '#6d9dc9',
  hoverActiveBtnColor: '#83b5fb',
  inactiveBtnColor: '#bdbdbd',
  hoverInactiveBtnColor: '#a8a7a7',
  containerColor: '#F8F8F8',
  boxShadowBox:'0px 4px 4px rgba(0, 0, 0, 0.25)',
  listBgColor: ['#E9F2FF', '#C1D9FB', '#C3DCFF'],
  boardDateColor: '#777777',
  scrollThumbColor: '#cccccc',
  scrollThumbHoverColor: '#999999',
  scrollNavColor: '#e9f2ff0',
  weatherColor:'linear-gradient(90deg,#a9d7fc,#6cbdff,#69bbff,#9acffa)',
  weatherBox:'#E9F2FF',
  labelListColor: ['#cffbb2', '#90fdec', '#f4ffac', '#fea5e6', '#fdce8d', '#8fdab9',
  '#acd682', '#bac3f0', '#d8db86', '#db829b'],
}

export const themeState = atom<Itheme>({
  key: 'theme',
  default: LIGHTMODE
})


