package com.ssafy.wiselaundry.domain.weather.service;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import java.io.IOException;

public interface WeatherService {
    JSONArray weatherInfo(int nx, int ny) throws IOException, ParseException;
}
