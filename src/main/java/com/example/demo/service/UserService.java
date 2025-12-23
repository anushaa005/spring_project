package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class UserService
{

    private final UserRepository userRepository;


    public ApiResponse<Void> Login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found for that emial"));
        if (!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Password incorrect");
        }
        return ApiResponse.success("Login successful", null);


    }


    public ApiResponse<Void> SignUp(SignupRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User Already registered at this email");
        }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setRole(request.getRole());
            user.setCreatedAt(LocalDateTime.now());
            User savedUser = userRepository.save(user);
            return ApiResponse.success("Signup successful", null);
        }
    }

