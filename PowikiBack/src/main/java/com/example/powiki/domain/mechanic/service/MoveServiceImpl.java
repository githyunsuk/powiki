package com.example.powiki.domain.mechanic.service;

import com.example.powiki.domain.mechanic.mapper.MoveMapper;
import com.example.powiki.domain.mechanic.model.response.MoveListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoveServiceImpl implements MoveService {

    private final MoveMapper moveMapper;

    @Override
    public List<MoveListResponse> searchAllMoveList() {

        return moveMapper.selectAllMoveList();
    }
}
