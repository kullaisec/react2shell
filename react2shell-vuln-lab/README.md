# NoteVault

A lightweight collaborative notes platform built with Next.js and React Server Components.

## Features

- Create, search, and browse notes
- Public note sharing
- Server-side rendering with React Server Components
- REST API for programmatic access

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
docker build -t notevault .
docker run --rm -p 3000:3000 notevault
```

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- TypeScript

## API

- `GET /api/notes` — List all public notes
- `GET /api/notes?id=<id>` — Get a specific note
- `GET /api/notes?q=<query>` — Search notes
- `POST /api/notes` — Create a note

## License

MIT
