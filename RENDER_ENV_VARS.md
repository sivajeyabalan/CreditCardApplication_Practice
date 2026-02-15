# RENDER ENVIRONMENT VARIABLES

## Copy these to Render Dashboard → Your Service → Environment

⚠️ **DO NOT include quotes around the values in Render**

---

**Variable Name:** PORT  
**Value:** 8080

---

**Variable Name:** MONGODB_URI  
**Value:** mongodb+srv://sivajb:pCYFCsBnOlmx7Ojx@cluster0.qxfvg1l.mongodb.net/creditcardDB?retryWrites=true&w=majority

---

**Variable Name:** JWT_SECRET  
**Value:** sljfkdfsddkfjdfjsfldkfownvowndndsdwndssdgfdijguirghruehuyrrgdrgger

---

**Variable Name:** JWT_EXPIRATION  
**Value:** 86400000

---

**Variable Name:** CORS_ALLOWED_ORIGINS  
**Value:** REPLACE_WITH_YOUR_FRONTEND_URL

⚠️ **IMPORTANT FOR CORS_ALLOWED_ORIGINS:**
- Replace `REPLACE_WITH_YOUR_FRONTEND_URL` with your actual frontend URL
- Examples:
  - `https://my-credit-card-app.vercel.app`
  - `https://my-frontend.onrender.com`
  - `https://www.myapp.com`
- For multiple origins, use comma separation:
  - `https://app1.com,https://app2.com,https://www.app1.com`

---

## Quick Copy-Paste Format (for notes):

```
PORT=8080
MONGODB_URI=mongodb+srv://sivajb:pCYFCsBnOlmx7Ojx@cluster0.qxfvg1l.mongodb.net/creditcardDB?retryWrites=true&w=majority
JWT_SECRET=sljfkdfsddkfjdfjsfldkfownvowndndsdwndssdgfdijguirghruehuyrrgdrgger
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=YOUR_FRONTEND_URL_HERE
```

---

## MongoDB Atlas Network Access Setup

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere"
5. This will add: `0.0.0.0/0`
6. Click "Confirm"

This allows Render's servers to connect to your MongoDB database.

---

## Verification After Setting Variables

1. After adding all environment variables in Render
2. Click "Save Changes"
3. Render will automatically redeploy
4. Wait 2-5 minutes for deployment
5. Test with: `curl https://your-service.onrender.com/actuator/health`
