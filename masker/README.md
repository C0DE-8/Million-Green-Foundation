# URL Masker

This app changes an input URL to a configured base URL.

Example:

```txt
http://localhost:5174/page?x=1
```

becomes:

```txt
http://giver.localhost:5174/page?x=1
```

## Backend

```sh
cd backend
npm start
```

Backend API:

```txt
POST http://localhost:5173/api/mask
```

Request:

```json
{
  "url": "http://localhost:5174/"
}
```

Response:

```json
{
  "originalUrl": "http://localhost:5174/",
  "maskedUrl": "http://giver.localhost:5174/"
}
```

Change the mask base in `backend/.env`:

```txt
MASK_BASE_URL=http://giver.localhost:5174
```

## Frontend

```sh
cd frontend
npm run dev
```

The frontend calls the backend base URL from `frontend/.env`:

```txt
VITE_API_BASE_URL=http://localhost:5173
```

Important: `http://giver.localhost:5174` is the local development URL. It points back to your own computer, like `localhost`.

If you insist on using `http://giver:5174`, you must add this to your hosts file:

```txt
127.0.0.1 giver
```

On macOS or Linux:

```sh
sudo sh -c 'echo "127.0.0.1 giver" >> /etc/hosts'
```

Then restart the frontend:

```sh
cd frontend
npm run dev
```

After that, `http://giver:5174/` should open the same frontend that `http://localhost:5174/` opens.
