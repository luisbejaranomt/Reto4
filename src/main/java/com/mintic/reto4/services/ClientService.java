package com.mintic.reto4.services;

import com.mintic.reto4.model.Client;
import com.mintic.reto4.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

}
