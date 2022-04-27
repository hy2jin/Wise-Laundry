package com.ssafy.wiselaundry.global.Mattermost;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


@Component
@RequiredArgsConstructor
public class MatterMostSender {
    private Logger log =  LoggerFactory.getLogger(MatterMostSender.class);


    private String webhookUrl= "https://meeting.ssafy.com/hooks/p37rmhyo77deimpnb5gt64co3h";

//    private RestTemplate restTemplate;
    private final MattermostProperties mmProperties;


    public void sendMessage(Exception excpetion, String uri, String params) {
        if (!mmProperties.isMmEnabled())
            return;

        try {
            MatterMostMessageDTO.Attachment attachment = MatterMostMessageDTO.Attachment.builder()
                    .channel(mmProperties.getChannel())
                    .authorIcon(mmProperties.getAuthorIcon())
                    .authorName(mmProperties.getAuthorName())
                    .color(mmProperties.getColor())
                    .pretext(mmProperties.getPretext())
                    .title(mmProperties.getTitle())
                    .text(mmProperties.getText())
                    .footer(mmProperties.getFooter())
                    .build();

            attachment.addExceptionInfo(excpetion, uri, params);
            MatterMostMessageDTO.Attachments attachments = new MatterMostMessageDTO.Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = new Gson().toJson(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }

    }
}
