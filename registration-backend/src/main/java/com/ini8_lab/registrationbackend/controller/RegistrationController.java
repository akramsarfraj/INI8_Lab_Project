package com.ini8_lab.registrationbackend.controller;

import com.ini8_lab.registrationbackend.model.Registration;
import com.ini8_lab.registrationbackend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RegistrationController {
    private RegistrationService service;

    @Autowired
    public RegistrationController(RegistrationService service){
        this.service=service;
    }

    @PostMapping("api/register")
    public ResponseEntity<String> createUser(@RequestBody Registration registration){
        return service.register(registration);
    }

    @PutMapping("api/update/{id}")
    public ResponseEntity<Registration> updateUser(@PathVariable(name = "id") long id, @RequestBody Registration registration){
        return service.update(id,registration);
    }

    @DeleteMapping("api/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") long id){
        return service.deleteUser(id);
    }

    @GetMapping("api/users")
    public ResponseEntity<List<Registration>> findAllUser(){
        return service.getAllUser();
    }
    @GetMapping("api/user/{id}")
    public ResponseEntity<Registration> findUserById(@PathVariable(name = "id") long id){
        return service.getUserById(id);
    }

}
