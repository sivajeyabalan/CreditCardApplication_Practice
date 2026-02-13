package com.lbg.creditcard.repository;

import com.lbg.creditcard.Entity.ApplicationStatus;
import com.lbg.creditcard.Entity.CreditCardApplication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository
        extends MongoRepository<CreditCardApplication, String> {

    Optional<CreditCardApplication>
    findByApplicationNumber(String applicationNumber);

    List<CreditCardApplication>
    findByPanNumberAndStatusInAndCreatedAtAfter(
            String panNumber,
            List<ApplicationStatus> statuses,
            LocalDateTime date
    );
}
