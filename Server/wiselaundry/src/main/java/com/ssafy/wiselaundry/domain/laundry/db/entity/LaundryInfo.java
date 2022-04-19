package com.ssafy.wiselaundry.domain.laundry.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "laundry_info")
@ApiModel(value = "LaundryInfo")
public class LaundryInfo {

    @ApiModelProperty(value = "관계번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry")
    private int clothing_tag_id;

    @ManyToOne
    @Column(name = "launry_id")
    private Laundry laundry;

    @ManyToOne
    @Column(name = "laundry_info_id")
    private Info laundryInfo;

}
