import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from dist (Vue build output)
app.use(express.static(path.join(__dirname, 'dist')))

// Data directory path
const dataDir = path.join(__dirname, 'data')

// Helper function to ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Initialize with default test data
const initializeDefaultData = async () => {
  const defaultData = {
    tasks: [
      {
        "id": "t1",
        "title": "Quartalsplanung vorbereiten",
        "description": "Präsentation für das Strategie-Meeting erstellen",
        "dueDate": "2025-10-24",
        "category": "Arbeit",
        "priority": "Hoch",
        "status": "In Bearbeitung",
        "progress": 70,
        "tags": ["Präsentation", "Management"]
      },
      {
        "id": "t2",
        "title": "Fitness-Check buchen",
        "description": "Termin im Fitnessstudio vereinbaren",
        "dueDate": "2025-10-26",
        "category": "Gesundheit",
        "priority": "Mittel",
        "status": "Offen",
        "progress": 10,
        "tags": ["Routine"]
      },
      {
        "id": "t3",
        "title": "Geburtstagsgeschenk besorgen",
        "description": "Geschenk für Mia organisieren",
        "dueDate": "2025-10-21",
        "category": "Privat",
        "priority": "Hoch",
        "status": "Überfällig",
        "progress": 0,
        "tags": ["Familie"]
      }
    ],
    events: [
      {
        "id": "e1",
        "title": "Yoga-Kurs",
        "date": "2025-10-22",
        "time": "18:00",
        "category": "Freizeit",
        "description": "Wöchentlicher Yoga-Kurs",
        "location": "Studio Balance"
      },
      {
        "id": "e2",
        "title": "Team Meeting",
        "date": "2025-10-23",
        "time": "14:30",
        "category": "Arbeit",
        "description": "Wöchentliches Team Sync",
        "location": "Conference Room A"
      }
    ],
    notes: [
      {
        "id": 1,
        "title": "Projektideen",
        "content": "- App für Terminmanagement\n- Dashboard für Analytics\n- Mobile Version",
        "createdAt": "2025-10-20"
      },
      {
        "id": 2,
        "title": "Einkaufsliste",
        "content": "- Milch\n- Brot\n- Käse\n- Tomaten",
        "createdAt": "2025-10-22"
      }
    ],
    contacts: [
      {
        "id": 1,
        "name": "Max Mustermann",
        "email": "max@example.com",
        "phone": "+49 123 456789",
        "company": "Tech Corp",
        "category": "Arbeit"
      },
      {
        "id": 2,
        "name": "Anna Schmidt",
        "email": "anna@example.com",
        "phone": "+49 987 654321",
        "company": "Design Studio",
        "category": "Freunde"
      }
    ],
    transactions: [
      {
        "id": 1,
        "type": "Einnahme",
        "category": "Gehalt",
        "amount": 3500,
        "date": "2025-10-20",
        "description": "Monatliches Gehalt"
      },
      {
        "id": 2,
        "type": "Ausgabe",
        "category": "Lebensmittel",
        "amount": 85.50,
        "date": "2025-10-22",
        "description": "Supermarkt"
      }
    ],
    goals: [
      {
        "id": 1,
        "title": "Fitness verbessern",
        "description": "3x pro Woche ins Gym gehen",
        "deadline": "2025-12-31",
        "progress": 45,
        "category": "Gesundheit"
      },
      {
        "id": 2,
        "title": "Programmier-Skills",
        "description": "Vue 3 & TypeScript lernen",
        "deadline": "2025-11-30",
        "progress": 75,
        "category": "Lernen"
      }
    ],
    wellbeing: {
      "sleepEntries": [
        { "id": 1, "date": "2025-10-20", "hours": 7.5, "quality": "Gut" },
        { "id": 2, "date": "2025-10-21", "hours": 6.5, "quality": "Mittel" }
      ],
      "moods": [
        { "id": 1, "date": "2025-10-20", "mood": "Glücklich", "energy": 8 },
        { "id": 2, "date": "2025-10-21", "mood": "Müde", "energy": 5 }
      ],
      "activities": [
        { "id": 1, "date": "2025-10-20", "activity": "Yoga", "duration": 60 }
      ]
    }
  }

  try {
    await writeJsonFile('tasks.json', { tasks: defaultData.tasks })
    await writeJsonFile('events.json', { events: defaultData.events })
    await writeJsonFile('notes.json', { notes: defaultData.notes })
    await writeJsonFile('contacts.json', { contacts: defaultData.contacts })
    await writeJsonFile('transactions.json', { transactions: defaultData.transactions })
    await writeJsonFile('goals.json', { goals: defaultData.goals })
    await writeJsonFile('wellbeing.json', defaultData.wellbeing)
    console.log('✅ Default test data initialized')
  } catch (error) {
    console.error('❌ Error initializing default data:', error)
  }
}

// Helper function to get file path
const getFilePath = (filename) => path.join(dataDir, filename)

// Helper function to read JSON file
const readJsonFile = async (filename) => {
  try {
    const filePath = getFilePath(filename)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return {}
  }
}

// Helper function to write JSON file
const writeJsonFile = async (filename, data) => {
  try {
    const filePath = getFilePath(filename)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    return false
  }
}

// ============= TASKS =============
app.get('/api/tasks', async (req, res) => {
  const data = await readJsonFile('tasks.json')
  res.json(data.tasks || [])
})

app.post('/api/tasks', async (req, res) => {
  try {
    const data = await readJsonFile('tasks.json')
    if (!data || !data.tasks) {
      const newData = { tasks: [req.body] }
      await writeJsonFile('tasks.json', newData)
      res.json({ success: true, task: req.body })
    } else {
      data.tasks.push(req.body)
      const success = await writeJsonFile('tasks.json', data)
      res.json({ success, task: req.body })
    }
  } catch (error) {
    console.error('Error adding task:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/tasks/:id', async (req, res) => {
  const data = await readJsonFile('tasks.json')
  const index = data.tasks.findIndex(t => t.id === req.params.id)
  if (index !== -1) {
    data.tasks[index] = req.body
    await writeJsonFile('tasks.json', data)
  }
  res.json({ success: index !== -1, task: req.body })
})

app.delete('/api/tasks/:id', async (req, res) => {
  const data = await readJsonFile('tasks.json')
  data.tasks = data.tasks.filter(t => t.id !== req.params.id)
  await writeJsonFile('tasks.json', data)
  res.json({ success: true })
})

// ============= EVENTS =============
app.get('/api/events', async (req, res) => {
  const data = await readJsonFile('events.json')
  res.json(data.events || [])
})

app.post('/api/events', async (req, res) => {
  try {
    const data = await readJsonFile('events.json')
    if (!data || !data.events) {
      const newData = { events: [req.body] }
      await writeJsonFile('events.json', newData)
      res.json({ success: true, event: req.body })
    } else {
      data.events.push(req.body)
      await writeJsonFile('events.json', data)
      res.json({ success: true, event: req.body })
    }
  } catch (error) {
    console.error('Error adding event:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/events/:id', async (req, res) => {
  const data = await readJsonFile('events.json')
  const index = data.events.findIndex(e => e.id === req.params.id || e.id === parseInt(req.params.id))
  if (index !== -1) {
    data.events[index] = req.body
    await writeJsonFile('events.json', data)
  }
  res.json({ success: index !== -1, event: req.body })
})

app.delete('/api/events/:id', async (req, res) => {
  const data = await readJsonFile('events.json')
  data.events = data.events.filter(e => e.id !== req.params.id && e.id !== parseInt(req.params.id))
  await writeJsonFile('events.json', data)
  res.json({ success: true })
})

// ============= NOTES =============
app.get('/api/notes', async (req, res) => {
  const data = await readJsonFile('notes.json')
  res.json(data.notes || [])
})

app.post('/api/notes', async (req, res) => {
  try {
    const data = await readJsonFile('notes.json')
    if (!data || !data.notes) {
      const newData = { notes: [req.body] }
      await writeJsonFile('notes.json', newData)
      res.json({ success: true, note: req.body })
    } else {
      data.notes.push(req.body)
      await writeJsonFile('notes.json', data)
      res.json({ success: true, note: req.body })
    }
  } catch (error) {
    console.error('Error adding note:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/notes/:id', async (req, res) => {
  const data = await readJsonFile('notes.json')
  const index = data.notes.findIndex(n => n.id === parseInt(req.params.id))
  if (index !== -1) {
    data.notes[index] = req.body
    await writeJsonFile('notes.json', data)
  }
  res.json({ success: index !== -1, note: req.body })
})

app.delete('/api/notes/:id', async (req, res) => {
  const data = await readJsonFile('notes.json')
  data.notes = data.notes.filter(n => n.id !== parseInt(req.params.id))
  await writeJsonFile('notes.json', data)
  res.json({ success: true })
})

// ============= CONTACTS =============
app.get('/api/contacts', async (req, res) => {
  const data = await readJsonFile('contacts.json')
  res.json(data.contacts || [])
})

app.post('/api/contacts', async (req, res) => {
  try {
    const data = await readJsonFile('contacts.json')
    if (!data || !data.contacts) {
      const newData = { contacts: [req.body] }
      await writeJsonFile('contacts.json', newData)
      res.json({ success: true, contact: req.body })
    } else {
      data.contacts.push(req.body)
      await writeJsonFile('contacts.json', data)
      res.json({ success: true, contact: req.body })
    }
  } catch (error) {
    console.error('Error adding contact:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/contacts/:id', async (req, res) => {
  const data = await readJsonFile('contacts.json')
  const index = data.contacts.findIndex(c => c.id === parseInt(req.params.id))
  if (index !== -1) {
    data.contacts[index] = req.body
    await writeJsonFile('contacts.json', data)
  }
  res.json({ success: index !== -1, contact: req.body })
})

app.delete('/api/contacts/:id', async (req, res) => {
  const data = await readJsonFile('contacts.json')
  data.contacts = data.contacts.filter(c => c.id !== parseInt(req.params.id))
  await writeJsonFile('contacts.json', data)
  res.json({ success: true })
})

// ============= TRANSACTIONS =============
app.get('/api/transactions', async (req, res) => {
  const data = await readJsonFile('transactions.json')
  res.json(data.transactions || [])
})

app.post('/api/transactions', async (req, res) => {
  try {
    const data = await readJsonFile('transactions.json')
    if (!data || !data.transactions) {
      const newData = { transactions: [req.body] }
      await writeJsonFile('transactions.json', newData)
      res.json({ success: true, transaction: req.body })
    } else {
      data.transactions.push(req.body)
      await writeJsonFile('transactions.json', data)
      res.json({ success: true, transaction: req.body })
    }
  } catch (error) {
    console.error('Error adding transaction:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/transactions/:id', async (req, res) => {
  const data = await readJsonFile('transactions.json')
  const index = data.transactions.findIndex(t => t.id === parseInt(req.params.id))
  if (index !== -1) {
    data.transactions[index] = req.body
    await writeJsonFile('transactions.json', data)
  }
  res.json({ success: index !== -1, transaction: req.body })
})

app.delete('/api/transactions/:id', async (req, res) => {
  const data = await readJsonFile('transactions.json')
  data.transactions = data.transactions.filter(t => t.id !== parseInt(req.params.id))
  await writeJsonFile('transactions.json', data)
  res.json({ success: true })
})

// ============= GOALS =============
app.get('/api/goals', async (req, res) => {
  const data = await readJsonFile('goals.json')
  res.json(data.goals || [])
})

app.post('/api/goals', async (req, res) => {
  try {
    const data = await readJsonFile('goals.json')
    if (!data || !data.goals) {
      const newData = { goals: [req.body] }
      await writeJsonFile('goals.json', newData)
      res.json({ success: true, goal: req.body })
    } else {
      data.goals.push(req.body)
      await writeJsonFile('goals.json', data)
      res.json({ success: true, goal: req.body })
    }
  } catch (error) {
    console.error('Error adding goal:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/goals/:id', async (req, res) => {
  const data = await readJsonFile('goals.json')
  const index = data.goals.findIndex(g => g.id === parseInt(req.params.id))
  if (index !== -1) {
    data.goals[index] = req.body
    await writeJsonFile('goals.json', data)
  }
  res.json({ success: index !== -1, goal: req.body })
})

app.delete('/api/goals/:id', async (req, res) => {
  const data = await readJsonFile('goals.json')
  data.goals = data.goals.filter(g => g.id !== parseInt(req.params.id))
  await writeJsonFile('goals.json', data)
  res.json({ success: true })
})

// ============= WELLBEING =============
app.get('/api/wellbeing', async (req, res) => {
  const data = await readJsonFile('wellbeing.json')
  res.json(data || {})
})

app.post('/api/wellbeing/sleep', async (req, res) => {
  const data = await readJsonFile('wellbeing.json')
  if (!data.sleepEntries) data.sleepEntries = []
  data.sleepEntries.push(req.body)
  await writeJsonFile('wellbeing.json', data)
  res.json({ success: true, entry: req.body })
})

app.post('/api/wellbeing/mood', async (req, res) => {
  const data = await readJsonFile('wellbeing.json')
  if (!data.moods) data.moods = []
  data.moods.push(req.body)
  await writeJsonFile('wellbeing.json', data)
  res.json({ success: true, entry: req.body })
})

app.post('/api/wellbeing/activity', async (req, res) => {
  const data = await readJsonFile('wellbeing.json')
  if (!data.activities) data.activities = []
  data.activities.push(req.body)
  await writeJsonFile('wellbeing.json', data)
  res.json({ success: true, entry: req.body })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Personal Management API is running' })
})

// Fallback: Serve index.html for all non-API routes (for Vue Router)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  }
})

// Start server
ensureDataDir().then(async () => {
  // Initialize with default test data on every start (for demo purposes)
  await initializeDefaultData()
  
  app.listen(PORT, () => {
    console.log(`✅ Personal Management API server running on http://localhost:${PORT}`)
    console.log(`📁 Data directory: ${dataDir}`)
    console.log(`🔄 Test data reset enabled - will reinitialize on server restart`)
  })
})
