<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">📝 Notizen</h1>
        <p class="text-gray-600">Halte Gedanken, Ideen und Protokolle fest</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-lg font-bold mb-4">Kategorien</h3>
            <div class="space-y-2 mb-6">
              <button v-for="cat in categories" :key="cat"
                      @click="selectedCategory = selectedCategory === cat ? null : cat"
                      :class="[
                        'w-full text-left px-4 py-2 rounded-lg transition-all',
                        selectedCategory === cat 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      ]">
                {{ cat }}
              </button>
            </div>

            <div class="border-t pt-6">
              <h4 class="font-bold mb-4">Neue Notiz</h4>
              <input v-model="newNote.title" placeholder="Titel" class="w-full px-3 py-2 border rounded-lg mb-3">
              <select v-model="newNote.category" class="w-full px-3 py-2 border rounded-lg mb-3">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
              </select>
              <textarea v-model="newNote.content" placeholder="Inhalt..." rows="6" class="w-full px-3 py-2 border rounded-lg mb-3"></textarea>
              <button @click="addNote" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-medium">
                Speichern
              </button>
            </div>
          </div>
        </div>

        <!-- Notes Grid -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="note in filteredNotes" :key="note.id"
                 class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold text-gray-900 flex-1">{{ note.title }}</h3>
                <button @click="deleteNote(note.id)" class="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                  ✕
                </button>
              </div>
              <div class="text-xs text-gray-500 mb-3">
                <span class="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2">{{ note.category }}</span>
                <span>{{ formatDate(note.date) }}</span>
              </div>
              <p class="text-gray-700 line-clamp-6 mb-3">{{ note.content }}</p>
              <button @click="editNote(note)" class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Bearbeiten →
              </button>
            </div>

            <div v-if="filteredNotes.length === 0" class="col-span-2 text-center py-12">
              <div class="text-5xl mb-4">📭</div>
              <p class="text-gray-500">Keine Notizen gefunden</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="editingNote" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
          <h3 class="text-2xl font-bold mb-6">Notiz bearbeiten</h3>
          <input v-model="editingNote.title" placeholder="Titel" class="w-full px-4 py-2 border rounded-lg mb-4">
          <textarea v-model="editingNote.content" rows="8" class="w-full px-4 py-2 border rounded-lg mb-4"></textarea>
          <div class="flex gap-3">
            <button @click="saveEdit" class="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-medium">
              Speichern
            </button>
            <button @click="editingNote = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { usePersonalStore } from '../stores/personal'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export default {
  setup() {
    const store = usePersonalStore()
    const selectedCategory = ref(null)
    const editingNote = ref(null)
    const newNote = ref({
      title: '',
      content: '',
      category: 'Ideen'
    })

    const categories = ['Ideen', 'Arbeit', 'Personal', 'Protokolle', 'Inspirationen']

    const filteredNotes = computed(() => {
      let notes = store.notes
      if (selectedCategory.value) {
        notes = notes.filter(n => n.category === selectedCategory.value)
      }
      return notes.sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    const addNote = () => {
      if (newNote.value.title && newNote.value.content) {
        store.addNote({
          title: newNote.value.title,
          content: newNote.value.content,
          category: newNote.value.category,
          id: Date.now(),
          date: new Date().toISOString()
        })
        newNote.value = { title: '', content: '', category: 'Ideen' }
      }
    }

    const deleteNote = (id) => {
      store.deleteNote(id)
    }

    const editNote = (note) => {
      editingNote.value = { ...note }
    }

    const saveEdit = () => {
      if (editingNote.value) {
        store.updateNote(editingNote.value)
        editingNote.value = null
      }
    }

    const formatDate = (date) => {
      return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: de })
    }

    return {
      selectedCategory,
      editingNote,
      newNote,
      categories,
      filteredNotes,
      addNote,
      deleteNote,
      editNote,
      saveEdit,
      formatDate
    }
  }
}
</script>
