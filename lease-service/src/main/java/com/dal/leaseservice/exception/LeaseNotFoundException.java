package com.dal.leaseservice.exception;

public class LeaseNotFoundException extends RuntimeException {
    public LeaseNotFoundException(String message) {
        super(message);
    }
}
