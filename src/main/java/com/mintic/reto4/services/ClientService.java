package com.mintic.reto4.services;

import com.mintic.reto4.model.Client;
import com.mintic.reto4.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ClientService {

    /* Logica del Negocio*/
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client c){
        if(c.getIdClient()==null){
            return clientRepository.save(c);
        }else{
            Optional<Client> c1 = clientRepository.getClient(c.getIdClient());
            if(c1.isPresent()){
                return clientRepository.save(c);
            }else{
                return c;
            }
        }
    }

    public Client update(Client u){

        if (u.getIdClient()!=null){
            Optional<Client> m = clientRepository.getClient(u.getIdClient());
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
                        Logger.getLogger(ClientService.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(ClientService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                clientRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }

    public boolean delete(int id){
        Optional<Client> d = clientRepository.getClient(id);
        boolean state = false;
        if (d.isPresent()){
            clientRepository.delete(d.get());
            state = true;
        }
        return state;
    }


}
