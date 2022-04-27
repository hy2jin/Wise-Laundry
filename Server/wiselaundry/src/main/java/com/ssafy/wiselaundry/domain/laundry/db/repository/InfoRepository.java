package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.ssafy.wiselaundry.domain.laundry.db.entity.Info;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoRepository extends JpaRepository<Info,String> {
    Info findByLaundryInfo(String laundryInfo);
}
