package com.ssafy.wiselaundry.domain.laundry.db.entity;


import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Generated;
import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "laundry")
@ApiModel(value = "Laundry", description = "세탁물")
public class Laundry {

    @ApiModelProperty(value = "세탁물 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry_id")
    private int laundryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ApiModelProperty(value = "세탁물 이미지", example = "laungry_img.jpg")
    @Column(name = "laundry_img")
    private String laundryImg;

    @ApiModelProperty(value = "세탁물 카테고리", example = "woolKnit")
    @Column(name = "laundry_category")
    private String laundryCatgory;

    @ApiModelProperty(value = "메모", example = "dryCleaning")
    @Column(name = "laundry_memo")
    private String laundryMemo;


}
