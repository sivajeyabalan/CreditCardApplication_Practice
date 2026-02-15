package com.lbg.creditcard.dto;

import com.lbg.creditcard.Entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponseDTO {
    private String applicationNumber;
    private ApplicationStatus status;
    private Double creditLimit;
}