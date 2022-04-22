package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
public class BoardCreateReq {
    @Autowired
    private UserService userService;

    @ApiModelProperty(value = "유저 ID", required = true, example = "유저 ID")
    private int userId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목")
    private String boardName;
    /**
     * Todo 사진 한 장만 하는지 나중에 물어보기
      */
    @ApiModelProperty(value = "게시글 이미지", required = true, example = "게시글 이미지")
    private String boardImg;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용")
    private String boardContent;

    public Board toEntity(BoardCreateReq body) {
//      User user = userService.탐색(body.userId);

        return Board.builder()
//                .user(user)
                .boardName(body.getBoardName())
                .boardImg(body.getBoardImg())
                .boardContent(body.getBoardContent())
                .build();
    }

}
