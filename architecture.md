# Demo Architecture

This repository is intentionally a **static showcase** rather than a production copy.

```text
Customer Demo (index.html)
          |
          v
      app.js
          |
          v
Mock product / stock data in browser memory

Admin Demo (admin.html)
          |
          v
      app.js
          |
          +--> product table
          +--> sales table
          +--> accounting summary
          +--> internal notes
```

## Production Concept

A production implementation of the same business flow would normally separate:

1. Presentation layer
2. Authentication / authorization
3. Business logic
4. Persistent database
5. File/media storage
6. Audit / reporting

This public repository does not expose the production implementation or its infrastructure.
