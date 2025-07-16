package com.dal.leaseservice.exception;

import com.dal.leaseservice.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LeaseNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleLeaseNotFound(LeaseNotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.NOT_FOUND.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LeaseRequestNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleLeaseRequestNotFound(LeaseRequestNotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.NOT_FOUND.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PropertyNotFoundException.class)
    public ResponseEntity<ErrorDTO> handlePropertyNotFound(PropertyNotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.NOT_FOUND.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleUserNotFound(UserNotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.NOT_FOUND.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
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
