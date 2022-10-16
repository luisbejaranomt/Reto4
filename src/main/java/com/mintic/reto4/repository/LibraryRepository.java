package com.mintic.reto4.repository;

import com.mintic.reto4.model.Library;
import com.mintic.reto4.repository.crud.LibraryCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LibraryRepository {
    @Autowired
    private LibraryCrudRepository libraryCrudRepository;

    public List<Library> getAll(){
        return (List<Library>) libraryCrudRepository.findAll();
    }

    public Optional<Library> getLibrary(int id){
        return libraryCrudRepository.findById(id);
    }

    public Library save(Library l){
        return libraryCrudRepository.save(l);
    }

    public void delete(Library l){
        libraryCrudRepository.delete(l);
    }
}
