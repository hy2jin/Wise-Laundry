package com.ssafy.wiselaundry.domain.user.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -535706117L;

    public static final QUser user = new QUser("user");

    public final StringPath password = createString("password");

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> userId = createNumber("userId", Integer.class);

    public final StringPath userImg = createString("userImg");

    public final StringPath userNick = createString("userNick");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

