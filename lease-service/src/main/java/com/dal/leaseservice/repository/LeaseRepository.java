package com.dal.leaseservice.repository;

import com.dal.leaseservice.model.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LeaseRepository extends JpaRepository<Lease, Long> {
    List<Lease> findByTenantId(Long tenantId);
    Lease findByPropertyId(Long propertyId);
    List<Lease> findByLandlordId(Long landlordId);
    List<Lease> findByTenantIdAndLandlordId(Long tenantId, Long landlordId);

    @Query(value = "SELECT * FROM leases l WHERE l.status = 2 AND CURRENT_DATE BETWEEN DATE_SUB(l.end_date, INTERVAL 7 DAY) AND l.end_date", nativeQuery = true)
    List<Lease> findLeasesExpiringSoon();

    @Modifying
    @Transactional
    @Query("UPDATE Lease l SET l.status = 4 WHERE l.status = 2 AND CURRENT_DATE > l.endDate")
    void markExpiredLeases();

    @Query("SELECT l FROM Lease l WHERE l.propertyId = :propertyId AND l.status = 2")
    Lease findActiveLeaseByPropertyId(@Param("propertyId") Long propertyId);

    @Query("SELECT l FROM Lease l WHERE l.propertyId = :propertyId AND l.status = 1")
    Lease findCreatedLeaseByPropertyId(@Param("propertyId") Long propertyId);

    @Query("SELECT l FROM Lease l WHERE l.propertyId = :propertyId AND l.status = 3")
    Lease findRejectedLeaseByPropertyId(@Param("propertyId") Long propertyId);
}
