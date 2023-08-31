package com.example.web.repository;

import com.example.web.domain.DataModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DataRepository extends MongoRepository<DataModel, String> {
    public DataModel findByName(String device);
}
