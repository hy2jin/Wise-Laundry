package com.ssafy.wiselaundry.domain.laundry.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QInfo is a Querydsl query type for Info
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInfo extends EntityPathBase<Info> {

    private static final long serialVersionUID = 1093446504L;

    public static final QInfo info = new QInfo("info");

    public final StringPath laundryInfo = createString("laundryInfo");

    public final NumberPath<Integer> laundryInfoId = createNumber("laundryInfoId", Integer.class);

    public QInfo(String variable) {
        super(Info.class, forVariable(variable));
    }

    public QInfo(Path<? extends Info> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInfo(PathMetadata metadata) {
        super(Info.class, metadata);
    }

}

