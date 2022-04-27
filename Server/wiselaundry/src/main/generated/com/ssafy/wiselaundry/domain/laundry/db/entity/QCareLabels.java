package com.ssafy.wiselaundry.domain.laundry.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCareLabels is a Querydsl query type for CareLabels
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCareLabels extends EntityPathBase<CareLabels> {

    private static final long serialVersionUID = 182143402L;

    public static final QCareLabels careLabels = new QCareLabels("careLabels");

    public final StringPath careLabel = createString("careLabel");

    public final NumberPath<Integer> careLabelId = createNumber("careLabelId", Integer.class);

    public final StringPath careLabelName = createString("careLabelName");

    public QCareLabels(String variable) {
        super(CareLabels.class, forVariable(variable));
    }

    public QCareLabels(Path<? extends CareLabels> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCareLabels(PathMetadata metadata) {
        super(CareLabels.class, metadata);
    }

}

