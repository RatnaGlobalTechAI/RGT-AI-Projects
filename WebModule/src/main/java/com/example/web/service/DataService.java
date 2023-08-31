package com.example.web.service;

import com.example.web.domain.DataModel;
import com.example.web.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {
    @Autowired
    private DataRepository repository;

    public List<DataModel> getAllData()
    {
        return repository.findAll();
    }

    public DataModel getByName(String name)
    {
        DataModel data = repository.findByName(name);
        if (data != null)
            return data;
        return null;
    }

    public DataModel saveData(DataModel data)
    {
        return repository.save(data);
    }
}
