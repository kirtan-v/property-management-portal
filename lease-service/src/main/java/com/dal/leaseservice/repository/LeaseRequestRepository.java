package com.dal.leaseservice.repository;

import com.dal.leaseservice.model.LeaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LeaseRequestRepository extends JpaRepository<LeaseRequest, Long> {
    // Retrieve requests for a particular property
    List<LeaseRequest> findByPropertyId(Long propertyId);

    // Retrieve requests for a specific tenant
    List<LeaseRequest> findByTenantId(Long tenantId);

    List<LeaseRequest> findByLandlordId(Long landlordId);

    // Optionally, retrieve a specific request by property and tenant
    Optional<LeaseRequest> findByPropertyIdAndTenantId(Long propertyId, Long tenantId);
}
