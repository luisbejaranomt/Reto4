package com.mintic.reto4.repository;

import com.mintic.reto4.model.Score;
import com.mintic.reto4.repository.crud.ScoreCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll(){
        return (List<Score>)scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(int idScore){
        return scoreCrudRepository.findById(idScore);
    }

    public Score save(Score s){
        return scoreCrudRepository.save(s);
    }

    public void delete(Score s){
        scoreCrudRepository.delete(s);
    }
}

