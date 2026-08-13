# Architecture Notes

## 1. Internal Operations Application

The internal PHP application uses session-based authentication and role checks.

Main modules include:

- products
- stock movements
- sales
- accounting
- employee expenses
- customer accounts
- customer ledger
- suppliers
- notes
- reports
- user management

## 2. Transaction Flow

A sale is not treated as a standalone record.

Creating or editing a sale can affect:

1. Product stock
2. Stock movement history
3. Accounting records
4. Customer ledger
5. Credit / receivable state
6. Internal notification notes

Deleting an authorized sale restores stock and removes linked financial/ledger records.

## 3. Public Website

The storefront is separated from the internal stock/accounting system.

The public side includes:

- catalog
- product details
- contact data
- SEO metadata
- public image validation
- a separate website-content administration panel

## 4. Persistence

The current production architecture uses structured JSON storage.

Writes are performed through a temporary file followed by rename, reducing the risk of leaving a partially written data file.

## 5. Security Patterns Present in the Project

- `password_hash` / `password_verify`
- CSRF tokens
- session ID regeneration
- role-based checks
- MIME-based image validation
- upload size limits
- path validation
- protected storage folders

The public showcase excludes all production records and hashes.
