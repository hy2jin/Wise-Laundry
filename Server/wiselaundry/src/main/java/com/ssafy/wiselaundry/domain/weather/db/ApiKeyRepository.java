package com.ssafy.wiselaundry.domain.weather.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiKeyRepository extends JpaRepository<ApiKey, Integer> {
    ApiKey findByKeyName(String keyName);
}
