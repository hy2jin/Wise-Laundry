package com.ssafy.wiselaundry.domain.laundry.service;

import com.ssafy.wiselaundry.domain.laundry.db.bean.CareLabelDetail;
import com.ssafy.wiselaundry.domain.laundry.db.bean.InfoDetail;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetails;
import com.ssafy.wiselaundry.domain.laundry.request.LaundryModifyPostRep;
import com.ssafy.wiselaundry.domain.laundry.request.UserLaundryRegisterPostReq;

import java.util.List;

public interface LaundryService {
    List<LaundryAll> findUserLaundryAll(int userId);
    List<CareLabelDetail> findCareLabelDetail(int laundryId);
    List<LaundryDetails> findLaundryDetails(int laundryId);
    List<InfoDetail> findInfoDetail(int laundryId);
    int laundryRegisterByUser(UserLaundryRegisterPostReq userLaundryRegisterPostReq);
    int deleteLaundry(int laundryId);
    List<LaundryAll> findLaundryAll();
    List<LaundryDetails> modifyLaundryDetails(int laundryId,LaundryModifyPostRep laundryModifyPostRep);
}
