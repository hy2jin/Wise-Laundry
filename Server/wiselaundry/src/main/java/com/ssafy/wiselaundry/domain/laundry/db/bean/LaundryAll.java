package com.ssafy.wiselaundry.domain.laundry.db.bean;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryAll {
    private int laundryId;
    private String laundryImg;
    private List<String> careLabel;
    private List<String> laundryInfo;

    @Builder
    LaundryAll(int laundryId, String laundryImg, List<String> careLabel, List<String> laundryInfo) {
        this.laundryId = laundryId;
        this.laundryImg = laundryImg;
        this.careLabel = careLabel;
        this.laundryInfo = laundryInfo;
    }
}
