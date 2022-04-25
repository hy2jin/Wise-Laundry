package com.ssafy.wiselaundry.domain.laundry.service;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetail;
import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetails;
import com.ssafy.wiselaundry.domain.laundry.db.entity.*;
import com.ssafy.wiselaundry.domain.laundry.db.repository.*;
import com.ssafy.wiselaundry.domain.laundry.request.LaundryModifyPostRep;
import com.ssafy.wiselaundry.domain.laundry.request.UserLaundryRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LaundryServiceImpl implements LaundryService{
    @Autowired
    LaundryRepository laundryRepository;

    @Autowired
    LaundryRepositorySpp laundryRepositorySpp;

    @Autowired
    UserRepository userRepository;

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
                .careLabel(findCareLabelDetail(laundry.getLaundryId()))
                .laundryInfo(findInfoDetail(laundry.getLaundryId()))
                .build();

    }

    //내 옷 등록
    @Override
    public int laundryRegisterByUser(UserLaundryRegisterPostReq userLaundryRegisterPostReq) {
        User user = userRepository.findByUserId(userLaundryRegisterPostReq.getUserId());

        if(user == null){
            return 0;
        }
        Laundry laundry = Laundry.builder()
                .laundryImg(userLaundryRegisterPostReq.getLaundryImg())
                .user(user)
                .laundryMemo(userLaundryRegisterPostReq.getLaundryMemo())
                .build();
        laundryRepository.save(laundry);

        //케어라벨
        for(int i = 0; i < userLaundryRegisterPostReq.getCareLabelName().length; i++) {
            String careLabel = userLaundryRegisterPostReq.getCareLabelName()[i];
            CareLabels findCareLabel = careLabelsRepository.findByCareLabelName(careLabel);


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
    public LaundryDetails modifyLaundryDetails(int laundryId,LaundryModifyPostRep laundryModifyPostRep) {
        Laundry laundry = laundryRepository.findByLaundryId(laundryId);
        if(laundry == null){
            return null;
        }
        //laundry 수정
        laundry.setLaundryMemo(laundryModifyPostRep.getLaundryMemo());
        laundry.setLaundryImg(laundryModifyPostRep.getLaundryImg());
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

        return findLaundryDetails(laundryId);

    }
}
