package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetail;
import com.ssafy.wiselaundry.domain.laundry.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LaundryRepositorySpp {
    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QLaundry qLaundry = QLaundry.laundry;
    QCareLabels qCareLabels = QCareLabels.careLabels;
    QLaundryCareLabels qLaundryCareLabels = QLaundryCareLabels.laundryCareLabels;
    QInfo qInfo = QInfo.info;
    QLaundryInfo qLaundryInfo = QLaundryInfo.laundryInfo1;
    //사용자 전체 옷 조회
    public List<LaundryDetail> laundryDetailByUserId(int userId){
        return jpaQueryFactory.select(Projections.constructor(LaundryDetail.class, qLaundry.laundryId.as("laundryId"), qLaundry.laundryImg.as("laundryImg")))
                .from(qLaundry).where(qLaundry.user.userId.eq(userId)).fetch();
    }
    //전체 옷 조회
    public List<LaundryDetail> laundryDetail(){
        return jpaQueryFactory.select(Projections.constructor(LaundryDetail.class, qLaundry.laundryId.as("laundryId"), qLaundry.laundryImg.as("laundryImg")))
                .from(qLaundry).fetch();
    }

    //옷 디테일 조회
    public List<String> careLabelDetailsByLaundryId(int laundryId){
        return jpaQueryFactory.select(qCareLabels.careLabel)
                .from(qLaundryCareLabels)
                .leftJoin(qCareLabels).on(qCareLabels.careLabelId.eq(qLaundryCareLabels.careLabel.careLabelId))
                .where(qLaundryCareLabels.laundry.laundryId.eq(laundryId))
                .fetch();
    }

    //옷 설명 조회
    public List<String> infoDetailsByLaundryId(int laundryId){
        return jpaQueryFactory.select(qInfo.laundryInfo)
                .from(qLaundryInfo)
                .leftJoin(qInfo).on(qInfo.laundryInfoId.eq(qLaundryInfo.laundryInfo.laundryInfoId))
                .where(qLaundryInfo.laundry.laundryId.eq(laundryId))
                .fetch();
    }
}
