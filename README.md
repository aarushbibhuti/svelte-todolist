# Svelte Todo

A todo app in progress. Add tasks with a priority and save them to PostgreSQL.

## Stack

- SvelteKit and Svelte 5
- TypeScript and Tailwind CSS
- PostgreSQL with Drizzle ORM

## Run locally

Requirements: Node.js, npm, and a running PostgreSQL database.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root and set your database connection:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
   ```

3. Apply the database migrations:

   ```sh
   npx drizzle-kit migrate
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

Open the local URL printed in the terminal, usually `http://localhost:5173`.
