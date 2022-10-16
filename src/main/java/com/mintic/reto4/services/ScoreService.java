package com.mintic.reto4.services;

import com.mintic.reto4.model.Score;
import com.mintic.reto4.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;
    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score m){
        if(m.getIdScore()==null){
            return scoreRepository.save(m);
        }else{
            Optional<Score> e = scoreRepository.getScore(m.getIdScore());
            if(e.isPresent()){
                return m;
            }else {
                return scoreRepository.save(m);
            }
        }

    }

    public Score update(Score u){

        if (u.getIdScore()!=null){
            Optional<Score> m = scoreRepository.getScore(u.getIdScore());
            if(m.isPresent()){
                for (Field f : u.getClass().getDeclaredFields()) {
                    f.setAccessible(true);
                    Object value;
                    try {
                        value = f.get(u);
                        if (value != null) {
                            //System.out.println("prueba");
                            f.set(m.get(), value);
                        }
                    } catch (IllegalArgumentException ex) {
                        Logger.getLogger(ScoreService.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(ScoreService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                scoreRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }


    // otro metodo para eliminar
    public boolean delete(int id){
        Boolean m = getScore(id).map(t ->{
            scoreRepository.delete(t);
            return true;
        }).orElse(false);
        return m;
    }


    //public boolean delete(int id){
    //    Optional<Score> m = scoreRepository.getScore(id);
    //    boolean status = false;
    //    if (m.isPresent()){
    //       scoreRepository.delete(m.get());
    //        status = true;
    //   }
    //    return status;
    //}
}
