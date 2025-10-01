# TaskMaster Pro

TaskMaster Pro is a full-stack task management application built with Next.js. It provides a secure dashboard for creating, viewing, editing, and deleting tasks, integrated with a real-world API at `https://api.oluwasetemi.dev`. The app includes user authentication (sign-in/sign-up) using NextAuth.js, responsive UI with Tailwind CSS, and server-side data fetching for optimal performance.

This project was developed as part of the AltSchool Africa third-semester final assessment.

## Features

- **Authentication**: Secure sign-in and sign-up using email/password via the API's `/auth/login` and `/auth/register` endpoints.
- **Task Management**: CRUD operations for tasks (create, read, update, delete) with support for priorities, status, dates, and tags.
- **Dashboard**: Protected route displaying task lists with search, filtering, pagination, and modal-based editing.
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS.
- **Server-Side Rendering**: Optimized data fetching with Next.js App Router and Server Actions.
- **Error Handling**: Graceful handling of API errors, session issues, and validation.

## Tech Stack

- **Frontend**: Next.js 15.5.4 (App Router, Turbopack), TypeScript, Tailwind CSS, React
- **Authentication**: NextAuth.js v4
- **Package Manager**: pnpm
- **API**: `https://api.oluwasetemi.dev` (Tasks and Auth endpoints)
- **Other**: ESLint, jwt-decode (for token refresh)

## Prerequisites

- Node.js 18+ and pnpm installed.
- Access to the API (`https://api.oluwasetemi.dev`) for auth and tasks.
- A secure secret for JWT encryption (generated via `openssl rand -base64 32`).

## Installation

1. Clone or download the repository:
   ```bash
   git clone <repo-url>
   cd my-task-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env.local` in the project root:
   ```env
   NEXTAUTH_SECRET=your-secure-secret-here  # Generate with openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3001       # Adjust port if needed
   ```

4. Build and run the development server:
   ```bash
   pnpm dev
   ```
   - The app runs on `http://localhost:3001` (or 3000 if available).
   - If port 3000 is in use, free it with `taskkill /PID <pid> /F` (Windows) or `kill <pid>` (macOS/Linux).

## Usage

1. **Sign Up**:
   - Visit `http://localhost:3001/auth/signup`.
   - Enter email, name, and password (e.g., `testuser@example.com`, `Test User`, `testpass123`).
   - On success, redirect to sign-in.

2. **Sign In**:
   - Visit `http://localhost:3001/auth/signin`.
   - Use registered credentials or mock (`test@example.com` / `testpass`).
   - On success, redirect to `/dashboard`.

3. **Dashboard**:
   - View tasks in a list.
   - Click "Create Task" to open the modal form.
   - Edit or delete tasks via inline buttons.

4. **Task Details**:
   - Click a task to view details at `/tasks/{id}`.

5. **Sign Out**:
   - Visit `http://localhost:3001/auth/signout`.

## Environment Variables

| Variable          | Description                          | Example Value                  |
|-------------------|--------------------------------------|--------------------------------|
| `NEXTAUTH_SECRET` | JWT encryption secret (required)     | `Pd3jL6mnhrd7tPWf3rVWsACPbGaZnj9c5Nzz0PBf/8g=` |
| `NEXTAUTH_URL`    | App URL for callbacks                | `http://localhost:3001`        |

Generate `NEXTAUTH_SECRET` with:
```bash
openssl rand -base64 32
```

## API Integration

The app integrates with `https://api.oluwasetemi.dev`:
- **Auth**: `/auth/login`, `/auth/register`, `/auth/refresh`, `/auth/me`.
- **Tasks**: `/tasks` (GET/POST), `/tasks/{id}` (GET/PATCH/DELETE), `/tasks/{id}/children` (GET).

**Test Credentials** (mock for development):
- Email: `test@example.com`
- Password: `testpass`

**Real API Testing**:
- Register a user via curl (see Installation steps).
- Use the returned `accessToken` for task endpoints.

## Running Tests

1. **TypeScript Check**:
   ```bash
   pnpm tsc --noEmit
   ```

2. **Linting**:
   ```bash
   pnpm lint
   ```

3. **Build**:
   ```bash
   pnpm build
   ```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - Framework for the app.
- [NextAuth.js](https://next-auth.js.org) - Authentication library.
- [Tailwind CSS](https://tailwindcss.com) - Styling.
- [Oluwasetemi's API](https://api.oluwasetemi.dev) - Backend for tasks and auth.

---

For support, open an issue or contact the developer. Happy task managing! 🚀