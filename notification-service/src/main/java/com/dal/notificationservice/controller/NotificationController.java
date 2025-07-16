package com.dal.notificationservice.controller;

import com.dal.notificationservice.dto.EmailDTO;
import com.dal.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailDTO) {
        notificationService.sendEmail(emailDTO);
        return ResponseEntity.ok("Email notification sent");
    }

}
