# Simple URL Shortener

This project is split into:

- `backend`: API server and short-link redirects
- `frontend`: React app that calls the backend with Axios

## Run Backend

```sh
cd backend
npm start
```

Backend URL:

```txt
http://localhost:5173
```

## Run Frontend

```sh
cd frontend
npm run dev
```

Frontend URL:

```txt
http://localhost:5174
```

If Vite chooses a different port, open the URL printed in the terminal.

## How It Works

The frontend calls:

```txt
POST http://localhost:5173/api/shorten
```

The backend returns a short link like:

```txt
http://localhost:5173/abc123
```

Open or share that backend short link. It redirects to the original long URL.

Links are stored in memory, so they reset when the backend restarts.

For other people on your network, `localhost` will not work from their computer. Set `backend/.env` `BASE_URL` to your backend machine address, for example:

```txt
BASE_URL=http://192.168.1.50:5173
```

Then restart the backend.

Do not use `http://giver-users:5173` unless your computer and your users' computers can resolve `giver-users` to the backend machine.
