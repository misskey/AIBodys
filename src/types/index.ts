export interface User {
  name: string
  id: string
  level?: number
  goal?: 'shape' | 'muscle' | 'health' | 'rehab'
  daysPerWeek?: number
  experience?: 'new' | 'mid' | 'pro'
}

export interface Equipment {
  id: string
  name: string
  cn: string
  focus: string[]
  level: '入门' | '进阶'
  img: string
  silhouette?: 'leg-extension' | 'dumbbell' | 'press' | 'cable'
}

export interface WorkoutMove {
  name: string
  sets: number
  reps: string
  rest: number
  weight: number
  focus: string
  eq: string
}

export interface WorkoutPlan {
  id: string
  name: string
  dur: number
  moves: number
  level: string
  tag?: string
  cal: number
  silhouette?: 'leg-extension' | 'dumbbell' | 'press' | 'cable'
}

export interface HistoryRecord {
  date: string
  plan: string
  dur: number
  cal: number
  perf: 'good' | 'ok' | 'poor'
}

export interface Notification {
  kind: 'ai' | 'plan' | 'achievement'
  title: string
  text: string
  time: string
}

export type TabId = 'home' | 'train' | 'me'
