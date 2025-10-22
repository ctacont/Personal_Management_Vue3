<<<<<<< HEAD
# Personal Management System 📋

Eine vollständige Personal-Management-Anwendung built mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

## Features ✨

- **Dashboard** - Übersicht mit Statistiken und Quick-Actions
- **Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks
- **Kalender** - Verwende Termine und Events übersichtlich
- **Notizen** - Halte deine Gedanken und Ideen fest
- **Kontakte** - Speichere und organisiere deine Kontakte
- **Finanzen** - Tracke Einnahmen, Ausgaben und Budgets
- **Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt
- **Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten

## Tech Stack 🛠️

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Pinia** - State Management
- **Vue Router** - Routing
- **Tailwind CSS** - Utility-First CSS Framework
- **date-fns** - Modern Date Utility Library

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **CORS** - Cross-Origin Resource Sharing
- **File System API** - JSON Data Persistence

## Installation 🚀

### Voraussetzungen
- Node.js >= 14.0
- npm oder yarn

### Setup

1. **Repository klonen**
```bash
git clone https://github.com/YOUR_USERNAME/Personal_Management_Vue3.git
cd Personal_Management_Vue3
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Development Servers starten**

Option A - Beide Server zusammen:
```bash
npm run dev:all
```

Option B - Einzeln:
```bash
# Terminal 1: Frontend (Vite)
npm run dev

# Terminal 2: Backend (Express)
npm run server
```

4. **Im Browser öffnen**
```
http://localhost:5173
```

## Verwendung 📖

### Frontend
- **Vite Dev Server**: http://localhost:5173
- **Hot Module Replacement**: Änderungen werden sofort aktualisiert

### Backend API
- **API Server**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## Datenpersistenz 💾

Alle Daten werden in JSON-Dateien im `/data` Verzeichnis gespeichert:
- `tasks.json` - Aufgaben
- `events.json` - Termine
- `notes.json` - Notizen
- `contacts.json` - Kontakte
- `transactions.json` - Transaktionen
- `goals.json` - Ziele
- `wellbeing.json` - Wohlbefinden

## API Endpoints 🔌

### Tasks
- `GET /api/tasks` - Alle Tasks abrufen
- `POST /api/tasks` - Neue Task erstellen
- `PUT /api/tasks/:id` - Task aktualisieren
- `DELETE /api/tasks/:id` - Task löschen

### Events
- `GET /api/events` - Alle Events abrufen
- `POST /api/events` - Neues Event erstellen
- `PUT /api/events/:id` - Event aktualisieren
- `DELETE /api/events/:id` - Event löschen

_(Ähnliche Endpoints für Notes, Contacts, Transactions, Goals und Wellbeing)_

## Struktur 📁

```
Personal_Management_Vue3/
├── data/                    # JSON Datendateien
├── public/                  # Statische Assets
├── src/
│   ├── components/         # Vue-Komponenten
│   ├── views/              # Seiten-Komponenten
│   ├── stores/             # Pinia State Management
│   ├── services/           # API Service Layer
│   ├── router/             # Vue Router Config
│   ├── App.vue             # Root Component
│   └── main.js             # Entry Point
├── server.js               # Express Server
├── vite.config.js          # Vite Config
├── tailwind.config.js      # Tailwind Config
└── package.json            # Abhängigkeiten
```

## Entwicklung 👨‍💻

### Neue Features hinzufügen

1. Backend Endpoint in `server.js` erstellen
2. API Service in `src/services/api.js` erweitern
3. Pinia Store Action in `src/stores/personal.js` hinzufügen
4. Vue Komponente in `src/views/` erstellen
5. Route in `src/router/index.js` registrieren

### Best Practices
- Verwende `<script setup>` Syntax in Vue 3
- Nutze Pinia für State Management
- Implementiere Fehlerbehandlung in API Calls
- Teste auf verschiedenen Bildschirmgrößen

## GitHub Release 📤

### Setup für GitHub

1. **Git initialisieren (falls nicht bereits geschehen)**
```bash
git init
git add .
git commit -m "Initial commit: Personal Management System"
```

2. **Remote Repository hinzufügen**
```bash
git remote add origin https://github.com/YOUR_USERNAME/Personal_Management_Vue3.git
```

3. **Zu main Branch pushen**
```bash
git branch -M main
git push -u origin main
```

4. **Release erstellen**
   - Gehe auf GitHub
   - Navigiere zu "Releases"
   - Klick auf "Create a new release"
   - Tag: `v1.0.0`
   - Title: `Personal Management System v1.0.0`
   - Description: Feature-Liste hinzufügen
   - Publish Release

### Version Bump
```bash
# Patch (z.B. 1.0.0 → 1.0.1)
npm version patch
git push origin main --tags

# Minor (z.B. 1.0.0 → 1.1.0)
npm version minor
git push origin main --tags

# Major (z.B. 1.0.0 → 2.0.0)
npm version major
git push origin main --tags
```

## Build für Production 🏗️

```bash
# Frontend bauen
npm run build

# Output wird in `dist/` generiert
```

## License 📄

(c) 2025 by Hasan Yüksel

## Contributing 🤝

Contributions sind willkommen! Bitte erstelle einen Pull Request mit deinen Änderungen.

## Support 💬

Bei Fragen oder Problemen bitte ein Issue auf GitHub öffnen.

---

**Happy Coding!** 🎉

=======
# Personal_Management_Vue3
Personal Management with Vue3 - REST API - JSON
# Personal Management System 📋

Eine vollständige Personal-Management-Anwendung build mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

---

## 🚀 LIVE DEMO - JETZT TESTEN!

### **👉 [https://personal-management-vue3.onrender.com/](https://personal-management-vue3.onrender.com/) 👈**

**Teste die App direkt im Browser - kein Setup nötig!**

### ⚠️ Wichtig für Testzwecke:

Die Demo läuft auf einem kostenlosen Server mit **Test-Daten**:

- ✅ Du kannst **neue Daten erstellen und bearbeiten**
- ✅ Du kannst **Daten speichern** (solange die Session läuft)
- ⚠️ Beim **Neuladen/Refresh** der Seite werden **alle benutzerdefinierten Daten gelöscht**
- ♻️ Die **Original-Testdaten werden wiederhergestellt**

**Das ist beabsichtigt** - die App soll getestet werden, ohne Daten dauerhaft zu speichern.

**Für persistente Datenbank** → Lokal installieren und selbst hosten!

---

## Features ✨

- **Dashboard** - Übersicht mit Statistiken und Quick-Actions
- **Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks
- **Kalender** - Verwalte Termine und Events übersichtlich
- **Notizen** - Halte deine Gedanken und Ideen fest
- **Kontakte** - Speichere und organisiere deine Kontakte
- **Finanzen** - Tracke Einnahmen, Ausgaben und Budgets
- **Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt
- **Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten

---

## Tech Stack 🛠️

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Pinia** - State Management
- **Vue Router** - Routing
- **Tailwind CSS** - Utility-First CSS Framework
- **date-fns** - Modern Date Utility Library

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **CORS** - Cross-Origin Resource Sharing
- **File System API** - JSON Data Persistence

### Hosting
- **Render.com** - Cloud Deployment

---

## 🖥️ Lokal Installieren & Entwickeln

### Voraussetzungen
- Node.js >= 14.0
- npm oder yarn
- Git

### Installation

1. **Repository klonen**
```bash
git clone https://github.com/ctacont/Personal_Management_Vue3.git
cd Personal_Management_Vue3
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Development Servers starten**

Option A - Beide Server zusammen:
```bash
npm run dev:all
```

Option B - Einzeln:
```bash
# Terminal 1: Frontend (Vite)
npm run dev

# Terminal 2: Backend (Express)
npm run server
```

4. **Im Browser öffnen**
```
http://localhost:5173
```

---

## Verwendung 📖

### Frontend Dev Server
- **Vite Dev Server**: http://localhost:5173
- **Hot Module Replacement**: Änderungen werden sofort aktualisiert

### Backend API (lokal)
- **API Server**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

---

## Datenpersistenz 💾

Daten werden in JSON-Dateien im `/data` Verzeichnis gespeichert:
- `tasks.json` - Aufgaben
- `events.json` - Termine
- `notes.json` - Notizen
- `contacts.json` - Kontakte
- `transactions.json` - Transaktionen
- `goals.json` - Ziele
- `wellbeing.json` - Wohlbefinden

Bei lokaler Nutzung: **Daten bleiben persistent**
Bei Online-Demo (Render): **Daten werden bei Refresh zurückgesetzt**

---

## API Endpoints 🔌

### Tasks
- `GET /api/tasks` - Alle Tasks abrufen
- `POST /api/tasks` - Neue Task erstellen
- `PUT /api/tasks/:id` - Task aktualisieren
- `DELETE /api/tasks/:id` - Task löschen

### Events, Notes, Contacts, Transactions, Goals, Wellbeing
Ähnliche REST API Endpoints verfügbar

---

## Projektstruktur 📁

```
Personal_Management_Vue3/
├── data/                    # JSON Datendateien
├── dist/                    # Production Build
├── public/                  # Statische Assets
├── src/
│   ├── components/         # Vue-Komponenten
│   ├── views/              # Seiten-Komponenten
│   ├── stores/             # Pinia State Management
│   ├── services/           # API Service Layer
│   ├── router/             # Vue Router Config
│   ├── App.vue             # Root Component
│   ├── main.js             # Entry Point
│   └── style.css           # Global Styles
├── server.js               # Express Server
├── vite.config.js          # Vite Konfiguration
├── tailwind.config.js      # Tailwind Konfiguration
├── package.json            # Abhängigkeiten
└── README.md               # Diese Datei
```

---

## Entwicklung 👨‍💻

### Neue Features hinzufügen

1. Backend Endpoint in `server.js` erstellen
2. API Service in `src/services/api.js` erweitern
3. Pinia Store Action in `src/stores/personal.js` hinzufügen
4. Vue Komponente in `src/views/` erstellen
5. Route in `src/router/index.js` registrieren

### Best Practices
- Verwende `<script setup>` Syntax in Vue 3
- Nutze Pinia für zentrales State Management
- Implementiere Fehlerbehandlung in API Calls
- Teste auf verschiedenen Bildschirmgrößen (Responsive Design)

---

## Production Build 🏗️

```bash
# Frontend bauen
npm run build

# Output wird in `dist/` generiert
```

---

## Deployment auf Render.com 🚀

Die App ist bereits live deployed auf Render.com!

**Live URL:**
```
https://personal-management-vue3.onrender.com/
```

Für eigenes Deployment:
1. Gehe zu https://render.com
2. Verbinde dein GitHub Repository
3. Render baut und deployt automatisch

---

## GitHub & Versionskontrolle 📚

### Git Workflow
```bash
# Änderungen machen
git add .
git commit -m "Deine Nachricht"
git push origin main
```

### Release erstellen
1. Gehe auf GitHub Releases
2. Klick "Create a new release"
3. Tag: `v1.0.0`
4. Publish

---

## Lizenz 📄

(c) 2025 by Hasan Yüksel

---

## Support & Fragen 💬

Bei Fragen oder Problemen:
1. Konsultiere die [Git Anleitung](GIT_ANLEITUNG.md) (lokal)
2. Prüfe die [Render Deployment Anleitung](RENDER_DEPLOYMENT.md)
3. Öffne ein Issue auf GitHub

---

## Credits 🙏

**Entwickelt mit:**
- Vue 3 & Composition API
- Express.js & Node.js
- Tailwind CSS
- Pinia State Management

**Gehostet auf:** Render.com

---

**Viel Spaß beim Testen!** 🎉

Teile dein Feedback und Verbesserungsvorschläge!

