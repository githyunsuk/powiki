package com.example.powiki.api2db.model;

import lombok.*;

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
}
