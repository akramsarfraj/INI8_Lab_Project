package com.ini8_lab.registrationbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;


@ControllerAdvice
public class RegistrationExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> UserNotFoundHandler(UserNotFoundException exception){

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("Message",exception.getMessage());
        body.put("Status", HttpStatus.NOT_FOUND.value());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(DuplicateEntityException.class)
    public ResponseEntity<Map<String, Object>> DuplicateEntityHandler(DuplicateEntityException exception){
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("Message",exception.getMessage());
        body.put("Status", HttpStatus.NOT_FOUND.value());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }
}
