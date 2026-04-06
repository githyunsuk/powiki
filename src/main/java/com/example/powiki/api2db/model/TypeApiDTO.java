package com.example.powiki.api2db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TypeApiDTO {

    private Integer id;
    private Integer generation;
    private String name;
    private String sprite;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
