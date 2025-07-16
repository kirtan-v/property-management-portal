package com.dal.leaseservice.service;

import com.dal.leaseservice.dto.LeaseDTO;
import com.dal.leaseservice.dto.PropertyDTO;
import com.dal.leaseservice.exception.LeaseNotFoundException;
import com.dal.leaseservice.exception.PropertyNotFoundException;
import com.dal.leaseservice.model.Lease;
import com.dal.leaseservice.model.LeaseRequest;
import com.dal.leaseservice.repository.LeaseRepository;
import com.dal.leaseservice.repository.LeaseRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaseService {

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${property.service.url}")
    private String propertyServiceUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private LeaseRepository leaseRepository;

    @Autowired
    private LeaseRequestRepository leaseRequestRepository;

    public LeaseDTO createLease(LeaseDTO leaseDTO) {
        String url = propertyServiceUrl + "internal/id/" + leaseDTO.getPropertyId();
        ResponseEntity<PropertyDTO> response = restTemplate.getForEntity(url, PropertyDTO.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new PropertyNotFoundException("Property not found");
        }
        PropertyDTO propertyDTO = response.getBody();
        LeaseRequest leaseRequest = leaseRequestRepository.findById(leaseDTO.getLeaseRequestId()).get();
        if (!leaseRequest.getStatus().equals(1)){
            throw new LeaseNotFoundException("Lease can not be created");
        }

        leaseDTO.setPropertyName(propertyDTO.getName());
        leaseDTO.setLandlordEmail(propertyDTO.getLandlordEmail());
        leaseDTO.setStartDate(propertyDTO.getStartDate());
        leaseDTO.setEndDate(propertyDTO.getEndDate());
        leaseDTO.setLandlordId(propertyDTO.getLandlordId());
        leaseDTO.setRentAmount(propertyDTO.getRent());
        leaseDTO.setDepositAmount(propertyDTO.getDeposit());

        Lease lease = mapToEntity(leaseDTO);
        lease.setStatus(1);
        lease.setAcknowledgedAt(null);
        lease.setCreatedAt(LocalDateTime.now());
        lease.setUpdatedAt(LocalDateTime.now());
        Lease saved = leaseRepository.save(lease);

        leaseRequest.setStatus(2);
        leaseRequestRepository.save(leaseRequest);

        return mapToDTO(saved);
    }

    public LeaseDTO renewLease(LeaseDTO leaseDTO) {
        Lease oldLease = leaseRepository.findById(leaseDTO.getId()).get();
        if (oldLease.getStatus() != 2) {
            throw new RuntimeException("Lease can not be renewed");
        }

        LeaseRequest leaseRequest = leaseRequestRepository.findById(leaseDTO.getLeaseRequestId()).get();
        if (!leaseRequest.getStatus().equals(1)){
            throw new LeaseNotFoundException("Lease can not be created");
        }

        String url = propertyServiceUrl + "internal/id/" + oldLease.getPropertyId();
        ResponseEntity<PropertyDTO> response = restTemplate.getForEntity(url, PropertyDTO.class);
        PropertyDTO propertyDTO = response.getBody();

        oldLease.setStatus(4);
        oldLease.setUpdatedAt(LocalDateTime.now());
        leaseRepository.save(oldLease);

        LeaseDTO oldDto = mapToDTO(oldLease);
        Lease newLease = mapToEntity(oldDto);
        newLease.setAcknowledgedAt(null);
        newLease.setStatus(1);
        newLease.setCreatedAt(LocalDateTime.now());
        newLease.setUpdatedAt(LocalDateTime.now());
        Lease saved = leaseRepository.save(newLease);

        leaseRequest.setStatus(2);
        leaseRequestRepository.save(leaseRequest);

        String updateUrl = propertyServiceUrl + "internal/update/" + leaseDTO.getPropertyId() + "/status/1";
        restTemplate.put(updateUrl, PropertyDTO.class);

        return mapToDTO(saved);
    }

    public List<LeaseDTO> getLeasesByTenant(Long tenantId) {
        return leaseRepository.findByTenantId(tenantId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeaseDTO> getLeasesByLandlord(Long landlordId) {
        return leaseRepository.findByLandlordId(landlordId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeaseDTO> getLeasesByLandlordAndTenant(Long landlordId, Long tenantId) {
        return leaseRepository.findByTenantIdAndLandlordId(tenantId, landlordId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeaseDTO> getLeasesExpiringSoon() {
        return leaseRepository.findLeasesExpiringSoon()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void markExpiredLeases() {
        leaseRepository.markExpiredLeases();
    }

    public LeaseDTO acceptLease(Long leaseId) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new LeaseNotFoundException("Lease not found with id: " + leaseId));
        if (!lease.getStatus().equals(1)){
            throw new RuntimeException("Lease can not be accepted");
        }

        lease.setStatus(2);
        lease.setAcknowledgedAt(LocalDateTime.now());
        lease.setUpdatedAt(LocalDateTime.now());
        Lease updated = leaseRepository.save(lease);

        String url = propertyServiceUrl + "internal/update/" + lease.getPropertyId() + "/status/1";
        restTemplate.put(url, PropertyDTO.class);

        return mapToDTO(updated);
    }

    public LeaseDTO rejectLease(Long leaseId) {
        Lease lease = leaseRepository.findById(leaseId)
                .orElseThrow(() -> new LeaseNotFoundException("Lease not found with id: " + leaseId));
        if (!lease.getStatus().equals(1)){
            throw new RuntimeException("Lease can not be rejected");
        }

        lease.setStatus(3);
        lease.setUpdatedAt(LocalDateTime.now());
        Lease updated = leaseRepository.save(lease);

        String url = propertyServiceUrl + "internal/update/" + lease.getPropertyId() + "/status/2";
        restTemplate.put(url, PropertyDTO.class);

        return mapToDTO(updated);
    }

    public LeaseDTO getLeaseByProperty(Long propertyId) {
        Lease lease = leaseRepository.findByPropertyId(propertyId);
        if (lease == null) {
            throw new LeaseNotFoundException("Lease not found for property id: " + propertyId);
        }
        return mapToDTO(lease);
    }

    // Mapping helpers
    private LeaseDTO mapToDTO(Lease lease) {
        LeaseDTO dto = new LeaseDTO();
        dto.setId(lease.getId());
        dto.setLeaseRequestId(lease.getLeaseRequestId());
        dto.setPropertyId(lease.getPropertyId());
        dto.setPropertyName(lease.getPropertyName());
        dto.setLandlordId(lease.getLandlordId());
        dto.setLandlordEmail(lease.getLandlordEmail());
        dto.setTenantId(lease.getTenantId());
        dto.setTenantEmail(lease.getTenantEmail());
        dto.setStartDate(lease.getStartDate());
        dto.setEndDate(lease.getEndDate());
        dto.setRentAmount(lease.getRentAmount());
        dto.setDepositAmount(lease.getDepositAmount());
        dto.setStatus(lease.getStatus());
        dto.setAcknowledgedAt(lease.getAcknowledgedAt());
        dto.setCreatedAt(lease.getCreatedAt());
        dto.setUpdatedAt(lease.getUpdatedAt());
        return dto;
    }

    private Lease mapToEntity(LeaseDTO dto) {
        Lease lease = new Lease();
        lease.setLeaseRequestId(dto.getLeaseRequestId());
        lease.setPropertyId(dto.getPropertyId());
        lease.setPropertyName(dto.getPropertyName());
        lease.setLandlordId(dto.getLandlordId());
        lease.setLandlordEmail(dto.getLandlordEmail());
        lease.setTenantId(dto.getTenantId());
        lease.setTenantEmail(dto.getTenantEmail());
        lease.setStartDate(dto.getStartDate());
        lease.setEndDate(dto.getEndDate());
        lease.setRentAmount(dto.getRentAmount());
        lease.setDepositAmount(dto.getDepositAmount());
        lease.setStatus(dto.getStatus());
        return lease;
    }
}
