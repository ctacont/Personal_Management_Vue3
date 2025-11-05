# GitHub Pages Deployment Anweisungen

## Setup für GitHub Pages

### 1. Repository Einstellungen
1. Gehen Sie zu den **Settings** Ihres GitHub Repositories
2. Scrollen Sie zu **Pages** im linken Menü
3. Unter **Source** wählen Sie **GitHub Actions**

### 2. Automatisches Deployment
- Die GitHub Action `.github/workflows/deploy-github-pages.yml` wird automatisch ausgeführt bei jedem Push zum `main` Branch
- Das Build wird automatisch zu GitHub Pages deployed

### 3. Manuelle Deployment (falls nötig)
```bash
# Repository klonen
git clone https://github.com/ctacont/Personal_Management_Vue3.git
cd Personal_Management_Vue3

# Dependencies installieren
npm install

# Build für GitHub Pages erstellen
npm run build:github

# Zum GitHub Repository pushen
git add .
git commit -m "Update GitHub Pages configuration"
git push origin main
```

### 4. Wichtige Konfigurationen für GitHub Pages

#### vite.config.js
- `base: '/Personal_Management_Vue3/'` - Repository Name als base path
- Korrekte build Konfiguration

#### Router Konfiguration
- Vue Router mit GitHub Pages base path konfiguriert
- SPA Routing Unterstützung durch 404.html

#### Dateien für GitHub Pages
- `.nojekyll` - Verhindert Jekyll Processing
- `404.html` - SPA Routing Unterstützung
- `index.html` - SPA Redirect Script

### 5. Unterschiede zu Render Deployment
- **Render**: Kann Node.js Server ausführen (`server.js`)
- **GitHub Pages**: Nur statische Dateien (keine Server-Side Features)
- **API Calls**: Auf GitHub Pages müssen externe APIs verwendet werden

### 6. Nach dem Deployment
- URL: https://ctacont.github.io/Personal_Management_Vue3/
- Es kann 5-10 Minuten dauern, bis Änderungen live sind
- Cache könnte Browser-Refresh erfordern

### 7. Troubleshooting
- Überprüfen Sie die **Actions** Tab im Repository für Build-Logs
- Stellen Sie sicher, dass GitHub Pages in den Repository Settings aktiviert ist
- Bei Routing-Problemen: Überprüfen Sie die Browser-Konsole auf Fehler