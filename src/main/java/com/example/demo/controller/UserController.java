package com.example.demo.controller;

import com.example.demo.response.ApiResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>>login(@Valid @RequestBody LoginRequest request) {


            return ResponseEntity.status(HttpStatus.OK).body(userService.Login(request));

    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> SignUp(@Valid @RequestBody SignupRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.SignUp(request));

    }
}

