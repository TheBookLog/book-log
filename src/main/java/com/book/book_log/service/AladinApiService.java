package com.book.book_log.service;

import com.book.book_log.config.AladinApiProperties;
import com.book.book_log.dto.AladinBookResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AladinApiService {
    private final AladinApiProperties aladinApiProperties;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 변환을 위한 ObjectMapper

    public AladinBookResponseDTO searchBooks(String query) {
        String url = String.format(
                "%sItemSearch.aspx?ttbkey=%s&Query=%s&SearchTarget=Book&output=js&MaxResults=48",
                aladinApiProperties.getBaseUrl(), aladinApiProperties.getKey(), query
        );

        try {
            // 먼저 String 타입으로 응답을 받아온다.
            String jsonResponse = restTemplate.getForObject(url, String.class);

            // JSON 문자열을 AladinBookResponseDTO 객체로 변환한다.
            return objectMapper.readValue(jsonResponse, AladinBookResponseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("알라딘 API 호출 중 오류 발생: " + e.getMessage(), e);
        }
    }
}