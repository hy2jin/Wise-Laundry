package com.ssafy.wiselaundry.domain.weather.controller;


import com.ssafy.wiselaundry.domain.weather.response.WeatherRes;
import com.ssafy.wiselaundry.domain.weather.service.WeatherService;
import io.swagger.annotations.ApiParam;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Autowired
    WeatherService weatherService;

    @GetMapping("/data")
    public ResponseEntity<WeatherRes> test(@RequestParam @ApiParam(value="예보지점 X", required = true, defaultValue = "55") int nx,
                                           @RequestParam @ApiParam(value="예보지점 Y", required = true, defaultValue = "127") int ny) throws IOException, ParseException {
        /*세탁 지수= (-0.603*현지기압) + (0.729*최고기온) - (0.056*풍속) - (2.156*일사량) + 83.423 [실험오차계수]*/
        JSONObject weatherInfo = weatherService.weatherInfo(nx, ny);
        return ResponseEntity.status(200).body(WeatherRes.of(200, "Success!", weatherInfo));
    }


}
