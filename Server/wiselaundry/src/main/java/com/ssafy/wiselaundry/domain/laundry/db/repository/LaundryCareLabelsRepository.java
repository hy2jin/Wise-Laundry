package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.ssafy.wiselaundry.domain.laundry.db.entity.Laundry;
import com.ssafy.wiselaundry.domain.laundry.db.entity.LaundryCareLabels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface LaundryCareLabelsRepository extends JpaRepository<LaundryCareLabels,Integer> {
    @Transactional
    void deleteByLaundry(Laundry laundry);

}
