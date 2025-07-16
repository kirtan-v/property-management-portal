package com.dal.userservice.exception;

import com.dal.userservice.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle UserNotFoundException
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleUserNotFound(UserNotFoundException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.NOT_FOUND.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorDTO> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage(ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.CONFLICT.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.CONFLICT);
    }

    // Catch-all exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleException(Exception ex) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setErrorMessage("An unexpected error occurred: " + ex.getMessage());
        errorDTO.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        ex.printStackTrace();
        return new ResponseEntity<>(errorDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}