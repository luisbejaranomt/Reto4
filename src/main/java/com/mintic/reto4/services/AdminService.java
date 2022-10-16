package com.mintic.reto4.services;

import com.mintic.reto4.model.Admin;
import com.mintic.reto4.model.Category;
import com.mintic.reto4.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    public List<Admin> getAll(){
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id){
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin a){
        if(a.getId()==null){
            return adminRepository.save(a);
        }else{
            Optional<Admin> e = adminRepository.getAdmin(a.getId());
            if(e.isPresent()){
                return a;
            }else {
                return adminRepository.save(a);
            }
        }

    }

/*
    public Admin update(Admin a){
        if (a.getId()!=null){
            Optional<Admin> a1 = adminRepository.getAdmin(a.getId());
            if(a1.isPresent()){
                if(a.getName()!=null){
                    a1.get().setName(a.getName());
                }
                if(a.getEmail()!=null){
                    a1.get().setEmail(a.getEmail());
                }
                if (a.getPassword()!=null){
                    a1.get().setPassword(a.getPassword());
                }
                adminRepository.save(a1.get());
                return a1.get();
            }else{
                return a;
            }
        }else{
            return a;
        }
    }
*/
    public Admin update(Admin u){

        if (u.getId()!=null){
            Optional<Admin> m = adminRepository.getAdmin(u.getId());
            if(m.isPresent()){
                // se hace el for para no tener que validar cada campo manualmente
                // sino tomar el campo en el clico for
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
                adminRepository.save(m.get());
                return m.get();
            }else{
                return u;
            }
        }else{
            return u;
        }
    }


    public boolean delete(int id){
        Optional<Admin> d = adminRepository.getAdmin(id);
        boolean state = false;
        if (d.isPresent()){
            adminRepository.delete(d.get());
            state = true;
        }
        return state;
    }
}
