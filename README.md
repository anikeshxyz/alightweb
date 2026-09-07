# Alight International — Enterprise Sourcing & Procurement Platform

A production-ready enterprise trade and B2B/B2C procurement platform built with Next.js 16 (App Router) and Node.js/Express.

## Architecture

- **Client (`/client`)**: Next.js 16 + Tailwind CSS v4 + Framer Motion.
- **Server (`/server`)**: Node.js + Express + MongoDB + EJS (Admin Panel) + PDFKit (Invoicing).
- **Deployment**: Unified Next.js + Express runner (`start.js`) configured for Railway and cloud container platforms.

## Key Features

- **Global Trade Catalog**: Multi-category product sourcing with category and sub-category filtering.
- **Enterprise RFQ System**: High-volume custom quotes, annual volume tiering, and dedicated account routing.
- **Global Supply Hubs**: Interactive operations telemetry across APAC, North America, Europe, and Middle East gateways.
- **Admin Control Panel**: Real-time order management, catalog CRUD, multi-currency invoice PDF generation, and customer analytics.
- **Security & Compliance**: Role-based access control, CSRF protection, rate limiting, and GDPR/PDPA-compliant policies.

## Getting Started

### Local Development

1. **Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Combined Runner**:
   ```bash
   npm start
   ```

### Documentation

- [Deployment Guide (Railway)](file:///c:/Users/kulde/OneDrive/Desktop/ECPROJECT/RAILWAY.md)
- [Migration & Implementation Progress](file:///c:/Users/kulde/OneDrive/Desktop/ECPROJECT/IMPLEMENTATION_PROGRESS.md)
