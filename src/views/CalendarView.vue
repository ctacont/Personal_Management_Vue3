<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">📅 Kalender</h1>
        <p class="text-gray-600">Verwalte Termine, Meetings und Erinnerungen</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Großer Kalender -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <button @click="previousMonth" class="p-2 hover:bg-gray-200 rounded">
                ← Vorheriger
              </button>
              <div class="flex items-center gap-4">
                <h2 class="text-2xl font-bold">{{ currentMonthYear }}</h2>
                <button @click="goToToday" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium text-sm">
                  Heute
                </button>
              </div>
              <button @click="nextMonth" class="p-2 hover:bg-gray-200 rounded">
                Nächster →
              </button>
            </div>

            <div class="grid grid-cols-7 gap-2 mb-2">
              <div v-for="day in ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']" :key="day" 
                   class="text-center font-bold text-gray-600 py-2">
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <button v-for="day in calendarDays" :key="day.id"
                      @click="selectDate(day)"
                      :class="[
                        'p-4 rounded-lg border-2 transition-all h-24',
                        day.date ? 'border-gray-200 hover:border-blue-500 cursor-pointer' : 'opacity-50',
                        isSelected(day) ? 'border-blue-500 bg-blue-50' : '',
                        isToday(day) ? 'border-green-500 bg-green-50' : ''
                      ]">
                <div class="text-right text-sm font-semibold">{{ day.date }}</div>
                <div v-if="day.events && day.events.length > 0" class="mt-1 text-xs text-blue-600">
                  {{ day.events.length }} {{ day.events.length === 1 ? 'Event' : 'Events' }}
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar: Event Input -->
        <div>
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-xl font-bold mb-4">Neuer Termin</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Datum</label>
                <input v-model="newEvent.date" type="date" class="w-full px-3 py-2 border rounded-lg">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Uhrzeit</label>
                <input v-model="newEvent.time" type="time" class="w-full px-3 py-2 border rounded-lg">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                <input v-model="newEvent.title" placeholder="z.B. Zahnarzt" class="w-full px-3 py-2 border rounded-lg">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                <select v-model="newEvent.category" class="w-full px-3 py-2 border rounded-lg">
                  <option>Arbeit</option>
                  <option>Persönlich</option>
                  <option>Gesundheit</option>
                  <option>Freizeit</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                <textarea v-model="newEvent.description" rows="3" class="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>

              <button @click="addEvent" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                Termin hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-2xl font-bold mb-4">📌 Kommende Termine</h3>
        <div v-if="upcomingEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="event in upcomingEvents.slice(0, 6)" :key="event.id"
               class="border-l-4 p-4 rounded bg-gray-50" :style="{ borderLeftColor: getCategoryColor(event.category) }">
            <div class="font-bold text-lg">{{ event.title }}</div>
            <div class="text-gray-600">{{ formatDate(event.date) }} um {{ event.time }}</div>
            <div class="text-sm text-gray-500 mt-2">{{ event.category }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h3 class="text-2xl font-bold mb-6">Termin bearbeiten</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Titel</label>
            <input v-model="editingEvent.title" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Datum</label>
              <input v-model="editingEvent.date" type="date" class="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Uhrzeit</label>
              <input v-model="editingEvent.time" type="time" class="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Kategorie</label>
            <select v-model="editingEvent.category" class="w-full px-4 py-2 border rounded-lg">
              <option>Arbeit</option>
              <option>Persönlich</option>
              <option>Gesundheit</option>
              <option>Freizeit</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Beschreibung</label>
            <textarea v-model="editingEvent.description" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-8">
          <button @click="saveEdit" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
            Speichern
          </button>
          <button @click="editingEvent = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Abbrechen
          </button>
        </div>
      </div>
    </div>

    <!-- Selected Date Events Modal -->
    <div v-if="selectedDate && selectedDateEvents.length > 0 && !editingEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 class="text-2xl font-bold mb-6">Termine am {{ formatDate(selectedDate) }}</h3>
        <div class="space-y-4">
          <div v-for="event in selectedDateEvents" :key="event.id" 
               class="border-l-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
               :style="{ borderLeftColor: getCategoryColor(event.category) }">
            <div class="flex items-start justify-between mb-2">
              <div>
                <div class="font-bold text-lg text-gray-900">{{ event.title }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ event.time }} Uhr</div>
              </div>
              <span class="text-xs font-semibold px-2 py-1 rounded" 
                    :style="{ backgroundColor: getCategoryColor(event.category) + '20', color: getCategoryColor(event.category) }">
                {{ event.category }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-3">{{ event.description }}</p>
            <p class="text-xs text-gray-500 mb-3">📍 {{ event.location }}</p>
            <div class="flex gap-2">
              <button @click="editEvent(event)" class="flex-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-1 px-2 rounded font-medium text-sm">
                Bearbeiten
              </button>
              <button @click="deleteEvent(event.id)" class="flex-1 text-red-600 hover:text-red-800 hover:bg-red-50 py-1 px-2 rounded font-medium text-sm">
                Löschen
              </button>
            </div>
          </div>
        </div>
        <button @click="selectedDate = null" class="w-full mt-6 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
          Schließen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { usePersonalStore } from '../stores/personal'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday as isDateToday, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export default {
  setup() {
    const store = usePersonalStore()
    const currentDate = ref(new Date())
    const selectedDate = ref(null)
    const editingEvent = ref(null)
    const newEvent = ref({
      date: '',
      time: '',
      title: '',
      category: 'Arbeit',
      description: ''
    })

    const currentMonthYear = computed(() => {
      return format(currentDate.value, 'MMMM yyyy', { locale: de })
    })

    const calendarDays = computed(() => {
      const start = startOfMonth(currentDate.value)
      const end = endOfMonth(currentDate.value)
      const days = eachDayOfInterval({ start, end })
      
      // Get days from previous month to fill the grid
      const firstDayOfWeek = start.getDay()
      const previousDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
      
      const allDays = []
      
      // Add empty days from previous month
      for (let i = previousDays; i > 0; i--) {
        const day = new Date(start)
        day.setDate(day.getDate() - i)
        allDays.push({ date: null, id: `prev-${i}` })
      }
      
      // Add current month days
      days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const dayEvents = store.events.filter(e => e.date === dateStr)
        allDays.push({
          date: day.getDate(),
          id: dateStr,
          fullDate: day,
          dateStr,
          events: dayEvents
        })
      })
      
      return allDays
    })

    const selectedDateEvents = computed(() => {
      if (!selectedDate.value) return []
      const dateStr = format(selectedDate.value, 'yyyy-MM-dd')
      return store.events.filter(e => e.date === dateStr)
    })

    const upcomingEvents = computed(() => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return store.events
        .filter(e => new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    })

    const previousMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
    }

    const nextMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
    }

    const goToToday = () => {
      currentDate.value = new Date()
      selectedDate.value = new Date()
      newEvent.value.date = format(new Date(), 'yyyy-MM-dd')
    }

    const selectDate = (day) => {
      if (day.fullDate) {
        selectedDate.value = day.fullDate
        newEvent.value.date = format(day.fullDate, 'yyyy-MM-dd')
      }
    }

    const isSelected = (day) => {
      return selectedDate.value && day.dateStr === format(selectedDate.value, 'yyyy-MM-dd')
    }

    const isToday = (day) => {
      return day.fullDate && isDateToday(day.fullDate)
    }

    const addEvent = () => {
      if (newEvent.value.date && newEvent.value.title) {
        store.addEvent({
          date: newEvent.value.date,
          time: newEvent.value.time || '09:00',
          title: newEvent.value.title,
          category: newEvent.value.category,
          description: newEvent.value.description,
          id: Date.now()
        })
        newEvent.value = { date: '', time: '', title: '', category: 'Arbeit', description: '' }
      }
    }

    const deleteEvent = (id) => {
      store.deleteEvent(id)
    }

    const editEvent = (event) => {
      editingEvent.value = { ...event }
    }

    const saveEdit = async () => {
      if (editingEvent.value && editingEvent.value.title) {
        await store.updateEvent(editingEvent.value.id, editingEvent.value)
        editingEvent.value = null
      }
    }

    const formatDate = (date) => {
      return format(new Date(date), 'dd. MMMM yyyy', { locale: de })
    }

    const getCategoryColor = (category) => {
      const colors = {
        'Arbeit': '#3b82f6',
        'Persönlich': '#8b5cf6',
        'Gesundheit': '#ec4899',
        'Freizeit': '#10b981'
      }
      return colors[category] || '#6b7280'
    }

    return {
      currentDate,
      currentMonthYear,
      calendarDays,
      selectedDate,
      selectedDateEvents,
      upcomingEvents,
      newEvent,
      editingEvent,
      previousMonth,
      nextMonth,
      goToToday,
      selectDate,
      isSelected,
      isToday,
      addEvent,
      deleteEvent,
      editEvent,
      saveEdit,
      formatDate,
      getCategoryColor
    }
  }
}
</script>
