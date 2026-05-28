package com.example.powiki.domain.mechanic.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoveListResponse {

    private Long id;

    private String name;
    private Integer power;
    private Integer accuracy;
    private Integer pp;
    private String description;

    private Type type;
    private Ailment ailment;
    private MoveClass moveClass;
    private Target target;
    private Category category;

    @Getter
    public static class Type {
        private Long id;
        private String name;
        private String color;
    }

    @Getter
    public static class Ailment {
        private Long id;
        private String name;
        private String description;
    }

    @Getter
    public static class MoveClass {
        private Long id;
        private String name;
        private String description;
    }

    @Getter
    public static class Target {
        private Long id;
        private String name;
        private String description;
    }

    @Getter
    public static class Category {
        private Long id;
        private String name;
        private String description;
    }
}
