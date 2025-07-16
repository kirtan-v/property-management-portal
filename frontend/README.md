
# Frontend

This is the React-based frontend application for the rental management platform.

---

## Tech Stack

- **React** (v19)
- **React Router DOM**
- **Bootstrap & React Bootstrap**
- **Axios** for HTTP requests
- **React Scripts** for running and building the app

---

## Prerequisites

- Node.js (>= 14)
- npm or yarn

---

## Setup & Run

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm start
```

3. **Build for production**
```bash
npm run build
```

4. **Run tests**
```bash
npm test
```

---

## Project Structure

- `src/components/` – UI components
- `src/pages/` – Route-level pages
- `src/services/` – API calls using Axios
- `src/App.js` – Root application logic

---

## Environment Variables

Define the following variables in a `.env` file:

```env
REACT_APP_USER_URL=http://localhost:8080/users/
REACT_APP_AUTH_URL=http://localhost:8080/auth/
REACT_APP_PROPERTY_URL=http://localhost:8080/property/
REACT_APP_LEASE_URL=http://localhost:8080/lease/
REACT_APP_LEASE_REQUEST_URL=http://localhost:8080/lease-request/
REACT_APP_NOTIFICATION_URL=http://localhost:8080/notification/
```

---

## Available Scripts

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm test` – Runs the test suite.
- `npm run eject` – Ejects configuration (not reversible).

---
