// API Service für Kommunikation mit dem Backend
// Automatischer Fallback zu localStorage bei GitHub Pages
import { localStorageService } from './localStorage.js'

// Environment detection
const isGitHubPages = window.location.hostname.includes('github.io')
const isProduction = import.meta.env.MODE === 'production'

// API Base URL
const API_BASE_URL = 
  isGitHubPages 
    ? null  // GitHub Pages: use localStorage
    : isProduction
      ? '/api'  // Production with server: relative URL
      : 'http://localhost:3000/api'  // Development: localhost

// Service mode detection
let serviceMode = 'unknown'
let useLocalStorage = isGitHubPages

// Generic fetch helper with fallback
const fetchAPI = async (method, endpoint, data = null) => {
  // On GitHub Pages, always use localStorage
  if (useLocalStorage) {
    throw new Error('Using localStorage fallback')
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    serviceMode = 'server'
    return await response.json()
  } catch (error) {
    console.warn(`API Error [${method} ${endpoint}]:`, error.message)
    // Fallback to localStorage
    useLocalStorage = true
    serviceMode = 'localStorage'
    throw error
  }
}

// Service selector: returns server API or localStorage API
const getService = () => {
  if (useLocalStorage || isGitHubPages) {
    if (serviceMode === 'unknown') {
      serviceMode = 'localStorage'
      console.log('🔄 Using localStorage for data persistence (GitHub Pages mode)')
      localStorageService.init()
    }
    return localStorageService
  }
  return serverAPI
}

// Server API methods
const serverAPI = {
  // Health check
  checkHealth: () => fetchAPI('GET', '/health'),

  // Tasks
  getTasks: () => fetchAPI('GET', '/tasks'),
  addTask: (task) => fetchAPI('POST', '/tasks', task),
  updateTask: (id, task) => fetchAPI('PUT', `/tasks/${id}`, task),
  deleteTask: (id) => fetchAPI('DELETE', `/tasks/${id}`),

  // Events
  getEvents: () => fetchAPI('GET', '/events'),
  addEvent: (event) => fetchAPI('POST', '/events', event),
  updateEvent: (id, event) => fetchAPI('PUT', `/events/${id}`, event),
  deleteEvent: (id) => fetchAPI('DELETE', `/events/${id}`),

  // Notes
  getNotes: () => fetchAPI('GET', '/notes'),
  addNote: (note) => fetchAPI('POST', '/notes', note),
  updateNote: (id, note) => fetchAPI('PUT', `/notes/${id}`, note),
  deleteNote: (id) => fetchAPI('DELETE', `/notes/${id}`),

  // Contacts
  getContacts: () => fetchAPI('GET', '/contacts'),
  addContact: (contact) => fetchAPI('POST', '/contacts', contact),
  updateContact: (id, contact) => fetchAPI('PUT', `/contacts/${id}`, contact),
  deleteContact: (id) => fetchAPI('DELETE', `/contacts/${id}`),

  // Transactions
  getTransactions: () => fetchAPI('GET', '/transactions'),
  addTransaction: (transaction) => fetchAPI('POST', '/transactions', transaction),
  updateTransaction: (id, transaction) => fetchAPI('PUT', `/transactions/${id}`, transaction),
  deleteTransaction: (id) => fetchAPI('DELETE', `/transactions/${id}`),

  // Goals
  getGoals: () => fetchAPI('GET', '/goals'),
  addGoal: (goal) => fetchAPI('POST', '/goals', goal),
  updateGoal: (id, goal) => fetchAPI('PUT', `/goals/${id}`, goal),
  deleteGoal: (id) => fetchAPI('DELETE', `/goals/${id}`),

  // Wellbeing
  getWellbeing: () => fetchAPI('GET', '/wellbeing'),
  addSleepEntry: (entry) => fetchAPI('POST', '/wellbeing/sleep', entry),
  addMoodEntry: (entry) => fetchAPI('POST', '/wellbeing/mood', entry),
  addActivityEntry: (entry) => fetchAPI('POST', '/wellbeing/activity', entry)
}

// Export unified API service
export const apiService = {
  // Health check with automatic fallback detection
  async checkHealth() {
    try {
      if (isGitHubPages) {
        useLocalStorage = true
        return localStorageService.checkHealth()
      }
      
      const result = await serverAPI.checkHealth()
      serviceMode = 'server'
      console.log('🚀 Connected to server API')
      return result
    } catch (error) {
      useLocalStorage = true
      serviceMode = 'localStorage'
      console.log('🔄 Falling back to localStorage')
      localStorageService.init()
      return localStorageService.checkHealth()
    }
  },

  // Get current service mode
  getServiceMode: () => serviceMode,
  
  // Get service info
  getServiceInfo: () => ({
    mode: serviceMode,
    isGitHubPages,
    useLocalStorage,
    apiBaseUrl: API_BASE_URL
  }),

  // Unified API methods - automatically route to correct service
  getTasks: () => getService().getTasks(),
  addTask: (task) => getService().addTask(task),
  updateTask: (id, task) => getService().updateTask(id, task),
  deleteTask: (id) => getService().deleteTask(id),

  getEvents: () => getService().getEvents(),
  addEvent: (event) => getService().addEvent(event),
  updateEvent: (id, event) => getService().updateEvent(id, event),
  deleteEvent: (id) => getService().deleteEvent(id),

  getNotes: () => getService().getNotes(),
  addNote: (note) => getService().addNote(note),
  updateNote: (id, note) => getService().updateNote(id, note),
  deleteNote: (id) => getService().deleteNote(id),

  getContacts: () => getService().getContacts(),
  addContact: (contact) => getService().addContact(contact),
  updateContact: (id, contact) => getService().updateContact(id, contact),
  deleteContact: (id) => getService().deleteContact(id),

  getTransactions: () => getService().getTransactions(),
  addTransaction: (transaction) => getService().addTransaction(transaction),
  updateTransaction: (id, transaction) => getService().updateTransaction(id, transaction),
  deleteTransaction: (id) => getService().deleteTransaction(id),

  getGoals: () => getService().getGoals(),
  addGoal: (goal) => getService().addGoal(goal),
  updateGoal: (id, goal) => getService().updateGoal(id, goal),
  deleteGoal: (id) => getService().deleteGoal(id),

  getWellbeing: () => getService().getWellbeing(),
  addSleepEntry: (entry) => getService().addSleepEntry(entry),
  addMoodEntry: (entry) => getService().addMoodEntry(entry),
  addActivityEntry: (entry) => getService().addActivityEntry(entry)
}
