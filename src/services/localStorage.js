// LocalStorage Service für GitHub Pages Fallback
// Simuliert API-Verhalten mit localStorage

const STORAGE_KEYS = {
  tasks: 'pms_tasks',
  events: 'pms_events',
  notes: 'pms_notes',
  contacts: 'pms_contacts',
  transactions: 'pms_transactions',
  goals: 'pms_goals',
  wellbeing: 'pms_wellbeing',
  initialized: 'pms_initialized'
}

// Default data for initialization
const DEFAULT_DATA = {
  tasks: [
    {
      id: '1',
      title: 'Willkommen bei Personal Management!',
      description: 'Erkunde die verschiedenen Features der App',
      status: 'Offen',
      priority: 'Hoch',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Privat',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Neue Aufgabe erstellen',
      description: 'Klicke auf "Neue Aufgabe" um deine erste eigene Aufgabe zu erstellen',
      status: 'Offen',
      priority: 'Mittel',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Beruf',
      createdAt: new Date().toISOString()
    }
  ],
  events: [
    {
      id: '1',
      title: 'Demo Termin',
      description: 'Dies ist ein Beispiel-Termin',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      type: 'Meeting',
      createdAt: new Date().toISOString()
    }
  ],
  notes: [
    {
      id: '1',
      title: 'Willkommens-Notiz',
      content: 'Dies ist eine Beispiel-Notiz. Du kannst hier deine Gedanken und Ideen festhalten.',
      category: 'Allgemein',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  contacts: [
    {
      id: '1',
      name: 'Max Mustermann',
      email: 'max.mustermann@example.com',
      phone: '+49 123 456789',
      company: 'Beispiel GmbH',
      position: 'Geschäftsführer',
      category: 'Beruf',
      createdAt: new Date().toISOString()
    }
  ],
  transactions: [
    {
      id: '1',
      description: 'Beispiel Einnahme',
      amount: 1000,
      type: 'Einnahme',
      category: 'Gehalt',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      description: 'Beispiel Ausgabe',
      amount: 250,
      type: 'Ausgabe',
      category: 'Lebensmittel',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
  ],
  goals: [
    {
      id: '1',
      title: 'Vue 3 lernen',
      description: 'Moderne Frontend-Entwicklung mit Vue 3 meistern',
      category: 'Bildung',
      progress: 75,
      target: 100,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toISOString()
    }
  ],
  wellbeing: {
    sleepEntries: [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        hours: 7.5,
        quality: 4,
        notes: 'Guter Schlaf',
        createdAt: new Date().toISOString()
      }
    ],
    moods: [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        rating: 4,
        notes: 'Guter Tag',
        createdAt: new Date().toISOString()
      }
    ],
    activities: [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        type: 'Sport',
        duration: 30,
        description: 'Joggen im Park',
        createdAt: new Date().toISOString()
      }
    ]
  }
}

// Utility functions
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return null
  }
}

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error)
    return false
  }
}

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

// Initialize default data if first time
const initializeDefaultData = () => {
  const isInitialized = getFromStorage(STORAGE_KEYS.initialized)
  
  if (!isInitialized) {
    console.log('Initializing default data for GitHub Pages...')
    
    // Save all default data
    Object.keys(DEFAULT_DATA).forEach(key => {
      if (STORAGE_KEYS[key]) {
        saveToStorage(STORAGE_KEYS[key], DEFAULT_DATA[key])
      }
    })
    
    // Mark as initialized
    saveToStorage(STORAGE_KEYS.initialized, true)
    
    console.log('Default data initialized successfully!')
  }
}

// LocalStorage API Service
export const localStorageService = {
  // Initialize
  init: () => {
    initializeDefaultData()
  },

  // Health check (always returns OK for localStorage)
  checkHealth: () => Promise.resolve({ status: 'OK', storage: 'localStorage' }),

  // Tasks
  getTasks: () => Promise.resolve(getFromStorage(STORAGE_KEYS.tasks) || []),
  
  addTask: (task) => {
    const tasks = getFromStorage(STORAGE_KEYS.tasks) || []
    const newTask = { ...task, id: generateId(), createdAt: new Date().toISOString() }
    tasks.push(newTask)
    saveToStorage(STORAGE_KEYS.tasks, tasks)
    return Promise.resolve(newTask)
  },
  
  updateTask: (id, task) => {
    const tasks = getFromStorage(STORAGE_KEYS.tasks) || []
    const index = tasks.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks[index] = { ...task, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.tasks, tasks)
    }
    return Promise.resolve(task)
  },
  
  deleteTask: (id) => {
    const tasks = getFromStorage(STORAGE_KEYS.tasks) || []
    const filtered = tasks.filter(t => t.id !== id)
    saveToStorage(STORAGE_KEYS.tasks, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Events
  getEvents: () => Promise.resolve(getFromStorage(STORAGE_KEYS.events) || []),
  
  addEvent: (event) => {
    const events = getFromStorage(STORAGE_KEYS.events) || []
    const newEvent = { ...event, id: generateId(), createdAt: new Date().toISOString() }
    events.push(newEvent)
    saveToStorage(STORAGE_KEYS.events, events)
    return Promise.resolve(newEvent)
  },
  
  updateEvent: (id, event) => {
    const events = getFromStorage(STORAGE_KEYS.events) || []
    const index = events.findIndex(e => e.id === id)
    if (index !== -1) {
      events[index] = { ...event, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.events, events)
    }
    return Promise.resolve(event)
  },
  
  deleteEvent: (id) => {
    const events = getFromStorage(STORAGE_KEYS.events) || []
    const filtered = events.filter(e => e.id !== id)
    saveToStorage(STORAGE_KEYS.events, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Notes
  getNotes: () => Promise.resolve(getFromStorage(STORAGE_KEYS.notes) || []),
  
  addNote: (note) => {
    const notes = getFromStorage(STORAGE_KEYS.notes) || []
    const newNote = { ...note, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    notes.push(newNote)
    saveToStorage(STORAGE_KEYS.notes, notes)
    return Promise.resolve(newNote)
  },
  
  updateNote: (id, note) => {
    const notes = getFromStorage(STORAGE_KEYS.notes) || []
    const index = notes.findIndex(n => n.id === id)
    if (index !== -1) {
      notes[index] = { ...note, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.notes, notes)
    }
    return Promise.resolve(note)
  },
  
  deleteNote: (id) => {
    const notes = getFromStorage(STORAGE_KEYS.notes) || []
    const filtered = notes.filter(n => n.id !== id)
    saveToStorage(STORAGE_KEYS.notes, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Contacts
  getContacts: () => Promise.resolve(getFromStorage(STORAGE_KEYS.contacts) || []),
  
  addContact: (contact) => {
    const contacts = getFromStorage(STORAGE_KEYS.contacts) || []
    const newContact = { ...contact, id: generateId(), createdAt: new Date().toISOString() }
    contacts.push(newContact)
    saveToStorage(STORAGE_KEYS.contacts, contacts)
    return Promise.resolve(newContact)
  },
  
  updateContact: (id, contact) => {
    const contacts = getFromStorage(STORAGE_KEYS.contacts) || []
    const index = contacts.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts[index] = { ...contact, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.contacts, contacts)
    }
    return Promise.resolve(contact)
  },
  
  deleteContact: (id) => {
    const contacts = getFromStorage(STORAGE_KEYS.contacts) || []
    const filtered = contacts.filter(c => c.id !== id)
    saveToStorage(STORAGE_KEYS.contacts, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Transactions
  getTransactions: () => Promise.resolve(getFromStorage(STORAGE_KEYS.transactions) || []),
  
  addTransaction: (transaction) => {
    const transactions = getFromStorage(STORAGE_KEYS.transactions) || []
    const newTransaction = { ...transaction, id: generateId(), createdAt: new Date().toISOString() }
    transactions.push(newTransaction)
    saveToStorage(STORAGE_KEYS.transactions, transactions)
    return Promise.resolve(newTransaction)
  },
  
  updateTransaction: (id, transaction) => {
    const transactions = getFromStorage(STORAGE_KEYS.transactions) || []
    const index = transactions.findIndex(t => t.id === id)
    if (index !== -1) {
      transactions[index] = { ...transaction, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.transactions, transactions)
    }
    return Promise.resolve(transaction)
  },
  
  deleteTransaction: (id) => {
    const transactions = getFromStorage(STORAGE_KEYS.transactions) || []
    const filtered = transactions.filter(t => t.id !== id)
    saveToStorage(STORAGE_KEYS.transactions, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Goals
  getGoals: () => Promise.resolve(getFromStorage(STORAGE_KEYS.goals) || []),
  
  addGoal: (goal) => {
    const goals = getFromStorage(STORAGE_KEYS.goals) || []
    const newGoal = { ...goal, id: generateId(), createdAt: new Date().toISOString() }
    goals.push(newGoal)
    saveToStorage(STORAGE_KEYS.goals, goals)
    return Promise.resolve(newGoal)
  },
  
  updateGoal: (id, goal) => {
    const goals = getFromStorage(STORAGE_KEYS.goals) || []
    const index = goals.findIndex(g => g.id === id)
    if (index !== -1) {
      goals[index] = { ...goal, id, updatedAt: new Date().toISOString() }
      saveToStorage(STORAGE_KEYS.goals, goals)
    }
    return Promise.resolve(goal)
  },
  
  deleteGoal: (id) => {
    const goals = getFromStorage(STORAGE_KEYS.goals) || []
    const filtered = goals.filter(g => g.id !== id)
    saveToStorage(STORAGE_KEYS.goals, filtered)
    return Promise.resolve({ deleted: id })
  },

  // Wellbeing
  getWellbeing: () => Promise.resolve(getFromStorage(STORAGE_KEYS.wellbeing) || { sleepEntries: [], moods: [], activities: [] }),
  
  addSleepEntry: (entry) => {
    const wellbeing = getFromStorage(STORAGE_KEYS.wellbeing) || { sleepEntries: [], moods: [], activities: [] }
    const newEntry = { ...entry, id: generateId(), createdAt: new Date().toISOString() }
    wellbeing.sleepEntries.push(newEntry)
    saveToStorage(STORAGE_KEYS.wellbeing, wellbeing)
    return Promise.resolve(newEntry)
  },
  
  addMoodEntry: (entry) => {
    const wellbeing = getFromStorage(STORAGE_KEYS.wellbeing) || { sleepEntries: [], moods: [], activities: [] }
    const newEntry = { ...entry, id: generateId(), createdAt: new Date().toISOString() }
    wellbeing.moods.push(newEntry)
    saveToStorage(STORAGE_KEYS.wellbeing, wellbeing)
    return Promise.resolve(newEntry)
  },
  
  addActivityEntry: (entry) => {
    const wellbeing = getFromStorage(STORAGE_KEYS.wellbeing) || { sleepEntries: [], moods: [], activities: [] }
    const newEntry = { ...entry, id: generateId(), createdAt: new Date().toISOString() }
    wellbeing.activities.push(newEntry)
    saveToStorage(STORAGE_KEYS.wellbeing, wellbeing)
    return Promise.resolve(newEntry)
  }
}