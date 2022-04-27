package com.ssafy.wiselaundry.domain.laundry.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLaundryInfo is a Querydsl query type for LaundryInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLaundryInfo extends EntityPathBase<LaundryInfo> {

    private static final long serialVersionUID = 69168753L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLaundryInfo laundryInfo1 = new QLaundryInfo("laundryInfo1");

    public final NumberPath<Integer> clothing_tag_id = createNumber("clothing_tag_id", Integer.class);

    public final QLaundry laundry;

    public final QInfo laundryInfo;

    public QLaundryInfo(String variable) {
        this(LaundryInfo.class, forVariable(variable), INITS);
    }

    public QLaundryInfo(Path<? extends LaundryInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLaundryInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLaundryInfo(PathMetadata metadata, PathInits inits) {
        this(LaundryInfo.class, metadata, inits);
    }

    public QLaundryInfo(Class<? extends LaundryInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.laundry = inits.isInitialized("laundry") ? new QLaundry(forProperty("laundry"), inits.get("laundry")) : null;
        this.laundryInfo = inits.isInitialized("laundryInfo") ? new QInfo(forProperty("laundryInfo")) : null;
    }

}

