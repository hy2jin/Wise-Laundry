package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.ssafy.wiselaundry.domain.laundry.db.entity.CareLabels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareLabelsRepository extends JpaRepository<CareLabels,Integer> {
    CareLabels findByCareLabelId(int careLabelId);
}
