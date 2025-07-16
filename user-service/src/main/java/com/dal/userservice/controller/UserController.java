package com.dal.userservice.controller;

import com.dal.userservice.dto.LoginDTO;
import com.dal.userservice.dto.RegisterDTO;
import com.dal.userservice.dto.UserDTO;
import com.dal.userservice.model.User;
import com.dal.userservice.service.UserService;
import com.dal.userservice.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/health")
    public ResponseEntity<String> check() {
        return ResponseEntity.ok("Health is good.");
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterDTO registerDTO) {
        UserDTO createdUser = userService.createUser(registerDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<Boolean> checkIfEmailExist(@PathVariable String email) {
        return ResponseEntity.ok(userService.checkEmailExist(email));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/authenticate/{email}")
    public ResponseEntity<User> getUserByEmailAuthenticate(@PathVariable String email) {
        return ResponseEntity.ok(userService.authenticate(email));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @PutMapping("/password")
    public ResponseEntity<UserDTO> updateUserPassword(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(userService.updateUserPassword(loginDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @GetMapping("/internal/{email}")
    public ResponseEntity<UserDTO> getUserByEmailInternal(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/internal/id/{id}")
    public ResponseEntity<UserDTO> getUserByIdInternal(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

}