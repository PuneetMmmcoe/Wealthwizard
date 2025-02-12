# Finance Management Application

A comprehensive personal finance management application that empowers users to track income, manage budgets, and gain financial insights through an intuitive interface.

## Features

- User Authentication
- Expense Tracking
- Budget Management
- Savings Goals
- Income Tracking
- Financial Analytics
- Responsive Design

## Prerequisites

- Node.js (v20 or later)
- PostgreSQL database
- NPM or Yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
   - Create a PostgreSQL database
   - Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[dbname]
   ```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory with these variables:

```env
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[dbname]
```

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend server
- `/shared` - Shared types and schemas
- `/migrations` - Database migrations

## Scripts

- `npm run dev` - Start the development server
- `npm run db:push` - Push database schema changes
- `npm run build` - Build the production application
- `npm start` - Start the production server

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - TanStack Query
  - Tailwind CSS
  - Recharts
  - Shadcn UI

- Backend:
  - Express.js
  - PostgreSQL
  - Drizzle ORM
  - Passport.js

## License

MIT
