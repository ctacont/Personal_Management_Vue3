import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())

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
  const data = await readJsonFile('tasks.json')
  if (!data.tasks) data.tasks = []
  data.tasks.push(req.body)
  const success = await writeJsonFile('tasks.json', data)
  res.json({ success, task: req.body })
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
  const data = await readJsonFile('events.json')
  if (!data.events) data.events = []
  data.events.push(req.body)
  await writeJsonFile('events.json', data)
  res.json({ success: true, event: req.body })
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
  const data = await readJsonFile('notes.json')
  if (!data.notes) data.notes = []
  data.notes.push(req.body)
  await writeJsonFile('notes.json', data)
  res.json({ success: true, note: req.body })
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
  const data = await readJsonFile('contacts.json')
  if (!data.contacts) data.contacts = []
  data.contacts.push(req.body)
  await writeJsonFile('contacts.json', data)
  res.json({ success: true, contact: req.body })
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
  const data = await readJsonFile('transactions.json')
  if (!data.transactions) data.transactions = []
  data.transactions.push(req.body)
  await writeJsonFile('transactions.json', data)
  res.json({ success: true, transaction: req.body })
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
  const data = await readJsonFile('goals.json')
  if (!data.goals) data.goals = []
  data.goals.push(req.body)
  await writeJsonFile('goals.json', data)
  res.json({ success: true, goal: req.body })
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

// Start server
ensureDataDir().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Personal Management API server running on http://localhost:${PORT}`)
    console.log(`📁 Data directory: ${dataDir}`)
  })
})
