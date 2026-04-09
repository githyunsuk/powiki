package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.TypeDTO;
import com.example.powiki.domain.mechanic.model.TypeEfficacyDTO;
import com.example.powiki.domain.mechanic.model.response.TypeSummaryResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TypeMapper {

    void insertType(TypeDTO type);

    void insertTypeEfficacy(TypeEfficacyDTO typeEfficacy);

    List<TypeSummaryResponse> retrieveAllType();
}
