# 📊 Personal Management System

Ein umfassendes Personal Management System mit Vue 3, Tailwind CSS und einem Node.js/Express Backend.

## 🚀 Features

### Core Modules:
- **📊 Dashboard** - Zentrale Übersicht aller Metriken
- **✅ Aufgaben** - Task Management mit Priorisierung
- **📅 Kalender** - Vollständiger Kalender mit Event-Verwaltung
- **📝 Notizen** - Intelligentes Notiz-System
- **👥 Kontakte** - Professionelles Kontaktmanagement
- **💰 Finanzen** - Finanztracking und Budgetplanung
- **🎯 Ziele** - Goal-Tracking mit Fortschrittsanzeige
- **🧘 Wohlbefinden** - Schlaf-, Stimmungs- und Aktivitäts-Tracking

## 📁 Projektstruktur

```
Personal_Management_zencoder/
├── data/                          # JSON-Datenspeicher
│   ├── tasks.json                # Aufgaben-Daten
│   ├── events.json               # Termin-Daten
│   ├── notes.json                # Notiz-Daten
│   ├── contacts.json             # Kontakt-Daten
│   ├── transactions.json         # Finanz-Transaktionen
│   ├── goals.json                # Ziele-Daten
│   └── wellbeing.json            # Wellbeing-Daten
├── src/
│   ├── components/               # Vue Komponenten
│   ├── views/                    # Vue Seiten
│   │   ├── DashboardView.vue
│   │   ├── TasksView.vue
│   │   ├── CalendarView.vue
│   │   ├── NotesView.vue
│   │   ├── ContactsView.vue
│   │   ├── FinanceView.vue
│   │   ├── GoalsView.vue
│   │   └── WellbeingView.vue
│   ├── services/
│   │   └── api.js               # API-Service für Backend-Kommunikation
│   ├── stores/
│   │   └── personal.js          # Pinia Store mit async Actions
│   ├── router/
│   │   └── index.js             # Vue Router Konfiguration
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── server.js                     # Express API-Server
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Installation & Setup

### 1. Dependencies installieren
```bash
npm install
```

### 2. Frontend starten (Port 5174)
```bash
npm run dev
```

### 3. Backend starten (Port 3000)
```bash
npm run server
```

Oder beide gleichzeitig (benötigt `concurrently`):
```bash
npm run dev:all
```

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Alle Aufgaben abrufen
- `POST /api/tasks` - Neue Aufgabe erstellen
- `PUT /api/tasks/:id` - Aufgabe aktualisieren
- `DELETE /api/tasks/:id` - Aufgabe löschen

### Events
- `GET /api/events` - Alle Termine abrufen
- `POST /api/events` - Neuen Termin erstellen
- `DELETE /api/events/:id` - Termin löschen

### Notes
- `GET /api/notes` - Alle Notizen abrufen
- `POST /api/notes` - Neue Notiz erstellen
- `PUT /api/notes/:id` - Notiz aktualisieren
- `DELETE /api/notes/:id` - Notiz löschen

### Contacts
- `GET /api/contacts` - Alle Kontakte abrufen
- `POST /api/contacts` - Neuen Kontakt erstellen
- `PUT /api/contacts/:id` - Kontakt aktualisieren
- `DELETE /api/contacts/:id` - Kontakt löschen

### Transactions
- `GET /api/transactions` - Alle Transaktionen abrufen
- `POST /api/transactions` - Neue Transaktion erstellen
- `DELETE /api/transactions/:id` - Transaktion löschen

### Goals
- `GET /api/goals` - Alle Ziele abrufen
- `POST /api/goals` - Neues Ziel erstellen
- `PUT /api/goals/:id` - Ziel aktualisieren
- `DELETE /api/goals/:id` - Ziel löschen

### Wellbeing
- `GET /api/wellbeing` - Alle Wellbeing-Daten abrufen
- `POST /api/wellbeing/sleep` - Schlaf-Eintrag erstellen
- `POST /api/wellbeing/mood` - Stimmungs-Eintrag erstellen
- `POST /api/wellbeing/activity` - Aktivitäts-Eintrag erstellen

## 🛠️ Technologie Stack

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **Pinia** - State Management
- **Vue Router** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework
- **date-fns** - Modernes Datums-Handling
- **Vite** - Next-generation Build Tool

### Backend
- **Node.js** - JavaScript Runtime
- **Express** - Web Framework
- **CORS** - Cross-Origin Resource Sharing
- **File System (fs)** - JSON-Datenspeicher

## 📊 Datenstruktur

### Task
```json
{
  "id": "t1",
  "title": "Aufgabenname",
  "description": "Beschreibung",
  "dueDate": "2025-10-24",
  "category": "Arbeit",
  "priority": "Hoch",
  "status": "Offen",
  "progress": 50,
  "tags": ["Tag1", "Tag2"]
}
```

### Event
```json
{
  "id": "e1",
  "title": "Event Name",
  "date": "2025-10-23",
  "time": "09:00",
  "category": "Arbeit",
  "description": "Beschreibung",
  "location": "Ort"
}
```

### Transaction
```json
{
  "id": 1,
  "type": "Einnahme",
  "amount": 100,
  "description": "Beschreibung",
  "category": "Gehalt",
  "date": "2025-10-20"
}
```

## 🎨 Styling

Das System verwendet Tailwind CSS mit einem modernen Design:
- Responsive Layouts
- Gradient Backgrounds
- Smooth Animations
- Emoji-Icons
- Deutsche Lokalisierung

## 🔐 Hinweise zur Sicherheit

Für Produktionsumgebung sollte beachtet werden:
- Input Validation hinzufügen
- Authentifizierung implementieren
- HTTPS verwenden
- Datensicherung/Backups einrichten

## 📝 Lizenz

Dieses Projekt ist für persönliche Nutzung bestimmt.

## 🤝 Support

Bei Fragen oder Problemen beachte die API-Dokumentation oder überprüfe die Browser-Konsole auf Fehler.

---

**Happy Planning! 🚀**
