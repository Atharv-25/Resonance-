---
description: How to run the development server for live preview
---

# Development Server

## Start the live-reload server

Run this command from the project root:

```bash
npx -y live-server --port=8000
```

// turbo

This will:
- Serve the site at http://localhost:8000
- Auto-reload the browser on any file change
- No manual refresh needed

## Alternative (basic server, no auto-reload)

```bash
python3 -m http.server 8000
```
