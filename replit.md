# Every Naira Count

This imported Express app lives in `every naira count/`. Its static frontend is in `public/index.html`, and `server.js` serves the page and API.

Run it with `npm start` from the workspace root after installing dependencies. Replit's **Start application** workflow runs `PORT=5000 npm start` and serves the preview on port 5000.

The server creates `every naira count/data/db.json` and `every naira count/uploads/` when it starts. Those local files are ignored by Git. No external service or secret is needed to run the imported app.

Do not publish this app for real users without securing it: the imported server exposes all data through unauthenticated `/api/data` endpoints and seeds a default owner login. The setup work here only makes the existing project runnable.