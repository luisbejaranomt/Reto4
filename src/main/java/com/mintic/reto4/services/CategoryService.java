package com.mintic.reto4.services;

import com.mintic.reto4.model.Admin;
import com.mintic.reto4.model.Category;
import com.mintic.reto4.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class CategoryService {

    /* Logica del Negocio*/
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    public Category save(Category c){
        if(c.getId()==null){
            return categoryRepository.save(c);
        }else{
            Optional<Category> c1 = categoryRepository.getCategory(c.getId());
            if(c1.isPresent()){
                return categoryRepository.save(c);
            }else{
                return c;
            }
        }
    }

    public Category update(Category u){

        if (u.getId()!=null){
            Optional<Category> m = categoryRepository.getCategory(u.getId());
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
                        Logger.getLogger(CategoryService.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(CategoryService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                categoryRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }

    public boolean delete(int id){
        Optional<Category> d = categoryRepository.getCategory(id);
        boolean state = false;
        if (d.isPresent()){
            categoryRepository.delete(d.get());
            state = true;
        }
        return state;
    }

}
