package com.example.powiki.global.error;

import com.example.powiki.global.response.ApiResponse;
import com.example.powiki.global.response.ApiStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<ApiResponse<Object>> handleException(CommonException ex) {
        String origin = extractOriginClassName(ex);
        log.warn("API 예외 발생: {} from {}", ex.getMessage(), origin);

        return ApiResponse.fail(ex);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleException(RuntimeException ex) {
        String origin = extractOriginClassName(ex);
        log.error("Runtime Exception 발생: {} form {}", ex.getMessage(), origin);

        return ApiResponse.fail(ApiStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {
        String origin = extractOriginClassName(ex);
        log.error("Exception 발생: {} form {}", ex.getMessage(), origin);

        return ApiResponse.fail(ApiStatus.INTERNAL_SERVER_ERROR);
    }


    private String extractOriginClassName(Exception ex) {
        for(StackTraceElement element : ex.getStackTrace()) {
            if(element.getClassName().startsWith("com.example.powiki")) {
                return element.getClassName();
            }
        }
        return "UnknownOrigin";
    }
}
