<script setup>
import { computed, reactive, ref } from 'vue'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'
import { usePersonalStore } from '../stores/personal'

const store = usePersonalStore()
const editingTask = ref(null)

const filters = reactive({
  status: 'Alle',
  priority: 'Alle',
  category: 'Alle'
})

const priorities = ['Alle', 'Hoch', 'Mittel', 'Niedrig']

const statusOptions = ['Alle', 'Offen', 'In Bearbeitung', 'Erledigt', 'Überfällig']

const categories = computed(() => ['Alle', ...new Set(store.tasks.map((task) => task.category))])

const search = ref('')

const filteredTasks = computed(() =>
  store.tasks.filter((task) => {
    const matchStatus = filters.status === 'Alle' || task.status === filters.status
    const matchPriority = filters.priority === 'Alle' || task.priority === filters.priority
    const matchCategory = filters.category === 'Alle' || task.category === filters.category
    const matchSearch =
      search.value.length === 0 ||
      task.title.toLowerCase().includes(search.value.toLowerCase()) ||
      task.description.toLowerCase().includes(search.value.toLowerCase())
    return matchStatus && matchPriority && matchCategory && matchSearch
  })
)

const newTask = reactive({
  title: '',
  description: '',
  category: '',
  priority: 'Mittel',
  dueDate: format(new Date(), 'yyyy-MM-dd')
})

const createTask = async () => {
  if (!newTask.title) return
  await store.addTask({
    id: `t${Date.now()}`,
    title: newTask.title,
    description: newTask.description,
    dueDate: newTask.dueDate,
    category: newTask.category || 'Allgemein',
    priority: newTask.priority,
    status: 'Offen',
    progress: 0,
    tags: []
  })
  newTask.title = ''
  newTask.description = ''
  newTask.category = ''
  newTask.priority = 'Mittel'
  newTask.dueDate = format(new Date(), 'yyyy-MM-dd')
}

const editTask = (task) => {
  editingTask.value = { ...task }
}

const saveEdit = async () => {
  if (editingTask.value && editingTask.value.title) {
    await store.updateTask(editingTask.value.id, editingTask.value)
    editingTask.value = null
  }
}

const deleteTask = async (id) => {
  if (confirm('Task wirklich löschen?')) {
    await store.deleteTask(id)
  }
}
</script>

<template>
  <div class="space-y-8">
    <section class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Neue Aufgabe hinzufügen</h2>
        <form class="mt-6 grid gap-4" @submit.prevent="createTask">
          <div class="grid gap-2">
            <label class="text-sm font-medium text-gray-600">Titel</label>
            <input v-model="newTask.title" class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none" placeholder="Aufgabe" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium text-gray-600">Beschreibung</label>
            <textarea v-model="newTask.description" rows="3" class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none" placeholder="Details"></textarea>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="grid gap-2">
              <label class="text-sm font-medium text-gray-600">Kategorie</label>
              <input v-model="newTask.category" class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none" placeholder="z. B. Arbeit" />
            </div>
            <div class="grid gap-2">
              <label class="text-sm font-medium text-gray-600">Priorität</label>
              <select v-model="newTask.priority" class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none">
                <option value="Hoch">Hoch</option>
                <option value="Mittel">Mittel</option>
                <option value="Niedrig">Niedrig</option>
              </select>
            </div>
            <div class="grid gap-2">
              <label class="text-sm font-medium text-gray-600">Fällig am</label>
              <input v-model="newTask.dueDate" type="date" class="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none" />
            </div>
          </div>
          <button type="submit" class="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600">Aufgabe erstellen</button>
        </form>
      </div>
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Statusübersicht</h2>
        <ul class="mt-6 space-y-4 text-sm text-gray-600">
          <li class="flex items-center justify-between">
            <span>In Bearbeitung</span>
            <span class="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-600">
              {{ store.tasks.filter((task) => task.status === 'In Bearbeitung').length }}
            </span>
          </li>
          <li class="flex items-center justify-between">
            <span>Offen</span>
            <span class="rounded-full bg-yellow-50 px-3 py-1 font-semibold text-yellow-600">
              {{ store.tasks.filter((task) => task.status === 'Offen').length }}
            </span>
          </li>
          <li class="flex items-center justify-between">
            <span>Überfällig</span>
            <span class="rounded-full bg-red-50 px-3 py-1 font-semibold text-red-600">
              {{ store.tasks.filter((task) => task.status === 'Überfällig').length }}
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-3">
          <input v-model="search" placeholder="Suche" class="rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none" />
          <select v-model="filters.status" class="rounded-full border border-gray-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 focus:border-primary-400 focus:outline-none">
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <select v-model="filters.priority" class="rounded-full border border-gray-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 focus:border-primary-400 focus:outline-none">
            <option v-for="option in priorities" :key="option" :value="option">{{ option }}</option>
          </select>
          <select v-model="filters.category" class="rounded-full border border-gray-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-600 focus:border-primary-400 focus:outline-none">
            <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <p class="text-sm text-gray-500">{{ filteredTasks.length }} Aufgaben gefunden</p>
      </div>
      <div class="mt-6 overflow-hidden rounded-2xl border border-gray-100">
        <table class="min-w-full divide-y divide-gray-100 text-sm">
          <thead class="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Aufgabe</th>
              <th class="px-6 py-3 text-left font-semibold">Kategorie</th>
              <th class="px-6 py-3 text-left font-semibold">Fällig</th>
              <th class="px-6 py-3 text-left font-semibold">Priorität</th>
              <th class="px-6 py-3 text-left font-semibold">Fortschritt</th>
              <th class="px-6 py-3 text-left font-semibold">Aktionen</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white text-gray-700">
            <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <p class="font-medium text-gray-900">{{ task.title }}</p>
                <p class="text-xs text-gray-500">{{ task.description }}</p>
              </td>
              <td class="px-6 py-4">{{ task.category }}</td>
              <td class="px-6 py-4">{{ format(parseISO(task.dueDate), 'dd.MM.yyyy', { locale: de }) }}</td>
              <td class="px-6 py-4">
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
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                    <div class="h-full rounded-full bg-primary-500" :style="{ width: `${task.progress}%` }"></div>
                  </div>
                  <span class="text-xs text-gray-500">{{ task.progress }}%</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button @click="editTask(task)" class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Bearbeiten
                  </button>
                  <button @click="deleteTask(task.id)" class="text-red-600 hover:text-red-800 font-medium text-sm">
                    Löschen
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Edit Modal -->
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
        </div>
        <div class="flex gap-3 mt-8">
          <button @click="saveEdit" class="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium">
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
