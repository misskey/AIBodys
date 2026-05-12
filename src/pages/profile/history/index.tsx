import { View, ScrollView } from '@tarojs/components'
import PageHeader from '../../../components/PageHeader'
import Icon from '../../../components/Icon'
import { Ring } from '../../../components'

const RECORDS = [
  { date: '08月12日 周一', plan: '下肢塑形 · 基础', dur: 42, cal: 316 },
  { date: '08月10日 周六', plan: '上肢力量 · 推举', dur: 51, cal: 384 },
  { date: '08月08日 周四', plan: '核心稳定 · 全套', dur: 28, cal: 220 },
  { date: '08月06日 周二', plan: '下肢塑形 · 基础', dur: 40, cal: 302 },
  { date: '08月03日 周六', plan: '背部塑造 · 中级', dur: 56, cal: 410 },
]

export default function HistoryPage() {
  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title='训练历史' />
      <ScrollView scrollY style={{ flex: 1, padding: '4px 20px 32px', boxSizing: 'border-box' }} className='scroll-body'>
        {/* 本月坚持率 */}
        <View className='card' style={{ padding: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Ring value={0.78} size={70} thick={7}>
            <View style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>78%</View>
          </Ring>
          <View style={{ flex: 1 }}>
            <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>本月坚持率</View>
            <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', marginTop: 4, lineHeight: 1.5 }}>
              比上月提升 +6%，连续打卡 <View style={{ display: 'inline', color: '#ceff4d', fontWeight: 700 }}>5 天</View>
            </View>
          </View>
        </View>

        <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>近期记录</View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RECORDS.map((d, i) => (
            <View key={i} className='card' style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <View style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'rgba(206,255,77,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon.Check size={20} sw={2.5} color='#ceff4d' />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{d.plan}</View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>
                  {d.date} · {d.dur} 分钟 · {d.cal} 千卡
                </View>
              </View>
              <Icon.Chevron size={16} color='rgba(255,255,255,0.38)' sw={1.8} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
