package com.ssafy.wiselaundry.domain.user.service;

import java.util.Map;

public interface KakaoService {
    Map<String, String> getTokens(String code);
    Map<String, Object> getUserInfo(String token);
}
