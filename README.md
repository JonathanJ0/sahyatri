# Sahyatri (Prototype)

**Smart Tourist Safety Monitoring & Incident Response System**

Sahyatri is a digital ecosystem built for tourist safety in high-risk and remote regions — especially areas where tourism is vital to the local economy, such as Northeast India. It combines a mobile app for tourists, an authority dashboard for police and tourism departments, AI-driven anomaly detection, and blockchain-backed digital identity verification.

Built for **Smart India Hackathon 2025**.

---

## The Problem

Traditional policing and manual tracking are not enough to protect tourists in remote, forested, or high-risk zones. Authorities need real-time visibility into tourist movement, rapid SOS response, and tamper-proof identity records — while tourists need a simple, trustworthy safety companion on their phone.

## The Solution

Sahyatri delivers an end-to-end safety platform:

| Layer | Role |
|-------|------|
| **Mobile App** (`my-app`) | Tourist-facing safety companion with digital ID, geo-fencing, SOS, and live location sharing |
| **Authority Dashboard** (`my-web`) | Real-time monitoring for police and tourism departments |
| **AI Engine** | Outlier detection and path-deviation algorithms to flag distress behaviour |
| **Blockchain ID** | Secure, trip-scoped digital tourist identity with KYC and itinerary |

---

## Features

### Mobile App (Tourists)

- **Blockchain Digital ID** — Trip-scoped identity with basic KYC, emergency contacts, and itinerary
- **Safety Score** — Dynamic score based on travel patterns and area sensitivity
- **Geo-Fencing Alerts** — Warnings when entering high-risk or restricted zones
- **SOS & Panic Button** — One-tap emergency with live location sharing to contacts and authorities
- **Live Location Streaming** — GPS coordinates and timestamps sent to the dashboard
- **Multilingual Support** — 12 languages including English, Hindi, Bengali, Tamil, Assamese, and more

### Authority Dashboard (Police & Tourism)

- **Overview Dashboard** — Total tourists, active alerts, inactive tourists, and aggregate safety scores
- **Live Map** — Tourist markers and cluster visualisation with Leaflet
- **Anomaly Monitoring** — Flagged missing, silent, or distress behaviour
- **Tourist Timeline** — Individual movement history for investigations
- **Digital ID Registry** — Access to verified tourist records
- **Analytics** — Charts and visualisations for trend analysis

### AI & Intelligence

- Sudden location drop-off detection
- Prolonged inactivity monitoring
- Route deviation from planned itinerary
- Continuous danger-zone updates via tourist feedback

---

## Project Structure

```
TSAv2/
├── my-app/          # Expo (React Native) mobile application
│   └── app/
│       └── (tabs)/  # Home, Safety, Digital ID, Emergency, Profile
├── my-web/          # Next.js authority dashboard
│   └── app/         # Dashboard, Map, Tourists, Timeline, Analytics, etc.
├── Features.txt
└── Problem_statement.txt
```

---

## Tech Stack

| Component | Technologies |
|-----------|-------------|
| Mobile App | Expo 54, React Native, TypeScript, Expo Router, React Native Maps |
| Dashboard | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Leaflet, Recharts |
| AI | Outlier detection & path deviation algorithms |
| Identity | Blockchain-based digital tourist ID |
| Location | Expo Location, geo-fencing, real-time GPS streaming |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- For mobile: [Expo Go](https://expo.dev/go) on a device, or Android Studio / Xcode for emulators

### Mobile App

```bash
cd my-app
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

### Authority Dashboard

```bash
cd my-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## App Screens

### Tourist Mobile App

| Tab | Purpose |
|-----|---------|
| Home | Trip overview and quick actions |
| Safety | Safety score, geo-fence status, and zone alerts |
| Digital ID | Blockchain-verified tourist identity |
| Emergency | SOS button and emergency contacts |
| Profile | Language preferences and account settings |

### Dashboard Pages

| Page | Purpose |
|------|---------|
| `/` | Main dashboard with stats and recent activity |
| `/map` | Live tourist map with markers |
| `/tourists` | Tourist registry and status |
| `/timeline` | Individual movement timelines |
| `/safety` | Safety zone management |
| `/emergency` | Active SOS and alert queue |
| `/digital-ids` | Digital ID records |
| `/analytics` | Data visualisations |

---

## Data Privacy & Security

- End-to-end encryption for sensitive tourist data
- Blockchain ensures tamper-proof identity and travel records
- Trip-scoped digital IDs expire after the visit
- Opt-in real-time tracking for families and law enforcement

---

## Roadmap

- [ ] Backend API (MERN stack) with persistent data storage
- [ ] Production blockchain ID issuance at entry points
- [ ] Automated E-FIR generation for missing person cases
- [ ] IoT wearable integration (smart bands/tags)
- [ ] Voice-based emergency access for elderly and disabled travellers

---

## License

This project was developed as part of Smart India Hackathon 2025. All rights reserved by the team unless otherwise specified.

---

## Contributing

This is a hackathon project. For questions or collaboration, open an issue on [GitHub](https://github.com/JonathanJ0/sahyatri/issues).
