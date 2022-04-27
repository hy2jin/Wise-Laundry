package com.ssafy.wiselaundry.domain.laundry.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLaundryCareLabels is a Querydsl query type for LaundryCareLabels
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLaundryCareLabels extends EntityPathBase<LaundryCareLabels> {

    private static final long serialVersionUID = -1954029069L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLaundryCareLabels laundryCareLabels = new QLaundryCareLabels("laundryCareLabels");

    public final QCareLabels careLabel;

    public final NumberPath<Integer> clothing_label_id = createNumber("clothing_label_id", Integer.class);

    public final QLaundry laundry;

    public QLaundryCareLabels(String variable) {
        this(LaundryCareLabels.class, forVariable(variable), INITS);
    }

    public QLaundryCareLabels(Path<? extends LaundryCareLabels> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLaundryCareLabels(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLaundryCareLabels(PathMetadata metadata, PathInits inits) {
        this(LaundryCareLabels.class, metadata, inits);
    }

    public QLaundryCareLabels(Class<? extends LaundryCareLabels> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.careLabel = inits.isInitialized("careLabel") ? new QCareLabels(forProperty("careLabel")) : null;
        this.laundry = inits.isInitialized("laundry") ? new QLaundry(forProperty("laundry"), inits.get("laundry")) : null;
    }

}

