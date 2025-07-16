package com.dal.authservice.exception;

import com.dal.authservice.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorDTO> handleAuthException(AuthException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.BAD_REQUEST.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleGeneralException(Exception ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage("An unexpected error occurred: " + ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

