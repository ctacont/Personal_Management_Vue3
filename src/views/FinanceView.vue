<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">💰 Finanzen</h1>
        <p class="text-gray-600">Behalte Einnahmen, Ausgaben und Budgets im Blick</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Diesen Monat</div>
          <div class="text-3xl font-bold text-green-600">+{{ totalIncome.toFixed(2) }}€</div>
          <div class="text-xs text-gray-500 mt-2">Einnahmen</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Diesen Monat</div>
          <div class="text-3xl font-bold text-red-600">-{{ totalExpenses.toFixed(2) }}€</div>
          <div class="text-xs text-gray-500 mt-2">Ausgaben</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Gesamt</div>
          <div :class="['text-3xl font-bold', balance >= 0 ? 'text-green-600' : 'text-red-600']">
            {{ balance >= 0 ? '+' : '' }}{{ balance.toFixed(2) }}€
          </div>
          <div class="text-xs text-gray-500 mt-2">Bilanz</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Sparquote</div>
          <div class="text-3xl font-bold text-blue-600">{{ savingsRate }}%</div>
          <div class="text-xs text-gray-500 mt-2">Ziel: 20%</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Add Transaction Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-lg font-bold mb-4">Neue Transaktion</h3>
            <form @submit.prevent="addTransaction" class="space-y-3">
              <div>
                <label class="text-sm font-medium block mb-1">Typ</label>
                <div class="flex gap-2">
                  <button type="button" @click="newTransaction.type = 'Einnahme'"
                          :class="['flex-1 py-2 rounded-lg', newTransaction.type === 'Einnahme' ? 'bg-green-600 text-white' : 'bg-gray-200']">
                    +
                  </button>
                  <button type="button" @click="newTransaction.type = 'Ausgabe'"
                          :class="['flex-1 py-2 rounded-lg', newTransaction.type === 'Ausgabe' ? 'bg-red-600 text-white' : 'bg-gray-200']">
                    -
                  </button>
                </div>
              </div>
              <input v-model.number="newTransaction.amount" placeholder="Betrag" type="number" step="0.01" class="w-full px-3 py-2 border rounded-lg" required>
              <input v-model="newTransaction.description" placeholder="Beschreibung" class="w-full px-3 py-2 border rounded-lg" required>
              <select v-model="newTransaction.category" class="w-full px-3 py-2 border rounded-lg">
                <option>Lebensmittel</option>
                <option>Transport</option>
                <option>Gesundheit</option>
                <option>Freizeit</option>
                <option>Wohnung</option>
                <option>Gehalt</option>
                <option>Sonstiges</option>
              </select>
              <input v-model="newTransaction.date" type="date" class="w-full px-3 py-2 border rounded-lg">
              <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
                Hinzufügen
              </button>
            </form>
          </div>
        </div>

        <!-- Transactions List -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Transaktionen</h3>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="transaction in sortedTransactions" :key="transaction.id"
                   class="flex justify-between items-center p-4 border-l-4 rounded"
                   :style="{ borderLeftColor: transaction.type === 'Einnahme' ? '#10b981' : '#ef4444' }">
                <div class="flex-1">
                  <div class="font-semibold text-gray-900">{{ transaction.description }}</div>
                  <div class="text-sm text-gray-500">{{ transaction.category }} • {{ formatDate(transaction.date) }}</div>
                </div>
                <div class="flex items-center gap-4">
                  <span :class="['font-bold text-lg', transaction.type === 'Einnahme' ? 'text-green-600' : 'text-red-600']">
                    {{ transaction.type === 'Einnahme' ? '+' : '-' }}{{ transaction.amount.toFixed(2) }}€
                  </span>
                  <button @click="editTransaction(transaction)" class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Bearbeiten
                  </button>
                  <button @click="deleteTransaction(transaction.id)" class="text-red-600 hover:text-red-800 font-medium text-sm">
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Breakdown -->
          <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">Ausgaben nach Kategorie</h3>
            <div class="space-y-3">
              <div v-for="(amount, category) in categoryBreakdown" :key="category" class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ category }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" 
                         :style="{ width: (amount / totalExpenses * 100) + '%' }"></div>
                  </div>
                </div>
                <span class="font-bold text-gray-900 w-20 text-right">{{ amount.toFixed(2) }}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingTransaction" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h3 class="text-2xl font-bold mb-6">Transaktion bearbeiten</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Typ</label>
              <div class="flex gap-2">
                <button type="button" @click="editingTransaction.type = 'Einnahme'"
                        :class="['flex-1 py-2 rounded-lg', editingTransaction.type === 'Einnahme' ? 'bg-green-600 text-white' : 'bg-gray-200']">
                  +
                </button>
                <button type="button" @click="editingTransaction.type = 'Ausgabe'"
                        :class="['flex-1 py-2 rounded-lg', editingTransaction.type === 'Ausgabe' ? 'bg-red-600 text-white' : 'bg-gray-200']">
                  -
                </button>
              </div>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Betrag</label>
              <input v-model.number="editingTransaction.amount" type="number" step="0.01" class="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700 block mb-2">Beschreibung</label>
            <input v-model="editingTransaction.description" class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Kategorie</label>
              <select v-model="editingTransaction.category" class="w-full px-4 py-2 border rounded-lg">
                <option>Lebensmittel</option>
                <option>Transport</option>
                <option>Gesundheit</option>
                <option>Freizeit</option>
                <option>Wohnung</option>
                <option>Gehalt</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2">Datum</label>
              <input v-model="editingTransaction.date" type="date" class="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </div>
        <div class="flex gap-3 mt-8">
          <button @click="saveEdit" class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
            Speichern
          </button>
          <button @click="editingTransaction = null" class="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 font-medium">
            Abbrechen
          </button>
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
    const editingTransaction = ref(null)
    const newTransaction = ref({
      type: 'Ausgabe',
      amount: '',
      description: '',
      category: 'Lebensmittel',
      date: new Date().toISOString().split('T')[0]
    })

    const totalIncome = computed(() => {
      return store.transactions
        .filter(t => t.type === 'Einnahme')
        .reduce((sum, t) => sum + t.amount, 0)
    })

    const totalExpenses = computed(() => {
      return store.transactions
        .filter(t => t.type === 'Ausgabe')
        .reduce((sum, t) => sum + t.amount, 0)
    })

    const balance = computed(() => totalIncome.value - totalExpenses.value)

    const savingsRate = computed(() => {
      if (totalIncome.value === 0) return 0
      return Math.round((balance.value / totalIncome.value) * 100)
    })

    const sortedTransactions = computed(() => {
      return [...store.transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    const categoryBreakdown = computed(() => {
      const breakdown = {}
      store.transactions
        .filter(t => t.type === 'Ausgabe')
        .forEach(t => {
          breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
        })
      return breakdown
    })

    const addTransaction = () => {
      if (newTransaction.value.amount && newTransaction.value.description) {
        store.addTransaction({
          ...newTransaction.value,
          amount: parseFloat(newTransaction.value.amount),
          id: Date.now()
        })
        newTransaction.value = {
          type: 'Ausgabe',
          amount: '',
          description: '',
          category: 'Lebensmittel',
          date: new Date().toISOString().split('T')[0]
        }
      }
    }

    const deleteTransaction = (id) => {
      if (confirm('Transaktion wirklich löschen?')) {
        store.deleteTransaction(id)
      }
    }

    const editTransaction = (transaction) => {
      editingTransaction.value = { ...transaction }
    }

    const saveEdit = async () => {
      if (editingTransaction.value && editingTransaction.value.description) {
        await store.updateTransaction(editingTransaction.value.id, editingTransaction.value)
        editingTransaction.value = null
      }
    }

    const formatDate = (date) => {
      return format(new Date(date), 'dd.MM.yyyy', { locale: de })
    }

    return {
      newTransaction,
      totalIncome,
      totalExpenses,
      balance,
      savingsRate,
      sortedTransactions,
      categoryBreakdown,
      editingTransaction,
      addTransaction,
      deleteTransaction,
      editTransaction,
      saveEdit,
      formatDate
    }
  }
}
</script>
