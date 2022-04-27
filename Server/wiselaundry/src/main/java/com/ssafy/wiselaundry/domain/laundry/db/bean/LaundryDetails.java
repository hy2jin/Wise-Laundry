package com.ssafy.wiselaundry.domain.laundry.db.bean;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryDetails {
    private int laundryId;
    private String laundryImg;
    private List<String> careLabel;
    private List<String> laundryInfo;
    private String laundryOwnerNick;
    private int laundryOwnerId;

    @Builder
    LaundryDetails(int laundryId, String laundryImg, List<String> careLabel, List<String> laundryInfo, String laundryOwnerNick, int laundryOwnerId) {
        this.laundryId = laundryId;
        this.laundryImg = laundryImg;
        this.careLabel = careLabel;
        this.laundryInfo = laundryInfo;
        this.laundryOwnerNick = laundryOwnerNick;
        this.laundryOwnerId = laundryOwnerId;
    }
}
