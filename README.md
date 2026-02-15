# Credit Card Application Backend

A Spring Boot application for managing credit card applications with JWT authentication and MongoDB.

## Prerequisites

- Java 21+
- Maven 3.9+
- MongoDB (local or Atlas)
- Docker (optional)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CreditCardApplication_Practice
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   - Set your MongoDB connection string in `MONGODB_URI`
   - Set a secure JWT secret in `JWT_SECRET`
   - Configure CORS origins in `CORS_ALLOWED_ORIGINS`

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the API**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

## Deploying to Render

### Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user with password
3. Whitelist all IPs (0.0.0.0/0) in Network Access
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 2: Configure Render Service

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: credit-card-backend (or your choice)
   - **Environment**: Docker
   - **Region**: Choose closest to you
   - **Branch**: main (or your branch)
   - **Instance Type**: Free (or paid for production)

### Step 3: Set Environment Variables in Render

⚠️ **CRITICAL**: Set these environment variables in Render Dashboard:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `PORT` | `8080` | Server port (Render provides this automatically) |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/creditcardDB?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-256-bit-secret-key-here` | Secure random string (min 256 bits) |
| `JWT_EXPIRATION` | `86400000` | Token expiration in milliseconds (24 hours) |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend.com,https://www.your-frontend.com` | Comma-separated frontend URLs |

**Important Notes:**
- Do NOT include quotes around values
- For CORS, use your actual frontend URL (e.g., `https://your-frontend-app.vercel.app`)
- JWT_SECRET should be a long random string for security
- MongoDB URI must include database name and proper connection options

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Build the Docker image
   - Deploy the application
   - Bind to 0.0.0.0 on the specified PORT
3. Wait for deployment to complete (2-5 minutes)
4. Your API will be available at: `https://your-service.onrender.com`

### Step 5: Verify Deployment

Test your deployment:
```bash
curl https://your-service.onrender.com/actuator/health
```

Expected response:
```json
{
  "status": "UP",
  "components": {
    "mongo": {
      "status": "UP"
    }
  }
}
```

## Troubleshooting

### Issue: "Connection refused" to MongoDB

**Solution**: Verify MongoDB URI in Render environment variables
- Check MongoDB Atlas network access allows 0.0.0.0/0
- Ensure URI includes correct username, password, and database name
- URI format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### Issue: "Could not resolve placeholder 'app.cors.allowed-origins'"

**Solution**: Set environment variable in Render
- Go to Render Dashboard → Your Service → Environment
- Add `CORS_ALLOWED_ORIGINS` with your frontend URL
- Example: `https://your-frontend.com`

### Issue: "No open ports detected"

**Solution**: Ensure application binds to 0.0.0.0
- This is already configured in `application.yml` (`server.address: 0.0.0.0`)
- Verify PORT environment variable is set to `8080`

### Issue: Application starts but crashes

**Solution**: Check logs in Render Dashboard
- Look for missing environment variables
- Verify MongoDB connection
- Check JWT_SECRET is set

## API Documentation

Once deployed, access Swagger UI at:
```
https://your-service.onrender.com/swagger-ui.html
```

## Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Applications
- `POST /api/applications` - Submit credit card application
- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get application by ID
- `PUT /api/applications/{id}` - Update application status

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Security

- JWT-based authentication
- CORS configured for specified origins
- MongoDB credentials via environment variables
- Secrets not committed to repository

## Tech Stack

- Java 21
- Spring Boot 3.2.5
- Spring Security with JWT
- Spring Data MongoDB
- Maven
- Docker
- Swagger/OpenAPI

## License

[Your License Here]
