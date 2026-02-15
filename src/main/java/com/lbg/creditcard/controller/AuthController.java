package com.lbg.creditcard.controller;

import com.lbg.creditcard.dto.JwtResponseDTO;
import com.lbg.creditcard.dto.LoginRequestDTO;
import com.lbg.creditcard.dto.RegisterRequestDTO;
import com.lbg.creditcard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {
        authService.register(request);
        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDTO> login(@RequestBody LoginRequestDTO request) {
        String token = authService.login(request);
        return ResponseEntity.ok(new JwtResponseDTO(token));
    }
}
