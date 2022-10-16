package com.mintic.reto4.services;

import com.mintic.reto4.model.Message;
import com.mintic.reto4.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

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

    public Message update(Message u){

        if (u.getIdMessage()!=null){
            Optional<Message> m = messageRepository.getMessage(u.getIdMessage());
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
                        Logger.getLogger(MessageService.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(MessageService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                messageRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }

    public boolean delete(int id){
        Optional<Message> d = messageRepository.getMessage(id);
        boolean state = false;
        if (d.isPresent()){
            messageRepository.delete(d.get());
            state = true;
        }
        return state;
    }




}
