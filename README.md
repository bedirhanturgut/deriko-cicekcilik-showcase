# Deriko Çiçekçilik — Business Management System

A source-informed portfolio case study of a **production florist management system** developed for Deriko Çiçekçilik.

> The complete production repository is intentionally private. This public showcase contains real project screenshots, architecture notes and sanitized representative code only.

## What the System Does

The application combines day-to-day retail operations in one system:

- Product and stock management
- Automatic sequential product codes
- Bulk product entry and image uploads
- Sales creation, editing and controlled deletion
- Stock movement history
- Cash / card / transfer payment flows
- Credit / receivable sales
- Customer accounts and ledger
- Expense entry
- Accounting records
- Supplier management
- Internal notes
- Employee and administrator roles
- Reports and exports
- Separate public website management
- Mobile/PWA-oriented usage

## Technical Stack

- PHP
- HTML / CSS / JavaScript
- Server-side sessions
- JSON-based persistent data storage
- Atomic file writes
- Role-based authorization
- CSRF protection
- Password hashing
- Image upload validation
- Service worker / web app manifest
- Apache `.htaccess`

## Real Interface

### Manager Dashboard

![Deriko Çiçekçilik Manager Dashboard](screenshots/manager-dashboard.png)

## Architecture Highlights

The production project separates the public florist website from the internal operations panel.

```text
Public Website
├── Product catalog
├── Product details
├── Contact / WhatsApp
├── SEO / sitemap
└── Separate site-admin panel

Operations Panel
├── Authentication / roles
├── Products & stock
├── Sales
├── Expenses
├── Accounting
├── Customers / receivables
├── Suppliers
├── Notes
├── Reports / exports
└── Mobile/PWA support

Persistence
└── JSON data store with atomic writes
```

See [`docs/architecture.md`](docs/architecture.md) for more detail.

## Representative Code

Safe, rewritten examples based on the real project structure are included under [`samples/`](samples/):

- `csrf-auth.php`
- `atomic-json-storage.php`
- `sale-transaction.php`
- `secure-image-upload.php`

These files demonstrate the engineering patterns without exposing production data or credentials.

## My Role

I worked across the project lifecycle, including:

- Requirements analysis
- Product / stock workflow design
- Sales and accounting flows
- Admin and employee interfaces
- Customer account / receivable workflows
- Testing and debugging
- Client-driven revisions
- Deployment and live-environment work

## Live Project

https://derikocicekcilik.com

## Why the Full Source Is Private

The production project contains real operational records and business data. Publishing the raw project would expose information that does not belong in a public GitHub repository.

## Status

**Production / Live**
