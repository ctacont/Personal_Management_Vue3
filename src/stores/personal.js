import { defineStore } from 'pinia'
import { format, startOfDay } from 'date-fns'
import { de } from 'date-fns/locale'
import { apiService } from '../services/api'

const today = startOfDay(new Date())

export const usePersonalStore = defineStore('personal', {
  state: () => ({
    // Data
    tasks: [],
    events: [],
    notes: [],
    contacts: [],
    transactions: [],
    goals: [],
    sleepEntries: [],
    moods: [],
    activities: [],
    
    // Loading states
    loading: false,
    error: null,
    
    // API ready state
    apiReady: false
  }),

  getters: {
    openTasksCount: (state) => state.tasks.filter((task) => task.status !== 'Erledigt').length,
    
    upcomingEventsCount: (state) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      return state.events.filter(e => {
        const eventDate = new Date(e.date)
        return eventDate >= today && eventDate < nextWeek
      }).length
    },
    
    totalIncome: (state) => state.transactions
      .filter(t => t.type === 'Einnahme')
      .reduce((sum, t) => sum + t.amount, 0),
    
    totalExpenses: (state) => state.transactions
      .filter(t => t.type === 'Ausgabe')
      .reduce((sum, t) => sum + t.amount, 0),
    
    balance: (state) => {
      const income = state.transactions
        .filter(t => t.type === 'Einnahme')
        .reduce((sum, t) => sum + t.amount, 0)
      const expenses = state.transactions
        .filter(t => t.type === 'Ausgabe')
        .reduce((sum, t) => sum + t.amount, 0)
      return income - expenses
    },
    
    moodAverage: (state) => {
      if (state.moods.length === 0) return 0
      const sum = state.moods.reduce((acc, m) => acc + m.rating, 0)
      return Math.round((sum / state.moods.length) * 10) / 10
    },
    
    todayLabel: () => format(today, 'EEEE, dd.MM.yyyy', { locale: de })
  },

  actions: {
    // Initialize data from API
    async initializeData() {
      this.loading = true
      try {
        // Check API health
        await apiService.checkHealth()
        this.apiReady = true

        // Load all data
        await Promise.all([
          this.loadTasks(),
          this.loadEvents(),
          this.loadNotes(),
          this.loadContacts(),
          this.loadTransactions(),
          this.loadGoals(),
          this.loadWellbeing()
        ])
        
        this.error = null
      } catch (err) {
        this.error = 'API-Verbindung fehlgeschlagen. Verwende lokale Daten.'
        console.error('API Initialization Error:', err)
      } finally {
        this.loading = false
      }
    },

    // ============= TASKS =============
    async loadTasks() {
      try {
        this.tasks = await apiService.getTasks()
      } catch (err) {
        console.error('Error loading tasks:', err)
      }
    },

    async addTask(task) {
      try {
        await apiService.addTask(task)
        this.tasks.push(task)
      } catch (err) {
        console.error('Error adding task:', err)
      }
    },

    async updateTask(id, task) {
      try {
        await apiService.updateTask(id, task)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = task
        }
      } catch (err) {
        console.error('Error updating task:', err)
      }
    },

    async deleteTask(id) {
      try {
        await apiService.deleteTask(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        console.error('Error deleting task:', err)
      }
    },

    // ============= EVENTS =============
    async loadEvents() {
      try {
        this.events = await apiService.getEvents()
      } catch (err) {
        console.error('Error loading events:', err)
      }
    },

    async addEvent(event) {
      try {
        await apiService.addEvent(event)
        this.events.push(event)
      } catch (err) {
        console.error('Error adding event:', err)
      }
    },

    async updateEvent(id, event) {
      try {
        await apiService.updateEvent(id, event)
        const index = this.events.findIndex(e => e.id === id)
        if (index !== -1) {
          this.events[index] = event
        }
      } catch (err) {
        console.error('Error updating event:', err)
      }
    },

    async deleteEvent(id) {
      try {
        await apiService.deleteEvent(id)
        this.events = this.events.filter(e => e.id !== id)
      } catch (err) {
        console.error('Error deleting event:', err)
      }
    },

    // ============= NOTES =============
    async loadNotes() {
      try {
        this.notes = await apiService.getNotes()
      } catch (err) {
        console.error('Error loading notes:', err)
      }
    },

    async addNote(note) {
      try {
        await apiService.addNote(note)
        this.notes.push(note)
      } catch (err) {
        console.error('Error adding note:', err)
      }
    },

    async updateNote(note) {
      try {
        await apiService.updateNote(note.id, note)
        const index = this.notes.findIndex(n => n.id === note.id)
        if (index !== -1) {
          this.notes[index] = note
        }
      } catch (err) {
        console.error('Error updating note:', err)
      }
    },

    async deleteNote(id) {
      try {
        await apiService.deleteNote(id)
        this.notes = this.notes.filter(n => n.id !== id)
      } catch (err) {
        console.error('Error deleting note:', err)
      }
    },

    // ============= CONTACTS =============
    async loadContacts() {
      try {
        this.contacts = await apiService.getContacts()
      } catch (err) {
        console.error('Error loading contacts:', err)
      }
    },

    async addContact(contact) {
      try {
        await apiService.addContact(contact)
        this.contacts.push(contact)
      } catch (err) {
        console.error('Error adding contact:', err)
      }
    },

    async updateContact(contact) {
      try {
        await apiService.updateContact(contact.id, contact)
        const index = this.contacts.findIndex(c => c.id === contact.id)
        if (index !== -1) {
          this.contacts[index] = contact
        }
      } catch (err) {
        console.error('Error updating contact:', err)
      }
    },

    async deleteContact(id) {
      try {
        await apiService.deleteContact(id)
        this.contacts = this.contacts.filter(c => c.id !== id)
      } catch (err) {
        console.error('Error deleting contact:', err)
      }
    },

    // ============= TRANSACTIONS =============
    async loadTransactions() {
      try {
        this.transactions = await apiService.getTransactions()
      } catch (err) {
        console.error('Error loading transactions:', err)
      }
    },

    async addTransaction(transaction) {
      try {
        await apiService.addTransaction(transaction)
        this.transactions.push(transaction)
      } catch (err) {
        console.error('Error adding transaction:', err)
      }
    },

    async updateTransaction(id, transaction) {
      try {
        await apiService.updateTransaction(id, transaction)
        const index = this.transactions.findIndex(t => t.id === id)
        if (index !== -1) {
          this.transactions[index] = transaction
        }
      } catch (err) {
        console.error('Error updating transaction:', err)
      }
    },

    async deleteTransaction(id) {
      try {
        await apiService.deleteTransaction(id)
        this.transactions = this.transactions.filter(t => t.id !== id)
      } catch (err) {
        console.error('Error deleting transaction:', err)
      }
    },

    // ============= GOALS =============
    async loadGoals() {
      try {
        this.goals = await apiService.getGoals()
      } catch (err) {
        console.error('Error loading goals:', err)
      }
    },

    async addGoal(goal) {
      try {
        await apiService.addGoal(goal)
        this.goals.push(goal)
      } catch (err) {
        console.error('Error adding goal:', err)
      }
    },

    async deleteGoal(id) {
      try {
        await apiService.deleteGoal(id)
        this.goals = this.goals.filter(g => g.id !== id)
      } catch (err) {
        console.error('Error deleting goal:', err)
      }
    },

    async updateGoalProgress(id, progress) {
      try {
        const goal = this.goals.find(g => g.id === id)
        if (goal) {
          const updated = { ...goal, progress: Math.min(progress, 100) }
          await apiService.updateGoal(id, updated)
          goal.progress = progress
        }
      } catch (err) {
        console.error('Error updating goal progress:', err)
      }
    },

    async completeGoal(id) {
      try {
        const goal = this.goals.find(g => g.id === id)
        if (goal) {
          const updated = { ...goal, progress: 100, completed: true }
          await apiService.updateGoal(id, updated)
          goal.progress = 100
          goal.completed = true
        }
      } catch (err) {
        console.error('Error completing goal:', err)
      }
    },

    // ============= WELLBEING =============
    async loadWellbeing() {
      try {
        const data = await apiService.getWellbeing()
        this.sleepEntries = data.sleepEntries || []
        this.moods = data.moods || []
        this.activities = data.activities || []
      } catch (err) {
        console.error('Error loading wellbeing data:', err)
      }
    },

    async addSleepEntry(entry) {
      try {
        await apiService.addSleepEntry(entry)
        this.sleepEntries.push(entry)
      } catch (err) {
        console.error('Error adding sleep entry:', err)
      }
    },

    async addMoodEntry(entry) {
      try {
        await apiService.addMoodEntry(entry)
        this.moods.push(entry)
      } catch (err) {
        console.error('Error adding mood entry:', err)
      }
    },

    async addActivity(entry) {
      try {
        await apiService.addActivityEntry(entry)
        this.activities.push(entry)
      } catch (err) {
        console.error('Error adding activity:', err)
      }
    }
  }
})