package com.dal.leaseservice.exception;

public class LeaseRequestNotFoundException extends RuntimeException {
    public LeaseRequestNotFoundException(String message) {
        super(message);
    }
}
