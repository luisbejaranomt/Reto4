package com.mintic.reto4.services;

import com.mintic.reto4.model.Category;
import com.mintic.reto4.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

}
