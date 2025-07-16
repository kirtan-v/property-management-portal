package com.dal.leaseservice.service;

import com.dal.leaseservice.dto.LeaseRequestDTO;
import com.dal.leaseservice.dto.PropertyDTO;
import com.dal.leaseservice.exception.LeaseRequestNotFoundException;
import com.dal.leaseservice.exception.PropertyNotFoundException;
import com.dal.leaseservice.model.LeaseRequest;
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
public class LeaseRequestService {

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${property.service.url}")
    private String propertyServiceUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private LeaseRequestRepository leaseRequestRepository;

    public LeaseRequestDTO createLeaseRequest(LeaseRequestDTO dto) {
        String url = propertyServiceUrl + "internal/id/" + dto.getPropertyId();
        ResponseEntity<PropertyDTO> response = restTemplate.getForEntity(url, PropertyDTO.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new PropertyNotFoundException("Property not found");
        }
        PropertyDTO propertyDTO = response.getBody();

        dto.setLandlordId(propertyDTO.getLandlordId());
        dto.setLandlordEmail(propertyDTO.getLandlordEmail());
        dto.setPropertyName(propertyDTO.getName());
        LeaseRequest request = mapToEntity(dto);
        request.setStatus(1);
        request.setCreatedAt(LocalDateTime.now());
        request.setUpdatedAt(LocalDateTime.now());
        LeaseRequest saved = leaseRequestRepository.save(request);
        return mapToDTO(saved);
    }

    public LeaseRequestDTO getLeaseRequestById(Long id) {
        LeaseRequest request = leaseRequestRepository.findById(id)
                .orElseThrow(() -> new LeaseRequestNotFoundException("Lease request not found with id: " + id));
        return mapToDTO(request);
    }

    public List<LeaseRequestDTO> getRequestsByProperty(Long propertyId) {
        return leaseRequestRepository.findByPropertyId(propertyId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeaseRequestDTO> getRequestsByLandlord(Long id) {
        return leaseRequestRepository.findByLandlordId(id)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeaseRequestDTO> getRequestsByTenant(Long tenantId) {
        return leaseRequestRepository.findByTenantId(tenantId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public LeaseRequestDTO updateRequestStatus(Long id, Integer status) {
        LeaseRequest request = leaseRequestRepository.findById(id)
                .orElseThrow(() -> new LeaseRequestNotFoundException("Lease request not found with id: " + id));
        request.setStatus(status);
        request.setUpdatedAt(LocalDateTime.now());
        LeaseRequest updated = leaseRequestRepository.save(request);
        return mapToDTO(updated);
    }

    public void deleteLeaseRequest(Long id) {
        if (!leaseRequestRepository.existsById(id)) {
            throw new LeaseRequestNotFoundException("Lease request not found with id: " + id);
        }
        leaseRequestRepository.deleteById(id);
    }

    // Mapping helpers
    private LeaseRequestDTO mapToDTO(LeaseRequest request) {
        LeaseRequestDTO dto = new LeaseRequestDTO();
        dto.setId(request.getId());
        dto.setPropertyId(request.getPropertyId());
        dto.setPropertyName(request.getPropertyName());
        dto.setLandlordEmail(request.getLandlordEmail());
        dto.setTenantEmail(request.getTenantEmail());
        dto.setLandlordId(request.getLandlordId());
        dto.setTenantId(request.getTenantId());
        dto.setRequestType(request.getRequestType());
        dto.setMessage(request.getMessage());
        dto.setStatus(request.getStatus());
        dto.setCreatedAt(request.getCreatedAt());
        dto.setUpdatedAt(request.getUpdatedAt());
        return dto;
    }

    private LeaseRequest mapToEntity(LeaseRequestDTO dto) {
        LeaseRequest request = new LeaseRequest();
        request.setPropertyId(dto.getPropertyId());
        request.setLandlordId(dto.getLandlordId());
        request.setTenantId(dto.getTenantId());
        request.setPropertyName(dto.getPropertyName());
        request.setLandlordEmail(dto.getLandlordEmail());
        request.setTenantEmail(dto.getTenantEmail());
        request.setRequestType(dto.getRequestType());
        request.setMessage(dto.getMessage());
        return request;
    }
}
