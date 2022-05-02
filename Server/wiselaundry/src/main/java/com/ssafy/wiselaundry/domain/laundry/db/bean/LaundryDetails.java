package com.ssafy.wiselaundry.domain.laundry.db.bean;

import com.ssafy.wiselaundry.domain.laundry.db.entity.CareLabels;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryDetails {
    private int laundryId;
    private String laundryImg;
    private List<CareLabels> careLabels;
    private List<String> laundryInfo;
    private String laundryOwnerNick;
    private int laundryOwnerId;
    private String laundryMemo;

    @Builder
    LaundryDetails(int laundryId, String laundryImg, List<CareLabels> careLabels, List<String> laundryInfo, String laundryOwnerNick, int laundryOwnerId, String laundryMemo) {
        this.laundryId = laundryId;
        this.laundryImg = laundryImg;
        this.careLabels = careLabels;
        this.laundryInfo = laundryInfo;
        this.laundryOwnerNick = laundryOwnerNick;
        this.laundryOwnerId = laundryOwnerId;
        this.laundryMemo = laundryMemo;
    }
}
