package com.ssafy.wiselaundry.domain.laundry.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "laundry_care_labels")
@ApiModel(value = "LaundryCareLabels")
public class LaundryCareLabels {

    @ApiModelProperty(value = "관계번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothing_label_id")
    private int clothing_label_id;

    @ManyToOne
    @JoinColumn(name = "laundry_id")
    private Laundry laundry;

    @ManyToOne
    @JoinColumn(name = "care_label_id")
    private CareLabels careLabel;

}
