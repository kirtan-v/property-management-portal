package com.dal.apigateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${auth.service.url}")
    private String authServiceUrl;

    @Value("${notification.service.url}")
    private String notificationServiceUrl;

    @Value("${lease.service.url}")
    private String leaseServiceUrl;

    @Value("${property.service.url}")
    private String propertyServiceUrl;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth_service", r -> r.path("/auth/**")
                        .uri(authServiceUrl))
                .route("user_service", r -> r.path("/users/**")
                        .uri(userServiceUrl))
                .route("lease_service", r -> r.path("/lease/**", "/lease-request/**")
                        .uri(leaseServiceUrl))
                .route("property_service", r -> r.path("/property/**")
                        .uri(propertyServiceUrl))
                .route("notification_service", r -> r.path("/notification/**")
                        .uri(notificationServiceUrl))
                .build();
    }
}
