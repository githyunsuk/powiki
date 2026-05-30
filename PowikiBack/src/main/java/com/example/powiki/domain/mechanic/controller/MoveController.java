package com.example.powiki.domain.mechanic.controller;

import com.example.powiki.domain.mechanic.model.response.MoveListResponse;
import com.example.powiki.domain.mechanic.service.MoveService;
import com.example.powiki.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MoveController {

    private final MoveService moveService;

    @GetMapping("/api/moves")
    public ResponseEntity<ApiResponse<List<MoveListResponse>>> getAllMoveList() {

        List<MoveListResponse> result = moveService.searchAllMoveList();

        return ApiResponse.success(result);
    }
}
