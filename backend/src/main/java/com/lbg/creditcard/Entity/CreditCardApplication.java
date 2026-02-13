package com.lbg.creditcard.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "applications")
public class CreditCardApplication {

    @Id
    private String id;
    @Indexed(unique = true)
    private String applicationNumber;
    private String fullName;
    private LocalDate dob;
    @Indexed
    private String panNumber;
    private Double annualIncome;

    private Integer creditScore;
    private Double creditLimit;

    private ApplicationStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
