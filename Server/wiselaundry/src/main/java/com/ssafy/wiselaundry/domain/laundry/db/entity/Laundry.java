package com.ssafy.wiselaundry.domain.laundry.db.entity;


import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "laundry")
@NoArgsConstructor
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

    @ApiModelProperty(value = "세탁물 이미지", example = "laundry_img.jpg")
    @Column(name = "laundry_img")
    private String laundryImg;

    @ApiModelProperty(value = "세탁물 카테고리", example = "woolKnit")
    @Column(name = "laundry_category")
    private String laundryCategory;

    @ApiModelProperty(value = "메모", example = "dryCleaning")
    @Column(name = "laundry_memo")
    private String laundryMemo;


    @Builder
    Laundry(int laundryId, User user, String laundryImg, String laundryCategory, String laundryMemo) {
        this.laundryId = laundryId;
        this.user = user;
        this.laundryImg = laundryImg;
        this.laundryCategory = laundryCategory;
        this.laundryMemo = laundryMemo;
    }
}
