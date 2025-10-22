# Personal Management System 📋<<<<<<< HEAD

# Personal Management System 📋

Eine vollständige Personal-Management-Anwendung built mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

Eine vollständige Personal-Management-Anwendung built mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

---

## Features ✨

## 🚀 LIVE DEMO - JETZT TESTEN!

- **Dashboard** - Übersicht mit Statistiken und Quick-Actions

### **👉 [https://personal-management-vue3.onrender.com/](https://personal-management-vue3.onrender.com/) 👈**- **Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks

- **Kalender** - Verwende Termine und Events übersichtlich

**Teste die App direkt im Browser - kein Setup nötig!**- **Notizen** - Halte deine Gedanken und Ideen fest

- **Kontakte** - Speichere und organisiere deine Kontakte

### ⚠️ Wichtig für Testzwecke:- **Finanzen** - Tracke Einnahmen, Ausgaben und Budgets

- **Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt

Die Demo läuft auf einem kostenlosen Server mit **Test-Daten**:- **Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten



- ✅ Du kannst **neue Daten erstellen und bearbeiten**## Tech Stack 🛠️

- ✅ Du kannst **Daten speichern** (solange die Session läuft)

- ⚠️ Beim **Neuladen/Refresh** der Seite werden **alle benutzerdefinierten Daten gelöscht**### Frontend

- ♻️ Die **Original-Testdaten werden wiederhergestellt**- **Vue 3** - Progressive JavaScript Framework

- **Vite** - Next Generation Frontend Tooling

**Das ist beabsichtigt** - die App soll getestet werden, ohne Daten dauerhaft zu speichern.- **Pinia** - State Management

- **Vue Router** - Routing

**Für persistente Datenbank** → Lokal installieren und selbst hosten!- **Tailwind CSS** - Utility-First CSS Framework

- **date-fns** - Modern Date Utility Library

---

### Backend

## Features ✨- **Node.js** - JavaScript Runtime

- **Express.js** - Web Framework

- **Dashboard** - Übersicht mit Statistiken und Quick-Actions- **CORS** - Cross-Origin Resource Sharing

- **Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks- **File System API** - JSON Data Persistence

- **Kalender** - Verwalte Termine und Events übersichtlich

- **Notizen** - Halte deine Gedanken und Ideen fest## Installation 🚀

- **Kontakte** - Speichere und organisiere deine Kontakte

- **Finanzen** - Tracke Einnahmen, Ausgaben und Budgets### Voraussetzungen

- **Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt- Node.js >= 14.0

- **Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten- npm oder yarn



---### Setup



## Tech Stack 🛠️1. **Repository klonen**

```bash

### Frontendgit clone https://github.com/YOUR_USERNAME/Personal_Management_Vue3.git

- **Vue 3** - Progressive JavaScript Frameworkcd Personal_Management_Vue3

- **Vite** - Next Generation Frontend Tooling```

- **Pinia** - State Management

- **Vue Router** - Routing2. **Dependencies installieren**

- **Tailwind CSS** - Utility-First CSS Framework```bash

- **date-fns** - Modern Date Utility Librarynpm install

```

### Backend

- **Node.js** - JavaScript Runtime3. **Development Servers starten**

- **Express.js** - Web Framework

- **CORS** - Cross-Origin Resource SharingOption A - Beide Server zusammen:

- **File System API** - JSON Data Persistence```bash

npm run dev:all

### Hosting```

- **Render.com** - Cloud Deployment

Option B - Einzeln:

---```bash

# Terminal 1: Frontend (Vite)

## 🖥️ Lokal Installieren & Entwickelnnpm run dev



### Voraussetzungen# Terminal 2: Backend (Express)

- Node.js >= 14.0npm run server

- npm oder yarn```

- Git

4. **Im Browser öffnen**

### Installation```

http://localhost:5173

1. **Repository klonen**```

```bash

git clone https://github.com/ctacont/Personal_Management_Vue3.git## Verwendung 📖

cd Personal_Management_Vue3

```### Frontend

- **Vite Dev Server**: http://localhost:5173

2. **Dependencies installieren**- **Hot Module Replacement**: Änderungen werden sofort aktualisiert

```bash

npm install### Backend API

```- **API Server**: http://localhost:3000

- **Health Check**: http://localhost:3000/api/health

3. **Development Servers starten**

## Datenpersistenz 💾

Option A - Beide Server zusammen:

```bashAlle Daten werden in JSON-Dateien im `/data` Verzeichnis gespeichert:

npm run dev:all- `tasks.json` - Aufgaben

```- `events.json` - Termine

- `notes.json` - Notizen

Option B - Einzeln:- `contacts.json` - Kontakte

```bash- `transactions.json` - Transaktionen

# Terminal 1: Frontend (Vite)- `goals.json` - Ziele

npm run dev- `wellbeing.json` - Wohlbefinden



# Terminal 2: Backend (Express)## API Endpoints 🔌

npm run server

```### Tasks

- `GET /api/tasks` - Alle Tasks abrufen

4. **Im Browser öffnen**- `POST /api/tasks` - Neue Task erstellen

```- `PUT /api/tasks/:id` - Task aktualisieren

http://localhost:5173- `DELETE /api/tasks/:id` - Task löschen

```

### Events

---- `GET /api/events` - Alle Events abrufen

- `POST /api/events` - Neues Event erstellen

## Verwendung 📖- `PUT /api/events/:id` - Event aktualisieren

- `DELETE /api/events/:id` - Event löschen

### Frontend Dev Server

- **Vite Dev Server**: http://localhost:5173_(Ähnliche Endpoints für Notes, Contacts, Transactions, Goals und Wellbeing)_

- **Hot Module Replacement**: Änderungen werden sofort aktualisiert

## Struktur 📁

### Backend API (lokal)

- **API Server**: http://localhost:3000```

- **Health Check**: http://localhost:3000/api/healthPersonal_Management_Vue3/

├── data/                    # JSON Datendateien

---├── public/                  # Statische Assets

├── src/

## Datenpersistenz 💾│   ├── components/         # Vue-Komponenten

│   ├── views/              # Seiten-Komponenten

Daten werden in JSON-Dateien im `/data` Verzeichnis gespeichert:│   ├── stores/             # Pinia State Management

- `tasks.json` - Aufgaben│   ├── services/           # API Service Layer

- `events.json` - Termine│   ├── router/             # Vue Router Config

- `notes.json` - Notizen│   ├── App.vue             # Root Component

- `contacts.json` - Kontakte│   └── main.js             # Entry Point

- `transactions.json` - Transaktionen├── server.js               # Express Server

- `goals.json` - Ziele├── vite.config.js          # Vite Config

- `wellbeing.json` - Wohlbefinden├── tailwind.config.js      # Tailwind Config

└── package.json            # Abhängigkeiten

Bei lokaler Nutzung: **Daten bleiben persistent**```

Bei Online-Demo (Render): **Daten werden bei Refresh zurückgesetzt**

## Entwicklung 👨‍💻

---

### Neue Features hinzufügen

## API Endpoints 🔌

1. Backend Endpoint in `server.js` erstellen

### Tasks2. API Service in `src/services/api.js` erweitern

- `GET /api/tasks` - Alle Tasks abrufen3. Pinia Store Action in `src/stores/personal.js` hinzufügen

- `POST /api/tasks` - Neue Task erstellen4. Vue Komponente in `src/views/` erstellen

- `PUT /api/tasks/:id` - Task aktualisieren5. Route in `src/router/index.js` registrieren

- `DELETE /api/tasks/:id` - Task löschen

### Best Practices

### Events, Notes, Contacts, Transactions, Goals, Wellbeing- Verwende `<script setup>` Syntax in Vue 3

Ähnliche REST API Endpoints verfügbar- Nutze Pinia für State Management

- Implementiere Fehlerbehandlung in API Calls

---- Teste auf verschiedenen Bildschirmgrößen



## Projektstruktur 📁## GitHub Release 📤



```### Setup für GitHub

Personal_Management_Vue3/

├── data/                    # JSON Datendateien1. **Git initialisieren (falls nicht bereits geschehen)**

├── dist/                    # Production Build```bash

├── public/                  # Statische Assetsgit init

├── src/git add .

│   ├── components/         # Vue-Komponentengit commit -m "Initial commit: Personal Management System"

│   ├── views/              # Seiten-Komponenten```

│   ├── stores/             # Pinia State Management

│   ├── services/           # API Service Layer2. **Remote Repository hinzufügen**

│   ├── router/             # Vue Router Config```bash

│   ├── App.vue             # Root Componentgit remote add origin https://github.com/YOUR_USERNAME/Personal_Management_Vue3.git

│   ├── main.js             # Entry Point```

│   └── style.css           # Global Styles

├── server.js               # Express Server3. **Zu main Branch pushen**

├── vite.config.js          # Vite Konfiguration```bash

├── tailwind.config.js      # Tailwind Konfigurationgit branch -M main

├── package.json            # Abhängigkeitengit push -u origin main

└── README.md               # Diese Datei```

```

4. **Release erstellen**

---   - Gehe auf GitHub

   - Navigiere zu "Releases"

## Entwicklung 👨‍💻   - Klick auf "Create a new release"

   - Tag: `v1.0.0`

### Neue Features hinzufügen   - Title: `Personal Management System v1.0.0`

   - Description: Feature-Liste hinzufügen

1. Backend Endpoint in `server.js` erstellen   - Publish Release

2. API Service in `src/services/api.js` erweitern

3. Pinia Store Action in `src/stores/personal.js` hinzufügen### Version Bump

4. Vue Komponente in `src/views/` erstellen```bash

5. Route in `src/router/index.js` registrieren# Patch (z.B. 1.0.0 → 1.0.1)

npm version patch

### Best Practicesgit push origin main --tags

- Verwende `<script setup>` Syntax in Vue 3

- Nutze Pinia für zentrales State Management# Minor (z.B. 1.0.0 → 1.1.0)

- Implementiere Fehlerbehandlung in API Callsnpm version minor

- Teste auf verschiedenen Bildschirmgrößen (Responsive Design)git push origin main --tags



---# Major (z.B. 1.0.0 → 2.0.0)

npm version major

## Production Build 🏗️git push origin main --tags

```

```bash

# Frontend bauen## Build für Production 🏗️

npm run build

```bash

# Output wird in `dist/` generiert# Frontend bauen

```npm run build



---# Output wird in `dist/` generiert

```

## Deployment auf Render.com 🚀

## License 📄

Die App ist bereits live deployed auf Render.com!

(c) 2025 by Hasan Yüksel

**Live URL:**

```## Contributing 🤝

https://personal-management-vue3.onrender.com/

```Contributions sind willkommen! Bitte erstelle einen Pull Request mit deinen Änderungen.



Für eigenes Deployment:## Support 💬

1. Gehe zu https://render.com

2. Verbinde dein GitHub RepositoryBei Fragen oder Problemen bitte ein Issue auf GitHub öffnen.

3. Render baut und deployt automatisch

---

---

**Happy Coding!** 🎉

## GitHub & Versionskontrolle 📚

=======

### Git Workflow# Personal_Management_Vue3

```bashPersonal Management with Vue3 - REST API - JSON

# Änderungen machen# Personal Management System 📋

git add .

git commit -m "Deine Nachricht"Eine vollständige Personal-Management-Anwendung build mit **Vue 3**, **Tailwind CSS**, **Pinia** und **Express.js**.

git push origin main

```---



### Release erstellen## 🚀 LIVE DEMO - JETZT TESTEN!

1. Gehe auf GitHub Releases

2. Klick "Create a new release"### **👉 [https://personal-management-vue3.onrender.com/](https://personal-management-vue3.onrender.com/) 👈**

3. Tag: `v1.0.0`

4. Publish**Teste die App direkt im Browser - kein Setup nötig!**



---### ⚠️ Wichtig für Testzwecke:



## 📜 Lizenz & UrheberrechtDie Demo läuft auf einem kostenlosen Server mit **Test-Daten**:



### **⚖️ RECHTLICHER HINWEIS - BITTE LESEN**- ✅ Du kannst **neue Daten erstellen und bearbeiten**

- ✅ Du kannst **Daten speichern** (solange die Session läuft)

```- ⚠️ Beim **Neuladen/Refresh** der Seite werden **alle benutzerdefinierten Daten gelöscht**

© 2025 Hasan Yüksel- ♻️ Die **Original-Testdaten werden wiederhergestellt**

Alle Rechte vorbehalten.

```**Das ist beabsichtigt** - die App soll getestet werden, ohne Daten dauerhaft zu speichern.



**Diese Software unterliegt dem Urheberrecht und ist geschützt durch geltendes Recht.****Für persistente Datenbank** → Lokal installieren und selbst hosten!



Die Personal Management System Anwendung, einschließlich aller zugehörigen Quellcodes, Designs, Funktionalitäten, Dokumentationen und Materialien, ist **ausschließliches geistiges Eigentum** von **Hasan Yüksel**.---



---## Features ✨



### ✅ Erlaubte Nutzung- **Dashboard** - Übersicht mit Statistiken und Quick-Actions

- **Aufgabenverwaltung** - Erstelle, bearbeite und verwalte deine Tasks

- ✅ **Kostenlose Nutzung** des öffentlichen Live-Demos zum Testen und Evaluieren- **Kalender** - Verwalte Termine und Events übersichtlich

- ✅ **Persönliches Lernen** - Eigene Forks und private Entwicklung für Bildungszwecke- **Notizen** - Halte deine Gedanken und Ideen fest

- ✅ **Code-Analyse** - Einsicht und Verständnis für nicht-kommerzielle Zwecke- **Kontakte** - Speichere und organisiere deine Kontakte

- **Finanzen** - Tracke Einnahmen, Ausgaben und Budgets

---- **Ziele** - Setze persönliche Ziele und verfolge deinen Fortschritt

- **Wohlbefinden** - Tracke Schlaf, Stimmung und Aktivitäten

### ❌ Nicht erlaubte Nutzung

---

- ❌ **Kommerzielle Verwendung** - Die Anwendung oder deren Komponenten dürfen nicht für kommerzielle oder gewinnorientierte Zwecke genutzt werden

- ❌ **Wiederveröffentlichung** - Das Projekt darf nicht unter eigenem Namen oder anderer Autorenschaft veröffentlicht werden## Tech Stack 🛠️

- ❌ **Modifizierte Verbreitung** - Veränderte oder abgeleitete Versionen dürfen ohne ausdrückliche Genehmigung nicht verbreitet werden

- ❌ **Integration in kommerzielle Produkte** - Die Anwendung oder Teile davon dürfen nicht in kommerzielle Produkte oder Dienstleistungen integriert werden### Frontend

- ❌ **Derivative kommerzielle Werke** - Die Erstellung kommerzieller Produkte basierend auf dieser Anwendung ist untersagt- **Vue 3** - Progressive JavaScript Framework

- **Vite** - Next Generation Frontend Tooling

---- **Pinia** - State Management

- **Vue Router** - Routing

### 📧 Lizenzierung & Genehmigungen- **Tailwind CSS** - Utility-First CSS Framework

- **date-fns** - Modern Date Utility Library

Für jegliche andere Verwendungsform - insbesondere für:

### Backend

- 🤝 **Kommerzielle Lizenzierung**- **Node.js** - JavaScript Runtime

- 🔄 **Weiterverwendung des Quellcodes**- **Express.js** - Web Framework

- 🔗 **Integration in kommerzielle Projekte**- **CORS** - Cross-Origin Resource Sharing

- ✏️ **Modifikation und Umverteilung**- **File System API** - JSON Data Persistence

- 📦 **Verwendung als Basis für eigene Produkte**

### Hosting

**Kontaktieren Sie bitte direkt:**- **Render.com** - Cloud Deployment



```---

📧 E-Mail: hasan.yueksel@example.com

🐙 GitHub: https://github.com/ctacont## 🖥️ Lokal Installieren & Entwickeln

```

### Voraussetzungen

Alle Lizenzanfragen werden individuell geprüft und können unter entsprechenden Bedingungen bewilligt werden.- Node.js >= 14.0

- npm oder yarn

---- Git



### ⚖️ Rechtliche Konsequenzen### Installation



Die unbefugte kommerzielle Nutzung oder Verbreitung verstößt gegen geltendes Urheberrecht und kann zu rechtlichen Konsequenzen führen, einschließlich:1. **Repository klonen**

- Zivilrechtliche Schadensersatzforderungen```bash

- Unterlassungsansprüchegit clone https://github.com/ctacont/Personal_Management_Vue3.git

- Abmahnung und Vertragsstrafencd Personal_Management_Vue3

```

---

2. **Dependencies installieren**

## Support & Fragen 💬```bash

npm install

Bei Fragen oder Problemen:```

1. Konsultiere die lokalen Dokumentationsdateien

2. Öffne ein Issue auf GitHub3. **Development Servers starten**

3. Kontaktiere den Entwickler direkt bei Lizenzfragen

Option A - Beide Server zusammen:

---```bash

npm run dev:all

## Credits 🙏```



**Entwickelt mit:**Option B - Einzeln:

- Vue 3 & Composition API```bash

- Express.js & Node.js# Terminal 1: Frontend (Vite)

- Tailwind CSSnpm run dev

- Pinia State Management

# Terminal 2: Backend (Express)

**Gehostet auf:** Render.comnpm run server

```

**Entwickler:** Hasan Yüksel

4. **Im Browser öffnen**

**© 2025 Hasan Yüksel - Alle Rechte vorbehalten**```

http://localhost:5173

---```



**Viel Spaß beim Testen!** 🎉---



Teile dein Feedback und Verbesserungsvorschläge!## Verwendung 📖


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

