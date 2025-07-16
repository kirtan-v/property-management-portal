package com.dal.leaseservice.scheduler;

import com.dal.leaseservice.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LeaseExpiryUpdater {

    @Autowired
    private LeaseService leaseService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateExpiredLeases() {
        leaseService.markExpiredLeases();
        System.out.println("Expired leases have been marked at midnight.");
    }
}
