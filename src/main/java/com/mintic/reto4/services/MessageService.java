package com.mintic.reto4.services;

import com.mintic.reto4.model.Message;
import com.mintic.reto4.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    /* Logica del Negocio*/
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message m){
        if(m.getIdMessage()==null){
            return messageRepository.save(m);
        }else{
            Optional<Message> m1 = messageRepository.getMessage(m.getIdMessage());
            if(m1.isPresent()){
                return messageRepository.save(m);
            }else{
                return m;
            }
        }
    }

}
