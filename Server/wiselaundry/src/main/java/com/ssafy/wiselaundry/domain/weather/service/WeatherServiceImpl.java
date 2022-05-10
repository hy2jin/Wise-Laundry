package com.ssafy.wiselaundry.domain.weather.service;

import com.ssafy.wiselaundry.domain.weather.db.ApiKeyRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;

@Service("weatherService")
public class WeatherServiceImpl implements WeatherService  {

    @Autowired
    ApiKeyRepository apiKeyRepository;

    private String[] timeSet = {"2300", "2300", "2300", "2300", "0200", "0200", "0500", "0500", "0500", "0800", "0800", "0800", "1100", "1100", "1100", "1400", "1400", "1400", "1700", "1700", "1700", "2000", "2000", "2000"};
    private double[] seasons = {0, 10, 10, 5, 4, 2.1, 2, 1.6, 1, 1.4, 2, 3.9, 10};

    @Override
    public JSONObject weatherInfo(int nx, int ny) throws IOException, ParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter formatMonth = DateTimeFormatter.ofPattern("MM");
        JSONObject res = new JSONObject();
        String today;
        LocalDate now;


        String apiKey = apiKeyRepository.findByKeyName("weatherApi").getKeyValue();

        String time = new SimpleDateFormat("HH").format(new Date());
        int intTime = Integer.parseInt(time);
        // 3시 이전일 경우 전날 기준으로 수행
        now = intTime<=3?LocalDate.now().minusDays(1L):LocalDate.now();
        int month = Integer.parseInt(now.format(formatMonth));
        today = now.format(formatter);
        time = timeSet[intTime];

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + apiKey); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("48", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8")); /*요청자료형식(XML/JSON)JSON*/
        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(today, "UTF-8")); /*발표 날짜*/
        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(time, "UTF-8")); /*발표시간(정시단위) -> 0600 */
        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(String.valueOf(nx), "UTF-8")); /*예보지점의 X 좌표값*/
        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(String.valueOf(ny), "UTF-8")); /*예보지점의 Y 좌표값*/

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader br;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        conn.disconnect();

        res = s2j(sb.toString());

        JSONArray data =(JSONArray) s2j(s2j(s2j(res.get("response").toString()).get("body").toString()).get("items").toString()).get("item");

        HashMap<String, HashMap> map = new HashMap();
        for(Object j : data){
            JSONObject w = (JSONObject) j;
            String key = w.get("fcstDate").toString() + " " + w.get("fcstTime").toString();
            map.put(key, map.getOrDefault(key, new HashMap<String, Integer>()));
            map.get(key).put(w.get("category").toString(), w.get("fcstValue"));
        }
        JSONObject ret= new JSONObject();
        for(String key:map.keySet()){
            HashMap temp = new HashMap();
            // 습도
            temp.put("humidity",Integer.parseInt(map.get(key).get("REH").toString()));
            // 풍량
            double wind = Math.abs(Double.parseDouble((map.get(key).get("VVV").toString())))
                    + Math.abs(Double.parseDouble((map.get(key).get("UUU").toString())));
            temp.put("wind",wind);
            // 강수확률
            temp.put("chanceOfRain",Integer.parseInt(map.get(key).get("POP").toString()));
            // 하늘상태
            int sky = Integer.parseInt(map.get(key).get("SKY").toString());
            switch (sky){
                case 1:{
                    temp.put("weather","sunny");
                    sky = 100;
                    break;
                }
                case 3:{
                    temp.put("weather","partly_cloudy");
                    sky = 75;
                    break;
                }
                case 4:{
                    temp.put("weather","cloudy");
                    sky = 30;
                    break;
                }
            }
            if(Integer.parseInt(map.get(key).get("PTY").toString())>0){
                temp.put("weather","rainy");
                sky=0;
                break;
            }
            // 기온
            temp.put("temperature",Integer.parseInt(map.get(key).get("TMP").toString()));
            // 빨래지수
            double laundry = (((int)temp.get("temperature"))*((double)temp.get("wind"))*seasons[month]*sky/100)/(int)temp.get("humidity");
//            int laundry = (((100 - (int)temp.get("humidity"))/70)*100+
//                        (100 - (int)temp.get("chanceOfRain"))+
//                        ((int)temp.get("temperature")/25)*100+
//                        (int)(((double)temp.get("wind")/15)*100)+
//                        sky
//                        )/5;
            temp.put("laundry",Math.ceil((int)(laundry*100))>=95?95:Math.ceil((int)(laundry*100)));
            ret.put(key,temp);
        }
        return ret;
    }

    public static JSONObject s2j(String str) throws ParseException {
        JSONObject ret = new JSONObject();
        JSONParser parser = new JSONParser();
        ret = (JSONObject) parser.parse(str);
        return ret;
    }


}
