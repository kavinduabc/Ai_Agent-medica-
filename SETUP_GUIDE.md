# AI Medical Consultation App - Setup & Quick Start Guide

## ✅ Project Status: ERROR-FREE

All compilation errors have been fixed. The project is ready to run.

## Quick Start

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Choose ONE option:

# Option A: OpenAI API (Recommended)
OPENAI_API_KEY=sk-your-openai-api-key

# Option B: OpenRouter (Multi-model support)
OPEN_ROUTER_API_KEY=sk-or-your-openrouter-key

# Clerk Auth (Optional for auth features)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Optional)
DATABASE_URL=postgresql://...
```

### 3️⃣ Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use the App

### User Flow:
1. **Click "+ Start Consultation"** button
2. **Describe your symptoms** - Type in detail (e.g., "fever, cough for 2 days")
3. **Click "Find Doctors"** - AI analyzes symptoms
4. **Select a doctor** - Click on recommended doctor
5. **Start Consultation** - Begin interaction

---

## Project Structure

```
ai-medical/
├── app/
│   ├── api/
│   │   ├── suggest-doctors/route.tsx    # AI doctor recommendation engine
│   │   └── users/route.tsx              # User management
│   ├── (routes)/
│   │   └── dashboard/
│   │       ├── page.tsx                 # Main dashboard
│   │       └── _components/
│   │           ├── NewSession.tsx       # Main dialog component
│   │           ├── DoctorCard.tsx       # Doctor display card
│   │           └── SuggestedDoctorC.tsx # Suggested doctor component
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   └── ui/                              # Shadcn/Radix UI components
│
├── config/
│   ├── open-AiModel.ts                 # OpenAI/OpenRouter client
│   ├── db.ts                           # Database connection
│   └── schema.ts                       # Database schema
│
├── shared/
│   └── list.ts                         # Doctor database (10 doctors)
│
└── public/
    └── (doctor images)
```

---

## Key Features Implemented

### ✅ AI Doctor Recommendation
- Analyzes patient symptoms using OpenAI/OpenRouter
- Recommends up to 5 most suitable doctors
- Returns enriched doctor data with images

### ✅ Multi-Step Dialog
- **Step 1**: Symptom entry with large textarea
- **Step 2**: Doctor selection with visual cards
- Back/Cancel buttons for navigation

### ✅ Smart Error Handling
- **429 (Rate Limit)**: Automatic exponential backoff (500ms → 1000ms → 2000ms)
- **404 (Model Not Found)**: Falls back to alternative models
- **401/403 (Auth)**: Clear error messages
- **500+**: Descriptive server error responses

### ✅ Model Fallback System
- Primary: `gpt-4o-mini` (OpenAI) or `gpt-3.5-turbo` (OpenRouter)
- Secondary: `gpt-3.5-turbo`
- Tertiary: `gpt-4` (if available)

### ✅ Image Handling
- Graceful fallback for missing doctor images
- Placeholder grey boxes with "No Image" text
- Works with both local and external image sources

---

## API Endpoints

### POST `/api/suggest-doctors`

**Request:**
```json
{
  "notes": "fever and cough for 2 days"
}
```

**Response (Success):**
```json
[
  {
    "id": 1,
    "specialist": "General Physician",
    "description": "Provides primary healthcare...",
    "reason": "Suitable for general symptoms",
    "image": "/doctor1.png",
    "agentPrompt": "You are a friendly general physician..."
  },
  {
    "id": 2,
    "specialist": "Cardiologist",
    "description": "Specializes in heart-related diseases...",
    "reason": "May be relevant for chest-related symptoms",
    "image": "/doctor2.png",
    "agentPrompt": "..."
  }
]
```

**Error Responses:**
```json
// 401 - Missing/Invalid API Key
{ "error": "Invalid or missing API key." }

// 429 - Rate Limited
{ "error": "AI rate limit exceeded. Try again later." }

// 502 - No Models Available
{ "error": "No available AI models. Check API provider." }

// 500 - Generic Server Error
{ "error": "Failed to suggest doctors. Please try again." }
```

---

## Available Doctors (Database)

The app includes 10 specialized doctors:

1. **General Physician** - Primary healthcare, common illnesses
2. **Cardiologist** - Heart, blood pressure, cholesterol
3. **Dermatologist** - Skin, hair, nail conditions
4. **Pediatrician** - Children and adolescent care
5. **Neurologist** - Brain, nerves, headaches
6. **Psychiatrist** - Mental health, anxiety, depression
7. **Orthopedic Surgeon** - Bones, joints, sports injuries
8. **Gynecologist** - Women's health, reproductive
9. **ENT Specialist** - Ear, nose, throat, sinus
10. **Diabetologist** - Diabetes, blood sugar, metabolism

---

## Configuration Files

### `config/open-AiModel.ts`
Configures which API provider to use:
- Prefers `OPENAI_API_KEY` (official OpenAI)
- Falls back to `OPEN_ROUTER_API_KEY` (OpenRouter)

### `config/db.ts`
Database connection (PostgreSQL with Drizzle ORM)

### `config/schema.ts`
Database schema with users table

### `shared/list.ts`
Doctor database with 10 doctors

---

## Build & Deployment

### Build for Production
```bash
npm run build
```

### Run Production Server
```bash
npm run start
```

### Run Linter
```bash
npm run lint
```

---

## Troubleshooting

### Error: "Too many requests" (429)
**Solution:**
- Wait 5-10 seconds before retrying
- Check API rate limits at https://platform.openai.com/account/usage
- Increase backoff delays in `app/api/suggest-doctors/route.tsx`

### Error: "Invalid or missing API key" (401)
**Solution:**
- Verify your API key is correct
- Check `.env.local` has the right key
- Restart dev server: `npm run dev`

### Error: "No available AI models" (502)
**Solution:**
- Verify your API provider supports the models
- For OpenRouter, check supported models: https://openrouter.ai/docs
- Try switching between OpenAI and OpenRouter

### Images not loading
**Solution:**
- Add doctor images to `/public` folder
- Update image paths in `shared/list.ts`
- App shows "No Image" placeholder if file missing

### Build fails with "Port 3000 in use"
**Solution:**
```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

---

## Next Steps

### To Extend the App:

1. **Add Real Consultation Chat**
   - Create chat component
   - Integrate streaming responses
   - Store chat history in DB

2. **Add Doctor Profiles**
   - Create dedicated doctor profile pages
   - Show specialization details
   - Add ratings/reviews

3. **Add Appointment Booking**
   - Create booking calendar
   - Send confirmation emails
   - Integrate with payment

4. **Add Medical Records**
   - Allow file uploads
   - Store securely in cloud
   - Share with doctors

5. **Add Video Consultations**
   - Integrate video SDK (Jitsi, Twilio)
   - Schedule video calls
   - Record sessions

---

## Dependencies

- **Next.js** 16.1.0 - Framework
- **React** 19.2.3 - UI Library
- **OpenAI** 6.15.0 - API Client
- **Drizzle ORM** 0.45.1 - Database ORM
- **Clerk** 6.36.5 - Authentication
- **Tailwind CSS** 4 - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Axios** - HTTP Client

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI Docs**: https://platform.openai.com/docs
- **OpenRouter Docs**: https://openrouter.ai/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **Clerk Docs**: https://clerk.com/docs

---

## License

MIT License - Feel free to use and modify

---

**Last Updated**: January 9, 2026
**Status**: ✅ Production Ready (No Errors)
