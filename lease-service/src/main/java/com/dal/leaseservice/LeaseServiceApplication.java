package com.dal.leaseservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LeaseServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LeaseServiceApplication.class, args);
    }

}
