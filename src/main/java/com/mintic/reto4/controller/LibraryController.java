package com.mintic.reto4.controller;

import com.mintic.reto4.model.Library;
import com.mintic.reto4.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController /* Recibe las peticiones de postman, movil etc*/
@RequestMapping("/api/Lib") /* Mapeo de la peticion. Se establece la URL */
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class LibraryController {
    @Autowired
    private LibraryService libraryService;

    @GetMapping("/all")
    public List<Library> getLibraries(){
        return  libraryService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Library> getLibrary(@PathVariable ("id") int id){
        return  libraryService.getLibrary(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Library save(@RequestBody Library l){
        return  libraryService.save(l);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Library update(@RequestBody Library p){
        return libraryService.update(p);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return libraryService.delete(id);
    }


}
