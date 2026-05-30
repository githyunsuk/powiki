package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.entity.*;
import com.example.powiki.domain.mechanic.model.response.MoveListResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MoveMapper {

    void insertMoveAilment(MoveAilment moveAilment);

    void insertMoveCategory(MoveCategory moveCategory);

    void insertMoveTarget(MoveTarget moveTarget);

    void insertMove(Move move);

    void insertMoveStatChange(MoveStatChange moveStatChange);

    List<MoveListResponse> selectAllMoveList();
}
