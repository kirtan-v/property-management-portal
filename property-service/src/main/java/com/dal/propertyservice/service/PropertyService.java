package com.dal.propertyservice.service;

import com.dal.propertyservice.dto.PropertyDTO;
import com.dal.propertyservice.dto.UserDTO;
import com.dal.propertyservice.exception.PropertyNotFoundException;
import com.dal.propertyservice.exception.UserNotFoundException;
import com.dal.propertyservice.model.Property;
import com.dal.propertyservice.repository.PropertyRepository;
import com.dal.propertyservice.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final JwtTokenUtil jwtTokenUtil;

    public PropertyService(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Autowired
    private RestTemplate restTemplate;


    @Value("${user.service.url}")
    private String userServiceUrl;

    @Autowired
    private PropertyRepository propertyRepository;

    public PropertyDTO addProperty(PropertyDTO propertyDTO) {
        String url = userServiceUrl + "internal/id/" + propertyDTO.getLandlordId();
        ResponseEntity<UserDTO> response = restTemplate.getForEntity(url, UserDTO.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new UserNotFoundException("Landlord not found");
        }
        UserDTO userDTO = response.getBody();

        if (!userDTO.getEmail().equalsIgnoreCase(jwtTokenUtil.getEmailFromToken(getCurrentUserToken()))){
            throw new UserNotFoundException("User does not match");
        }

        propertyDTO.setLandlordEmail(userDTO.getEmail());
        Property property = mapToEntity(propertyDTO);
        property.setCreatedAt(LocalDateTime.now());
        property.setUpdatedAt(LocalDateTime.now());
        Property saved = propertyRepository.save(property);
        return mapToDTO(saved);
    }

    public List<PropertyDTO> getAllProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> getAllPropertiesAvailable() {
        return propertyRepository.findAll()
                .stream()
                .filter(property -> property.getLeaseStatus() == 2)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PropertyDTO> getAllPropertiesByLandlord(Long id) {
        return propertyRepository.findByLandlordId(id)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PropertyDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));
        return mapToDTO(property);
    }

    public PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));
        if (!property.getLandlordId().equals(propertyDTO.getLandlordId())){
            throw new UserNotFoundException("User does not match");
        }
        if (property.getLeaseStatus().equals(1)){
            throw new RuntimeException("Lease is active. you can not modifiy.");
        }

        property.setName(propertyDTO.getName());
        property.setDescription(propertyDTO.getDescription());
        property.setStreet(propertyDTO.getStreet());
        property.setCity(propertyDTO.getCity());
        property.setState(propertyDTO.getState());
        property.setZip(propertyDTO.getZip());
        property.setCountry(propertyDTO.getCountry());
        property.setStartDate(propertyDTO.getStartDate());
        property.setEndDate(propertyDTO.getEndDate());
        property.setRent(propertyDTO.getRent());
        property.setDeposit(propertyDTO.getDeposit());
        property.setLeaseStatus(propertyDTO.getLeaseStatus());
        property.setUpdatedAt(LocalDateTime.now());
        Property updated = propertyRepository.save(property);
        return mapToDTO(updated);
    }

    public PropertyDTO updatePropertyStatus(Long id, Integer status) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));

        property.setLeaseStatus(status);
        property.setUpdatedAt(LocalDateTime.now());
        Property updated = propertyRepository.save(property);
        return mapToDTO(updated);
    }

    public Boolean deleteProperty(Long id, Long userId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));
        if (!property.getLandlordId().equals(userId)){
            throw new UserNotFoundException("User does not match");
        }
        if (property.getLeaseStatus().equals(1)){
            throw new RuntimeException("Lease is active. you can not delete.");
        }

        propertyRepository.deleteById(id);
        return propertyRepository.existsById(id);
    }

    // Mapping methods
    private PropertyDTO mapToDTO(Property property) {
        PropertyDTO dto = new PropertyDTO();
        dto.setId(property.getId());
        dto.setLandlordId(property.getLandlordId());
        dto.setLandlordEmail(property.getLandlordEmail());
        dto.setName(property.getName());
        dto.setDescription(property.getDescription());
        dto.setStreet(property.getStreet());
        dto.setCity(property.getCity());
        dto.setState(property.getState());
        dto.setZip(property.getZip());
        dto.setCountry(property.getCountry());
        dto.setStartDate(property.getStartDate());
        dto.setEndDate(property.getEndDate());
        dto.setRent(property.getRent());
        dto.setDeposit(property.getDeposit());
        dto.setLeaseStatus(property.getLeaseStatus());
        dto.setCreatedAt(property.getCreatedAt());
        dto.setUpdatedAt(property.getUpdatedAt());
        return dto;
    }

    private Property mapToEntity(PropertyDTO dto) {
        Property property = new Property();
        property.setLandlordId(dto.getLandlordId());
        property.setLandlordEmail(dto.getLandlordEmail());
        property.setName(dto.getName());
        property.setDescription(dto.getDescription());
        property.setStreet(dto.getStreet());
        property.setCity(dto.getCity());
        property.setState(dto.getState());
        property.setZip(dto.getZip());
        property.setCountry(dto.getCountry());
        property.setStartDate(dto.getStartDate());
        property.setEndDate(dto.getEndDate());
        property.setRent(dto.getRent());
        property.setDeposit(dto.getDeposit());
        property.setLeaseStatus(dto.getLeaseStatus());
        return property;
    }

    public String getCurrentUserToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return (String) authentication.getCredentials();
        }
        return null;
    }
}
