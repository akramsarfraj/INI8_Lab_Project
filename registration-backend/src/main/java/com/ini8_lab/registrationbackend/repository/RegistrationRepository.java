package com.ini8_lab.registrationbackend.repository;

import com.ini8_lab.registrationbackend.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRepository  extends JpaRepository<Registration,Long> {
    Optional<Registration> findByEmail(String email);
    Optional<Registration> findByPhone(long phone);
}
