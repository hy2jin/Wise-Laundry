package com.ssafy.wiselaundry.domain.laundry.service;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetails;
import com.ssafy.wiselaundry.domain.laundry.request.LaundryModifyPostRep;
import com.ssafy.wiselaundry.domain.laundry.request.UserLaundryRegisterPostReq;

import java.util.List;

public interface LaundryService {
    List<LaundryAll> findUserLaundryAll(int userId);
    List<String> findCareLabelDetail(int laundryId);
    LaundryDetails findLaundryDetails(int laundryId);
    List<String> findInfoDetail(int laundryId);
    int laundryRegisterByUser(UserLaundryRegisterPostReq userLaundryRegisterPostReq);
    int deleteLaundry(int laundryId);
    List<LaundryAll> findLaundryAll();
    LaundryDetails modifyLaundryDetails(int laundryId,LaundryModifyPostRep laundryModifyPostRep);
}
