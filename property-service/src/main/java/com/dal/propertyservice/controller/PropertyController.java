package com.dal.propertyservice.controller;

import com.dal.propertyservice.dto.PropertyDTO;
import com.dal.propertyservice.dto.StringResponseDTO;
import com.dal.propertyservice.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping("/health")
    public ResponseEntity<String> check() {
        return ResponseEntity.ok("Health is good.");
    }

    @PostMapping("/add")
    public ResponseEntity<PropertyDTO> addProperty(@RequestBody PropertyDTO propertyDTO) {
        PropertyDTO created = propertyService.addProperty(propertyDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        List<PropertyDTO> list = propertyService.getAllProperties();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/all/available")
    public ResponseEntity<List<PropertyDTO>> getAllPropertiesAvailable() {
        List<PropertyDTO> list = propertyService.getAllPropertiesAvailable();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        PropertyDTO dto = propertyService.getPropertyById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/allByLandlord/{id}")
    public ResponseEntity<List<PropertyDTO>> getAllPropertiesByLandlord(@PathVariable Long id) {
        List<PropertyDTO> list = propertyService.getAllPropertiesByLandlord(id);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(@PathVariable Long id, @RequestBody PropertyDTO propertyDTO) {
        PropertyDTO updated = propertyService.updateProperty(id, propertyDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<StringResponseDTO> deleteProperty(@PathVariable Long id, @PathVariable Long userId) {
        Boolean response = propertyService.deleteProperty(id, userId);
        if (!response) {
            return ResponseEntity.ok(new StringResponseDTO("success"));
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    // internal api
    @PutMapping("/internal/update/{id}/status/{status}")
    public ResponseEntity<PropertyDTO> updatePropertyStatus(@PathVariable Long id, @PathVariable Integer status) {
        PropertyDTO updated = propertyService.updatePropertyStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/internal/id/{id}")
    public ResponseEntity<PropertyDTO> getPropertyByIdInternal(@PathVariable Long id) {
        PropertyDTO dto = propertyService.getPropertyById(id);
        return ResponseEntity.ok(dto);
    }
}
