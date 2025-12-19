package com.example.demo.controller;

import com.example.demo.dto.APIResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.service.UserService;
import com.example.demo.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;


@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody LoginRequest request) {
            UserDto userDto = userService.Login(request);
            return ResponseEntity.ok(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<APIResponse<UserDto>> SignUp(@Valid @RequestBody SignupRequest request) {

            UserDto userDto = userService.SignUp(request);

             return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.success("Signup successful",userDto));

    }
}
