package com.ssafy.wiselaundry.domain.laundry.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "info")
@ApiModel(value = "Info", description = "세탁물 테그")
public class Info {

    @ApiModelProperty(value = "세탁물 테그 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry_info_id")
    private int laundryInfoId;

    @ApiModelProperty(value = "테그이름", example = "tag1")
    @Column(name = "laundry_info")
    private String laundryInfo;

}
