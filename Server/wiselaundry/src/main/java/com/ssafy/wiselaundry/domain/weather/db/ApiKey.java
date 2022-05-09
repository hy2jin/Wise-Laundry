package com.ssafy.wiselaundry.domain.weather.db;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "secretkey")
public class ApiKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "key_id")
    private int keyId;

    @Column(name = "key_name")
    private String keyName;

    @Column(name = "key_value")
    private String keyValue;


}
