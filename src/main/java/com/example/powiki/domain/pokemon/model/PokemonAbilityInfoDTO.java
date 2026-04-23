package com.example.powiki.domain.pokemon.model;

import lombok.Getter;

@Getter
public class PokemonAbilityInfoDTO {

    private Long id;
    private String name;
    private String description;
    private Boolean isHidden;
    private Integer slot;

}
