package com.ssafy.wiselaundry.domain.weather.db;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QApiKey is a Querydsl query type for ApiKey
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QApiKey extends EntityPathBase<ApiKey> {

    private static final long serialVersionUID = 355973197L;

    public static final QApiKey apiKey = new QApiKey("apiKey");

    public final NumberPath<Integer> keyId = createNumber("keyId", Integer.class);

    public final StringPath keyName = createString("keyName");

    public final StringPath keyValue = createString("keyValue");

    public QApiKey(String variable) {
        super(ApiKey.class, forVariable(variable));
    }

    public QApiKey(Path<? extends ApiKey> path) {
        super(path.getType(), path.getMetadata());
    }

    public QApiKey(PathMetadata metadata) {
        super(ApiKey.class, metadata);
    }

}

