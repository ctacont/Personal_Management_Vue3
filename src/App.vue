<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { usePersonalStore } from './stores/personal'

const route = useRoute()
const store = usePersonalStore()

const navItems = computed(() => [
  { to: '/', label: 'Übersicht', icon: 'i-heroicons-home' },
  { to: '/aufgaben', label: 'Aufgaben', icon: 'i-heroicons-check-circle' },
  { to: '/kalender', label: 'Kalender', icon: 'i-heroicons-calendar-days' },
  { to: '/notizen', label: 'Notizen', icon: 'i-heroicons-document-text' },
  { to: '/kontakte', label: 'Kontakte', icon: 'i-heroicons-user-group' },
  { to: '/finanzen', label: 'Finanzen', icon: 'i-heroicons-banknotes' },
  { to: '/ziele', label: 'Ziele', icon: 'i-heroicons-flag' },
  { to: '/wohlbefinden', label: 'Wohlbefinden', icon: 'i-heroicons-heart' }
])

const activeCounts = computed(() => ({
  tasks: store.openTasksCount,
  events: store.upcomingEventsCount,
  notes: store.notes.length
}))
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex min-h-screen">
      <aside class="hidden w-72 flex-shrink-0 flex-col bg-white shadow-lg lg:flex">
        <div class="flex items-center gap-3 px-8 py-6">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-lg font-semibold">
            PM
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-900">Personal Manager</p>
            <p class="text-sm text-gray-500">Alles an einem Ort</p>
            <hr class="mt-2">
            <p class="text-xs mt-2 font-bold text-gray-500">(c) 2025 by Hasan Yüksel</p>          
          </div>
        </div>
        <!-- <div class="px-8 pb-4 border-b">
          <p class="text-right text-sm font-bold text-gray-500">(c) 2025 by Hasan Yüksel</p>
        </div> --->
        <nav class="flex-0 space-y-1 px-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition"
            :class="route.path === item.to ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-100 hover:text-gray-900'"
          >
            <span class="text-lg">•</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
        <div class="space-y-3 px-4 py-8 border-t mt-4">
          <div class="rounded-2xl bg-primary-50 p-4">
            <p class="text-sm font-semibold text-primary-700">Heutige Übersicht</p>
            <ul class="mt-3 space-y-2 text-sm">
              <li>
                <RouterLink to="/aufgaben" class="text-primary-600 hover:text-primary-700 hover:underline font-medium transition">
                  {{ activeCounts.tasks }} offene Aufgaben
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/kalender" class="text-primary-600 hover:text-primary-700 hover:underline font-medium transition">
                  {{ activeCounts.events }} anstehende Termine
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notizen" class="text-primary-600 hover:text-primary-700 hover:underline font-medium transition">
                  {{ activeCounts.notes }} Notizen
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div class="flex flex-1 flex-col">
        <header class="flex items-center justify-between bg-white px-6 py-4 shadow">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">{{ route.meta.title }}</h1>
            <p class="text-sm text-gray-500">{{ route.meta.description }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 sm:flex">
              <span class="h-2 w-2 rounded-full bg-green-500"></span>
              <span>{{ store.todayLabel }}</span>
            </div>
            <button class="rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
              Neue Aufgabe
            </button>
          </div>
        </header>
        <main class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
