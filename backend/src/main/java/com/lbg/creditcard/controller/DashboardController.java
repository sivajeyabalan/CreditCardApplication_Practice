package com.lbg.creditcard.controller;

import com.lbg.creditcard.dto.DashboardDTO;
import com.lbg.creditcard.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {
    private final ApplicationService applicationService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboard() {
        DashboardDTO dto = applicationService.getDashboard();
        return ResponseEntity.ok(dto);
    }
}
