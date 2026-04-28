package com.example.powiki.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ApiStatus {

    // --- 성공 (2xx) ---
    OK(HttpStatus.OK, "요청이 성공적으로 완료되었습니다."),
    CREATED(HttpStatus.CREATED, "새로운 리소스가 생성되었습니다."),
    NO_CONTENT(HttpStatus.NO_CONTENT, "조회된 데이터가 없습니다."),

    // --- 클라이언트 오류 (4xx) ---
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "올바르지 않은 요청입니다. 확인 후 다시 시도해주세요."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요하거나 인증 세션이 만료되었습니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "해당 리소스에 접근할 권한이 없습니다."),
    NOT_FOUND(HttpStatus.NOT_FOUND, "요청하신 정보를 찾을 수 없습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "지원하지 않는 요청 방식입니다."),
    CONFLICT(HttpStatus.CONFLICT, "이미 존재하는 데이터와 충돌이 발생했습니다."),
    UNPROCESSABLE_ENTITY(HttpStatus.UNPROCESSABLE_ENTITY, "요청 데이터가 처리 조건에 부합하지 않습니다."),

    // --- 서버 오류 (5xx) ---
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부에서 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

    private final HttpStatus httpStatus;
    private final String message;
}