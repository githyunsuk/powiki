package com.example.powiki.global.response;

import com.example.powiki.global.error.CommonException;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@RequiredArgsConstructor
@Builder
public class ApiResponse<T> {
    private final boolean success;
    private final T data;
    private final String message;

    // 공통 생성 로직
    private static <T> ResponseEntity<ApiResponse<T>> createResponse(boolean success, HttpStatus status, T data, String message) {
        return ResponseEntity.status(status).body(
                ApiResponse.<T>builder()
                        .success(success)
                        .data(data)
                        .message(message)
                        .build()
        );
    }

    // 성공 - 데이터 포함
    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return createResponse(true, HttpStatus.OK, data, ApiStatus.OK.getMessage());
    }

    // 성공 - 데이터 미포함
    public static ResponseEntity<ApiResponse<Object>> success(ApiStatus status) {
        return createResponse(true, status.getHttpStatus(), null, status.getMessage());
    }

    // 실패
    public static ResponseEntity<ApiResponse<Object>> fail(ApiStatus status) {
        return createResponse(false, status.getHttpStatus(), null, status.getMessage());
    }

    // 실패 - CommonException
    public static ResponseEntity<ApiResponse<Object>> fail(CommonException ex) {
        return createResponse(false, ex.getStatus().getHttpStatus(), null, ex.getMessage());
    }
}