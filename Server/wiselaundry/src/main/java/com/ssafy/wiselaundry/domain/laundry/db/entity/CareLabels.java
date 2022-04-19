package com.ssafy.wiselaundry.domain.laundry.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "care_labels")
@ApiModel(value = "CareLabel", description = "세탁물 테그")
public class CareLabels {

    @ApiModelProperty(value = "케어라벨번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "care_lable_id")
    private int careLableId;

    @ApiModelProperty(value = "케어라벨 이름", example = "라벨명")
    @Column(name = "care_label_name")
    private String careLabelName;

    @ApiModelProperty(value = "세탁법", example = "손세탁하세요")
    @Column(name = "care_label")
    private String careLabel;

}
