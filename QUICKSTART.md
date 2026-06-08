# Quick Start Guide - Compliance Compass

## 🚀 Getting Started

### Step 1: Start the Development Server
```bash
npm run dev
```

The application will be running at `http://localhost:3000`

### Step 2: Access the Application

**Root URL (`http://localhost:3000`)**
- Automatically redirects to `/login` if not authenticated
- Redirects to `/dashboard` if authenticated

### Step 3: Authentication

#### Sign Up
- Navigate to `http://localhost:3000/signup`
- Enter:
  - Company Name
  - Email address
  - Password (and confirm)
- Account will be created in Supabase

#### Sign In
- Navigate to `http://localhost:3000/login`
- Enter your email and password
- You'll be redirected to the dashboard

### Step 4: Start an Assessment

1. Click "Start New Assessment" button
2. Answer all 50 compliance questions
3. Questions span 5 domains:
   - Data Security & Privacy
   - Access Control
   - Compliance & Governance
   - Business Continuity
   - Change Management & Configuration

### Step 5: View Results
- After submitting the assessment
- You'll see:
  - Overall compliance score (0-100%)
  - Risk level classification
  - Score breakdown by domain
  - Actionable recommendations
  - Next steps

## 📁 File Structure

```
Key files:

Authentication:
- app/(auth)/layout.tsx          - Auth page wrapper
- app/(auth)/login/page.tsx      - Login form
- app/(auth)/signup/page.tsx     - Signup form

Dashboard:
- app/(dashboard)/layout.tsx     - Dashboard navigation
- app/(dashboard)/dashboard/page.tsx   - Main dashboard
- app/(dashboard)/assessment/page.tsx  - Assessment wizard
- app/(dashboard)/results/[id]/page.tsx - Results page

Backend:
- lib/supabase/client.ts         - Browser client
- lib/supabase/server.ts         - Server client

Configuration:
- .env.local                     - Environment variables
- app/globals.css                - Tailwind styles
```

## 🔧 Configuration

### Required Environment Variables
All environment variables are already configured in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key

## 📊 Database Setup

The application requires the following Supabase table:

**assessments**
```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT DEFAULT 'Compliance Assessment',
  score INTEGER,
  answers JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

To create this table:
1. Go to Supabase dashboard
2. Open the SQL Editor
3. Paste the above SQL
4. Click "Run"

## 🌐 Features by Page

### Login Page (`/login`)
- Email and password authentication
- Link to signup page
- Error messages for invalid credentials

### Signup Page (`/signup`)
- Company name field
- Email and password
- Password confirmation
- Link to login page

### Dashboard Page (`/dashboard`)
- Welcome message
- "Start New Assessment" button
- Recent assessments list
- Quick navigation cards

### Assessment Page (`/assessment`)
- 50-question wizard
- Progress bar showing completion
- Navigation buttons (Previous/Next)
- Real-time question counter
- Multiple choice answers:
  - Yes (full compliance)
  - Partially (partial compliance)
  - No (no compliance)
  - Unknown (not sure)
- Submit button on final question

### Results Page (`/results/[id]`)
- Overall compliance score with risk level
- Summary statistics
- Domain-specific scores
- Visual progress bars
- Recommendations section
- Action buttons to start new assessment or return to dashboard

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px and above)
- Mobile (320px and above)

## 🔒 Security Features

- ✅ Authentication via Supabase Auth
- ✅ Encrypted environment variables
- ✅ Protected dashboard routes
- ✅ Server-side session validation
- ✅ User-specific data access

## 🐛 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
Solution: Run `npm install` to install all dependencies

### Database Connection Error
Solution: Verify `.env.local` has correct Supabase credentials

### Styling Not Applied
Solution: Run `npm run dev` instead of directly opening files

### Auth Redirect Loop
Solution: Check Supabase project is accessible and credentials are valid

## 📝 Next Steps

1. **Customize Assessment**: Edit the `COMPLIANCE_QUESTIONS` array in `app/(dashboard)/assessment/page.tsx`
2. **Add Stripe Payments**: Implement Stripe integration for premium features
3. **Connect Organization Management**: Add multi-user organization support
4. **Export Reports**: Add PDF/CSV export functionality
5. **Real-time Notifications**: Add notification system for compliance changes

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ✉️ Support

For issues or questions, refer to the main README.md file for more detailed information.

---

Happy assessing! 🎉
