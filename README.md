# Compliance Compass - Next.js 14 SaaS Application

A comprehensive compliance assessment SaaS platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Overview

Compliance Compass is a modern web application that helps organizations assess their compliance posture through a structured 50-question assessment covering five key compliance domains:

- **Data Security & Privacy** - Data protection and security measures
- **Access Control** - User and privilege management
- **Compliance & Governance** - Policies and regulatory adherence
- **Business Continuity** - Disaster recovery and backup strategies
- **Change Management & Configuration** - System change controls

## Features

### 🔐 Authentication
- User sign up and login with email/password
- Secure authentication via Supabase Auth
- Session management with automatic redirects

### 📊 Assessment Dashboard
- Interactive 50-question compliance assessment wizard
- Multi-step form with progress tracking
- Real-time score calculation
- Support for multiple answer options (Yes, Partial, No, Unknown)

### 📈 Results & Analytics
- Comprehensive assessment results with overall score
- Domain-specific compliance scoring
- Risk level indicators (Low, Medium, High, Critical)
- Actionable recommendations based on assessment results
- Visual progress indicators and charts

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for desktop and mobile
- Intuitive navigation and user workflows
- Real-time form validation

## Tech Stack

- **Frontend**: React 19, Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe integration (configured)

## Project Structure

```
compliance-compass/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── layout.tsx         # Auth layout wrapper
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   └── signup/
│   │       └── page.tsx       # Signup page
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── layout.tsx         # Dashboard layout with navigation
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Main dashboard
│   │   ├── assessment/
│   │   │   └── page.tsx       # Assessment wizard (50 questions)
│   │   └── results/
│   │       └── [id]/
│   │           └── page.tsx   # Results page with analytics
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root page (redirects based on auth)
│   └── globals.css            # Global styles
├── lib/
│   └── supabase/
│       ├── client.ts          # Browser-side Supabase client
│       └── server.ts          # Server-side Supabase client
├── .env.local                 # Environment variables
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## Environment Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- Stripe account (optional, configured)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd compliance-compass
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://mlolnprbnnufhptqjfla.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **Set up Supabase database**
Create the following tables in Supabase:

**assessments table:**
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

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Getting Started

1. **Sign Up**: Create an account with your email and password
2. **Start Assessment**: Navigate to the assessment page to begin the 50-question assessment
3. **Complete Assessment**: Answer each question with Yes, Partial, No, or Unknown
4. **View Results**: Get comprehensive compliance scores and recommendations

### Assessment Questions

The 50-question assessment covers:

**Data Security & Privacy (Q1-Q10)**
- Data classification and encryption
- Incident response and monitoring
- Access logging and controls
- Security audits and testing

**Access Control (Q11-Q20)**
- Role-based access control (RBAC)
- User provisioning and account management
- Privilege management and logging
- Access reviews and segregation of duties

**Compliance & Governance (Q21-Q30)**
- Compliance programs and monitoring
- Training and privacy policies
- Vendor management
- Breach notification procedures

**Business Continuity (Q31-Q40)**
- Business continuity and disaster recovery plans
- Data backups and recovery objectives
- Continuity testing
- Crisis communication

**Change Management (Q41-Q50)**
- Change management processes
- Configuration management
- Patch management
- Audit trails

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Security Considerations

- All authentication handled by Supabase
- Database queries use RLS (Row Level Security)
- Sensitive environment variables stored in `.env.local`
- Client-side and server-side separation of concerns

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Vercel CLI
vercel --prod
```

## Future Enhancements

- [ ] Payment integration with Stripe
- [ ] Advanced analytics and reporting
- [ ] Multi-user organization management
- [ ] Custom assessment templates
- [ ] Remediation tracking and workflows
- [ ] Integration with compliance tools
- [ ] Export reports (PDF, CSV)
- [ ] Real-time collaboration features

## License

MIT License

---

Built with ❤️ using Next.js 16, React 19, and TypeScript
