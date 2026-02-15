# Render Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a cluster
- [ ] Create database: `creditcardDB`
- [ ] Create database user with password
- [ ] Configure Network Access to allow `0.0.0.0/0`
- [ ] Copy connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/creditcardDB?retryWrites=true&w=majority`)

### 2. Render Environment Variables

Set these in Render Dashboard → Your Service → Environment:

```
PORT=8080
MONGODB_URI=mongodb+srv://sivajb:pCYFCsBnOlmx7Ojx@cluster0.qxfvg1l.mongodb.net/creditcardDB?retryWrites=true&w=majority
JWT_SECRET=sljfkdfsddkfjdfjsfldkfownvowndndsdwndssdgfdijguirghruehuyrrgdrgger
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://your-frontend.onrender.com,https://your-custom-domain.com
```

**⚠️ IMPORTANT:**
- Replace `your-frontend.onrender.com` with your actual frontend URL
- Do NOT include quotes around values in Render
- Ensure MONGODB_URI includes the database name (`creditcardDB`)
- For production, generate a more secure JWT_SECRET

### 3. Code Configuration (Already Done ✅)
- [x] Server binding set to `0.0.0.0` in `application.yml`
- [x] Default port set to `8080` with PORT environment variable override
- [x] All environment variables have default values to prevent startup failures
- [x] Dockerfile configured for optimal deployment

## 🚀 Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Render deployment with 0.0.0.0 binding"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - Name: `credit-card-backend`
   - Environment: `Docker`
   - Branch: `main`
   - Root Directory: leave empty
   - Instance Type: Free (or paid)

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add all 5 variables listed above
   - Click "Save Changes"

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-5 minutes for deployment
   - Watch logs for any errors

## 🔍 Post-Deployment Verification

### 1. Check Health Endpoint
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
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

### 2. Check Swagger UI
Visit: `https://your-service.onrender.com/swagger-ui.html`

### 3. Test Authentication
```bash
# Register a user
curl -X POST https://your-service.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Login
curl -X POST https://your-service.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test123!"
  }'
```

## 🐛 Troubleshooting Guide

### Error: "Connection refused" to MongoDB
**Problem**: MongoDB is not accessible
**Solutions**:
1. Verify MONGODB_URI in Render environment variables
2. Check MongoDB Atlas Network Access allows `0.0.0.0/0`
3. Ensure URI format is correct with database name
4. Test connection string locally first

### Error: "Could not resolve placeholder"
**Problem**: Missing environment variable
**Solutions**:
1. Check all 5 environment variables are set in Render
2. Values should NOT have quotes
3. Click "Save Changes" after adding variables
4. Trigger a manual deploy after saving

### Error: "No open ports detected"
**Problem**: Application not binding to correct address
**Solutions**:
1. This is fixed in `application.yml` with `server.address: 0.0.0.0`
2. Verify PORT environment variable is set to `8080`
3. Check Dockerfile EXPOSE matches PORT

### Error: "BeanCreationException: corsConfig"
**Problem**: CORS_ALLOWED_ORIGINS not set
**Solutions**:
1. Set CORS_ALLOWED_ORIGINS in Render environment variables
2. Use comma-separated list for multiple origins
3. Example: `https://frontend1.com,https://frontend2.com`

### Application crashes immediately
**Solutions**:
1. Check Render logs for specific error
2. Verify all environment variables are present
3. Test MongoDB connection separately
4. Ensure JWT_SECRET is at least 256 bits (64+ characters)

## 📝 Important Notes

- **Free Tier**: Render free tier spins down after inactivity. First request after inactivity takes ~30 seconds
- **Logs**: Always check Render logs when issues occur
- **Environment Variables**: Changes require redeployment
- **Database**: MongoDB Atlas free tier (M0) is sufficient for development
- **Security**: Change JWT_SECRET to a secure random string in production
- **CORS**: Update CORS_ALLOWED_ORIGINS with your actual frontend URL before deployment

## 🎉 Success Indicators

You'll know deployment is successful when:
- ✅ Render shows "Live" status
- ✅ Health endpoint returns `{"status":"UP"}`
- ✅ Swagger UI loads without errors
- ✅ You can register and login a user
- ✅ MongoDB connection shows in logs as successful
- ✅ No errors in Render logs

## 📧 Support

If you continue to have issues:
1. Check Render logs first
2. Verify MongoDB Atlas network configuration
3. Test each environment variable locally
4. Ensure code is pushed to GitHub with latest changes
