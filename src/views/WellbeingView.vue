<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">🧘 Wohlbefinden</h1>
        <p class="text-gray-600">Tracke Schlaf, Stimmung und Routinen</p>
      </div>

      <!-- Weekly Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">⏰ Ø Schlaf</div>
          <div class="text-3xl font-bold text-blue-600">{{ averageSleep.toFixed(1) }}h</div>
          <div class="text-xs text-gray-500 mt-2">Diese Woche</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">😊 Stimmung</div>
          <div class="text-3xl font-bold text-amber-600">{{ averageMood }}/10</div>
          <div class="text-xs text-gray-500 mt-2">Diese Woche</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">💪 Aktivität</div>
          <div class="text-3xl font-bold text-green-600">{{ weeklyActivity }}</div>
          <div class="text-xs text-gray-500 mt-2">Trainingstage</div>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-gray-600 text-sm mb-1">✅ Routine</div>
          <div class="text-3xl font-bold text-purple-600">{{ routineCompletion }}%</div>
          <div class="text-xs text-gray-500 mt-2">Dieser Monat</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Sleep Tracker -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-bold mb-4">😴 Schlaf</h3>
            <form @submit.prevent="addSleepEntry" class="space-y-3">
              <input v-model="newSleep.date" type="date" class="w-full px-3 py-2 border rounded-lg">
              <div>
                <label class="text-sm font-medium block mb-1">Stunden</label>
                <input v-model.number="newSleep.hours" type="number" min="0" max="24" step="0.5" class="w-full px-3 py-2 border rounded-lg">
              </div>
              <select v-model="newSleep.quality" class="w-full px-3 py-2 border rounded-lg">
                <option>Schlecht</option>
                <option>Mittelmäßig</option>
                <option>Gut</option>
                <option>Sehr gut</option>
              </select>
              <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                Speichern
              </button>
            </form>
          </div>

          <!-- Mood Tracker -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-bold mb-4">😊 Stimmung</h3>
            <form @submit.prevent="addMoodEntry" class="space-y-3">
              <input v-model="newMood.date" type="date" class="w-full px-3 py-2 border rounded-lg">
              <div>
                <label class="text-sm font-medium block mb-2">Bewertung</label>
                <div class="flex gap-1 text-2xl">
                  <button v-for="i in 10" :key="i" type="button"
                          @click="newMood.rating = i"
                          class="flex-1 hover:scale-110 transition-transform"
                          :class="i <= newMood.rating ? 'text-yellow-400' : 'text-gray-300'">
                    ★
                  </button>
                </div>
              </div>
              <textarea v-model="newMood.note" placeholder="Notiz..." rows="2" class="w-full px-3 py-2 border rounded-lg"></textarea>
              <button type="submit" class="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-medium">
                Speichern
              </button>
            </form>
          </div>

          <!-- Activity Tracker -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-bold mb-4">💪 Aktivität</h3>
            <form @submit.prevent="addActivity" class="space-y-3">
              <input v-model="newActivity.date" type="date" class="w-full px-3 py-2 border rounded-lg">
              <input v-model="newActivity.type" placeholder="z.B. Laufen" class="w-full px-3 py-2 border rounded-lg">
              <input v-model.number="newActivity.duration" placeholder="Minuten" type="number" class="w-full px-3 py-2 border rounded-lg">
              <select v-model="newActivity.intensity" class="w-full px-3 py-2 border rounded-lg">
                <option>Leicht</option>
                <option>Mittel</option>
                <option>Intensiv</option>
              </select>
              <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
                Speichern
              </button>
            </form>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Sleep Chart -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">😴 Schlafverlauf</h3>
            <div class="space-y-3">
              <div v-for="entry in lastSevenDays.map((_, i) => getSleepEntry(i))" :key="entry?.id || i"
                   class="flex items-center justify-between p-3 bg-blue-50 rounded">
                <div>
                  <div class="font-semibold">{{ entry ? formatDate(entry.date) : 'Keine Daten' }}</div>
                  <div class="text-sm text-gray-600" v-if="entry">{{ entry.quality }}</div>
                </div>
                <div v-if="entry" class="text-lg font-bold text-blue-600">{{ entry.hours }}h</div>
              </div>
            </div>
          </div>

          <!-- Mood Chart -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">😊 Stimmungsverlauf</h3>
            <div class="space-y-3">
              <div v-for="entry in store.moods.slice(-7)" :key="entry.id"
                   class="flex items-center justify-between p-3 bg-amber-50 rounded">
                <div>
                  <div class="font-semibold">{{ formatDate(entry.date) }}</div>
                  <div class="text-sm text-gray-600" v-if="entry.note">{{ entry.note }}</div>
                </div>
                <div class="text-2xl">
                  {{ getEmojiForRating(entry.rating) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Activities -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">💪 Aktivitäten</h3>
            <div class="space-y-3">
              <div v-for="activity in store.activities.slice(-7)" :key="activity.id"
                   class="flex items-center justify-between p-3 border-l-4 border-green-600 bg-green-50 rounded">
                <div>
                  <div class="font-semibold">{{ activity.type }}</div>
                  <div class="text-sm text-gray-600">{{ formatDate(activity.date) }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-green-600">{{ activity.duration }}min</div>
                  <div class="text-xs text-gray-600">{{ activity.intensity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { usePersonalStore } from '../stores/personal'
import { format, subDays } from 'date-fns'
import { de } from 'date-fns/locale'

export default {
  setup() {
    const store = usePersonalStore()
    
    const newSleep = ref({
      date: new Date().toISOString().split('T')[0],
      hours: 8,
      quality: 'Gut'
    })

    const newMood = ref({
      date: new Date().toISOString().split('T')[0],
      rating: 7,
      note: ''
    })

    const newActivity = ref({
      date: new Date().toISOString().split('T')[0],
      type: '',
      duration: 30,
      intensity: 'Mittel'
    })

    const lastSevenDays = computed(() => {
      return Array.from({ length: 7 }, (_, i) => i)
    })

    const averageSleep = computed(() => {
      if (store.sleepEntries.length === 0) return 0
      const last7 = store.sleepEntries.slice(-7)
      return last7.reduce((sum, entry) => sum + entry.hours, 0) / last7.length
    })

    const averageMood = computed(() => {
      if (store.moods.length === 0) return 0
      const last7 = store.moods.slice(-7)
      return Math.round(last7.reduce((sum, entry) => sum + entry.rating, 0) / last7.length)
    })

    const weeklyActivity = computed(() => {
      const last7Days = store.activities.filter(a => {
        const actDate = new Date(a.date)
        const sevenDaysAgo = subDays(new Date(), 7)
        return actDate >= sevenDaysAgo
      })
      return last7Days.length
    })

    const routineCompletion = computed(() => {
      if (store.sleepEntries.length === 0) return 0
      return Math.round((weeklyActivity.value / 30) * 100)
    })

    const addSleepEntry = () => {
      if (newSleep.value.date && newSleep.value.hours) {
        store.addSleepEntry({
          ...newSleep.value,
          id: Date.now()
        })
        newSleep.value = {
          date: new Date().toISOString().split('T')[0],
          hours: 8,
          quality: 'Gut'
        }
      }
    }

    const addMoodEntry = () => {
      if (newMood.value.date && newMood.value.rating) {
        store.addMoodEntry({
          ...newMood.value,
          id: Date.now()
        })
        newMood.value = {
          date: new Date().toISOString().split('T')[0],
          rating: 7,
          note: ''
        }
      }
    }

    const addActivity = () => {
      if (newActivity.value.date && newActivity.value.type) {
        store.addActivity({
          ...newActivity.value,
          id: Date.now()
        })
        newActivity.value = {
          date: new Date().toISOString().split('T')[0],
          type: '',
          duration: 30,
          intensity: 'Mittel'
        }
      }
    }

    const getSleepEntry = (daysAgo) => {
      const date = subDays(new Date(), daysAgo)
      const dateStr = format(date, 'yyyy-MM-dd')
      return store.sleepEntries.find(e => e.date === dateStr)
    }

    const formatDate = (date) => {
      return format(new Date(date), 'dd.MM.yyyy', { locale: de })
    }

    const getEmojiForRating = (rating) => {
      if (rating <= 2) return '😢'
      if (rating <= 4) return '😕'
      if (rating <= 6) return '😐'
      if (rating <= 8) return '😊'
      return '😄'
    }

    return {
      store,
      newSleep,
      newMood,
      newActivity,
      lastSevenDays,
      averageSleep,
      averageMood,
      weeklyActivity,
      routineCompletion,
      addSleepEntry,
      addMoodEntry,
      addActivity,
      getSleepEntry,
      formatDate,
      getEmojiForRating
    }
  }
}
</script>
