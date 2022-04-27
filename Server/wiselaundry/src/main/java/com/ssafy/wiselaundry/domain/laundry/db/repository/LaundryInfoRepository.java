package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.ssafy.wiselaundry.domain.laundry.db.entity.Laundry;
import com.ssafy.wiselaundry.domain.laundry.db.entity.LaundryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface LaundryInfoRepository extends JpaRepository<LaundryInfo,Integer> {
    @Transactional
    void deleteByLaundry(Laundry laundry);
}
