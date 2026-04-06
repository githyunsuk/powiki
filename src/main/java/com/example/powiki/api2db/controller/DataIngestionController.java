package com.example.powiki.api2db.controller;

import com.example.powiki.api2db.service.DataIngestionService;
import com.example.powiki.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/ingestion")
public class DataIngestionController {

    private final DataIngestionService dataIngestionService;

    /**
     * 버전 데이터 수집
     */
    @GetMapping("/version")
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

    /**
     *  타입 데이터 수집
     */
    @GetMapping("/type")
    public ResponseEntity<ApiResponse<Object>> ingestTypeData() {
        log.info("### 타입 데이터 수집 시작");

        try {
            dataIngestionService.processTypeIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  알 그룹 데이터 수집
     */
    @GetMapping("/egg_group")
    public ResponseEntity<ApiResponse<Object>> ingestEggGroup() {
        log.info("### 알 그룹 데이터 수집 시작");

        try {
            dataIngestionService.processEggGroupIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  특성 데이터 수집
     */
    @GetMapping("/ability")
    public ResponseEntity<ApiResponse<Object>> ingestAbility() {
        log.info("### 특성 데이터 수집 시작");

        try {
            dataIngestionService.processAbilityIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  포켓몬 데이터 수집
     */
    @GetMapping("/pokemon")
    public ResponseEntity<ApiResponse<Object>> ingestPokemon() {
        log.info("### 포켓몬 데이터 수집 시작");

        try {
            dataIngestionService.processPokemonIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
