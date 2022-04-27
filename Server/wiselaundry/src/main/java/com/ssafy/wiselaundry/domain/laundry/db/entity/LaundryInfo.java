package com.ssafy.wiselaundry.domain.laundry.db.entity;

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
@NoArgsConstructor
@Table(name = "laundry_info")
@ApiModel(value = "LaundryInfo")
public class LaundryInfo {

    @ApiModelProperty(value = "관계번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laundry")
    private int clothing_tag_id;

    @ManyToOne
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;

    @ManyToOne
    @JoinColumn(name = "laundry_info_id")
    private Info laundryInfo;
    
    @Builder
    LaundryInfo(int clothing_tag_id, Laundry laundry, Info laundryInfo) {
        this.clothing_tag_id = clothing_tag_id;
        this.laundry = laundry;
        this.laundryInfo = laundryInfo;
    }
}
