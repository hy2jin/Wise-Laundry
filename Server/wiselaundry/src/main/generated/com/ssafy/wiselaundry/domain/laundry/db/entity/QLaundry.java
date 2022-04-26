package com.ssafy.wiselaundry.domain.laundry.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLaundry is a Querydsl query type for Laundry
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLaundry extends EntityPathBase<Laundry> {

    private static final long serialVersionUID = -157884637L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLaundry laundry = new QLaundry("laundry");

    public final NumberPath<Integer> laundryId = createNumber("laundryId", Integer.class);

    public final StringPath laundryImg = createString("laundryImg");

    public final StringPath laundryMemo = createString("laundryMemo");

    public final com.ssafy.wiselaundry.domain.user.db.entity.QUser user;

    public QLaundry(String variable) {
        this(Laundry.class, forVariable(variable), INITS);
    }

    public QLaundry(Path<? extends Laundry> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLaundry(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLaundry(PathMetadata metadata, PathInits inits) {
        this(Laundry.class, metadata, inits);
    }

    public QLaundry(Class<? extends Laundry> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.wiselaundry.domain.user.db.entity.QUser(forProperty("user")) : null;
    }

}

