package com.lbg.creditcard.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestDTO {
    @NotBlank
    private String fullName;
    @NotNull
    private LocalDate dob;

    @NotBlank
    private String panNumber;

    @NotNull
    @Positive
    private Double annualIncome;
}