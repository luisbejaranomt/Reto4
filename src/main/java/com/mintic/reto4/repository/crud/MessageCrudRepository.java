package com.mintic.reto4.repository.crud;

import com.mintic.reto4.model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message,Integer> {
}
