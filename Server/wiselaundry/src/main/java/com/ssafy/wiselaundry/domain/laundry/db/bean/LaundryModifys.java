package com.ssafy.wiselaundry.domain.laundry.db.bean;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryModifys {
    private int laundryId;
    private List<String> careLabel;
    private List<String> laundryInfo;
    private String laundryMemo;

    @Builder
    LaundryModifys(int laundryId,  List<String> careLabel, List<String> laundryInfo, String laundryMemo) {
        this.laundryId = laundryId;
        this.careLabel = careLabel;
        this.laundryInfo = laundryInfo;
        this.laundryMemo = laundryMemo;
    }
}
