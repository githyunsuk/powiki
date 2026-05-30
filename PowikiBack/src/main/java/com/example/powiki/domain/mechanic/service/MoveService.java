package com.example.powiki.domain.mechanic.service;


import com.example.powiki.domain.mechanic.model.response.MoveListResponse;

import java.util.List;

public interface MoveService {

    List<MoveListResponse> searchAllMoveList();
}
