package com.ssafy.wiselaundry.domain.user.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user")
@ApiModel(value = "User", description = "회원 정보")
public class User {
    @ApiModelProperty(value = "회원 구분 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @ApiModelProperty(value = "회원 아이디", required = true, example = "ssafy@kakao.com")
    @Column(name = "user_email")
    private String userEmail;

    @ApiModelProperty(value = "회원 닉네임", required = true, example = "ssafy6th")
    @Column(name = "user_nick", nullable = false)
    private String userNick;

    @ApiModelProperty(value = "회원사진", required = false, example = "profile_img.jpg")
    @Column(name = "user_img")
    String userImg;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty(value = "회원 비밀번호", required = true, example = "password")
    @Column(name = "password")
    private String password;

}
