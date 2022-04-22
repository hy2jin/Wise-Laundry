package com.ssafy.wiselaundry.domain.laundry.service;

import com.ssafy.wiselaundry.domain.laundry.db.bean.*;
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
    public List<LaundryAll> findUserLaundryAll(int userId) {
        List<LaundryDetail> list = laundryRepositorySpp.laundryDetailByUserId(userId);
        List<LaundryAll> userLaundryAlls = new ArrayList<>();
        for(int i = 0; i < list.size(); i++){
            LaundryAll userLaundryAll = new LaundryAll();

            userLaundryAll.setLaundryId(list.get(i).getLaundryId());
            userLaundryAll.setLaundryImg(list.get(i).getLaundryImg());
            userLaundryAll.setCareLabels(findCareLabelDetail(list.get(i).getLaundryId()));

            userLaundryAlls.add(userLaundryAll);
        }
        return userLaundryAlls;
    }

    @Override
    public List<CareLabelDetail> findCareLabelDetail(int laundryId) {
        return laundryRepositorySpp.careLabelDetailsByLaundryId(laundryId);
    }

    @Override
    public List<LaundryDetails> findLaundryDetails(int laundryId) {
        Laundry laundry = laundryRepository.findByLaundryId(laundryId);

        List<LaundryDetails> laundryDetails = new ArrayList<>();

        LaundryDetails laundryDetail = new LaundryDetails();

        laundryDetail.setLaundryId(laundry.getLaundryId());
        laundryDetail.setLaundryImg(laundry.getLaundryImg());
        laundryDetail.setUserId(laundry.getUser().getUserId());
        laundryDetail.setUserNick(laundry.getUser().getUserNick());
        laundryDetail.setCareLabelDetails(findCareLabelDetail(laundry.getLaundryId()));
        laundryDetail.setInfoDetails(findInfoDetail(laundry.getLaundryId()));

        laundryDetails.add(laundryDetail);

        return laundryDetails;

    }

    @Override
    public List<InfoDetail> findInfoDetail(int laundryId) {
        return laundryRepositorySpp.infoDetailsByLaundryId(laundryId);
    }

    @Override
    public int laundryRegisterByUser(UserLaundryRegisterPostReq userLaundryRegisterPostReq) {
        User user = userRepository.findByUserId(userLaundryRegisterPostReq.getUserId());
        Laundry laundry = new Laundry();

        //옷 등록
        laundry.setLaundryMemo(userLaundryRegisterPostReq.getLaundryMemo());
        laundry.setLaundryImg(userLaundryRegisterPostReq.getLaundryImg());
        laundry.setUser(user);
        laundryRepository.save(laundry);

        //케어라벨
        for(int i = 0; i < userLaundryRegisterPostReq.getCareLabels().length;i++){
            LaundryCareLabels laundryCareLabels = new LaundryCareLabels();

            int careLabel = userLaundryRegisterPostReq.getCareLabels()[i];
            CareLabels careLabels = careLabelsRepository.findByCareLabelId(careLabel);

            laundryCareLabels.setCareLabel(careLabels);
            laundryCareLabels.setLaundry(laundry);
            laundryCareLabelsRepository.save(laundryCareLabels);
        }

        //옷 정보 등록
        for(int i = 0; i < userLaundryRegisterPostReq.getLaundryInfos().length;i++) {
            String laundryInfos = userLaundryRegisterPostReq.getLaundryInfos()[i];
            if(infoRepository.findByLaundryInfo(laundryInfos) == null) {
                Info info = new Info();

                info.setLaundryInfo(laundryInfos);
                infoRepository.save(info);
            }
        }
        //찾아서 연결
        for(int i = 0; i < userLaundryRegisterPostReq.getLaundryInfos().length;i++) {
            String laundryInfos = userLaundryRegisterPostReq.getLaundryInfos()[i];
            Info info = infoRepository.findByLaundryInfo(laundryInfos);
            LaundryInfo laundryInfo = new LaundryInfo();
            laundryInfo.setLaundry(laundry);
            laundryInfo.setLaundryInfo(info);

            laundryInfoRepository.save(laundryInfo);
        }

        return 1;
    }

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

    public List<LaundryAll> findLaundryAll() {
        List<LaundryDetail> list = laundryRepositorySpp.laundryDetail();
        List<LaundryAll> userLaundryAlls = new ArrayList<>();
        for(int i = 0; i < list.size(); i++){
            LaundryAll userLaundryAll = new LaundryAll();

            userLaundryAll.setLaundryId(list.get(i).getLaundryId());
            userLaundryAll.setLaundryImg(list.get(i).getLaundryImg());
            userLaundryAll.setCareLabels(findCareLabelDetail(list.get(i).getLaundryId()));

            userLaundryAlls.add(userLaundryAll);
        }
        return userLaundryAlls;
    }


    @Override
    public List<LaundryDetails> modifyLaundryDetails(int laundryId,LaundryModifyPostRep laundryModifyPostRep) {
        Laundry laundry = laundryRepository.findByLaundryId(laundryId);

        //라벨 삭제
        //laundryCareLabel 삭제
        laundryCareLabelsRepository.deleteByLaundry(laundry);

        //laundryInfo 삭제
        laundryInfoRepository.deleteByLaundry(laundry);

        //옷 수정
        laundry.setLaundryMemo(laundryModifyPostRep.getLaundryMemo());
        laundry.setLaundryImg(laundryModifyPostRep.getLaundryImg());
        laundryRepository.save(laundry);

        //케어라벨 수정
        for(int i = 0; i < laundryModifyPostRep.getCareLabels().length;i++){
            LaundryCareLabels laundryCareLabels = new LaundryCareLabels();

            int careLabel = laundryModifyPostRep.getCareLabels()[i];
            CareLabels careLabels = careLabelsRepository.findByCareLabelId(careLabel);

            laundryCareLabels.setCareLabel(careLabels);
            laundryCareLabels.setLaundry(laundry);
            laundryCareLabelsRepository.save(laundryCareLabels);
        }

        //옷 정보 수정
        for(int i = 0; i < laundryModifyPostRep.getLaundryInfos().length;i++) {
            String laundryInfos = laundryModifyPostRep.getLaundryInfos()[i];
            if(infoRepository.findByLaundryInfo(laundryInfos) == null) {
                Info info = new Info();

                info.setLaundryInfo(laundryInfos);
                infoRepository.save(info);
            }
        }
        //찾아서 연결
        for(int i = 0; i < laundryModifyPostRep.getLaundryInfos().length;i++) {
            String laundryInfos = laundryModifyPostRep.getLaundryInfos()[i];
            Info info = infoRepository.findByLaundryInfo(laundryInfos);
            LaundryInfo laundryInfo = new LaundryInfo();
            laundryInfo.setLaundry(laundry);
            laundryInfo.setLaundryInfo(info);

            laundryInfoRepository.save(laundryInfo);
        }

        return findLaundryDetails(laundryId);
    }
}
