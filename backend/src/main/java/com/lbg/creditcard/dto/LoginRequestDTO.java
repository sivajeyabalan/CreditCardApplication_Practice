package com.lbg.creditcard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
