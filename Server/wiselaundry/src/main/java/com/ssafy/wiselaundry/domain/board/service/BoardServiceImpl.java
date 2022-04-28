package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.db.repository.BoardRepository;
import com.ssafy.wiselaundry.domain.board.db.repository.CommentsRepository;
import com.ssafy.wiselaundry.domain.board.request.BoardCreateReq;
import com.ssafy.wiselaundry.domain.board.request.BoardUpdateReq;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardImgService boardImgService;

    @Autowired
    UserService userService;

    @Value("${app.fileupload.uploadDir}")
    private String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    private String uploadPath;

    @Override
    public List<Board> boardSearchAll() {
        return boardRepository.findAll();
    }

    @Override
    public Board boardSearchById(int boardId) {
        return boardRepository.findById(boardId).get();
    }


    @Override
    public int boardCreate(BoardCreateReq body, MultipartHttpServletRequest fileRequest) {
        User user = userService.findByUserId(body.getUserId());

        Board board = Board.builder()
                .boardContent(body.getBoardContent())
                .boardName(body.getBoardName())
                .user(user)
                .boardDate(LocalDateTime.now())
                .build();

        boardRepository.save(board);

        List<BoardImg> boardImgList = fileRequestToBoardImg(fileRequest, board);

        if(boardImgList.size() != 0) {
            board.setBoardImgs(boardImgList);
        }
        boardRepository.save(board);

        return board.getBoardId();
    }

    @Override
    public void boardUpdate(BoardUpdateReq body, MultipartHttpServletRequest request) {
        // 수정할 파일 가져오기
        Board board = boardRepository.findById(body.getBoardId()).get();

        List<BoardImg> boardImgList = fileRequestToBoardImg(request, board);

        if(boardImgList.size() != 0) {
            if(request.getFiles("file").size() != 0) {
                boardImgDelete(board);
            }

            board.setBoardImgs(boardImgList);
        }

        board.setBoardContent(body.getBoardContent());
        board.setBoardName(body.getBoardName());

        boardRepository.save(board);
    }

    @Override
    public void boardDelete(int boardId) {
        Board deleteBoard = boardRepository.findById(boardId).get();
        // 실제 파일 삭제
//        boardImgDelete(deleteBoard);

        boardRepository.delete(deleteBoard);
    }

    /**
     * 서버에 파일을 생성하고, 객체를 생성하고 매핑.
     * @param fileRequest
     * @param board
     * @return
     */
    private List<BoardImg> fileRequestToBoardImg(MultipartHttpServletRequest fileRequest, Board board) {
        List<BoardImg> boardImgList = new ArrayList<>();

        List<MultipartFile> fileList = fileRequest.getFiles("file");
        String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
        File uploadDir = new File(uploadPath + uploadFolder + File.separator + "board");

        if (!uploadDir.exists()) uploadDir.mkdir();
        String recordFileUrl = "";

        for(MultipartFile file : fileList) {
            if(file.isEmpty())
                break;

            String fileName = file.getOriginalFilename();

            // 파일명 중복을 방지하기위해 난수화
            UUID uuid = UUID.randomUUID();

            // 파일 확장자
            String extension = FilenameUtils.getExtension(fileName);

            String savingFileName =  uuid + "." + extension;

            File destFile = new File(uploadPath, uploadFolder + File.separator + "board" + File.separator + savingFileName);

            try{
                file.transferTo(destFile);
            } catch (IOException e){
                e.printStackTrace();
            }

            recordFileUrl = "board" + File.separator + savingFileName;
            boardImgList.add(boardImgService.boardImgCreate(board, recordFileUrl));
        }

        return boardImgList;
    }

    private void boardImgDelete(Board board) {
        try {
            for (BoardImg boardImg : board.getBoardImgs()) {
                File oldFile = new File("/images" + File.separator + boardImg);
                oldFile.delete();

                boardImgService.boardImgDelete(boardImg.getBoardImgId());
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
