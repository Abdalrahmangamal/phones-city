# 🚀 React Starter Template

This is a **scalable React + Vite + TypeScript** starter template with:

* ⚡ **Vite** for blazing-fast dev/build
* 🎨 **TailwindCSS** for styling
* 🏗 **shadcn/ui** for ready-made accessible UI components
* 🔥 **Zustand** for state management
* 🌐 **Axios** (single `axiosClient` instance) for API calls
* 🗂 A clean, **reusable folder structure** for long-term projects

---

## 📂 Folder Structure

```
src/
│
├── api/                # API logic (only axiosClient here)
│   └── axiosClient.ts
│
├── assets/             # Static files (images, icons, fonts)
│   ├── images/
│   └── icons/
│
├── components/         
│   ├── ui/             # shadcn/ui components (auto-generated)
│   ├── custom/         # Your own reusable components (Navbar, Sidebar)
│   └── layout/         # Layout components (AppLayout, DashboardLayout)
│
├── pages/              # Route-based pages
│   ├── Home/
│   │   └── Home.tsx
│   ├── About/
│   │   └── About.tsx
│
├── store/              # Zustand store for global state
│   └── store.ts
│
├── types/              # TypeScript types & interfaces
│   └── index.ts
│
├── utils/              # Helper functions (formatters, validators)
│   └── index.ts
│
├── App.tsx             # Root component
├── main.tsx            # Vite entry point
└── index.css           # Tailwind base styles
```

---

## 🛠 Tech Stack

✅ **React 18** – UI library
✅ **Vite** – Fast dev/build tool
✅ **TypeScript** – Type safety
✅ **TailwindCSS** – Utility-first styling
✅ **shadcn/ui** – Prebuilt headless UI components
✅ **React Router DOM** – Client-side routing
✅ **Zustand** – Lightweight global state management
✅ **Axios** – API requests (single `axiosClient`)

---

## ⚙️ Setup

### 1️⃣ **Clone the repo**

```bash
git clone <your-repo-url>
cd your-project
```

### 2️⃣ **Install dependencies**

```bash
npm install
```

### 3️⃣ **Set up environment variables**

Create a `.env` file in the root:

```
VITE_API_URL=https://api.example.com
```

### 4️⃣ **Run the dev server**

```bash
npm run dev
```

Your app will be live at:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🌐 API Setup (Axios)

All API calls go through a single **Axios client** (`src/api/axiosClient.ts`):

```ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

export default axiosClient;
```

➡ This allows you to change the base URL just by editing `.env`.

---

## 📦 State Management (Zustand)

Example store (`src/store/store.ts`):

```ts
import { create } from "zustand";

type AppState = {
  user: string | null;
  setUser: (user: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
```

Usage:

```tsx
import { useAppStore } from "@/store/store";

const Component = () => {
  const { user, setUser } = useAppStore();
  return <button onClick={() => setUser("Fady")}>Set User</button>;
};
```

---

## 🎨 UI Components

* **shadcn/ui components** live in `src/components/ui/`
* **Your own custom components** live in `src/components/custom/`
* **Layouts** live in `src/components/layout/`

➡ This keeps **library components** and **your components** separate for clarity.

---

## 📜 Routing

React Router DOM is configured in `src/App.tsx`:

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
```



"# phones-city" 
