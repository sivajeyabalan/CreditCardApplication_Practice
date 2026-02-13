package com.lbg.creditcard.dto;

import com.lbg.creditcard.Entity.ApplicationStatus;

public class ApplicationResponseDTO {
    private String applicationNumber;
    private ApplicationStatus status;
    private Double creditLimit;
}