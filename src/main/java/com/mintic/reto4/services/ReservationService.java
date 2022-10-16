package com.mintic.reto4.services;

import com.mintic.reto4.model.Reservation;
import com.mintic.reto4.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

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

    public Reservation update(Reservation u){

        if (u.getIdReservation()!=null){
            Optional<Reservation> m = reservationRepository.getReservation(u.getIdReservation());
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
                        Logger.getLogger(ReservationService.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(ReservationService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                reservationRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }

    public boolean delete(int id){
        Optional<Reservation> d = reservationRepository.getReservation(id);
        boolean state = false;
        if (d.isPresent()){
            reservationRepository.delete(d.get());
            state = true;
        }
        return state;
    }

}
