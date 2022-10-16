package com.mintic.reto4.services;

import com.mintic.reto4.model.Library;
import com.mintic.reto4.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {

    /* Logica del Negocio*/
    @Autowired
    private LibraryRepository libraryRepository;

    public List<Library> getAll(){
        return libraryRepository.getAll();
    }

    public Optional<Library> getLibrary(int id){
        return libraryRepository.getLibrary(id);
    }

    public Library save(Library l){
        if(l.getId()==null){
            return libraryRepository.save(l);
        }else{
            Optional<Library> l1 = libraryRepository.getLibrary(l.getId());
            if(l1.isPresent()){
                return libraryRepository.save(l);
            }else{
                return l;
            }
        }
    }

}
