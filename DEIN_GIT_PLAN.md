# Dein persönlicher Git Plan 🚀

**GitHub Username:** ctacont
**Email:** ctacont@freenet.de
**Repository:** Personal_Management_Vue3

---

## ✅ Schritt-für-Schritt Befehle

### Schritt 1: PowerShell öffnen 🖥️

Drücke: **Windows-Taste + R**
Gib ein: `powershell`
Drücke: **Enter**

---

### Schritt 2: Git konfigurieren ⚙️

Kopiere und füge EXAKT folgende Befehle ein:

```powershell
git config --global user.name "ctacont"
```

Drücke **Enter** ✅

Dann:
```powershell
git config --global user.email "ctacont@freenet.de"
```

Drücke **Enter** ✅

*(Keine Ausgabe = Alles ok)*

---

### Schritt 3: Zum Projektordner navigieren 📁

Kopiere und füge ein:

```powershell
cd "c:\Users\lenovo\Documents\CODING\ZENCODER Projekte\Personal_Management_zencoder"
```

Drücke **Enter** ✅

*(Du solltest jetzt im Projektordner sein)*

---

### Schritt 4: Git initialisieren ✅

Du hast das wahrscheinlich schon gemacht, aber sicherheitshalber:

```powershell
git init
```

Drücke **Enter** ✅

*(Du siehst: "Reinitialized existing Git repository" oder "Initialized empty Git repository")*

---

### Schritt 5: Alle Dateien hinzufügen 📝

```powershell
git add .
```

Drücke **Enter** ✅

*(Keine Ausgabe = Alles ok)*

---

### Schritt 6: Ersten Commit erstellen 📸

```powershell
git commit -m "Initial commit: Personal Management System v1.0.0"
```

Drücke **Enter** ✅

*(Du siehst viele Dateien, z.B.: "XX files changed, XXXX insertions(+)")*

---

### Schritt 7: Mit GitHub verbinden 🔗

**WICHTIG:** Ersetze nichts! Das ist für DICH vorbereitet:

```powershell
git remote add origin https://github.com/ctacont/Personal_Management_Vue3.git
```

Drücke **Enter** ✅

*(Keine Ausgabe = Alles ok)*

---

### Schritt 8: Main Branch einstellen 🌿

```powershell
git branch -M main
```

Drücke **Enter** ✅

---

### Schritt 9: Hochladen zu GitHub 🚀

```powershell
git push -u origin main
```

Drücke **Enter** ✅

**Wichtig:** Es kann sein, dass Git dich fragt:
```
The authenticity of host 'github.com' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

**Tippe: `yes`** und drücke **Enter**

Dann kannst du gefragt werden nach deinem GitHub Password. **Gib dein GitHub Password ein** (du siehst nichts beim Tippen, das ist normal!) und drücke **Enter**.

**Erfolgreich?** Du siehst dann:
```
Enumerating objects: XX, done.
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), ...
To https://github.com/ctacont/Personal_Management_zencoder.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

---

## ✅ GitHub Release erstellen

Jetzt gehst du auf:
```
https://github.com/ctacont/Personal_Management_Vue3
```

1. **Oben auf der Seite** siehst du mehrere Tabs: "Code", "Issues", "Pull requests", **"Releases"**
2. Klick auf **"Releases"**
3. Klick auf **"Create a new release"** Button
4. Gib folgende Infos ein:

   - **Tag version:** `v1.0.0`
   - **Release title:** `Personal Management System v1.0.0`
   - **Description:** Kopiere folgendes:
   ```
   🎉 Erste Version!

   ## Features ✨
   - Dashboard mit Statistiken
   - Aufgabenverwaltung
   - Kalender & Termine
   - Notizen
   - Kontakte
   - Finanzen
   - Ziele
   - Wohlbefinden

   ## Installation 🚀
   1. Clone: git clone https://github.com/ctacont/Personal_Management_Vue3.git
   2. npm install
   3. npm run dev:all
   4. Open: http://localhost:5173

   (c) 2025 by Hasan Yüksel
   ```

5. Klick auf **"Publish release"**

**Fertig!** 🎊 Dein Projekt ist auf GitHub!

---

## 📋 Alle Befehle auf einen Blick (Copy-Paste)

```powershell
git config --global user.name "ctacont"
git config --global user.email "ctacont@freenet.de"
cd "c:\Users\lenovo\Documents\CODING\ZENCODER Projekte\Personal_Management_zencoder"
git init
git add .
git commit -m "Initial commit: Personal Management System v1.0.0"
git remote add origin https://github.com/ctacont/Personal_Management_Vue3.git
git branch -M main
git push -u origin main
```

---

## ❌ Falls etwas schiefgeht

**Fehler: "fatal: destination path already exists"?**
→ Das ist ok, der Ordner existiert ja schon

**Fehler: "Permission denied"?**
→ Starte PowerShell als Administrator neu

**Fehler: "fatal: not a git repository"?**
→ Starte den `git init` Befehl neu

**Alles zu schnell? 😅**
→ Frag mich! Sag mir welcher Schritt und welcher Fehler

---

**Du schaffst das!** 💪 Los geht's!
