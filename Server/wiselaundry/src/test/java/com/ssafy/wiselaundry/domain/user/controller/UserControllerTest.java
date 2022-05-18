package com.ssafy.wiselaundry.domain.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wiselaundry.domain.user.request.UserLoginPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureMockMvc
@SpringBootTest
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    UserService userService;

    @BeforeAll
    static void beforeAll(){

    }

//    @BeforeEach
//    public void beforeEach(){
//        objectMapper = Jackson2ObjectMapperBuilder.json()
//                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
//                .modules(new JavaTimeModule())
//                .build();
//    }

    @Test
    void loginTest(){
        // test value
        String id ="test2@ssafy.com";
        String pw ="test1234!";

        //test settings
        String url = "/api/user/login";
        UserLoginPostReq body = new UserLoginPostReq();
        body.setUserEmail(id);
        body.setUserPassword(pw);
        StringBuilder sb = new StringBuilder();
        sb.append("Test settings============================").append("\n")
                        .append("URL : "+ url).append("\n")
                        .append("ID : "+ id).append("\n")
                        .append("PW : "+ pw).append("\n");
        try {
            mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType.APPLICATION_JSON).content(body.toJson().toString()))
                    .andExpect(result->{
                        MockHttpServletResponse response = result.getResponse();
                        sb.append("Test Result==============================\n");
                        sb.append(response.getContentAsString()+"\n");
                        sb.append("=========================================");
                    });
        }catch (Exception e){
            sb.append("Test Error===============================");
            sb.append(e+"\n");
            sb.append("=========================================");

        }finally {
            System.out.println(sb.toString());
        }
    }

    @Test
    void register() {
        // test value
        String id ="test3@ssafy.com";
        String pw ="test1234!";
        String nick = "kim2";

        //test settings
        String url = "/api/user/signup";
        
        UserRegisterPostReq body = new UserRegisterPostReq();
        body.setUserEmail(id);
        body.setPassword(pw);
        body.setUserNick(nick);

        StringBuilder sb = new StringBuilder();
        sb.append("Test settings============================").append("\n")
                .append("URL : "+ url).append("\n")
                .append("ID : "+ id).append("\n")
                .append("PW : "+ pw).append("\n")
                .append("Nick : "+ nick).append("\n");
        try {
            mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType.APPLICATION_JSON).content(body.toJson().toString()))
                    .andExpect(result->{
                        MockHttpServletResponse response = result.getResponse();
                        sb.append("Test Result==============================\n");
                        sb.append(response.getContentAsString()+"\n");
                        sb.append("=========================================");
                    });
        }catch (Exception e){
            sb.append("Test Error===============================");
            sb.append(e+"\n");
            sb.append("=========================================");

        }finally {
            System.out.println(sb.toString());
        }
    }

    @Test
    void update() {
    }

    @Test
    void emailCheckTest(){
        // test value
        String email ="test.naver.com";

        //test settings
        String url = "/api/user/emailcheck";
        StringBuilder sb = new StringBuilder();
        sb.append("Test settings============================").append("\n")
                .append("URL : "+ url).append("\n")
                .append("email: "+ email).append("\n");
        try {
            mockMvc.perform(MockMvcRequestBuilders.get(url).param("email", email))
                    .andExpect(result -> {
                        MockHttpServletResponse response = result.getResponse();
                        sb.append("Test Result==============================\n");
                        sb.append(response.getContentAsString()+"\n");
                        sb.append("=========================================");
                        System.err.println(response.getContentAsString());
                    });
        }catch (Exception e){
            sb.append("Test Error===============================");
            sb.append(e+"\n");
            sb.append("=========================================");
        }finally {
            System.out.println(sb.toString());
        }
    }

    @Test
    void nickCheckTest() {
        // test value
        String nick ="test.naver.com";

        //test settings
        String url = "/api/user/nickcheck";
        StringBuilder sb = new StringBuilder();
        sb.append("Test settings============================").append("\n")
                .append("URL : "+ url).append("\n")
                .append("nick: "+ nick).append("\n");
        try {
            mockMvc.perform(MockMvcRequestBuilders.get(url).param("nick", nick))
                    .andExpect(result -> {
                        MockHttpServletResponse response = result.getResponse();
                        sb.append("Test Result==============================\n");
                        sb.append(response.getContentAsString()+"\n");
                        sb.append("=========================================");
                        System.err.println(response.getContentAsString());
                    });
        }catch (Exception e){
            sb.append("Test Error===============================");
            sb.append(e+"\n");
            sb.append("=========================================");
        }finally {
            System.out.println(sb.toString());
        }
    }

    @Test
    void getUserInfo() {
    }
}
