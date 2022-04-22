package com.ssafy.wiselaundry.domain.laundry.db.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryAll {
    private int laundryId;
    private String laundryImg;
    private List<CareLabelDetail> careLabels;

}
