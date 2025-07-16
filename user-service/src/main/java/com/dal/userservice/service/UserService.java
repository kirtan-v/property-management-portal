package com.dal.userservice.service;

import com.dal.userservice.dto.LoginDTO;
import com.dal.userservice.dto.RegisterDTO;
import com.dal.userservice.dto.UserDTO;
import com.dal.userservice.exception.UserAlreadyExistsException;
import com.dal.userservice.exception.UserNotFoundException;
import com.dal.userservice.model.User;
import com.dal.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    // Create or register a new user
    public UserDTO createUser(RegisterDTO registerDTO){
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("This email is already registered.");
        }

        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole(registerDTO.getRole());
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setPhone(registerDTO.getPhone());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
        return mapToDTO(user);
    }

    // Authenticate user
    public User authenticate(String email){
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("Invalid email");
        }
        return user;
    }

    // Retrieve user by email
    public Boolean checkEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Retrieve user by id
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return mapToDTO(user);
    }

    // Retrieve users all
    public List<UserDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToDTO).collect(Collectors.toList());
    }


    // Retrieve user by email
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return mapToDTO(user);
    }

    // List users by role (useful for inter-service queries)
    public List<UserDTO> getUsersByRole(String role) {
        List<User> users = userRepository.findByRole(role);
        return users.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Update existing user profile
    public UserDTO updateUserPassword(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + loginDTO.getEmail()));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.save(user);
        return mapToDTO(user);
    }

    // Update existing user profile
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.setPhone(userDTO.getPhone());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.save(user);
        return mapToDTO(user);
    }

    // Helper: Convert User entity to DTO
    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setCreated_at(user.getCreatedAt());
        dto.setUpdated_at(user.getUpdatedAt());
        return dto;
    }
}