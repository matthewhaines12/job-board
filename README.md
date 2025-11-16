# Job-Board

A modern React job board application with advanced filtering, pagination, and user authentication.

## Features

- Advanced job search with multiple filters (keyword, location, salary, remote, etc.)
- Backend pagination (25 jobs per page)
- Save favorite jobs (requires authentication)
- User authentication with email verification
- Fully responsive design
- Built with React + Vite

## Tech Stack

- **Frontend**: React 19, React Router, Vite
- **Backend**: Node.js (deployed on Render)
- **Styling**: Pure CSS with modern features

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository

```bash
git clone https://github.com/matthewhaines12/JobBoard.git
cd job-board
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_API_URL2`
   - `VITE_API_URL3`
4. Deploy!

Vercel will automatically detect the Vite configuration and deploy correctly.

## Environment Variables

```env
VITE_API_URL=https://job-board-backend-gwm3.onrender.com/api/jobs
VITE_API_URL2=https://job-board-backend-gwm3.onrender.com/api/auth
VITE_API_URL3=https://job-board-backend-gwm3.onrender.com/api/users
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
