package com.example.powiki.api2db.model;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TypeEfficacyDTO {

    private Integer damageTypeId;
    private Integer targetTypeId;
    private double damageFactor;
}
