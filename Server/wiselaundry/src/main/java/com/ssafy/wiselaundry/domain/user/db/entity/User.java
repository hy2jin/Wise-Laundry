package com.ssafy.wiselaundry.domain.user.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
@ApiModel(value = "User", description = "유저 정보")
public class User {
    @ApiModelProperty(value = "유저 구분 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @ApiModelProperty(value = "유저 아이디", required = true, example = "ssafy@kakao.com")
    @Column(name = "user_email")
    private String userEmail;

    @ApiModelProperty(value = "유저 닉네임", required = true, example = "ssafy6th")
    @Column(name = "user_nick", nullable = false, unique = true)
    private String userNick;

    @ApiModelProperty(value = "유저 사진", required = false, example = "profile_img.jpg")
    @Column(name = "user_img")
    private String userImg;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty(value = "유저 비밀번호", required = true, example = "password")
    @Column(name = "password")
    private String password;

    @ApiModelProperty(value = "카카오유저 사진", required = false, example = "profile_img")
    @Column(name = "kakao_img")
    private String kakaoImg;


    @Builder
    User(int userId, String userEmail, String userNick, String userImg, String password){
        this.userId = userId;
        this.userEmail = userEmail;
        this.userNick = userNick;
        this.userImg = userImg;
        this.password = password;
    }

}
