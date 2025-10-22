<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">🎯 Ziele</h1>
        <p class="text-gray-600">Setze persönliche Ziele und verfolge deinen Fortschritt</p>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Aktive Ziele</div>
          <div class="text-3xl font-bold text-blue-600">{{ activeGoals.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Abgeschlossen</div>
          <div class="text-3xl font-bold text-green-600">{{ completedGoals.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Erfolgsquote</div>
          <div class="text-3xl font-bold text-amber-600">{{ successRate }}%</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">Ø Fortschritt</div>
          <div class="text-3xl font-bold text-purple-600">{{ averageProgress }}%</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Add Goal Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h3 class="text-lg font-bold mb-4">Neues Ziel</h3>
            <form @submit.prevent="addGoal" class="space-y-3">
              <input v-model="newGoal.title" placeholder="Zielname" class="w-full px-3 py-2 border rounded-lg" required>
              <select v-model="newGoal.category" class="w-full px-3 py-2 border rounded-lg">
                <option>Karriere</option>
                <option>Gesundheit</option>
                <option>Finanzen</option>
                <option>Bildung</option>
                <option>Persönlich</option>
              </select>
              <textarea v-model="newGoal.description" placeholder="Beschreibung..." rows="3" class="w-full px-3 py-2 border rounded-lg"></textarea>
              <select v-model="newGoal.priority" class="w-full px-3 py-2 border rounded-lg">
                <option>Niedrig</option>
                <option>Mittel</option>
                <option>Hoch</option>
              </select>
              <input v-model="newGoal.deadline" type="date" class="w-full px-3 py-2 border rounded-lg">
              <button type="submit" class="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-medium">
                Erstellen
              </button>
            </form>
          </div>
        </div>

        <!-- Goals List -->
        <div class="lg:col-span-3 space-y-4">
          <!-- Active Goals -->
          <div v-if="activeGoals.length > 0">
            <h3 class="text-xl font-bold mb-4">🚀 Aktive Ziele</h3>
            <div class="space-y-4">
              <div v-for="goal in activeGoals" :key="goal.id"
                   class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="text-lg font-bold text-gray-900">{{ goal.title }}</h4>
                    <p class="text-sm text-gray-600">{{ goal.description }}</p>
                  </div>
                  <button @click="deleteGoal(goal.id)" class="text-gray-400 hover:text-red-600">
                    ✕
                  </button>
                </div>

                <div class="flex gap-2 mb-4">
                  <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{{ goal.category }}</span>
                  <span :class="['text-xs px-2 py-1 rounded', getPriorityColor(goal.priority)]">
                    {{ goal.priority }}
                  </span>
                  <span class="text-xs text-gray-500">📅 {{ formatDate(goal.deadline) }}</span>
                </div>

                <div class="mb-3">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-700">Fortschritt</span>
                    <span class="font-bold">{{ goal.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all"
                         :style="{ width: goal.progress + '%' }"></div>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button @click="updateProgress(goal.id, goal.progress + 10)"
                          :disabled="goal.progress >= 100"
                          class="flex-1 bg-amber-100 text-amber-700 py-2 rounded hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    +10%
                  </button>
                  <button @click="markComplete(goal.id)"
                          :disabled="goal.progress >= 100"
                          class="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    Fertig
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Completed Goals -->
          <div v-if="completedGoals.length > 0" class="mt-8">
            <h3 class="text-xl font-bold mb-4">✅ Abgeschlossene Ziele</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="goal in completedGoals" :key="goal.id"
                   class="bg-green-50 rounded-lg shadow-lg p-4 border-2 border-green-200">
                <div class="flex items-start gap-3">
                  <span class="text-2xl">✅</span>
                  <div>
                    <h4 class="font-bold text-green-900">{{ goal.title }}</h4>
                    <p class="text-sm text-green-700">{{ goal.category }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeGoals.length === 0 && completedGoals.length === 0" class="text-center py-12">
            <div class="text-5xl mb-4">🎯</div>
            <p class="text-gray-500">Noch keine Ziele erstellt. Fang jetzt an!</p>
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
    const newGoal = ref({
      title: '',
      description: '',
      category: 'Persönlich',
      priority: 'Mittel',
      deadline: '',
      progress: 0,
      completed: false
    })

    const activeGoals = computed(() => {
      return store.goals.filter(g => !g.completed)
    })

    const completedGoals = computed(() => {
      return store.goals.filter(g => g.completed)
    })

    const successRate = computed(() => {
      if (store.goals.length === 0) return 0
      return Math.round((completedGoals.value.length / store.goals.length) * 100)
    })

    const averageProgress = computed(() => {
      if (activeGoals.value.length === 0) return 0
      const sum = activeGoals.value.reduce((acc, g) => acc + g.progress, 0)
      return Math.round(sum / activeGoals.value.length)
    })

    const addGoal = () => {
      if (newGoal.value.title) {
        store.addGoal({
          ...newGoal.value,
          id: Date.now(),
          progress: 0,
          completed: false
        })
        newGoal.value = {
          title: '',
          description: '',
          category: 'Persönlich',
          priority: 'Mittel',
          deadline: '',
          progress: 0,
          completed: false
        }
      }
    }

    const deleteGoal = (id) => {
      store.deleteGoal(id)
    }

    const updateProgress = (id, progress) => {
      store.updateGoalProgress(id, Math.min(progress, 100))
    }

    const markComplete = (id) => {
      store.completeGoal(id)
    }

    const formatDate = (date) => {
      return format(new Date(date), 'dd.MM.yyyy', { locale: de })
    }

    const getPriorityColor = (priority) => {
      const colors = {
        'Niedrig': 'bg-blue-100 text-blue-800',
        'Mittel': 'bg-yellow-100 text-yellow-800',
        'Hoch': 'bg-red-100 text-red-800'
      }
      return colors[priority] || 'bg-gray-100 text-gray-800'
    }

    return {
      newGoal,
      activeGoals,
      completedGoals,
      successRate,
      averageProgress,
      addGoal,
      deleteGoal,
      updateProgress,
      markComplete,
      formatDate,
      getPriorityColor
    }
  }
}
</script>
