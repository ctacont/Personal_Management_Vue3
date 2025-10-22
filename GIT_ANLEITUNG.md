# Git & GitHub - Anfänger Anleitung 📚

Keine Sorge! Wir machen das Schritt für Schritt. Diese Anleitung ist für absolute Anfänger.

## Was ist Git & GitHub?

- **Git** = Ein Programm, das deine Code-Änderungen speichert (lokal auf deinem Computer)
- **GitHub** = Eine Website, wo du dein Projekt hochladst und teilst (wie Dropbox für Code)

## Schritt 1: GitHub Account erstellen 🔐

**Wenn du noch keinen Account hast:**

1. Gehe auf https://github.com
2. Klick auf "Sign up" (oben rechts)
3. Gib ein: Email, Password, Username
4. Bestätige deine Email
5. Fertig! ✅

**Merke dir deinen GitHub Username** - du brauchst ihn später!

---

## Schritt 2: Neues Repository auf GitHub erstellen 🆕

Ein "Repository" ist ein Ordner für dein Projekt auf GitHub.

1. Melde dich auf GitHub an
2. Oben rechts → Klick auf dein Profilbild → "Your repositories"
3. Klick auf grünen Button "New"
4. Gib ein:
   - **Repository name**: `Personal_Management_zencoder`
   - **Description**: `Eine Personal-Management-App mit Vue 3`
   - **Public/Private**: Wähle "Public" (damit andere es sehen können)
   - Lass "Add .gitignore" und "Add a license" UNangehakt!
5. Klick auf "Create repository"

**Wichtig:** Du siehst jetzt eine Seite mit deinem Repository-Link:
```
https://github.com/DEIN_USERNAME/Personal_Management_zencoder.git
```

**Speichere diese URL ab!** 💾

---

## Schritt 3: Git konfigurieren ⚙️

Git muss wissen, wer du bist. Öffne die **PowerShell** und gib Folgendes ein:

```powershell
git config --global user.name "Hasan Yüksel"
```

Dann:
```powershell
git config --global user.email "deine@email.com"
```

(Ersetze `deine@email.com` mit deiner echten Email)

**Was macht das?**
- Git speichert deinen Namen und Email, damit man sieht, wer was ändert
- `--global` bedeutet: Gilt für alle deine Projekte

---

## Schritt 4: Dein Projekt mit Git vorbereiten 📦

Navigiere in deinen Projektordner:

```powershell
cd "c:\Users\lenovo\Documents\CODING\ZENCODER Projekte\Personal_Management_zencoder"
```

Dann gib ein:

```powershell
git init
```

**Was macht das?**
- Erstellt einen `.git` Ordner (unsichtbar)
- Git beginnt dein Projekt zu tracken
- Du siehst: `Initialized empty Git repository in ...`

---

## Schritt 5: Alle Dateien hinzufügen (Staging) 📝

```powershell
git add .
```

**Was macht das?**
- Der Punkt (`.`) bedeutet: "Alle Dateien"
- Git merkt sich: "Diese Dateien sollen Teil des nächsten Commits sein"
- Das passiert im "Staging Area" (Warteraum)

---

## Schritt 6: Erstes Snapshot machen (Commit) 📸

```powershell
git commit -m "Initial commit: Personal Management System v1.0.0"
```

**Was macht das?**
- `commit` = Speichert einen Snapshot deines Codes
- `-m` = Message (Nachricht)
- `"Initial commit: ..."` = Beschreibung was du machst
- Das ist wie ein Meilenstein, den man später wieder ansteuern kann

**Du siehst dann:**
```
[main (root-commit) abcdef123] Initial commit: Personal Management System v1.0.0
 XX files changed, XXXX insertions(+)
```

---

## Schritt 7: Dein lokales Projekt mit GitHub verbinden 🔗

Erinnere dich an die URL von **Schritt 2**?
```
https://github.com/DEIN_USERNAME/Personal_Management_zencoder.git
```

Gib jetzt ein (ERSETZE DEIN_USERNAME):

```powershell
git remote add origin https://github.com/DEIN_USERNAME/Personal_Management_zencoder.git
```

**Was macht das?**
- `remote` = Verbindung zu GitHub
- `add origin` = Gib diesem Ort einen Spitznamen ("origin")
- Damit weiß Git, wohin es hochladen soll

---

## Schritt 8: Zum main Branch wechseln 🌿

```powershell
git branch -M main
```

**Was macht das?**
- `branch` = Ein Entwicklungszweig
- `-M main` = Nennt den Hauptzweig "main"
- Das ist Standard bei GitHub

---

## Schritt 9: Code hochladen (Push) 🚀

```powershell
git push -u origin main
```

**Was macht das?**
- `push` = Hochladen zu GitHub
- `origin` = Die Zielverbindung (GitHub)
- `main` = Der Branch
- `-u` = Sagt Git: "Merke dir das als Standard"

**Erste Mal-Warnung:** Es kann sein, dass Git dich fragt:

```
The authenticity of host 'github.com' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

**Antworte: `yes`** und Enter drücken.

---

## Schritt 10: GitHub Release erstellen 🎉

Jetzt gehst du zu https://github.com/DEIN_USERNAME/Personal_Management_zencoder

1. Oben siehst du "Releases" → Klick drauf
2. Klick auf "Create a new release"
3. Gib ein:
   - **Tag version**: `v1.0.0`
   - **Release title**: `Personal Management System v1.0.0`
   - **Description**: Kopiere folgendes:
   ```
   🎉 Erste Version!

   ## Features
   - Dashboard mit Statistiken
   - Aufgabenverwaltung
   - Kalender & Termine
   - Notizen
   - Kontakte
   - Finanzen
   - Ziele
   - Wohlbefinden

   ## Installation
   1. Clone: git clone https://github.com/DEIN_USERNAME/Personal_Management_zencoder.git
   2. npm install
   3. npm run dev:all
   4. Open: http://localhost:5173

   Viel Spaß! 🚀
   ```
4. Klick auf "Publish release"

**Fertig!** 🎊 Dein Projekt ist jetzt auf GitHub!

---

## Übersicht aller Befehle (Quick Reference) ⚡

```powershell
# 1. Einmalig einrichten:
git config --global user.name "Hasan Yüksel"
git config --global user.email "deine@email.com"

# 2. Im Projektordner:
cd "c:\Users\lenovo\Documents\CODING\ZENCODER Projekte\Personal_Management_zencoder"

# 3. Git initialisieren:
git init

# 4. Dateien hinzufügen:
git add .

# 5. Commit erstellen:
git commit -m "Initial commit: Personal Management System v1.0.0"

# 6. Mit GitHub verbinden (DEIN_USERNAME ersetzen!):
git remote add origin https://github.com/DEIN_USERNAME/Personal_Management_zencoder.git

# 7. Main Branch:
git branch -M main

# 8. Hochladen:
git push -u origin main
```

---

## Was ist dein GitHub Username?

**Damit ich dir die exakten Befehle für DEIN Projekt geben kann, sag mir:**

Was ist dein GitHub Username?

Zum Beispiel: `hasan-yüksel` oder `hasan2025` etc.

Dann kann ich dir die exakte URL geben! 😊

---

## Fehler? Keine Sorge! 🆘

Schreib einfach, was passiert ist:
- Welchen Fehler siehst du?
- Bei welchem Schritt?
- Ich helfe dir! ✅

---

**Happy Coding!** 🎉
