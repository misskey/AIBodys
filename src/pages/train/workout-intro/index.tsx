import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import LimeButton from '../../../components/LimeButton'
import Icon from '../../../components/Icon'
import { EqSilhouette } from '../../../components'
import { WORKOUT_MOVES } from '../../../data/workouts'

export default function WorkoutIntroPage() {
  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='今日训练'
        right={
          <View className='iconbtn'>
            <Icon.Heart size={18} sw={1.8} color='#fff' />
          </View>
        }
      />

      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        {/* 封面图 */}
        <View style={{ padding: '8px 20px 16px' }}>
          <View className='img-ph' style={{ height: 180, borderRadius: 22, position: 'relative' }}>
            <EqSilhouette kind='leg-extension' />
          </View>
        </View>

        {/* 标题 */}
        <View style={{ padding: '0 20px 16px' }}>
          <View style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3, color: '#fff' }}>下肢塑形 · 基础</View>
          <View style={{ marginTop: 8, color: 'rgba(255,255,255,0.62)', fontSize: 14, lineHeight: 1.5 }}>
            围绕股四头、腘绳与小腿展开，以固定器械为主，安全且易上手。
          </View>
          <View style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <View className='chip'>🔥 320 千卡</View>
            <View className='chip'>⏱ 45 分钟</View>
            <View className='chip'>📍 入门</View>
          </View>
        </View>

        {/* 动作列表 */}
        <View style={{ padding: '0 20px 20px' }}>
          <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>
            动作列表 · {WORKOUT_MOVES.length}
          </View>
          <View className='card' style={{ padding: 0, overflow: 'hidden' }}>
            {WORKOUT_MOVES.map((m, i) => (
              <View
                key={i}
                className='row'
                style={{ padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
              >
                <View style={{
                  width: 30, height: 30, borderRadius: 30,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.62)',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{m.name}</View>
                  <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
                    {m.focus} · {m.sets}×{m.reps} · {m.weight}kg
                  </View>
                </View>
                <View className='img-ph' style={{ width: 38, height: 38, borderRadius: 8 }} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)', boxSizing: 'border-box' }}>
        <LimeButton onClick={() => Taro.navigateTo({ url: '/pages/train/workout-go/index' })}>
          <Icon.Play size={16} color='#0a0d0a' />
          <View style={{ color: '#0a0d0a', fontWeight: 700, fontSize: 17 }}>开始训练</View>
        </LimeButton>
      </View>
    </View>
  )
}
