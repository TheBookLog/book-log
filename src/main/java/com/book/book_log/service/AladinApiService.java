package com.book.book_log.service;

import com.book.book_log.config.AladinApiProperties;
import com.book.book_log.dto.AladinBookResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AladinApiService {
    private final AladinApiProperties aladinApiProperties;

    public AladinBookResponseDTO searchBooks(String query) {
        String url = String.format(
                "%sItemSearch.aspx?ttbkey=%s&Query=%s&SearchTarget=Book&output=js",
                aladinApiProperties.getBaseUrl(), aladinApiProperties.getKey(), query
        );

        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(url, AladinBookResponseDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("알라딘 API 호출 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
