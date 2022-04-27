import axios from "axios"


const apiClient = axios.create({
  baseURL: 'http://api.odcloud.kr/api/15069604/v1/uddi:4dfdecf6-d2c1-4792-9d34-e992368ac4f2?page=1&perPage=1000&serviceKey=B%2FG0tDajGDyrxcEwdSAf2V6CxSGGlSxZwgJZx5rX3vgOt13U7DQVSOmVM26knND934pRQ5F1Gct9twwvTz3yFw%3D%3D',
  headers: {
    "Content-type": "application/json",
    'Authorization':'B%2FG0tDajGDyrxcEwdSAf2V6CxSGGlSxZwgJZx5rX3vgOt13U7DQVSOmVM26knND934pRQ5F1Gct9twwvTz3yFw%3D%3D',
    // 'serviceKey':'B/G0tDajGDyrxcEwdSAf2V6CxSGGlSxZwgJZx5rX3vgOt13U7DQVSOmVM26knND934pRQ5F1Gct9twwvTz3yFw=='
  },
}); 


export const getAllWahsers = async()=>{
  const response = await apiClient.get<any>(
    '', 
  );
  return response.data
}