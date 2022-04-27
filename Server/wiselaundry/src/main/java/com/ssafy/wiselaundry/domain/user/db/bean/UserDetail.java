package com.ssafy.wiselaundry.domain.user.db.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetail {
    private String userEmail;
    private String userNick;
    private String userImg;
    private String password;
}
