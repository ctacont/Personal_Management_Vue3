<template>
  <div v-if="showServiceInfo" class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <component :is="serviceIcon" class="h-5 w-5 text-blue-400" />
      </div>
      <div class="ml-3">
        <p class="text-sm text-blue-700">
          <strong>{{ serviceTitle }}</strong> - {{ serviceDescription }}
        </p>
        <p v-if="serviceMode === 'localStorage'" class="text-xs text-blue-600 mt-1">
          💡 Tipp: Deine Daten werden im Browser gespeichert und bleiben nach dem Neuladen erhalten.
        </p>
      </div>
      <div class="ml-auto">
        <button @click="hideServiceInfo" class="text-blue-400 hover:text-blue-600">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiService } from '@/services/api'

const showServiceInfo = ref(false)
const serviceMode = ref('unknown')
const serviceInfo = ref({})

const serviceIcon = computed(() => {
  switch (serviceMode.value) {
    case 'server':
      return 'svg' // Server icon
    case 'localStorage':
      return 'svg' // Storage icon  
    default:
      return 'svg' // Question icon
  }
})

const serviceTitle = computed(() => {
  switch (serviceMode.value) {
    case 'server':
      return 'Server-Modus'
    case 'localStorage':
      return 'GitHub Pages Modus'
    default:
      return 'Unbekannter Modus'
  }
})

const serviceDescription = computed(() => {
  switch (serviceMode.value) {
    case 'server':
      return 'Verbunden mit Express.js API Server'
    case 'localStorage':
      return 'Daten werden im Browser-Speicher verwaltet'
    default:
      return 'Service-Modus wird ermittelt...'
  }
})

const checkServiceMode = () => {
  serviceInfo.value = apiService.getServiceInfo()
  serviceMode.value = serviceInfo.value.mode
  
  // Show info for GitHub Pages users
  if (serviceMode.value === 'localStorage' || serviceInfo.value.isGitHubPages) {
    showServiceInfo.value = true
  }
}

const hideServiceInfo = () => {
  showServiceInfo.value = false
  localStorage.setItem('hideServiceInfo', 'true')
}

onMounted(() => {
  // Don't show if user already dismissed it
  const shouldHide = localStorage.getItem('hideServiceInfo')
  if (shouldHide) {
    showServiceInfo.value = false
    return
  }

  // Check service mode after a short delay to ensure API is initialized
  setTimeout(checkServiceMode, 1000)
})
</script>