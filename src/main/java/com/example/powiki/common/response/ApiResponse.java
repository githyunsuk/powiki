package com.example.powiki.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    private boolean success;
    private T data;
    private String message;

    /**
     * 성공 응답 - 데이터 포함
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        ApiResponse<T> response = ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .message("요쳥이 성공적으로 처리되었습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    /**
     *성공 응답 - 데이터 미포함
     */
    public static ResponseEntity<ApiResponse<Object>> success() {
        ApiResponse<Object> response = ApiResponse.builder()
                .success(true)
                .data(null)
                .message("요청이 성공적으로 처리되었습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    /**
     * 실패 응답
     */
    public static ResponseEntity<ApiResponse<Object>> fail(HttpStatus status) {
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .data(null)
                .message("요청이 실패했습니다.")
                .build();
        return ResponseEntity.status(status).body((response));
    }
}
