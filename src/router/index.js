import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Übersicht',
      description: 'Dein zentraler Überblick über Aufgaben, Termine und Fortschritt'
    }
  },
  {
    path: '/aufgaben',
    name: 'Tasks',
    component: () => import('../views/TasksView.vue'),
    meta: {
      title: 'Aufgaben',
      description: 'Plane, priorisiere und erledige deine Aufgaben effizient'
    }
  },
  {
    path: '/kalender',
    name: 'Calendar',
    component: () => import('../views/CalendarView.vue'),
    meta: {
      title: 'Kalender',
      description: 'Verwalte Termine, Meetings und Erinnerungen'
    }
  },
  {
    path: '/notizen',
    name: 'Notes',
    component: () => import('../views/NotesView.vue'),
    meta: {
      title: 'Notizen',
      description: 'Halte Gedanken, Ideen und Protokolle fest'
    }
  },
  {
    path: '/kontakte',
    name: 'Contacts',
    component: () => import('../views/ContactsView.vue'),
    meta: {
      title: 'Kontakte',
      description: 'Pflege deine beruflichen und privaten Kontakte'
    }
  },
  {
    path: '/finanzen',
    name: 'Finance',
    component: () => import('../views/FinanceView.vue'),
    meta: {
      title: 'Finanzen',
      description: 'Behalte Einnahmen, Ausgaben und Budgets im Blick'
    }
  },
  {
    path: '/ziele',
    name: 'Goals',
    component: () => import('../views/GoalsView.vue'),
    meta: {
      title: 'Ziele',
      description: 'Setze persönliche Ziele und verfolge deinen Fortschritt'
    }
  },
  {
    path: '/wohlbefinden',
    name: 'Wellbeing',
    component: () => import('../views/WellbeingView.vue'),
    meta: {
      title: 'Wohlbefinden',
      description: 'Tracke Schlaf, Stimmung und Routinen'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/Personal_Management_Vue3/' : '/'),
  routes
})

export default router
