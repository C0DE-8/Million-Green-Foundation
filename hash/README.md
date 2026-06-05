# Million Green Foundation

Million Green Foundation is a community-driven financial empowerment site. Eligible users can receive rewards up to ₦500,000 through a referral and community growth program, subject to eligibility, verification and program rules.

When a user opens any main frontend page, the frontend asks the backend for a long page-specific path and updates the browser address bar.

Example:

```txt
http://localhost:5174/
```

becomes something like:

```txt
http://localhost:5174/w8if/server/394641/rdow-fund-77324/water/page/home/sjgy3wfydwyshf/etgw763679/12345678/r6t32rg
```

The page does not reload when the path changes. Generated paths include `/page/home`, `/page/terms`, `/page/privacy`, or `/page/disclaimer` so refreshes can show the right route.

## Backend

```sh
cd backend
npm start
```

Backend API:

```txt
GET http://localhost:5173/api/hash?page=home
```

## Frontend

```sh
cd frontend
npm run dev
```

Frontend URL:

```txt
http://localhost:5174/
```

If Vite chooses a different port, open the URL printed in the terminal.

## Pages

- `/` home page, then rewritten to a generated hash path
- `/terms`, then rewritten to a generated hash path
- `/privacy`, then rewritten to a generated hash path
- `/disclaimer`, then rewritten to a generated hash path
- generated paths containing `/server/` and `/page/{name}`
- any other unknown path shows the 404 page

## Deployment

`vercel.json` rewrites all routes to `index.html` so refreshes on React Router pages and generated hash paths work on Vercel.

The APK button is present in the UI, but it does not download a file yet. It shows a safety-review message until a real signed APK is available.

Approved rewards may be paid through supported OPay wallet details. The site states that it is not owned, operated or endorsed by OPay.
