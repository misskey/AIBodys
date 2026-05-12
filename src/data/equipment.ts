import type { Equipment } from '../types'

export const EQUIPMENT: Equipment[] = [
  { id: 'leg-extension', name: '坐姿腿屈伸机', cn: 'Leg Extension', focus: ['股四头肌', '膝关节稳定肌群'], level: '入门', img: '', silhouette: 'leg-extension' },
  { id: 'leg-curl', name: '坐姿腿弯举机', cn: 'Leg Curl', focus: ['腘绳肌'], level: '入门', img: '', silhouette: 'cable' },
  { id: 'leg-press', name: '腿举机', cn: 'Leg Press', focus: ['股四头肌', '臀大肌'], level: '进阶', img: '', silhouette: 'press' },
  { id: 'chest-press', name: '坐姿推胸机', cn: 'Chest Press', focus: ['胸大肌', '三角肌前束'], level: '入门', img: '', silhouette: 'press' },
  { id: 'lat-pull', name: '高位下拉', cn: 'Lat Pulldown', focus: ['背阔肌', '肱二头肌'], level: '入门', img: '', silhouette: 'cable' },
  { id: 'shoulder-press', name: '肩部推举机', cn: 'Shoulder Press', focus: ['三角肌'], level: '进阶', img: '', silhouette: 'press' },
  { id: 'cable-row', name: '坐姿划船机', cn: 'Seated Row', focus: ['背阔肌', '菱形肌'], level: '入门', img: '', silhouette: 'cable' },
  { id: 'calf-raise', name: '小腿提踵机', cn: 'Calf Raise', focus: ['腓肠肌', '比目鱼肌'], level: '入门', img: '', silhouette: 'dumbbell' },
]

export function findEquipment(id: string): Equipment {
  return EQUIPMENT.find(e => e.id === id) ?? EQUIPMENT[0]
}
