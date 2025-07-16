package com.dal.leaseservice.controller;

import com.dal.leaseservice.dto.LeaseRequestDTO;
import com.dal.leaseservice.service.LeaseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lease-request")
public class LeaseRequestController {

    @Autowired
    private LeaseRequestService leaseRequestService;

    @PostMapping("/create")
    public ResponseEntity<LeaseRequestDTO> createLeaseRequest(@RequestBody LeaseRequestDTO leaseRequestDTO) {
        LeaseRequestDTO created = leaseRequestService.createLeaseRequest(leaseRequestDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<LeaseRequestDTO> getLeaseRequestById(@PathVariable Long id) {
        LeaseRequestDTO dto = leaseRequestService.getLeaseRequestById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<LeaseRequestDTO>> getRequestsByProperty(@PathVariable Long propertyId) {
        List<LeaseRequestDTO> list = leaseRequestService.getRequestsByProperty(propertyId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/landlord/{id}")
    public ResponseEntity<List<LeaseRequestDTO>> getRequestsByLandlord(@PathVariable Long id) {
        List<LeaseRequestDTO> list = leaseRequestService.getRequestsByLandlord(id);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<LeaseRequestDTO>> getRequestsByTenant(@PathVariable Long tenantId) {
        List<LeaseRequestDTO> list = leaseRequestService.getRequestsByTenant(tenantId);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/id/{id}/status/{status}")
    public ResponseEntity<LeaseRequestDTO> updateLeaseRequestStatus(@PathVariable Long id, @PathVariable Integer status) {
        LeaseRequestDTO updated = leaseRequestService.updateRequestStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLeaseRequest(@PathVariable Long id) {
        leaseRequestService.deleteLeaseRequest(id);
        return ResponseEntity.ok("SUCCESS");
    }
}
