// API Service für Kommunikation mit dem Backend
// Dynamische URL basierend auf Environment
const API_BASE_URL = 
  import.meta.env.MODE === 'production'
    ? '/api'  // Bei Production: relative URL (same host)
    : 'http://localhost:3000/api'  // Bei Development: localhost

// Generic fetch helper
const fetchAPI = async (method, endpoint, data = null) => {
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

    return await response.json()
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error)
    throw error
  }
}

// Export API methods
export const apiService = {
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
  addActivityEntry: (entry) => fetchAPI('POST', '/wellbeing/activity', entry),

  // Health check
  checkHealth: () => fetchAPI('GET', '/health')
}
