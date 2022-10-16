package com.mintic.reto4.services;

import com.mintic.reto4.model.Library;
import com.mintic.reto4.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    public Library update(Library u){

        if (u.getId()!=null){
            Optional<Library> m = libraryRepository.getLibrary(u.getId());
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
                        Logger.getLogger(LibraryService.class.getName()).log(Level.SEVERE.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(LibraryService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                libraryRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }

    public boolean delete(int id){
        Optional<Library> d = libraryRepository.getLibrary(id);
        boolean state = false;
        if (d.isPresent()){
            libraryRepository.delete(d.get());
            state = true;
        }
        return state;
    }


}
