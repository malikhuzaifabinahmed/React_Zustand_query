# React Query + Zustand Authentication Starter

## Project Structure

```bash
src/
├── components/         # Reusable UI components
├── hooks/
│   ├── mutations/     # React Query mutation hooks
│   ├── queries/       # React Query query hooks
│   └── stores/        # Zustand state stores
├── layouts/           # Layout components
├── lib/              # Configuration (axios, react-query)
├── pages/            # Route components
├── services/         # API services
└── routes/           # Route definitions
```

## Installation and Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Dependencies

Core:

- React v18.2.0
- @tanstack/react-query v5.8.4
- Zustand v4.4.6
- Axios v1.6.2
- React Router DOM v7.1.1
- js-cookie v3.0.5
- Sonner v1.7.2 (for toast notifications)

Form Handling:

- Formik v2.4.6
- Yup v1.6.1

Development:

- Vite v5.0.0
- ESLint v9.18.0
- Tailwind CSS v3.3.5
- @tailwindcss/forms v0.5.7

## Best Practices

1. **Token Management**

   - Store tokens in HTTP-only cookies
   - Implement automatic token refresh
   - Clear tokens on logout

2. **State Management**

   - Use Zustand for global authentication state
   - Persist necessary auth data in cookies
   - Clear state on logout

3. **API Requests**
   - Handle token expiration automatically
   - Implement request/response interceptors
