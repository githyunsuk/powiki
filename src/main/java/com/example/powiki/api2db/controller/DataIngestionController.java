package com.example.powiki.api2db.controller;

import com.example.powiki.api2db.service.DataIngestionService;
import com.example.powiki.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class DataIngestionController {

    private final DataIngestionService dataIngestionService;

    /**
     * 버전 데이터 수집
     */
    @GetMapping("/api/ingestion/version")
    public ResponseEntity<ApiResponse<Object>> ingestVersionData() {
        log.info("### 버전 데이터 수집 시작");

        try {
            dataIngestionService.processVersionIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
