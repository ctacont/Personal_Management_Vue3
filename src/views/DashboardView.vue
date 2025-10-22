<script setup>
import { computed, ref } from 'vue'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'
import { usePersonalStore } from '../stores/personal'

const store = usePersonalStore()
const selectedEvent = ref(null)
const editingEvent = ref(null)
const selectedTask = ref(null)
const editingTask = ref(null)

const todayTasks = computed(() =>
  store.tasks.filter((task) => task.dueDate === format(new Date(), 'yyyy-MM-dd')).slice(0, 3)
)

const upcomingEvents = computed(() =>
  store.events
    .map((event) => {
      const date = new Date(`${event.date}T${event.time}`)
      return { ...event, startDate: date }
    })
    .sort((a, b) => a.startDate - b.startDate)
    .slice(0, 4)
)

const budgetUsage = computed(() => {
  // Fallback für budgets falls nicht vorhanden
  return []
})

const activeGoals = computed(() => store.goals.slice(0, 3))

const openEventDetail = (event) => {
  selectedEvent.value = event
}

const editEvent = (event) => {
  editingEvent.value = { ...event }
}

const saveEdit = async () => {
  if (editingEvent.value && editingEvent.value.title) {
    await store.updateEvent(editingEvent.value.id, editingEvent.value)
    editingEvent.value = null
    selectedEvent.value = null
  }
}

const deleteEvent = async (id) => {
  if (confirm('Termin wirklich löschen?')) {
    await store.deleteEvent(id)
    selectedEvent.value = null
  }
}

const openTaskDetail = (task) => {
  selectedTask.value = task
}

const editTask = (task) => {
  editingTask.value = { ...task }
}

const saveTaskEdit = async () => {
  if (editingTask.value && editingTask.value.title) {
    await store.updateTask(editingTask.value.id, editingTask.value)
    editingTask.value = null
    selectedTask.value = null
  }
}

const deleteTask = async (id) => {
  if (confirm('Task wirklich löschen?')) {
    await store.deleteTask(id)
    selectedTask.value = null
  }
}
</script>

<template>
  <div class="space-y-8">
    <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Offene Aufgaben</p>
        <p class="mt-3 text-3xl font-semibold text-gray-900">{{ store.openTasksCount }}</p>
        <p class="mt-2 text-sm text-primary-600">Priorisiere deine nächsten Schritte</p>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Anstehende Termine</p>
        <p class="mt-3 text-3xl font-semibold text-gray-900">{{ store.upcomingEventsCount }}</p>
        <p class="mt-2 text-sm text-primary-600">Bleib organisiert und pünktlich</p>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Finanzieller Überblick</p>
        <p class="mt-3 text-3xl font-semibold text-gray-900">{{ store.balance.toLocaleString('de-DE') }} €</p>
        <p class="mt-2 text-sm text-primary-600">Differenz aus Einnahmen und Ausgaben</p>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Stimmungsindex</p>
        <p class="mt-3 text-3xl font-semibold text-gray-900">{{ store.moodAverage.toFixed(1) }}</p>
        <p class="mt-2 text-sm text-primary-600">Durchschnitt der letzten Einträge</p>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Fokus Aufgaben</h2>
          <router-link to="/aufgaben" class="text-sm text-primary-600">Alle ansehen</router-link>
        </div>
        <ul class="mt-5 space-y-4">
          <li
            v-for="task in todayTasks"
            :key="task.id"
            @click="openTaskDetail(task)"
            class="flex flex-col gap-2 rounded-2xl border border-gray-100 p-4 cursor-pointer hover:bg-primary-50 transition-colors"
          >
            <div class="flex items-center justify-between">
              <p class="text-base font-medium text-gray-900">{{ task.title }}</p>
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="{
                  'bg-red-100 text-red-600': task.priority === 'Hoch',
                  'bg-yellow-100 text-yellow-600': task.priority === 'Mittel',
                  'bg-green-100 text-green-600': task.priority === 'Niedrig'
                }"
              >
                {{ task.priority }}
              </span>
            </div>
            <p class="text-sm text-gray-500">{{ task.description }}</p>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Fällig: {{ format(parseISO(task.dueDate), 'dd.MM.yyyy', { locale: de }) }}</span>
              <span>Status: {{ task.status }}</span>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div class="h-full rounded-full bg-primary-500" :style="{ width: `${task.progress}%` }"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Nächste Termine</h2>
          <router-link to="/kalender" class="text-sm text-primary-600">Kalender</router-link>
        </div>
        <ul class="mt-5 space-y-4">
          <li
            v-for="event in upcomingEvents"
            :key="event.id"
            @click="openEventDetail(event)"
            class="flex items-center justify-between rounded-2xl border border-gray-100 p-4 cursor-pointer hover:bg-primary-50 transition-colors"
          >
            <div>
              <p class="text-base font-medium text-gray-900">{{ event.title }}</p>
              <p class="text-sm text-gray-500">
                {{ format(event.startDate, 'EEEE, dd.MM. HH:mm', { locale: de }) }} · {{ event.location }}
              </p>
            </div>
            <span class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600">
              {{ event.category }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-3">
      <div v-if="budgetUsage.length > 0" class="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Budgetnutzung</h2>
          <router-link to="/finanzen" class="text-sm text-primary-600">Finanzen</router-link>
        </div>
        <ul class="mt-6 space-y-4">
          <li
            v-for="budget in budgetUsage"
            :key="budget.id"
            class="rounded-2xl border border-gray-100 p-4"
          >
            <div class="flex items-center justify-between">
              <p class="text-base font-medium text-gray-900">{{ budget.category }}</p>
              <p class="text-sm font-semibold text-gray-500">{{ budget.spent }} € / {{ budget.limit }} €</p>
            </div>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div class="h-full rounded-full bg-primary-500" :style="{ width: `${budget.percent}%` }"></div>
            </div>
          </li>
        </ul>
      </div>
      <div :class="[budgetUsage.length > 0 ? '' : 'xl:col-span-2']" class="rounded-3xl bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Aktive Ziele</h2>
          <router-link to="/ziele" class="text-sm text-primary-600">Ziele</router-link>
        </div>
        <ul class="mt-6 space-y-4">
          <li
            v-for="goal in activeGoals"
            :key="goal.id"
            class="rounded-2xl border border-gray-100 p-4"
          >
            <p class="text-base font-medium text-gray-900">{{ goal.title }}</p>
            <p class="text-sm text-gray-500">Kategorie: {{ goal.category }}</p>
            <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-primary-100">
              <div class="h-full rounded-full bg-primary-500" :style="{ width: `${goal.progress}%` }"></div>
            </div>
            <p class="mt-2 text-xs text-gray-400">Fällig bis {{ format(parseISO(goal.deadline), 'dd.MM.yyyy', { locale: de }) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Event Detail Modal -->
    <div v-if="selectedEvent && !editingEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedEvent.title }}</h3>
            <p class="text-gray-600 mt-2">{{ selectedEvent.location }}</p>
          </div>
          <span class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600">
            {{ selectedEvent.category }}
          </span>
        </div>

        <div class="space-y-4 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-500">Datum</label>
              <p class="text-lg font-semibold text-gray-900">{{ format(new Date(`${selectedEvent.date}T${selectedEvent.time}`), 'dd. MMMM yyyy', { locale: de }) }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Uhrzeit</label>
              <p class="text-lg font-semibold text-gray-900">{{ selectedEvent.time }}</p>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Beschreibung</label>
            <p class="text-gray-700 mt-1">{{ selectedEvent.description }}</p>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="editEvent(selectedEvent)" class="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium">
            Bearbeiten
          </button>
          <button @click="deleteEvent(selectedEvent.id)" class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium">
            Löschen
          </button>
          <button @click="selectedEvent = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Schließen
          </button>
        </div>
      </div>
    </div>

    <!-- Event Edit Modal -->
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
            <label class="text-sm font-medium text-gray-700 block mb-2">Ort</label>
            <input v-model="editingEvent.location" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Beschreibung</label>
            <textarea v-model="editingEvent.description" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-8">
          <button @click="saveEdit" class="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium">
            Speichern
          </button>
          <button @click="editingEvent = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Abbrechen
          </button>
        </div>
      </div>
    </div>

    <!-- Task Detail Modal -->
    <div v-if="selectedTask && !editingTask" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedTask.title }}</h3>
            <p class="text-gray-600 mt-2">{{ selectedTask.category }}</p>
          </div>
          <span
            class="rounded-full px-3 py-1 text-xs font-semibold"
            :class="{
              'bg-red-100 text-red-600': selectedTask.priority === 'Hoch',
              'bg-yellow-100 text-yellow-600': selectedTask.priority === 'Mittel',
              'bg-green-100 text-green-600': selectedTask.priority === 'Niedrig'
            }"
          >
            {{ selectedTask.priority }}
          </span>
        </div>

        <div class="space-y-4 mb-6">
          <div>
            <label class="text-sm font-medium text-gray-500">Beschreibung</label>
            <p class="text-gray-700 mt-1">{{ selectedTask.description }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-500">Fällig am</label>
              <p class="text-lg font-semibold text-gray-900">{{ format(parseISO(selectedTask.dueDate), 'dd.MM.yyyy', { locale: de }) }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Status</label>
              <p class="text-lg font-semibold text-gray-900">{{ selectedTask.status }}</p>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Fortschritt</label>
            <div class="flex items-center gap-3 mt-1">
              <div class="flex-1 h-2 overflow-hidden rounded-full bg-gray-100">
                <div class="h-full rounded-full bg-primary-500" :style="{ width: `${selectedTask.progress}%` }"></div>
              </div>
              <span class="text-sm font-semibold text-gray-900">{{ selectedTask.progress }}%</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="editTask(selectedTask)" class="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium">
            Bearbeiten
          </button>
          <button @click="deleteTask(selectedTask.id)" class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium">
            Löschen
          </button>
          <button @click="selectedTask = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Schließen
          </button>
        </div>
      </div>
    </div>

    <!-- Task Edit Modal -->
    <div v-if="editingTask" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h3 class="text-2xl font-bold mb-6">Task bearbeiten</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Titel</label>
            <input v-model="editingTask.title" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Beschreibung</label>
            <textarea v-model="editingTask.description" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Kategorie</label>
              <input v-model="editingTask.category" class="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Priorität</label>
              <select v-model="editingTask.priority" class="w-full px-4 py-2 border rounded-lg">
                <option>Hoch</option>
                <option>Mittel</option>
                <option>Niedrig</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Fällig am</label>
              <input v-model="editingTask.dueDate" type="date" class="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Status</label>
              <select v-model="editingTask.status" class="w-full px-4 py-2 border rounded-lg">
                <option>Offen</option>
                <option>In Bearbeitung</option>
                <option>Erledigt</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Fortschritt (%)</label>
            <input v-model.number="editingTask.progress" type="number" min="0" max="100" class="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>
        <div class="flex gap-3 mt-8">
          <button @click="saveTaskEdit" class="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium">
            Speichern
          </button>
          <button @click="editingTask = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
