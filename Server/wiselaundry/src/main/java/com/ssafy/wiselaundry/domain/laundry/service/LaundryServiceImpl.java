package com.ssafy.wiselaundry.domain.laundry.service;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetail;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetails;
import com.ssafy.wiselaundry.domain.laundry.db.entity.*;
import com.ssafy.wiselaundry.domain.laundry.db.repository.*;
import com.ssafy.wiselaundry.domain.laundry.request.LaundryModifyPostRep;
import com.ssafy.wiselaundry.domain.laundry.request.UserLaundryRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LaundryServiceImpl implements LaundryService{
    @Autowired
    LaundryRepository laundryRepository;

    @Autowired
    LaundryRepositorySpp laundryRepositorySpp;

    @Autowired
    UserService userService;

    @Autowired
    CareLabelsRepository careLabelsRepository;

    @Autowired
    LaundryCareLabelsRepository laundryCareLabelsRepository;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    LaundryInfoRepository laundryInfoRepository;

    @Override
    public List<String> findCareLabelDetail(int laundryId) {
        return laundryRepositorySpp.careLabelDetailsByLaundryId(laundryId);
    }

    @Value("${app.fileupload.uploadDir}")
    private String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    private String uploadPath;

    @Override
    public List<String> findInfoDetail(int laundryId) {
        return laundryRepositorySpp.infoDetailsByLaundryId(laundryId);
    }

    //내 옷장 전체 검색
    @Override
    public List<LaundryAll> findUserLaundryAll(int userId) {
        List<LaundryDetail> list = laundryRepositorySpp.laundryDetailByUserId(userId);
        List<LaundryAll> userLaundryAlls = new ArrayList<>();
        for(int i = 0; i < list.size(); i++){

            userLaundryAlls.add(LaundryAll.builder()
                    .laundryId(list.get(i).getLaundryId())
                    .laundryImg(list.get(i).getLaundryImg())
                    .careLabel(findCareLabelDetail(list.get(i).getLaundryId()))
                    .build());
        }
        return userLaundryAlls;
    }

    //옷 detail 조회
    @Override
    public LaundryDetails findLaundryDetails(int laundryId) {
        Laundry laundry = laundryRepository.findByLaundryId(laundryId);
        if(laundry == null){
            return null;
        }
        return LaundryDetails.builder().laundryId(laundry.getLaundryId())
                .laundryImg(laundry.getLaundryImg())
                .laundryOwnerId(laundry.getUser().getUserId())
                .laundryOwnerNick(laundry.getUser().getUserNick())
                .careLabels(laundryRepositorySpp.careLabelsByLaundryId(laundry.getLaundryId()))
                .laundryInfo(findInfoDetail(laundry.getLaundryId()))
                .laundryMemo(laundry.getLaundryMemo())
                .build();

    }

    //내 옷 등록
    @Override
    public int laundryRegisterByUser(UserLaundryRegisterPostReq userLaundryRegisterPostReq, MultipartHttpServletRequest request) {
        User user = userService.findByUserId(userLaundryRegisterPostReq.getUserId());

        if(user == null){
            return 0;
        }

        List<MultipartFile> fileList = request.getFiles("file");

        File uploadDir = new File(uploadPath + uploadFolder+ File.separator +"laundry");

        // recordimages 폴더 존재하지 않으면 생성
        if (!uploadDir.exists()) uploadDir.mkdir();
        String recordFileUrl = "";
        for (MultipartFile part : fileList) {

            String fileName = part.getOriginalFilename();

            // 보안을 위해 이미지 파일명 난수로 변환
            UUID uuid = UUID.randomUUID();

            // 파일 확장자 추출
            String extension = FilenameUtils.getExtension(fileName);

            // 난수로 지정한 파일명 + 확장자
            String savingFileName = uuid + "." + extension;

            File destFile = new File(uploadPath, uploadFolder + File.separator+ "laundry" + File.separator + savingFileName);

            // 파일 저장

            try {
                part.transferTo(destFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
            recordFileUrl = "laundry" + File.separator + savingFileName;

        }

        Laundry laundry = Laundry.builder()
                .laundryImg(recordFileUrl)
                .user(user)
                .laundryMemo(userLaundryRegisterPostReq.getLaundryMemo())
                .build();
        laundryRepository.save(laundry);

        //케어라벨
        for(int i = 0; i < userLaundryRegisterPostReq.getCareLabelName().length; i++) {
            String careLabel = userLaundryRegisterPostReq.getCareLabelName()[i];
            CareLabels findCareLabel = careLabelsRepository.findByCareLabelName(careLabel);

            if(findCareLabel == null){
                findCareLabel = CareLabels.builder().careLabel(careLabel).careLabelName(careLabel).build();
                careLabelsRepository.save(findCareLabel);

            }

            laundryCareLabelsRepository.save(LaundryCareLabels.builder()
                    .careLabel(findCareLabel)
                    .laundry(laundry)
                    .build());
        }

        //LaundryInfo
        for(int i = 0; i < userLaundryRegisterPostReq.getLaundryInfo().length; i++) {
            String laundryInfo = userLaundryRegisterPostReq.getLaundryInfo()[i];
            Info info = new Info();
            if(infoRepository.findByLaundryInfo(laundryInfo) == null){
                infoRepository.save(Info.builder().laundryInfo(laundryInfo).build());
            }
            info = infoRepository.findByLaundryInfo(laundryInfo);

            laundryInfoRepository.save(LaundryInfo.builder()
                    .laundryInfo(info).laundry(laundry)
                    .build());
        }

        return 1;
    }

    //옷 삭제
    @Override
    public int deleteLaundry(int laundryId) {

        Laundry laundry = laundryRepository.findByLaundryId(laundryId);

        //laundryCareLabel 삭제
        laundryCareLabelsRepository.deleteByLaundry(laundry);

        //laundryInfo 삭제
        laundryInfoRepository.deleteByLaundry(laundry);

        //Laundry 삭제
        laundryRepository.deleteByLaundryId(laundryId);
        return 1;
    }

    //모든 옷장 전체 목록
    @Override
    public List<LaundryAll> findLaundryAll() {
        List<LaundryDetail> list = laundryRepositorySpp.laundryDetail();
        List<LaundryAll> userLaundryAlls = new ArrayList<>();
        for(int i = 0; i < list.size(); i++){
            userLaundryAlls.add(LaundryAll.builder()
                    .laundryId(list.get(i).getLaundryId())
                    .laundryImg(list.get(i).getLaundryImg())
                    .careLabel(findCareLabelDetail(list.get(i).getLaundryId()))
                    .build());
        }
        return userLaundryAlls;
    }

    //내 옷 수정
    @Override
    public int modifyLaundryDetails(LaundryModifyPostRep laundryModifyPostRep, MultipartHttpServletRequest request) {
        Laundry laundry = laundryRepository.findByLaundryId(laundryModifyPostRep.getLaundryId());
        if(laundry == null){
            return 0;
        }

        List<MultipartFile> fileList = request.getFiles("file");

        String recordFileUrl = "";
        if (!fileList.isEmpty()){
            if(!laundry.getLaundryImg().equals(null)){
                try {
                    File oldFile = new File("/images"+File.separator + laundry.getLaundryImg());
                    oldFile.delete();
                }catch (Exception e){
                    e.printStackTrace();
                }

            }

            File uploadDir = new File(uploadPath + uploadFolder+ File.separator +"laundry");

            // recordimages 폴더 존재하지 않으면 생성
            if (!uploadDir.exists()) uploadDir.mkdir();
            for (MultipartFile part : fileList) {

                String fileName = part.getOriginalFilename();

                // 보안을 위해 이미지 파일명 난수로 변환
                UUID uuid = UUID.randomUUID();

                // 파일 확장자 추출
                String extension = FilenameUtils.getExtension(fileName);

                // 난수로 지정한 파일명 + 확장자
                String savingFileName = uuid + "." + extension;

                File destFile = new File(uploadPath, uploadFolder + File.separator+ "laundry" + File.separator + savingFileName);

                // 파일 저장
                try {
                    part.transferTo(destFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                recordFileUrl = "laundry" + File.separator + savingFileName;
                laundry.setLaundryImg(recordFileUrl);
            }
        }

        //laundry 수정
        laundry.setLaundryMemo(laundryModifyPostRep.getLaundryMemo());
        laundryRepository.save(laundry);

        //라벨 삭제
        //laundryCareLabel 삭제
        laundryCareLabelsRepository.deleteByLaundry(laundry);

        //laundryInfo 삭제
        laundryInfoRepository.deleteByLaundry(laundry);

        //케어라벨
        for(int i = 0; i < laundryModifyPostRep.getCareLabelName().length; i++) {
            String careLabel = laundryModifyPostRep.getCareLabelName()[i];
            CareLabels findCareLabel = careLabelsRepository.findByCareLabelName(careLabel);

            if(findCareLabel == null){
                findCareLabel = CareLabels.builder().careLabel(careLabel).careLabelName(careLabel).build();
                careLabelsRepository.save(findCareLabel);

            }

            laundryCareLabelsRepository.save(LaundryCareLabels.builder()
                    .careLabel(findCareLabel)
                    .laundry(laundry)
                    .build());
        }

        //LaundryInfo
        for(int i = 0; i < laundryModifyPostRep.getLaundryInfo().length;i++) {
            String laundryInfo = laundryModifyPostRep.getLaundryInfo()[i];
            Info info = null;
            if(infoRepository.findByLaundryInfo(laundryInfo) == null){
                infoRepository.save(Info.builder().laundryInfo(laundryInfo).build());
            }
            info = infoRepository.findByLaundryInfo(laundryInfo);

            laundryInfoRepository.save(LaundryInfo.builder()
                    .laundryInfo(info).laundry(laundry)
                    .build());
        }

        return 1;

    }

    @Override
    public List<CareLabels> findCareLabelsAll() {
        return careLabelsRepository.findAll();
    }
}
