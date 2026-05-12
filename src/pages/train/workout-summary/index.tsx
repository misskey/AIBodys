import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import LimeButton from '../../../components/LimeButton'
import Icon from '../../../components/Icon'

const STATS = [
  { label: '用时', value: '42', unit: '分钟' },
  { label: '消耗', value: '316', unit: '千卡' },
  { label: '总组数', value: '13', unit: '组' },
  { label: '总次数', value: '142', unit: '次' },
]

export default function WorkoutSummaryPage() {
  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title='训练完成' />

      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        <View style={{ padding: '12px 20px 32px' }}>
          {/* 庆祝头部 */}
          <View style={{ textAlign: 'center', padding: '20px 0 30px' }}>
            <View style={{
              width: 96, height: 96, borderRadius: 96,
              background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)',
              margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(206,255,77,0.30)',
            }}>
              <Icon.Trophy size={48} color='#0a0d0a' sw={2} />
            </View>
            <View style={{ fontSize: 26, fontWeight: 700, marginTop: 20, color: '#fff' }}>训练完成 🎉</View>
            <View style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, marginTop: 6 }}>下肢塑形 · 基础</View>
          </View>

          {/* 数据统计 */}
          <View className='card' style={{ padding: 18, marginBottom: 14 }}>
            <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>本次表现</View>
            <View style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {STATS.map(s => (
                <View key={s.label} className='card-dim' style={{ padding: 14 }}>
                  <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{s.label}</View>
                  <View style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                    <View style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{s.value}</View>
                    <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{s.unit}</View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* AI 点评 */}
          <View className='card' style={{ padding: 16, marginBottom: 14, display: 'flex', gap: 12 }}>
            <View style={{ width: 38, height: 38, borderRadius: 38, background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)', flexShrink: 0 }} />
            <View style={{ flex: 1 }}>
              <View style={{ fontSize: 13, color: '#ceff4d', fontWeight: 600 }}>AI 教练点评</View>
              <View style={{ fontSize: 13, color: '#fff', lineHeight: 1.6, marginTop: 6 }}>
                整组动作稳定性较上次有 12% 提升，第 3 个动作离心阶段控制略快，下次可放慢节奏。建议下次将腿举重量提升到 85kg。
              </View>
            </View>
          </View>

          {/* 经验值 */}
          <View className='card-dim' style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon.Star size={20} color='#ceff4d' sw={1.8} />
            <View style={{ flex: 1, fontSize: 13, color: '#fff' }}>
              获得 <View style={{ display: 'inline', color: '#ceff4d', fontWeight: 700 }}>+24</View> 经验，距离下个等级还差 76 经验
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: '12px 20px 36px', boxSizing: 'border-box' }}>
        <LimeButton onClick={() => Taro.reLaunch({ url: '/pages/main/index' })}>
          <View style={{ color: '#0a0d0a', fontWeight: 700, fontSize: 17 }}>完成</View>
        </LimeButton>
      </View>
    </View>
  )
}
