package com.ssafy.wiselaundry.domain.user.controller;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.response.UserLoginPostRes;
import com.ssafy.wiselaundry.domain.user.service.KakaoService;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import com.ssafy.wiselaundry.global.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api("유저 API")
@Slf4j
@RestController
@RequestMapping("/api/oauth")
public class KakaoLoginController {

    @Autowired
    KakaoService kakaoService;

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public ResponseEntity<UserLoginPostRes> login(@RequestParam @ApiParam(value = "token", required = true)String code){
        Map<String, String> tokens = kakaoService.getTokens(code);

        Map<String, Object> userInfo = kakaoService.getUserInfo(tokens.get("accessToken"));
        System.out.println(userInfo);
        User user = userService.findByUserEmail(userInfo.get("email").toString());
        System.out.println(user);
        if(user==null){

            user = userService.createKakaoUser((HashMap) userInfo);

            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getUserEmail()), user.getUserEmail()));
        }else if(user.getUserNick().equals(userInfo.get("nickname").toString())
                &&user.getKakaoImg().equals(userInfo.get("image").toString())){
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user.getUserEmail()), user.getUserEmail()));
        }
        return ResponseEntity.status(401).body(UserLoginPostRes.of(400, "Kakao Login Error", null, null));
    }

}
