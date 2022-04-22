package com.ssafy.wiselaundry.domain.user.controller;


import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import com.ssafy.wiselaundry.domain.user.request.UserLoginPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserUpdatePostReq;
import com.ssafy.wiselaundry.domain.user.response.UserLoginPostRes;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import com.ssafy.wiselaundry.global.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api("유저 API")
@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;
    

    @ApiOperation(value = "로그인", notes = "<strong>이름과 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping("/login")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String user_email = loginInfo.getUserEmail();
        String user_password = loginInfo.getUserPassword();
        User user = userRepository.findByUserEmail(user_email);
        if(passwordEncoder.matches(user_password, user.getPassword())){
            //패스워드가 맞는 경우 , 로그인 성공
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(user_email), user_email));
        }
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null, null));
    }


    @ApiOperation(value = "회원 가입", notes = "<strong>email,패스워드,이름</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq userRegisterInfo) {
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(userRegisterInfo);
        if(user!=null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "error"));
        }
    }

    // 회원정보 수정
    @PostMapping("/update")
    public ResponseEntity<? extends BaseResponseBody> update(@RequestBody @ApiParam(value="회원수정 정보", required = true) UserUpdatePostReq userUpdateInfo){
        User user = userService.updateUser(userUpdateInfo);
        if(user==null){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "error"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success"));
    }



}
