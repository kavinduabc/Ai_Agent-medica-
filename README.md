# AI Medical Consultation App

A Next.js-based medical consultation platform powered by AI. Get personalized doctor recommendations based on your symptoms using OpenAI/OpenRouter APIs.

## Features

✅ **AI-Powered Doctor Recommendations** - Get suggestions based on symptom analysis  
✅ **Multi-Step Consultation Flow** - Easy symptom entry → Doctor selection → Start consultation  
✅ **Rate Limiting & Retry Logic** - Automatic backoff for API rate limits  
✅ **Responsive UI** - Built with Tailwind CSS and Radix UI  
✅ **Doctor Database** - 10 specialized doctors (Cardiologist, Dermatologist, Pediatrician, etc.)  

## Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **UI Components**: Radix UI, Lucide Icons, Tailwind CSS
- **API Client**: OpenAI SDK with OpenRouter support
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Auth**: Clerk
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key OR OpenRouter API key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
# Option A: Use OpenAI directly
OPENAI_API_KEY=sk-your-openai-key-here

# Option B: Use OpenRouter (supports multiple models)
OPEN_ROUTER_API_KEY=sk-or-your-openrouter-key-here

# Database
DATABASE_URL=your-neon-db-url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Start Consultation**: Click the "+ Start Consultation" button
2. **Describe Symptoms**: Enter your symptoms in detail (e.g., "fever, cough, body aches")
3. **Get Recommendations**: Click "Find Doctors" - AI analyzes and recommends suitable doctors
4. **Select Doctor**: Click on a doctor card to select them
5. **Start Consultation**: Click "Start Consultation" to begin

## Project Structure

```
app/
├── api/
│   └── suggest-doctors/        # AI doctor recommendation endpoint
├── (routes)/
│   └── dashboard/
│       ├── page.tsx            # Dashboard home
│       ├── layout.tsx          # Dashboard layout
│       └── _components/
│           ├── NewSession.tsx          # Main consultation dialog
│           ├── DoctorCard.tsx          # Doctor card display
│           ├── SuggestedDoctorC.tsx    # Suggested doctor component
│           └── ...
├── globals.css                 # Global styles
├── layout.tsx                  # Root layout
└── Provider.tsx                # Context providers

components/
├── ui/                         # Shadcn UI components
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── textarea.tsx
│   └── ...
└── ...

config/
├── open-AiModel.ts            # OpenAI/OpenRouter client config
├── db.ts                       # Database connection
└── schema.ts                   # Database schema

shared/
└── list.ts                     # Doctor database

context/
└── UserDetailContext.tsx       # User context
```

## API Endpoints

### POST `/api/suggest-doctors`

**Request:**
```json
{
  "notes": "fever and cough"
}
```

**Response:**
```json
[
  {
    "id": 1,
    "specialist": "General Physician",
    "description": "Provides primary healthcare...",
    "reason": "Suitable for general symptoms",
    "image": "/doctor1.png",
    "agentPrompt": "..."
  }
]
```

**Features:**
- Model fallback: Tries multiple AI models if one fails
- Rate limit handling: Exponential backoff for 429 errors
- Model not found handling: Falls back to alternative models
- Error differentiation: Returns appropriate status codes (401, 429, 502, etc.)

## Troubleshooting

### "Too many requests" Error (429)
- Wait 5-10 seconds before retrying
- Check your API rate limits
- Consider increasing the backoff delay in the code

### "Invalid or missing API key" Error (401)
- Verify your API key is correct
- Check that it's set in `.env.local`
- Restart the dev server after setting env vars

### "No available AI models" Error (502)
- Check that your API provider supports the models
- For OpenRouter, ensure the model name is available
- Try using a different model in the config

### Images not loading
- Verify image files exist in `/public` folder
- Check image paths in `shared/list.ts`
- Placeholders will show if images are unavailable

## Build & Deploy

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Lint Check
```bash
npm run lint
```

## Key Features Explained

### Multi-Step Dialog Flow
- **Step 1**: User enters symptoms in a textarea
- **Step 2**: AI analyzes and recommends doctors
- **Step 3**: User selects a doctor and starts consultation

### Smart Fallback System
- Tries `gpt-4o-mini` on OpenAI
- Falls back to `gpt-3.5-turbo` if first model fails
- Handles 404 (model not found) gracefully

### Error Handling
- **401/403**: Authentication errors
- **429**: Rate limit - automatic retry with exponential backoff
- **404**: Model not available - tries next model
- **500+**: Server errors with detailed messages

## Future Enhancements

- [ ] Real-time chat consultation with AI doctors
- [ ] Chat history and past consultations
- [ ] Doctor ratings and reviews
- [ ] Appointment scheduling
- [ ] Medical records integration
- [ ] Multi-language support
- [ ] Video consultation capability

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Next.js documentation: https://nextjs.org/docs
3. Check OpenAI API status: https://status.openai.com/
