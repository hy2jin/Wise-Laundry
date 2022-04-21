/// <reference types="react-scripts" />

// const sendKakaoMessage = () => {
//   window.Kakao.Link.sendDefault({
//     objectType: 'feed',
//   })
// }
declare global {
  interface Window {
    kakao: any;
  }
}

const mapDiv = document.querySelector('#map');
const options = {
    center: new window.kakao.maps.LatLng(37.17058840207, 127.112843761156),
    level: 2,
};

return new window.kakao.maps.Map(mapDiv, options);