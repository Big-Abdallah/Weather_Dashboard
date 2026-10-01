# 🌦️ Weather Dashboard

A responsive weather dashboard built with **React 19**, **Vite**, and **Tailwind CSS**. Search for any city in the world and see its current conditions and an upcoming forecast, in a modern glassmorphism UI with an Arabic (RTL) interface.

🔗 **Live demo:** [weather-dashboard-nine-ochre.vercel.app](https://weather-dashboard-nine-ochre.vercel.app/)

---

## ✨ Features

- 🔍 **City search** — look up any city worldwide (press `Enter` or click the search icon)
- 🌡️ **Current weather** — temperature, feels-like, daily min/max, and a short description
- 📊 **Details** — wind speed, humidity, visibility, and pressure
- 📅 **Forecast cards** — daily forecast with weather icons
- 🇪🇬 **Arabic interface** — RTL layout, Arabic day names and dates, Arabic weather descriptions when available
- ⏳ **Loading and error states** — spinner while loading, friendly message with a "back to default city" button on failure
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🔑 **No API key required** — uses the free [wttr.in](https://wttr.in) API

---

## 🛠️ Tech Stack

| Category   | Tools                          |
| ---------- | ------------------------------ |
| Framework  | React 19, Vite 7               |
| Styling    | Tailwind CSS 4                 |
| Icons      | Lucide React                   |
| Weather    | wttr.in API (`?format=j1`)     |
| Linting    | ESLint 9                       |
| Deployment | Vercel                         |

---

## 📁 Project Structure

```
src/
├── main.jsx                # App entry point
├── App.jsx                 # Root component
├── WeatherDashboard.jsx    # Main component: search, fetching, UI
├── index.css               # Tailwind import
└── assets/
```

---

## 🔌 How It Works

The app requests weather data from:

```
GET https://wttr.in/{city}?format=j1
```

The JSON response is mapped into a simple structure (current conditions + forecast days). Weather codes returned by wttr.in are converted into icon groups (clear, cloudy, rain, snow, fog), which are displayed using Lucide icons.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
git clone https://github.com/Big-Abdallah/Weather_Dashboard.git
cd Weather_Dashboard
npm install
```

### Run in development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📜 Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## 🗺️ Roadmap

- [ ] Use the browser's geolocation to load the user's city automatically
- [ ] Switch between °C and °F
- [ ] Save recent searches
- [ ] Language toggle (Arabic / English)

---

## 👤 Author

**Abdallah** — [@Big-Abdallah](https://github.com/Big-Abdallah)

---

## 📄 License

No license has been added yet. Add a `LICENSE` file (e.g., MIT) to specify the terms.
