# 🚀 Quick Start Guide

## Schneller Einstieg ins Personal Management System

### 📋 Voraussetzungen
- Node.js 16+ installiert
- npm oder yarn als Package Manager

### ⚡ Schritt-für-Schritt Start

#### 1. **Projekt clonen/öffnen**
```bash
cd "Personal_Management_Vue3"
```

#### 2. **Dependencies installieren**
```bash
npm install
```

#### 3. **Backend starten** (Terminal 1)
```bash
npm run server
```
✅ Server läuft auf: `http://localhost:3000`

#### 4. **Frontend starten** (Terminal 2)
```bash
npm run dev
```
✅ App läuft auf: `http://localhost:5174`

**ODER** beide gleichzeitig starten:
```bash
npm run dev:all
```

### 📊 Verwendung

#### Dashboard
- Öffne `http://localhost:5174`
- Überblick über alle Daten
- Statistiken und KPIs

#### Aufgaben
- Neue Aufgaben erstellen
- Prioritäten setzen
- Fortschritt tracken
- Filtern und suchen

#### Kalender
- Termine verwalten
- Termine nach Datum anzeigen
- Kategorisierung

#### Notizen
- Schnelle Notizen erstellen
- Nach Kategorien filtern
- Inline-Bearbeitung

#### Kontakte
- Kontaktdaten speichern
- Nach Kategorie filtern
- Suchfunktion

#### Finanzen
- Einnahmen/Ausgaben tracken
- Budget-Übersicht
- Kategorieaufschlüsselung

#### Ziele
- Persönliche Ziele setzen
- Fortschritt anzeigen
- Priorisierung

#### Wohlbefinden
- Schlaf tracken
- Stimmung aufzeichnen
- Aktivitäten loggen

### 💾 Datenspeicherung

Alle Daten werden in `/data` JSON-Dateien gespeichert:
- `tasks.json` - Aufgaben
- `events.json` - Termine
- `notes.json` - Notizen
- `contacts.json` - Kontakte
- `transactions.json` - Finanzen
- `goals.json` - Ziele
- `wellbeing.json` - Wohlbefinden

### 🔧 API Health Check

Überprüfe ob der API-Server läuft:
```bash
curl http://localhost:3000/api/health
```

### 📚 Dokumentation

Vollständige Dokumentation: siehe `DOKU.md`

### 🆘 Fehlerbehandlung

#### API verbindet sich nicht
- Stelle sicher, dass `npm run server` läuft
- Prüfe ob Port 3000 verfügbar ist
- Starte Browser-Konsole für Fehler

#### Daten werden nicht gespeichert
- Prüfe `data/` Verzeichnis auf Berechtigungen
- Stelle sicher, dass Node.js Schreibzugriff hat
- Prüfe Terminal auf API-Fehler

#### Frontend zeigt nur weiße Seite
- Prüfe Browser-Konsole auf Fehler
- Leere Cache: Ctrl+Shift+Delete
- Starte Frontend neu

### 🎯 Tipps & Tricks

- **Export möglich?** JSON-Dateien direkt nutzen
- **Backup?** Kopiere `/data` Verzeichnis
- **Anpassungen?** Views sind in `/src/views` editierbar

### 📞 Support

Falls Probleme auftreten:
1. Prüfe Terminal-Ausgaben
2. Öffne Browser DevTools (F12)
3. Prüfe Datei-Struktur in `/data`

---

**Viel Erfolg! 🎉**
