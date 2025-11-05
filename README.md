# Personal Management System 📋

> © 2025 by Hasan Yüksel. All rights reserved.

Eine vollständige Personal-Management-Anwendung built mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

---

## 🚀 LIVE DEMOS - JETZT TESTEN!

### **🌟 GitHub Pages (Statisch) - NEU!**
**👉 [https://ctacont.github.io/Personal_Management_Vue3/](https://ctacont.github.io/Personal_Management_Vue3/) 👈**
*✨ Jetzt verfügbar! GitHub Pages Deployment erfolgreich konfiguriert.*

### **🚀 Render.com (Mit Server)**
**👉 [https://personal-management-vue3.onrender.com/](https://personal-management-vue3.onrender.com/) 👈**

**Teste beide Versionen direkt im Browser - kein Setup nötig!**

---

## 🆚 Deployment-Vergleich

| Feature | GitHub Pages | Render.com |
|---------|--------------|------------|
| **URL** | [ctacont.github.io/Personal_Management_Vue3](https://ctacont.github.io/Personal_Management_Vue3/) | [personal-management-vue3.onrender.com](https://personal-management-vue3.onrender.com/) |
| **Hosting** | ✅ Statische Dateien | ✅ Node.js Server |
| **API Endpoints** | ❌ Keine | ✅ REST API verfügbar |
| **Datenpersistenz** | ❌ Nur Local Storage | ✅ JSON-Dateien auf Server |
| **Build Zeit** | ~2-3 min | ~3-5 min |
| **Kosten** | 100% Kostenlos | Kostenlos (mit Limits) |
| **Verwendung** | Frontend Demo | Vollständige App |
| **Setup** | ✅ Automatisch via GitHub Actions | ✅ Automatisch via Git-Push |

---

## ⚠️ Wichtig für Testzwecke

### GitHub Pages Version:
- ✅ **Frontend-Only**: Alle Features verfügbar
- ✅ **Local Storage**: Daten werden im Browser gespeichert
- ⚠️ **Kein Server**: Daten gehen bei Browser-Cache-Löschung verloren

### Render.com Version:
- ✅ **Vollständige App**: Frontend + Backend
- ✅ **Echte API**: REST Endpoints verfügbar
- ⚠️ **Test-Daten**: Daten werden bei Server-Neustart zurückgesetzt (kostenloses Hosting)

**Für persistente Datenbank → Lokal installieren und selbst hosten!**

---

## ✨ Features

- **📊 Dashboard** - Übersicht mit Statistiken und Quick-Actions
- **📝 Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks
- **📅 Kalender** - Verwalte Termine und Events übersichtlich
- **📋 Notizen** - Halte deine Gedanken und Ideen fest
- **👥 Kontakte** - Speichere und organisiere deine Kontakte
- **💰 Finanzen** - Tracke Einnahmen, Ausgaben und Budgets
- **🎯 Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt
- **💚 Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten

---

## 🛠️ Tech Stack

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

### Hosting & Deployment
- **GitHub Pages** - Statisches Hosting mit GitHub Actions
- **Render.com** - Cloud Deployment mit Server
- **GitHub Actions** - Automatische CI/CD Pipeline
- **Vite Build** - Optimierte Production Builds

---

## 🖥️ Lokale Installation & Entwicklung

### Voraussetzungen
- Node.js >= 14.0
- npm oder yarn
- Git

### Setup

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

**Option A - Beide Server zusammen:**
```bash
npm run dev:all
```

**Option B - Einzeln:**
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

## 📖 Verwendung

### Frontend Dev Server
- **Vite Dev Server**: http://localhost:5173
- **Hot Module Replacement**: Änderungen werden sofort aktualisiert

### Backend API (lokal)
- **API Server**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

---

## 💾 Datenpersistenz

Daten werden in JSON-Dateien im `/data` Verzeichnis gespeichert:
- `tasks.json` - Aufgaben
- `events.json` - Termine
- `notes.json` - Notizen
- `contacts.json` - Kontakte
- `transactions.json` - Transaktionen
- `goals.json` - Ziele
- `wellbeing.json` - Wohlbefinden

**Lokal**: Daten bleiben persistent  
**Online-Demos**: Daten werden bei Neustart zurückgesetzt

---

## 🔌 API Endpoints

### Tasks
- `GET /api/tasks` - Alle Tasks abrufen
- `POST /api/tasks` - Neue Task erstellen
- `PUT /api/tasks/:id` - Task aktualisieren
- `DELETE /api/tasks/:id` - Task löschen

### Events, Notes, Contacts, Transactions, Goals, Wellbeing
Ähnliche REST API Endpoints verfügbar für alle Module

---

## 📁 Projektstruktur

```
Personal_Management_Vue3/
├── .github/
│   └── workflows/          # GitHub Actions
├── data/                   # JSON Datendateien
├── dist/                   # Production Build
├── public/                 # Statische Assets
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

## 👨‍💻 Entwicklung

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

## 🏗️ Production Build

```bash
# Frontend bauen
npm run build

# Output wird in `dist/` generiert
```

---

## 🚀 Deployment

### GitHub Pages (Automatisch) ✅
1. Push zu `main` Branch
2. GitHub Actions baut und deployt automatisch
3. Verfügbar unter: https://ctacont.github.io/Personal_Management_Vue3/
4. **Status**: ✅ Aktiv und funktionsfähig!

### Render.com (Automatisch) ✅
1. Verbinde GitHub Repository
2. Render deployt automatisch bei Push
3. Verfügbar unter: https://personal-management-vue3.onrender.com/

### Manuelles Deployment
Siehe [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) für detaillierte Anweisungen.

---

## 📚 Dokumentation

- **[GitHub Pages Setup](GITHUB_PAGES_DEPLOYMENT.md)** - Deployment-Anweisungen
- **[Render Deployment](RENDER_DEPLOYMENT.md)** - Render.com Setup

---

## 📜 Lizenz & Urheberrecht

### ⚖️ RECHTLICHER HINWEIS

```
© 2025 Hasan Yüksel
Alle Rechte vorbehalten.
```

**Diese Software unterliegt dem Urheberrecht und ist geschützt durch geltendes Recht.**

### ✅ Erlaubte Nutzung
- ✅ **Kostenlose Nutzung** der öffentlichen Live-Demos
- ✅ **Persönliches Lernen** und private Entwicklung
- ✅ **Code-Analyse** für nicht-kommerzielle Zwecke

### ❌ Nicht erlaubte Nutzung
- ❌ **Kommerzielle Verwendung** ohne Lizenz
- ❌ **Wiederveröffentlichung** unter eigenem Namen
- ❌ **Modifizierte Verbreitung** ohne Genehmigung

### 📧 Lizenzierung & Kontakt
Für kommerzielle Nutzung oder andere Verwendungsformen:

```
📧 E-Mail: info@hasanyueksel.de
🐙 GitHub: https://github.com/ctacont
```

---

## � Troubleshooting

### GitHub Pages lädt nicht?
1. ✅ **Repository Settings**: Gehe zu Settings → Pages → Source: "GitHub Actions"
2. ✅ **Build Status**: Prüfe Actions Tab für erfolgreichen Build
3. ✅ **Cache**: Leere Browser-Cache oder nutze Inkognito-Modus
4. ✅ **URL**: Verwende https://ctacont.github.io/Personal_Management_Vue3/

### Lokale Entwicklung Probleme?
```bash
# Node.js Version prüfen
node --version  # Sollte >= 14.0 sein

# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install

# Ports prüfen
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Render.com Probleme?
- **Startup Zeit**: Erste Aufrufe können 30-60 Sekunden dauern (Cold Start)
- **Daten verloren**: Test-Deployment resettet Daten bei jedem Neustart

---

## �💬 Support & Fragen

Bei Fragen oder Problemen:
1. Prüfe die Dokumentation
2. Öffne ein Issue auf GitHub
3. Kontaktiere den Entwickler bei Lizenzfragen

---

## 🙏 Credits

**Entwickelt mit:**
- Vue 3 & Composition API
- Express.js & Node.js
- Tailwind CSS
- Pinia State Management

**Gehostet auf:**
- GitHub Pages (Statisch)
- Render.com (Server)

**Entwickler:** Hasan Yüksel  
**© 2025 Hasan Yüksel - Alle Rechte vorbehalten**

---

## 🎉 Feedback

**Viel Spaß beim Testen!**

Teile dein Feedback und Verbesserungsvorschläge über GitHub Issues!

