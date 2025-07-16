package com.dal.authservice.repository;

import com.dal.authservice.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);


    @Query("SELECT p FROM PasswordResetToken p WHERE p.token = :token AND p.used = false")
    Optional<PasswordResetToken> findByTokenAndNotUsed(@Param("token") String token);

    @Modifying
    @Transactional
    @Query("DELETE FROM PasswordResetToken p WHERE p.token = :token")
    void deleteByToken(@Param("token") String token);
}
