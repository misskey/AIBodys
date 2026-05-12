import type { WorkoutPlan, WorkoutMove } from '../types'

export const WORKOUT_PLANS: WorkoutPlan[] = [
  { id: 'lower-1', name: '下肢塑形 · 基础', dur: 45, moves: 6, level: '入门', tag: '今日推荐', cal: 320, silhouette: 'leg-extension' },
  { id: 'upper-1', name: '上肢力量 · 推举', dur: 50, moves: 7, level: '进阶', cal: 380, silhouette: 'press' },
  { id: 'core-1', name: '核心稳定 · 全套', dur: 30, moves: 5, level: '入门', cal: 240, silhouette: 'cable' },
  { id: 'back-1', name: '背部塑造 · 中级', dur: 55, moves: 8, level: '进阶', cal: 410, silhouette: 'dumbbell' },
]

export const WORKOUT_MOVES: WorkoutMove[] = [
  { name: '坐姿腿屈伸', sets: 3, reps: '10-12', rest: 60, weight: 25, focus: '股四头肌', eq: 'leg-extension' },
  { name: '坐姿腿弯举', sets: 3, reps: '12', rest: 60, weight: 22, focus: '腘绳肌', eq: 'leg-curl' },
  { name: '腿举', sets: 4, reps: '10', rest: 90, weight: 80, focus: '股四头肌 · 臀大肌', eq: 'leg-press' },
  { name: '坐姿小腿提踵', sets: 3, reps: '15', rest: 45, weight: 30, focus: '腓肠肌', eq: 'calf-raise' },
]
