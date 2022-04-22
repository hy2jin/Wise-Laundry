package com.ssafy.wiselaundry.domain.user.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.wiselaundry.domain.user.db.entity.QUser;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserRepositorySpp {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser quser = QUser.user;


    public User findByEmail(String userEmail){
        return jpaQueryFactory.select(quser).from(quser)
                .where(quser.userEmail.eq(userEmail)).fetchOne();
    };

    public User updatePassword(String userEmail){
        return null;
    }

}
