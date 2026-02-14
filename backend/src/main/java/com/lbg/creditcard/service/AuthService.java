package com.lbg.creditcard.service;

import com.lbg.creditcard.dto.LoginRequestDTO;
import com.lbg.creditcard.dto.RegisterRequestDTO;
import com.lbg.creditcard.Entity.User;
import com.lbg.creditcard.exception.BusinessException;
import com.lbg.creditcard.repository.UserRepository;
import com.lbg.creditcard.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public void register(RegisterRequestDTO request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BusinessException("Email already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    public String login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Invalid credentials"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("Invalid credentials");
        }

        return jwtTokenProvider.generateToken(user.getEmail());
    }
}
