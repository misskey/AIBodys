import { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Icon from '../../../components/Icon'
import LimeButton from '../../../components/LimeButton'

type Goal = 'shape' | 'muscle' | 'health' | 'rehab'
type Level = 'new' | 'mid' | 'pro'

const GOALS = [
  { id: 'shape' as Goal, label: '塑形减脂', desc: '降低体脂 · 雕刻线条', icon: '🔥' },
  { id: 'muscle' as Goal, label: '增肌增重', desc: '增加围度 · 提升力量', icon: '💪' },
  { id: 'health' as Goal, label: '保持健康', desc: '改善体态 · 维持体能', icon: '🌿' },
  { id: 'rehab' as Goal, label: '功能康复', desc: '改善体态 · 缓解疼痛', icon: '🩹' },
]

const LEVELS = [
  { id: 'new' as Level, label: '新手', desc: '从未或刚接触器械训练' },
  { id: 'mid' as Level, label: '进阶', desc: '能独立完成大部分训练' },
  { id: 'pro' as Level, desc: '系统训练 1 年以上', label: '资深' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const [days, setDays] = useState(3)

  const steps = [
    {
      title: '你的训练目标是?',
      subtitle: '帮你定制专属计划',
      valid: !!goal,
      body: (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GOALS.map(g => (
            <View
              key={g.id}
              onClick={() => setGoal(g.id)}
              style={{
                padding: 18,
                borderRadius: 18,
                textAlign: 'left',
                background: goal === g.id ? 'rgba(206,255,77,0.12)' : 'var(--surface)',
                border: `1px solid ${goal === g.id ? '#ceff4d' : 'var(--line)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxSizing: 'border-box',
              }}
            >
              <View style={{ fontSize: 26 }}>{g.icon}</View>
              <View style={{ flex: 1 }}>
                <View style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{g.label}</View>
                <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{g.desc}</View>
              </View>
              {goal === g.id && <Icon.Check size={20} color='#ceff4d' sw={2.5} />}
            </View>
          ))}
        </View>
      ),
    },
    {
      title: '健身经验如何?',
      subtitle: '帮我们调整难度',
      valid: !!level,
      body: (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LEVELS.map(g => (
            <View
              key={g.id}
              onClick={() => setLevel(g.id)}
              style={{
                padding: 18,
                borderRadius: 18,
                background: level === g.id ? 'rgba(206,255,77,0.12)' : 'var(--surface)',
                border: `1px solid ${level === g.id ? '#ceff4d' : 'var(--line)'}`,
                boxSizing: 'border-box',
              }}
            >
              <View style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{g.label}</View>
              <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{g.desc}</View>
            </View>
          ))}
        </View>
      ),
    },
    {
      title: '一周训练几次?',
      subtitle: '可随时在「我的」中调整',
      valid: true,
      body: (
        <View>
          <View style={{ textAlign: 'center', margin: '30px 0' }}>
            <View style={{ fontSize: 88, fontWeight: 700, letterSpacing: -1.5, color: '#ceff4d', lineHeight: 1 }}>
              {days}
            </View>
            <View style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, marginTop: 8 }}>次 / 周</View>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
            {[2, 3, 4, 5, 6].map(d => (
              <View
                key={d}
                onClick={() => setDays(d)}
                style={{
                  width: 48, height: 48, borderRadius: 48,
                  background: days === d ? '#ceff4d' : 'var(--surface)',
                  color: days === d ? '#0a0d0a' : '#fff',
                  fontWeight: 600, fontSize: 16,
                  border: `1px solid ${days === d ? '#ceff4d' : 'var(--line)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {d}
              </View>
            ))}
          </View>
          <View style={{
            marginTop: 36, padding: 16,
            background: 'var(--surface)',
            borderRadius: 16,
            fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6,
          }}>
            💡 建议每周训练 3-4 次，保证 48 小时肌群恢复时间
          </View>
        </View>
      ),
    },
  ]

  const current = steps[step]

  const handleNext = () => {
    if (!current.valid) return
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      Taro.reLaunch({ url: '/pages/main/index' })
    }
  }

  return (
    <View style={{
      position: 'fixed', inset: 0,
      background: '#0a0d0a',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* 顶部进度 */}
      <View style={{ padding: '60px 24px 16px', display: 'flex', alignItems: 'center', gap: 12, boxSizing: 'border-box' }}>
        <View
          onClick={() => step > 0 ? setStep(step - 1) : null}
          className='iconbtn'
          style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
        >
          <Icon.Back size={18} sw={2} color='#fff' />
        </View>
        <View style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
          <View style={{
            width: `${((step + 1) / steps.length) * 100}%`,
            height: '100%',
            background: '#ceff4d',
            transition: 'width 0.3s ease',
            borderRadius: 100,
          }} />
        </View>
        <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500, minWidth: 28 }}>
          {step + 1}/{steps.length}
        </View>
      </View>

      {/* 内容区 */}
      <ScrollView scrollY style={{ flex: 1, padding: '20px 24px 24px', boxSizing: 'border-box' }}>
        <View>
          <View style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3, color: '#fff' }}>{current.title}</View>
          <View style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', marginTop: 8, marginBottom: 28 }}>{current.subtitle}</View>
          {current.body}
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View style={{ padding: '12px 24px 36px', boxSizing: 'border-box' }}>
        <LimeButton onClick={handleNext} disabled={!current.valid}>
          <View style={{ color: '#0a0d0a', fontWeight: 700, fontSize: 17 }}>
            {step === steps.length - 1 ? '完成，开始训练' : '下一步'}
          </View>
        </LimeButton>
      </View>
    </View>
  )
}
