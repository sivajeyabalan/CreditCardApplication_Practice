

# 1️⃣ Project Understanding (From Problem Statement)

### Core Business Workflow (Page 2)

1. Applicant submits personal details
2. System retrieves credit score
3. If score > 800 → Approve
4. Else → Reject
5. If approved → Dispatch card

### Key Validations (Page 3)

* Age > 18
* No previous Approved/Rejected application in last 6 months
* Credit score auto-retrieved via PAN
* Credit limit based on annual income slabs
* Applicant can check status anytime

### Technical Requirements (Page 5)

* Frontend: React / NextJS
* Backend: Node.js + Express (or Django)
* NoSQL DB (MongoDB preferred)
* JWT authentication
* REST API
* Cloud deployment
* GitHub Actions CI/CD

---

# 2️⃣ High-Level Architecture

```
Client (React / NextJS)
        ↓
API Gateway / Backend (Node + Express)
        ↓
Service Layer (Business Logic)
        ↓
MongoDB (Cloud - Atlas)
        ↓
External Credit Score Service (Mocked API)
```

### Separation of Concerns

* Presentation Layer → React
* API Layer → Express
* Business Layer → Services
* Data Layer → MongoDB
* Security Layer → JWT + Middleware

---

# 3️⃣ Data Model Design (MongoDB)

### Applicant Collection

```json
{
  _id,
  applicationNumber,
  fullName,
  dob,
  panNumber,
  annualIncome,
  creditScore,
  creditLimit,
  status: "PENDING | APPROVED | REJECTED | DISPATCHED",
  createdAt,
  updatedAt
}
```

### Indexes

* Unique index on `applicationNumber`
* Index on `panNumber`
* Compound index on `{ panNumber, createdAt }`

---

# 4️⃣ Business Logic Implementation Plan

## Age Validation

```js
if (age < 18) reject
```

## 6-Month Rule

Query:

```js
find({
  panNumber,
  status: { $in: ["APPROVED", "REJECTED"] },
  createdAt: { $gte: sixMonthsAgo }
})
```

## Credit Score Retrieval

* Create external mock API
* Example:

```js
GET /credit-score/:pan
```

## Approval Rule

```js
if (creditScore > 800) APPROVED
else REJECTED
```

## Credit Limit Logic

| Annual Income | Credit Limit      |
| ------------- | ----------------- |
| <= 2L         | 50,000            |
| 2L – 3L       | 75,000            |
| 3L – 5L       | 10,00,000         |
| > 5L          | Manual/Subjective |

Encapsulate in:

```js
calculateCreditLimit(income)
```

---

# 5️⃣ REST API Design

## Auth APIs

* POST `/auth/register`
* POST `/auth/login`

## Application APIs

* POST `/applications`
* GET `/applications/:applicationNumber`
* GET `/applications?pan=XXXX`
* PATCH `/applications/:id/status`

## Internal API

* GET `/credit-score/:pan`

---

# 6️⃣ Folder Structure (Backend)

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── services/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   ├── config/
 │   └── app.js
 ├── tests/
 └── package.json
```

---

# 7️⃣ Frontend Plan (React / NextJS)

## Pages

* `/apply`
* `/login`
* `/status`
* `/dashboard`

## Components

* ApplicationForm
* StatusTracker
* Navbar
* ProtectedRoute

## Flow

1. User login
2. Submit application
3. Show generated application number
4. Track status

---

# 8️⃣ Security Design

* JWT Authentication
* Password hashing (bcrypt)
* Rate limiting
* Helmet for HTTP headers
* Environment variables (.env)
* HTTPS in deployment

---

# 9️⃣ CI/CD Plan (GitHub Actions)

## Workflow Steps

1. On push to main:

    * Install dependencies
    * Run ESLint
    * Run tests
    * Build frontend
    * Deploy backend
    * Deploy frontend

## Example Jobs

* `backend-test`
* `frontend-build`
* `deploy`

---

# 🔟 Deployment Strategy

### Option 1 (Simple Hackathon)

* Backend → Render / Railway
* Frontend → Vercel
* DB → MongoDB Atlas

### Option 2 (Advanced)

* Dockerize
* Deploy on AWS EC2
* Use Nginx reverse proxy

---

# 1️⃣1️⃣ Logging & Monitoring

* Winston for structured logs
* Morgan for HTTP logs
* MongoDB Atlas monitoring
* Add error middleware

---

# 1️⃣2️⃣ Regulatory & Compliance Considerations

* Encrypt PAN before storing
* Mask PAN in API responses
* Do not log sensitive data
* Audit trail for status changes
* Data retention policy

---

# 1️⃣3️⃣ Hackathon Execution Timeline (2–3 Days Plan)

### Day 1

* Setup project structure
* MongoDB schema
* Core API (apply + status)
* Credit score mock

### Day 2

* JWT auth
* Frontend integration
* Business validations
* Deployment

### Day 3

* CI/CD
* Edge case testing
* Polish UI
* Prepare demo script

---

# 1️⃣4️⃣ Optional Advanced Enhancements

* Async processing using queue (BullMQ)
* Event-driven architecture
* Kafka simulation
* Role-based access (Admin)
* Swagger documentation
* Unit + Integration tests

---

# 1️⃣5️⃣ Demo Strategy

1. Show application submission
2. Show auto credit score fetch
3. Show approval/rejection logic
4. Show status tracking
5. Show GitHub Actions pipeline
6. Show cloud deployment

---


