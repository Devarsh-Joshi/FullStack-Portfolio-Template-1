# Contact Form Setup Guide - Resend + Supabase

Complete guide to make your contact form fully functional using Resend API for emails and Supabase for database storage.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Set Up Supabase](#step-1-set-up-supabase)
4. [Step 2: Set Up Resend API](#step-2-set-up-resend-api)
5. [Step 3: Install Dependencies](#step-3-install-dependencies)
6. [Step 4: Create Backend API](#step-4-create-backend-api)
7. [Step 5: Update Frontend Form](#step-5-update-frontend-form)
8. [Step 6: Environment Variables](#step-6-environment-variables)
9. [Step 7: Test Everything](#step-7-test-everything)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This setup will allow you to:
- ✅ Accept contact form submissions from your portfolio
- ✅ Store submissions in a Supabase database
- ✅ Send confirmation emails to visitors using Resend
- ✅ Send notifications to your email
- ✅ View all submissions in Supabase dashboard

**What we're using:**
- **Supabase** - Database to store contact form submissions
- **Resend** - Email service to send emails
- **Vite** - Your frontend framework
- **TypeScript/React** - Frontend

---

## Prerequisites

Before starting, make sure you have:
- ✅ A GitHub/Google account (for Supabase)
- ✅ An email address (for Resend)
- ✅ Node.js installed
- ✅ Your portfolio project running

---

## Step 1: Set Up Supabase

### 1.1 Create Supabase Account

1. Go to https://supabase.com
2. Click "Sign Up"
3. Sign up with GitHub or Google
4. Create a new organization (or use default)
5. Create a new project:
   - Project name: `portfolio-contact`
   - Database password: Create a strong password (save it)
   - Region: Choose closest to you
   - Click "Create new project"

Wait 2-3 minutes for project to initialize.

### 1.2 Create Database Table

1. Once project is ready, go to **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create contacts table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (unauthenticated)
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT WITH CHECK (TRUE);

-- Create policy to allow select (for testing)
CREATE POLICY "Allow anonymous select" ON contacts
  FOR SELECT USING (TRUE);
```

4. Click **"Run"** button (or press Ctrl+Enter)
5. You should see the table created in the **Tables** section

### 1.3 Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Find these values:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **Public ANON key**: Copy this (long string starting with `eyJ`)

**Keep these safe!** You'll need them later.

---

## Step 2: Set Up Resend API

### 2.1 Create Resend Account

1. Go to https://resend.com
2. Click "Get Started" or "Sign Up"
3. Sign up with your email
4. Verify your email
5. Complete profile setup

### 2.2 Add Your Domain (Optional but Recommended)

To send emails from your own domain (e.g., hello@yourdomain.com):

1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow DNS verification steps with your domain provider
5. Once verified, you can send from that domain

**If you skip this:** You can still send emails, but from a Resend test domain. Not ideal for production.

### 2.3 Get Your API Key

1. Go to **API Keys** in Resend dashboard
2. Click **"Create API Key"**
3. Name it: `portfolio-contact`
4. Copy the key (keep it private!)

**Your API Key format:** `re_xxxxxxxxxxxxxxxxxxxxx`

---

## Step 3: Install Dependencies

Open terminal in your project and run:

```bash
npm install @supabase/supabase-js resend nodemailer
npm install -D @types/nodemailer
```

These packages will:
- `@supabase/supabase-js` - Connect to your database
- `resend` - Send emails
- `nodemailer` - Alternative email option (optional)
- `@types/nodemailer` - TypeScript types

---

## Step 4: Create Backend API

Since your project is frontend-only, we need to create a simple backend endpoint. You have two options:

### Option A: Using Vercel Functions (Recommended for Deployment)

Skip to **Option B** if you want to test locally first.

### Option B: Using Node.js Server (Local Testing)

#### 4.1 Create Server Directory

1. In your project root, create a new folder: `server`
2. Inside `server`, create `contact.ts`:

```typescript
// server/contact.ts
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || '');

// Your email address (where you want to receive notifications)
const YOUR_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'your.email@example.com';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function handleContactForm(data: ContactFormData) {
  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save contact');
    }

    // 2. Send confirmation email to visitor
    const { error: visitorEmailError } = await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: data.email,
      subject: 'Thanks for reaching out!',
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Thank you for contacting me. I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>Your Portfolio</p>
      `,
    });

    if (visitorEmailError) {
      console.error('Visitor email error:', visitorEmailError);
      // Don't throw here, continue to send notification
    }

    // 3. Send notification email to you
    const { error: notificationError } = await resend.emails.send({
      from: `Portfolio Contact <onboarding@resend.dev>`,
      to: YOUR_EMAIL,
      subject: `New Contact: ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    });

    if (notificationError) {
      console.error('Notification email error:', notificationError);
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
}
```

#### 4.2 Create API Handler

Create `server/api.ts`:

```typescript
// server/api.ts
import http from 'http';
import { handleContactForm } from './contact';

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const result = await handleContactForm(data);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error: any) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: error.message || 'Internal server error',
        }));
      }
    });
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Contact API server running on http://localhost:${PORT}`);
});
```

---

## Step 5: Update Frontend Form

Edit your contact form in `client/src/pages/portfolio.tsx`:

Find the Contact section (around line 628-747) and replace the form:

```tsx
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.message || 'Failed to send message');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" data-testid="contact-section">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-mono text-cyan-400 uppercase tracking-[0.3em]">Connection</span>
              <h2 className="font-display text-6xl md:text-8xl font-black mt-4 leading-none">
                READY TO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  INITIATE?
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-white/50 max-w-md leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, my inbox is always open for groundbreaking ideas.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@alexchen.dev', href: 'mailto:hello@alexchen.dev' },
                { icon: Twitter, label: 'Twitter', value: '@alexchen_dev', href: 'https://x.com' },
                { icon: Github, label: 'Github', value: 'alexchen-dev', href: 'https://github.com' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 p-1 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl overflow-hidden">
              <div className="bg-black/40 p-8 md:p-12 rounded-[2.4rem] space-y-8">
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"
                  >
                    ✗ {error}
                  </motion.div>
                )}

                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold">Drop a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none disabled:opacity-50"
                        placeholder="What's on your mind?"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black font-bold rounded-xl shadow-[0_0_30px_rgba(0,255,245,0.2)] hover:shadow-[0_0_50px_rgba(0,255,245,0.4)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'SENDING...' : 'SEND TRANSMISSION'}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

Don't forget to import `useState` at the top:
```tsx
import { useEffect, useRef, useState } from 'react';
```

---

## Step 6: Environment Variables

### 6.1 Create `.env.local` file

In your project root, create a file named `.env.local`:

```
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Resend (for server)
RESEND_API_KEY=re_your_api_key_here

# Your email (where to send notifications)
CONTACT_RECEIVER_EMAIL=your.email@example.com
```

**Where to get these values:**

1. **VITE_SUPABASE_URL** - From Supabase Settings > API
2. **VITE_SUPABASE_ANON_KEY** - From Supabase Settings > API (anon key)
3. **RESEND_API_KEY** - From Resend API Keys
4. **CONTACT_RECEIVER_EMAIL** - Your actual email address

### 6.2 Update package.json Scripts

Add this script to your `package.json`:

```json
"scripts": {
  "dev": "vite dev --port 5000",
  "dev:contact-server": "tsx server/api.ts",
  "dev:all": "concurrently \"npm run dev\" \"npm run dev:contact-server\"",
  "build": "vite build",
  "preview": "vite preview"
}
```

Install `concurrently`:
```bash
npm install -D concurrently
```

---

## Step 7: Test Everything

### 7.1 Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Contact API:**
```bash
npm run dev:contact-server
```

Or use both at once:
```bash
npm run dev:all
```

### 7.2 Test the Form

1. Open http://localhost:5000
2. Scroll to Contact section
3. Fill in the form with test data
4. Click "SEND TRANSMISSION"
5. Check for success message

### 7.3 Verify in Supabase

1. Go to https://supabase.com
2. Open your project
3. Go to **Table Editor**
4. Select **contacts** table
5. You should see your submission there!

### 7.4 Check Your Email

1. Check your email (where you set CONTACT_RECEIVER_EMAIL)
2. You should receive two emails:
   - One confirmation to the visitor
   - One notification with the message details

---

## Troubleshooting

### Issue: "Failed to send message" or Network Error

**Solutions:**
1. Check if contact server is running on port 3001
2. Check browser console (F12) for error details
3. Verify environment variables are set correctly
4. Check firewall isn't blocking port 3001

### Issue: Emails Not Sending

**Solutions:**
1. Verify RESEND_API_KEY is correct
2. Check email address format is valid
3. Verify YOUR_EMAIL is set in environment
4. Check Resend dashboard for failed deliveries
5. If using custom domain, ensure DNS is verified

### Issue: Database Not Storing Data

**Solutions:**
1. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
2. Check SQL table was created correctly
3. Check RLS policies (Row Level Security)
4. Verify table name is lowercase: `contacts`

### Issue: CORS Error

**Solutions:**
1. Ensure server has CORS headers enabled (it does in our code)
2. Check frontend URL matches (http://localhost:5000)
3. Check API URL is correct (http://localhost:3001)

### Issue: "Cannot find module" Error

**Solutions:**
```bash
npm install @supabase/supabase-js resend nodemailer
npm install -D @types/nodemailer
```

### Issue: TypeScript Errors

Make sure you have proper types:
```bash
npm install -D @types/node
```

---

## For Production Deployment

When ready to deploy:

### Option 1: Deploy to Vercel

1. Create Vercel Functions directory structure
2. Move `server/contact.ts` to `api/contact.ts`
3. Convert to Vercel Function format
4. Deploy to Vercel

### Option 2: Deploy Backend Separately

1. Host server on Heroku, Railway, or similar
2. Update frontend API URL to production URL
3. Add production URL to CORS

### Option 3: Use Serverless

1. Use AWS Lambda + API Gateway
2. Or use Azure Functions
3. Or use Firebase Functions

---

## Quick Checklist

Before launching, ensure:

- ✅ Supabase project created
- ✅ Database table created
- ✅ Resend account created
- ✅ API key generated
- ✅ Dependencies installed
- ✅ Environment variables set
- ✅ Backend server created
- ✅ Frontend form updated
- ✅ Form tested locally
- ✅ Emails received successfully
- ✅ Data appearing in Supabase

---

## Support

If you get stuck:

1. **Supabase Docs:** https://supabase.com/docs
2. **Resend Docs:** https://resend.com/docs
3. **Stack Overflow:** Search your error
4. **Discord Communities:** Join Supabase or Resend Discord

---

That's it! Your contact form is now fully functional. 🎉
