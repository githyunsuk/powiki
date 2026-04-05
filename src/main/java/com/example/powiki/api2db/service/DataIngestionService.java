package com.example.powiki.api2db.service;

public interface DataIngestionService {

    public void processVersionIngestion();

    public void processTypeIngestion();

    public void processEggGroupIngestion();

    public void processPokemonIngestion();
}
