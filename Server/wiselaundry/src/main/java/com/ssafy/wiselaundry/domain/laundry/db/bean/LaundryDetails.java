package com.ssafy.wiselaundry.domain.laundry.db.bean;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LaundryDetails {
    private int laundryId;
    private String laundryImg;
    private List<CareLabelDetail> careLabelDetails;
    private List<InfoDetail> infoDetails;
    private String userNick;
    private int userId;
}
