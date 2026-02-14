package com.lbg.creditcard.controller;

import com.lbg.creditcard.Entity.CreditCardApplication;
import com.lbg.creditcard.dto.ApplicationRequestDTO;
import com.lbg.creditcard.dto.ApplicationResponseDTO;
import com.lbg.creditcard.exception.BusinessException;
import com.lbg.creditcard.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Validated
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponseDTO> submit(@Valid @RequestBody ApplicationRequestDTO request) {
        ApplicationResponseDTO resp = applicationService.submitApplication(request);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{applicationNumber}")
    public ResponseEntity<ApplicationResponseDTO> getByAppNo(@PathVariable String applicationNumber) {
        ApplicationResponseDTO resp = applicationService.getByApplicationNumber(applicationNumber);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/status")
    public ResponseEntity<?> getStatus(@RequestParam("appNo") String applicationNumber) {
        return ResponseEntity.ok(applicationService.getStatus(applicationNumber));
    }

    @PatchMapping("/{applicationNumber}/dispatch")
    public ResponseEntity<ApplicationResponseDTO> dispatch(@PathVariable String applicationNumber) {
        ApplicationResponseDTO resp = applicationService.dispatch(applicationNumber);
        return ResponseEntity.ok(resp);
    }
}
