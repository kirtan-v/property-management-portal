package com.dal.leaseservice.controller;

import com.dal.leaseservice.dto.LeaseDTO;
import com.dal.leaseservice.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lease")
public class LeaseController {

    @Autowired
    private LeaseService leaseService;

    @GetMapping("/health")
    public ResponseEntity<String> check() {
        return ResponseEntity.ok("Health is good.");
    }

    @PostMapping("/create")
    public ResponseEntity<LeaseDTO> createLease(@RequestBody LeaseDTO leaseDTO) {
        LeaseDTO created = leaseService.createLease(leaseDTO);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/renew")
    public ResponseEntity<LeaseDTO> renewLease(@RequestBody LeaseDTO leaseDTO) {
        LeaseDTO created = leaseService.createLease(leaseDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<LeaseDTO> getLeaseByProperty(@PathVariable Long propertyId) {
        LeaseDTO dto = leaseService.getLeaseByProperty(propertyId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<LeaseDTO>> getLeasesByTenant(@PathVariable Long tenantId) {
        List<LeaseDTO> list = leaseService.getLeasesByTenant(tenantId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/landlord/{landlordId}")
    public ResponseEntity<List<LeaseDTO>> getLeasesByLandlord(@PathVariable Long landlordId) {
        List<LeaseDTO> list = leaseService.getLeasesByLandlord(landlordId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/landlord/{landlordId}/tenant/{tenantId}")
    public ResponseEntity<List<LeaseDTO>> getLeasesByLandlordAndTenant(@PathVariable Long landlordId, @PathVariable Long tenantId) {
        List<LeaseDTO> list = leaseService.getLeasesByLandlordAndTenant(landlordId, tenantId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/expiry/soon")
    public ResponseEntity<List<LeaseDTO>> getLeasesExpiringSoon() {
        List<LeaseDTO> list = leaseService.getLeasesExpiringSoon();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<LeaseDTO> acceptLease(@PathVariable Long id) {
        LeaseDTO updated = leaseService.acceptLease(id);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<LeaseDTO> rejectLease(@PathVariable Long id) {
        LeaseDTO updated = leaseService.rejectLease(id);
        return ResponseEntity.ok(updated);
    }

}
