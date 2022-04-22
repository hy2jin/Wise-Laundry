package com.ssafy.wiselaundry.domain.laundry.db.repository;

import com.ssafy.wiselaundry.domain.laundry.db.entity.Laundry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface LaundryRepository extends JpaRepository<Laundry, Integer> {
    Laundry findByLaundryId(int laundryId);

    @Transactional
    void deleteByLaundryId(int laundryId);
}
