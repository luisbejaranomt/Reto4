package com.mintic.reto4.services;

import com.mintic.reto4.model.Reservation;
import com.mintic.reto4.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    /* Logica del Negocio*/
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation r){
        if(r.getIdReservation()==null){
            return reservationRepository.save(r);
        }else{
            Optional<Reservation> r1 = reservationRepository.getReservation(r.getIdReservation());
            if(r1.isPresent()){
                return reservationRepository.save(r);
            }else{
                return r;
            }
        }
    }

}
