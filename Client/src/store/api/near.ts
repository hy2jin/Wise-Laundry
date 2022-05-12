import axios from "axios"

const baseURL = process.env.REACT_APP_BASEURL


// const apiClient = axios.create({
//   baseURL: 'http://api.odcloud.kr/api/15069604/v1/uddi:4dfdecf6-d2c1-4792-9d34-e992368ac4f2?page=1&perPage=1000&serviceKey=B%2FG0tDajGDyrxcEwdSAf2V6CxSGGlSxZwgJZx5rX3vgOt13U7DQVSOmVM26knND934pRQ5F1Gct9twwvTz3yFw%3D%3D',
//   headers: {
//     "Content-type": "application/json",
//     'Authorization':KAKAO_KEY,
//     // 'serviceKey':'B/G0tDajGDyrxcEwdSAf2V6CxSGGlSxZwgJZx5rX3vgOt13U7DQVSOmVM26knND934pRQ5F1Gct9twwvTz3yFw=='
//   },
// }); 

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
}); 

export const getWeather = async (x:number,y:number)=>{
  const response = await apiClient.get<any>(
    `/weather/data?nx=${x}&ny=${y}`, 
  );
  return response.data  
}


