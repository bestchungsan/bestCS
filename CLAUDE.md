# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean management consulting website for 베스트청산 (BestChungsan), specializing in management fee (관리비) collection services. The site is built with Next.js 15.2.1, React 19, and Tailwind CSS 4.

## Common Development Commands

```bash
# Development (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture and Structure

### Technology Stack
- **Framework**: Next.js 15.2.1 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4 with inline theme configuration
- **Language**: TypeScript with strict mode enabled
- **Font**: Pretendard (Korean web font)

### Key Directories
- `src/app/`: Main application code using Next.js App Router
  - `page.tsx`: Single-page application with all content sections
  - `layout.tsx`: Root layout with comprehensive SEO metadata
  - `globals.css`: Global styles and Tailwind configuration
  - `request/page.tsx`: Request form page with EmailJS integration
- `public/`: Static assets including images, robots.txt, and sitemap.xml

### Important Architectural Decisions

1. **Single Page Application**: All content is in `src/app/page.tsx` with anchor-based navigation (#service, #why-need, #faq, #contact)

2. **SEO-First Design**: 
   - Comprehensive metadata in `layout.tsx` including Open Graph and Twitter Cards
   - Structured data (JSON-LD) for local business
   - Korean language optimization with proper lang attributes

3. **Styling Approach**:
   - Tailwind CSS 4 with inline theme configuration in `globals.css`
   - CSS variables for theme colors supporting dark mode
   - Mobile-first responsive design

4. **Path Aliases**: Use `@/*` to import from `src/*` directory

### Content Structure

The site consists of these main sections:
- Hero section with CTA buttons
- Service explanation (관리비 추심 서비스)
- Why it's needed (미납관리비 심각성)
- FAQ section
- Contact/CTA sections
- Footer with business information

### Request Form Page (`/request`)

A comprehensive form for debt collection service requests with:
- Client information (name, contact, email, apartment name, role)
- Debtor information (name, unit number, contact)
- Unpaid management fee details (period, amount, categories)
- Previous collection attempts and special notes
- Privacy policy consent
- EmailJS integration for form submission

### EmailJS Configuration

The request form uses EmailJS for email delivery. Set up requires:
1. Copy `.env.local.example` to `.env.local`
2. Create EmailJS account at https://www.emailjs.com/
3. Configure service, template, and add environment variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Development Notes

- The project uses Turbopack for faster development builds
- TypeScript is configured with strict mode
- EmailJS integration handles form submissions
- All text content is in Korean, targeting the Korean market
- Form includes comprehensive validation and user feedback