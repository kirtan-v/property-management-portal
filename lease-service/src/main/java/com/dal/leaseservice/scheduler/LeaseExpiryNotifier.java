package com.dal.leaseservice.scheduler;

import com.dal.leaseservice.dto.EmailDTO;
import com.dal.leaseservice.dto.LeaseDTO;
import com.dal.leaseservice.dto.UserDTO;
import com.dal.leaseservice.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class LeaseExpiryNotifier {

    @Autowired
    private LeaseService leaseService;


    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${notification.service.url}")
    private String notificationServiceUrl;

    private final RestTemplate restTemplate;

    public LeaseExpiryNotifier(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Scheduled(cron = "0 0 8 * * ?")
    public void notifyExpiringLeases() {
        List<LeaseDTO> expiringLeases = leaseService.getLeasesExpiringSoon();
        if (!expiringLeases.isEmpty()) {
            for (LeaseDTO lease : expiringLeases) {
                String tenantEmail = getTenantEmail(lease.getTenantId());
                if (tenantEmail != null) {
                    String subject = "Your Lease is Expiring Soon";
                    String body = "Dear Tenant,\n\n" +
                            "This is a reminder that your lease for property ID " + lease.getPropertyId() +
                            " is expiring on " + lease.getEndDate() + ".\n" +
                            "Please contact your Landlord and take the necessary action.\n\n" +
                            "Best regards,\n" +
                            "Lease Service Team";

                    EmailDTO emailDTO = new EmailDTO();
                    emailDTO.setSubject(subject);
                    emailDTO.setBody(body);
                    emailDTO.setTo(tenantEmail);

                    String url = notificationServiceUrl + "email";
                    ResponseEntity<String> response = restTemplate.postForEntity(url, emailDTO, String.class);
                    if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                        throw new RuntimeException("Email could not be sent");
                    }

                    System.out.println("Reminder sent for lease:" + lease.getId());
                }
            }
        }
    }

    public String getTenantEmail(Long tenantId) {
        String url = userServiceUrl + "id/" + tenantId;
        ResponseEntity<UserDTO> response = restTemplate.getForEntity(url, UserDTO.class);
        UserDTO user = response.getBody();
        return user != null ? user.getEmail() : null;
    }
}
