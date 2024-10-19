package com.ini8_lab.registrationbackend.service;

import com.ini8_lab.registrationbackend.exception.DuplicateEntityException;
import com.ini8_lab.registrationbackend.exception.UserNotFoundException;
import com.ini8_lab.registrationbackend.model.Registration;
import com.ini8_lab.registrationbackend.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {
    private RegistrationRepository repository;

    @Autowired
    public RegistrationService(RegistrationRepository repository){
        this.repository = repository;
    }

    public ResponseEntity<String> register(Registration registration){
        if( existsByEmail(registration.getEmail()) ){
            if( existsByPhone(registration.getPhone()) ){
                throw new DuplicateEntityException("Phone and Email is already register");
            }else {
                throw new DuplicateEntityException("Email is already register");
            }

        }else if( existsByPhone(registration.getPhone()) ){
            throw new DuplicateEntityException("Phone is already register");
        }

        repository.save(registration);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration Successfull");
    }

    public ResponseEntity<Registration> update(long id, Registration update){
        Optional<Registration> optional = repository.findById(id);

        if( optional.isPresent() ){

            Registration registration = optional.get();
            registration.setName(update.getName());
            registration.setDob(update.getDob());
            registration.setEmail(update.getEmail());

            if(registration.getPhone() == update.getPhone()){
                registration.setPhone(update.getPhone());
            }else if(existsByPhone(update.getPhone())){
                throw new DuplicateEntityException("Phone is already register");
            }else {
                registration.setPhone(update.getPhone());
            }

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(repository.save(registration));
        }

        throw new UserNotFoundException("No User Found");
    }


    public ResponseEntity<String> deleteUser(long id){
        Optional<Registration> optional = repository.findById(id);
        if( optional.isPresent() ){
            repository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("User deleted Successfull");
        }
        throw new UserNotFoundException("No User Found");
    }

    public ResponseEntity<Registration> getUserById(long id){
        Optional<Registration> optional = repository.findById(id);
        if( optional.isPresent() ){
            return ResponseEntity.status(HttpStatus.OK).body(optional.get());
        }
        throw new UserNotFoundException("No User Found");
    }

    public ResponseEntity<List<Registration>> getAllUser(){
        List<Registration> user = repository.findAll();
        if(!user.isEmpty())
            return ResponseEntity.status(HttpStatus.OK).body(user);

        throw new UserNotFoundException("No User Found");
    }

    public boolean existsByEmail(String email){
           Optional<Registration> optional = repository.findByEmail(email);
           if(optional.isEmpty()){
               return false;
           }
           return true;
    }

    public boolean existsByPhone(Long phone){
        Optional<Registration> optional = repository.findByPhone(phone);
        if(optional.isEmpty()){
            return false;
        }
        return true;
    }
}
