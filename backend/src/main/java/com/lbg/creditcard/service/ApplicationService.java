package com.lbg.creditcard.service;

import com.lbg.creditcard.Entity.ApplicationStatus;
import com.lbg.creditcard.Entity.CreditCardApplication;
import com.lbg.creditcard.dto.ApplicationDetailDTO;
import com.lbg.creditcard.dto.ApplicationRequestDTO;
import com.lbg.creditcard.dto.ApplicationResponseDTO;
import com.lbg.creditcard.dto.DashboardDTO;
import com.lbg.creditcard.dto.RecentApplicationDTO;
import com.lbg.creditcard.exception.BusinessException;
import com.lbg.creditcard.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public ApplicationResponseDTO submitApplication(ApplicationRequestDTO req) {
        // Age validation
        int age = Period.between(req.getDob(), LocalDate.now()).getYears();
        if (age < 18) throw new BusinessException("Applicant must be above 18");

        // 6-month rule: no approved/rejected with same PAN in last 6 months
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);
        List<ApplicationStatus> statuses = Arrays.asList(ApplicationStatus.APPROVED, ApplicationStatus.REJECTED);
        List<CreditCardApplication> recent = applicationRepository
                .findByPanNumberAndStatusInAndCreatedAtAfter(req.getPanNumber(), statuses, sixMonthsAgo);
        if (recent != null && !recent.isEmpty()) {
            throw new BusinessException("An application with this PAN was processed in the last 6 months");
        }

        // Prepare entity
        CreditCardApplication entity = new CreditCardApplication();
        entity.setApplicationNumber(generateApplicationNumber());
        entity.setFullName(req.getFullName());
        entity.setDob(req.getDob());
        entity.setPanNumber(req.getPanNumber());
        entity.setAnnualIncome(req.getAnnualIncome());
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setStatus(ApplicationStatus.PENDING);

        // Fetch credit score (mocked - random 1-10)
        Integer creditScore = fetchCreditScore();


        // Decision: >= 5 approve, < 5 reject (60% approval rate)
        if (creditScore >= 5) {
            entity.setStatus(ApplicationStatus.APPROVED);
            entity.setCreditLimit(calculateLimit(req.getAnnualIncome()));
        } else {
            entity.setStatus(ApplicationStatus.REJECTED);
            entity.setCreditLimit(0.0);
        }

        CreditCardApplication saved = applicationRepository.save(entity);

        return new ApplicationResponseDTO(saved.getApplicationNumber(), saved.getStatus(), saved.getCreditLimit());
    }

    public ApplicationResponseDTO getByApplicationNumber(String applicationNumber) {
        CreditCardApplication application = applicationRepository.findByApplicationNumber(applicationNumber)
                .orElseThrow(() -> new BusinessException("Application not found"));
        return new ApplicationResponseDTO(application.getApplicationNumber(), application.getStatus(), application.getCreditLimit());
    }

    public ApplicationStatus getStatus(String applicationNumber) {
        return applicationRepository.findByApplicationNumber(applicationNumber)
                .map(CreditCardApplication::getStatus)
                .orElseThrow(() -> new BusinessException("Application not found"));
    }

    public ApplicationResponseDTO dispatch(String applicationNumber) {
        CreditCardApplication app = applicationRepository.findByApplicationNumber(applicationNumber)
                .orElseThrow(() -> new BusinessException("Application not found"));

        if (app.getStatus() != ApplicationStatus.APPROVED) {
            throw new BusinessException("Only approved applications can be dispatched");
        }

        app.setStatus(ApplicationStatus.DISPATCHED);
        app.setUpdatedAt(LocalDateTime.now());
        applicationRepository.save(app);

        return new ApplicationResponseDTO(app.getApplicationNumber(), app.getStatus(), app.getCreditLimit());
    }

    // New: build dashboard DTO
    public DashboardDTO getDashboard() {
        long total = applicationRepository.count();
        long approved = applicationRepository.findAll().stream().filter(a -> a.getStatus() == ApplicationStatus.APPROVED).count();
        long pending = applicationRepository.findAll().stream().filter(a -> a.getStatus() == ApplicationStatus.PENDING).count();
        long rejected = applicationRepository.findAll().stream().filter(a -> a.getStatus() == ApplicationStatus.REJECTED).count();

        // recent 5 applications sorted by createdAt desc
        List<RecentApplicationDTO> recent = applicationRepository.findAll().stream()
                .sorted(Comparator.comparing(CreditCardApplication::getCreatedAt).reversed())
                .limit(5)
                .map(a -> new RecentApplicationDTO(a.getFullName(), a.getApplicationNumber(), a.getStatus(), a.getCreditLimit(), a.getCreatedAt() != null ? a.getCreatedAt().toString() : null))
                .collect(Collectors.toList());

        return new DashboardDTO(total, approved, pending, rejected, recent);
    }

    public ApplicationDetailDTO getApplicationDetail(String applicationNumber) {
        CreditCardApplication application = applicationRepository.findByApplicationNumber(applicationNumber)
                .orElseThrow(() -> new BusinessException("Application not found"));

        return new ApplicationDetailDTO(
                application.getApplicationNumber(),
                application.getStatus(),
                application.getCreditLimit(),
                application.getFullName(),
                application.getCreatedAt() != null ? application.getCreatedAt().toString() : null,
                application.getPanNumber()
        );
    }

    // --- Helpers ---
    private String generateApplicationNumber() {
        return "APP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private Integer fetchCreditScore() {
        // Mocked credit score: random 1-10
        // >= 5 = APPROVED (60% chance)
        // < 5 = REJECTED (40% chance)
        Random random = new Random();
        return random.nextInt(10) + 1; // 1..10
    }

    private Double calculateLimit(Double income) {
        if (income <= 200000) return 50000.0;
        if (income <= 300000) return 75000.0;
        if (income <= 500000) return 100000.0;
        return 200000.0;
    }
}
