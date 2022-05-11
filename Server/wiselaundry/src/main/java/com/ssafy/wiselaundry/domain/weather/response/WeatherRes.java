package com.ssafy.wiselaundry.domain.weather.response;


import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@Getter
@Setter
@ApiModel("WeatherRes")
public class WeatherRes extends BaseResponseBody {

    JSONArray weathers;

    public static WeatherRes of(Integer statusCode, String message, JSONArray info){
        WeatherRes res = new WeatherRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setWeathers(info);
        return res;
    }

}
