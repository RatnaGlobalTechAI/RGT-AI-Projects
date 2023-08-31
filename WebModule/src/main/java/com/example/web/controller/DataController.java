package com.example.web.controller;

import com.example.web.domain.DataModel;
import com.example.web.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DataController {
    @Autowired
    private DataService service;

    @GetMapping("/data")
    public List<DataModel> getData()
    {
        return service.getAllData();
    }

    @GetMapping("/devices/{device}")
    public DataModel getData(@PathVariable String name)
    {
        return service.getByName(name);
    }

    @PostMapping("/devices/save")
    public DataModel saveDatae(@RequestBody DataModel data)
    {
        return service.saveData(data);
    }
}
