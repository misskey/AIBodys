import { useState, useEffect } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import LimeButton from '../../../components/LimeButton'
import Icon from '../../../components/Icon'
import { Bar, EqSilhouette } from '../../../components'
import { WORKOUT_MOVES } from '../../../data/workouts'

type Feeling = 'easy' | 'ok' | 'hard'

export default function WorkoutGoPage() {
  const [moveIdx, setMoveIdx] = useState(0)
  const [setIdx, setSetIdx] = useState(0)
  const [resting, setResting] = useState(false)
  const [feeling, setFeeling] = useState<Feeling | null>(null)
  const [restLeft, setRestLeft] = useState(60)

  const m = WORKOUT_MOVES[moveIdx]

  useEffect(() => {
    if (!resting) return
    setRestLeft(m.rest)
    const id = setInterval(() => {
      setRestLeft(s => {
        if (s <= 1) { clearInterval(id); setResting(false); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [resting])

  const totalSetsDone = WORKOUT_MOVES.slice(0, moveIdx).reduce((a, mv) => a + mv.sets, 0) + setIdx
  const totalSets = WORKOUT_MOVES.reduce((a, mv) => a + mv.sets, 0)
  const overallProgress = totalSetsDone / totalSets

  const completeSet = () => {
    setFeeling(null)
    if (setIdx < m.sets - 1) {
      setSetIdx(setIdx + 1)
      setResting(true)
    } else if (moveIdx < WORKOUT_MOVES.length - 1) {
      setMoveIdx(moveIdx + 1)
      setSetIdx(0)
      setResting(true)
    } else {
      Taro.navigateTo({ url: '/pages/train/workout-summary/index' })
    }
  }

  const feelingOptions: { id: Feeling; label: string; color: string; emoji: string }[] = [
    { id: 'easy', label: '轻松', color: '#5cd07b', emoji: '😊' },
    { id: 'ok', label: '适中', color: '#f9b04a', emoji: '😐' },
    { id: 'hard', label: '吃力', color: '#ff6363', emoji: '😣' },
  ]

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='训练中'
        right={
          <View className='iconbtn' onClick={() => Taro.navigateTo({ url: `/pages/equipment/detail/index?id=${m.eq}` })}>
            <Icon.Help size={18} sw={1.8} color='#fff' />
          </View>
        }
      />

      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        {/* 动作标题 */}
        <View style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <View style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.4, color: '#fff' }}>{m.name}</View>
            <View style={{
              marginTop: 8, display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              fontSize: 12, color: 'rgba(255,255,255,0.62)',
            }}>
              第 {moveIdx + 1}/{WORKOUT_MOVES.length} 个动作
            </View>
          </View>
          <View className='img-ph' style={{ width: 108, height: 90, borderRadius: 14, position: 'relative', flexShrink: 0 }}>
            <EqSilhouette kind='leg-extension' />
          </View>
        </View>

        {/* 组数计数 */}
        <View style={{ padding: '0 20px 16px' }}>
          <View style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, marginBottom: 6 }}>
            第 {setIdx + 1} 组 / 共 {m.sets} 组
          </View>
          <View style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <View style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5, color: '#fff', lineHeight: 1 }}>
              {resting ? restLeft : 10}
            </View>
            <View style={{ color: 'rgba(255,255,255,0.38)', fontSize: 16 }}>
              / {resting ? 's' : `${m.reps} 次`}
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: 'rgba(255,255,255,0.62)', fontSize: 13 }}>
            <Icon.Clock size={15} sw={1.8} color='rgba(255,255,255,0.62)' />
            <View style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13 }}>
              {resting ? `休息 ${restLeft} 秒` : `本组目标 ${m.weight}kg`}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Bar value={resting ? (1 - restLeft / m.rest) : overallProgress} />
          </View>
        </View>

        {/* 三项参数 */}
        <View style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: '重量(kg)', value: m.weight },
            { label: '次数', value: m.reps },
            { label: '休息(秒)', value: m.rest },
          ].map(s => (
            <View key={s.label} className='card-dim' style={{ padding: '12px 10px', textAlign: 'center' }}>
              <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{s.label}</View>
              <View style={{ fontSize: 22, fontWeight: 700, marginTop: 6, color: '#fff' }}>{s.value}</View>
            </View>
          ))}
        </View>

        {/* 动作要点 */}
        <View style={{ padding: '0 20px 14px' }}>
          <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>动作要点</View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '调整座椅，使膝盖与转轴对齐，大腿贴紧靠垫，腰背挺直。',
              '收缩大腿前侧肌肉，向上伸直膝盖，感受股四头肌发力。',
              '控制速度缓慢下放，避免膝盖锁死，动作全程可控。',
            ].map((t, i) => (
              <View key={i} className='card-dim' style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <View style={{
                  width: 22, height: 22, borderRadius: 22,
                  background: 'rgba(206,255,77,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ceff4d', fontSize: 12, fontWeight: 700,
                  flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </View>
                <View style={{ flex: 1, fontSize: 13, color: '#fff', lineHeight: 1.55 }}>{t}</View>
              </View>
            ))}
          </View>
        </View>

        {/* 安全提示 */}
        <View style={{ padding: '0 20px 18px' }}>
          <View style={{
            padding: '10px 14px',
            background: 'rgba(249,176,74,0.10)',
            border: '1px solid rgba(249,176,74,0.30)',
            borderRadius: 14,
            display: 'flex', gap: 10, alignItems: 'center',
            fontSize: 12, color: '#f9d28a',
          }}>
            <View style={{ color: '#f9b04a', fontSize: 16 }}>⚠</View>
            <View style={{ color: '#f9d28a', fontSize: 12 }}>如感到膝关节疼痛或不适，请立即停止并咨询教练。</View>
          </View>
        </View>

        {/* 感受反馈 */}
        <View style={{ padding: '0 20px 24px' }}>
          <View style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, marginBottom: 10 }}>本组感觉如何？</View>
          <View style={{ display: 'flex', gap: 10 }}>
            {feelingOptions.map(f => (
              <View
                key={f.id}
                onClick={() => setFeeling(f.id)}
                style={{
                  flex: 1, padding: 12,
                  borderRadius: 100,
                  background: feeling === f.id ? 'rgba(255,255,255,0.08)' : 'var(--surface)',
                  border: `1px solid ${feeling === f.id ? f.color : 'var(--line)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxSizing: 'border-box',
                }}
              >
                <View style={{ fontSize: 16 }}>{f.emoji}</View>
                <View style={{ color: f.color, fontSize: 14, fontWeight: 600 }}>{f.label}</View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)', boxSizing: 'border-box' }}>
        <LimeButton onClick={completeSet}>
          <View style={{ color: '#0a0d0a', fontWeight: 700, fontSize: 17 }}>
            {resting ? `休息中 ${restLeft}s` : '完成本组'}
          </View>
        </LimeButton>
      </View>
    </View>
  )
}
