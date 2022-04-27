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

    @Builder
    LaundryCareLabels(int clothing_label_id, Laundry laundry, CareLabels careLabel) {
        this.clothing_label_id = clothing_label_id;
        this.laundry = laundry;
        this.careLabel = careLabel;
    }
}
