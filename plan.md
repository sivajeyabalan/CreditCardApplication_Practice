
---

# 1️⃣  Architecture (Spring Boot Based)

```
Frontend (React / NextJS)
        ↓
Spring Boot REST API
        ↓
Service Layer (Business Logic)
        ↓
MongoDB (Cloud - Atlas)
        ↓
External Credit Score API (Mocked)
```

### Technology Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React / NextJS                |
| Backend    | Spring Boot 3                 |
| Database   | MongoDB (Spring Data MongoDB) |
| Security   | Spring Security + JWT         |
| Build Tool | Maven                         |
| CI/CD      | GitHub Actions                |
| Deployment | AWS / Render / Railway        |

---

# 2️⃣ Backend Project Structure (Clean Architecture)

```
credit-card-backend/
 ├── src/main/java/com/lbg/creditcard/
 │   ├── controller/
 │   ├── service/
 │   ├── repository/
 │   ├── model/
 │   ├── dto/
 │   ├── config/
 │   ├── security/
 │   ├── exception/
 │   └── util/
 ├── src/main/resources/
 │   ├── application.yml
 ├── pom.xml
```

---

# 3️⃣ Dependencies (pom.xml)

```xml
<dependencies>
    <dependency>spring-boot-starter-web</dependency>
    <dependency>spring-boot-starter-security</dependency>
    <dependency>spring-boot-starter-data-mongodb</dependency>
    <dependency>spring-boot-starter-validation</dependency>
    <dependency>spring-boot-starter-test</dependency>
    <dependency>jjwt-api</dependency>
    <dependency>lombok</dependency>
</dependencies>
```

---

# 4️⃣ Database Design (MongoDB)

## Application Document

```java
@Document(collection = "applications")
public class CreditCardApplication {

    @Id
    private String id;

    private String applicationNumber;
    private String fullName;
    private LocalDate dob;
    private String panNumber;
    private Double annualIncome;

    private Integer creditScore;
    private Double creditLimit;

    private ApplicationStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Enum

```java
public enum ApplicationStatus {
    PENDING,
    APPROVED,
    REJECTED,
    DISPATCHED
}
```

---

# 5️⃣ Repository Layer

```java
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
```

Indexes:

* Unique index on `applicationNumber`
* Index on `panNumber`

---

# 6️⃣ Business Logic Layer (Core Rules)

## Age Validation

```java
if (Period.between(dob, LocalDate.now()).getYears() < 18)
    throw new BusinessException("Applicant must be above 18");
```

## 6-Month Rule

Query applications within 6 months having APPROVED/REJECTED.

## Credit Score Retrieval

Use `RestTemplate` or `WebClient`:

```java
public Integer fetchCreditScore(String pan) {
    return restTemplate.getForObject(
        "http://credit-service/score/" + pan,
        Integer.class
    );
}
```

## Approval Rule

```java
if (creditScore > 800)
    status = APPROVED;
else
    status = REJECTED;
```

## Credit Limit Calculation

Encapsulate in utility:

```java
public Double calculateLimit(Double income) {
    if (income <= 200000) return 50000.0;
    if (income <= 300000) return 75000.0;
    if (income <= 500000) return 1000000.0;
    return null; // subjective
}
```

---

# 7️⃣ REST API Design (Spring Boot)

## Auth Controller

```
POST /api/auth/register
POST /api/auth/login
```

## Application Controller

```
POST /api/applications
GET  /api/applications/{applicationNumber}
GET  /api/applications/status?appNo=XXX
PATCH /api/applications/{id}/dispatch
```

---

# 8️⃣ DTO Design (Important for Clean API)

Never expose entity directly.

```java
public class ApplicationRequestDTO {
    private String fullName;
    private LocalDate dob;
    private String panNumber;
    private Double annualIncome;
}
```

```java
public class ApplicationResponseDTO {
    private String applicationNumber;
    private ApplicationStatus status;
    private Double creditLimit;
}
```

---

# 9️⃣ Exception Handling

Global handler:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusiness(BusinessException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
```

---

# 🔟 Security Design (Spring Security + JWT)

### Components

* JwtUtil
* JwtFilter
* SecurityConfig
* CustomUserDetailsService

### Flow

1. Login → generate JWT
2. Client sends JWT in header
3. Filter validates token
4. Set Authentication in SecurityContext

---

# 1️⃣1️⃣ application.yml

```yaml
spring:
  data:
    mongodb:
      uri: ${MONGO_URI}

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000
```

---

# 1️⃣2️⃣ Logging & Observability

* Use SLF4J
* Add Spring Boot Actuator
* Enable health endpoint

---

# 1️⃣3️⃣ Dockerization

Dockerfile:

```
FROM eclipse-temurin:17-jdk
COPY target/app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

---

# 1️⃣4️⃣ GitHub Actions (Spring Boot Version)

```yaml
name: CI-CD

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: temurin
          java-version: 17

      - run: mvn clean install

      - run: docker build -t credit-app .

      - run: echo "Deploy step here"
```

---

# 1️⃣5️⃣ Deployment Options

### Quick Hackathon

* Backend → Render (Docker)
* DB → MongoDB Atlas
* Frontend → Vercel

### Enterprise Level

* AWS EC2 + Nginx
* AWS ECS
* AWS RDS if switching to SQL
* CI/CD with Docker + ECR

---

# 1️⃣6️⃣ Execution Timeline (Spring Boot)

### Day 1

* Project setup
* MongoDB integration
* Core business logic
* Application submission API

### Day 2

* JWT security
* Credit score integration
* Frontend connection
* Deployment

### Day 3

* CI/CD
* Edge case testing
* Logging
* Demo prep

---

# 1️⃣7️⃣ Advanced Enhancements (Optional)

* Use WebClient (Reactive)
* Add Kafka for event-driven dispatch
* Role-based access (Admin / Approver)
* Swagger (SpringDoc OpenAPI)
* Unit tests with Mockito
* Integration tests with Testcontainers

---

