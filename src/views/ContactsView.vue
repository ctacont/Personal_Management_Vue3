<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">👥 Kontakte</h1>
        <p class="text-gray-600">Pflege deine beruflichen und privaten Kontakte</p>
      </div>

      <!-- Search and Filter -->
      <div class="mb-6 flex gap-4">
        <input v-model="searchQuery" placeholder="Suche nach Namen..." 
               class="flex-1 px-4 py-2 border rounded-lg">
        <select v-model="selectedCategory" class="px-4 py-2 border rounded-lg">
          <option value="">Alle Kategorien</option>
          <option>Arbeit</option>
          <option>Familie</option>
          <option>Freunde</option>
          <option>Geschäft</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Add Contact Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-lg font-bold mb-4">Neuer Kontakt</h3>
            <form @submit.prevent="addContact" class="space-y-3">
              <input v-model="newContact.name" placeholder="Name" class="w-full px-3 py-2 border rounded-lg" required>
              <input v-model="newContact.email" placeholder="E-Mail" type="email" class="w-full px-3 py-2 border rounded-lg">
              <input v-model="newContact.phone" placeholder="Telefon" class="w-full px-3 py-2 border rounded-lg">
              <input v-model="newContact.company" placeholder="Unternehmen" class="w-full px-3 py-2 border rounded-lg">
              <select v-model="newContact.category" class="w-full px-3 py-2 border rounded-lg">
                <option>Arbeit</option>
                <option>Familie</option>
                <option>Freunde</option>
                <option>Geschäft</option>
              </select>
              <textarea v-model="newContact.notes" placeholder="Notizen..." rows="3" class="w-full px-3 py-2 border rounded-lg"></textarea>
              <button type="submit" class="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 font-medium">
                Speichern
              </button>
            </form>
          </div>
        </div>

        <!-- Contacts List -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="contact in filteredContacts" :key="contact.id"
                 class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ contact.name }}</h3>
                  <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">{{ contact.category }}</span>
                </div>
                <button @click="deleteContact(contact.id)" class="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                  ✕
                </button>
              </div>

              <div class="space-y-2 text-sm text-gray-600 mb-4">
                <div v-if="contact.email" class="flex items-center gap-2">
                  <span>📧</span>
                  <a :href="`mailto:${contact.email}`" class="text-blue-600 hover:underline">{{ contact.email }}</a>
                </div>
                <div v-if="contact.phone" class="flex items-center gap-2">
                  <span>📱</span>
                  <a :href="`tel:${contact.phone}`" class="text-blue-600 hover:underline">{{ contact.phone }}</a>
                </div>
                <div v-if="contact.company" class="flex items-center gap-2">
                  <span>🏢</span>
                  {{ contact.company }}
                </div>
              </div>

              <div v-if="contact.notes" class="bg-gray-50 p-2 rounded text-xs text-gray-700 mb-3">
                {{ contact.notes }}
              </div>

              <button @click="editContact(contact)" class="text-orange-600 hover:text-orange-700 text-sm font-medium">
                Bearbeiten →
              </button>
            </div>

            <div v-if="filteredContacts.length === 0" class="col-span-2 text-center py-12">
              <div class="text-5xl mb-4">📭</div>
              <p class="text-gray-500">Keine Kontakte gefunden</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="editingContact" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
          <h3 class="text-2xl font-bold mb-6">Kontakt bearbeiten</h3>
          <form @submit.prevent="saveEdit" class="space-y-4">
            <input v-model="editingContact.name" placeholder="Name" class="w-full px-4 py-2 border rounded-lg">
            <input v-model="editingContact.email" placeholder="E-Mail" type="email" class="w-full px-4 py-2 border rounded-lg">
            <input v-model="editingContact.phone" placeholder="Telefon" class="w-full px-4 py-2 border rounded-lg">
            <input v-model="editingContact.company" placeholder="Unternehmen" class="w-full px-4 py-2 border rounded-lg">
            <textarea v-model="editingContact.notes" placeholder="Notizen..." rows="4" class="w-full px-4 py-2 border rounded-lg"></textarea>
            <div class="flex gap-3">
              <button type="submit" class="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 font-medium">
                Speichern
              </button>
              <button type="button" @click="editingContact = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { usePersonalStore } from '../stores/personal'

export default {
  setup() {
    const store = usePersonalStore()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const editingContact = ref(null)
    const newContact = ref({
      name: '',
      email: '',
      phone: '',
      company: '',
      category: 'Arbeit',
      notes: ''
    })

    const filteredContacts = computed(() => {
      let contacts = store.contacts
      if (searchQuery.value) {
        contacts = contacts.filter(c => 
          c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }
      if (selectedCategory.value) {
        contacts = contacts.filter(c => c.category === selectedCategory.value)
      }
      return contacts.sort((a, b) => a.name.localeCompare(b.name))
    })

    const addContact = () => {
      if (newContact.value.name) {
        store.addContact({
          ...newContact.value,
          id: Date.now()
        })
        newContact.value = {
          name: '',
          email: '',
          phone: '',
          company: '',
          category: 'Arbeit',
          notes: ''
        }
      }
    }

    const deleteContact = (id) => {
      store.deleteContact(id)
    }

    const editContact = (contact) => {
      editingContact.value = { ...contact }
    }

    const saveEdit = () => {
      if (editingContact.value) {
        store.updateContact(editingContact.value)
        editingContact.value = null
      }
    }

    return {
      searchQuery,
      selectedCategory,
      editingContact,
      newContact,
      filteredContacts,
      addContact,
      deleteContact,
      editContact,
      saveEdit
    }
  }
}
</script>
