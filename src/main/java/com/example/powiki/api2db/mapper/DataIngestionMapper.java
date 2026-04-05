package com.example.powiki.api2db.mapper;

import com.example.powiki.api2db.model.TypeApiDTO;
import com.example.powiki.api2db.model.TypeEfficacyDTO;
import com.example.powiki.api2db.model.VersionApiDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DataIngestionMapper {

    void insertVersion(VersionApiDTO versionApi);

    void insertType(TypeApiDTO typeApi);

    void insertTypeEfficacy(TypeEfficacyDTO typeEfficacy);

    void insertEggGroup(@Param("id") Integer id, @Param("name") String name);
}
