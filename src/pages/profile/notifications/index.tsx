import { View, ScrollView } from '@tarojs/components'
import PageHeader from '../../../components/PageHeader'
import Icon from '../../../components/Icon'
import type { Notification } from '../../../types'

const ITEMS: Notification[] = [
  { kind: 'ai', title: 'AI 教练', text: '检测到你已 2 天未训练，今天来打个卡吧 💪', time: '15 分钟前' },
  { kind: 'plan', title: '计划提醒', text: '今日下肢塑形训练即将开始', time: '2 小时前' },
  { kind: 'achievement', title: '成就解锁', text: '🎉 连续打卡 5 天，解锁「坚持者」徽章', time: '1 天前' },
  { kind: 'plan', title: '反馈生成', text: '上次训练 AI 报告已就绪，来看看吧', time: '2 天前' },
]

export default function NotificationsPage() {
  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title='消息通知' />
      <ScrollView scrollY style={{ flex: 1, padding: '4px 20px 32px', boxSizing: 'border-box' }} className='scroll-body'>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ITEMS.map((it, i) => (
            <View key={i} className='card' style={{ padding: 14, display: 'flex', gap: 12 }}>
              <View style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: it.kind === 'ai' ? 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)' :
                  it.kind === 'achievement' ? 'rgba(249,176,74,0.18)' : 'rgba(206,255,77,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {it.kind === 'achievement'
                  ? <Icon.Trophy size={18} sw={1.8} color='#f9b04a' />
                  : it.kind === 'plan'
                    ? <Icon.Bell size={18} sw={1.8} color='#ceff4d' />
                    : null}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{it.title}</View>
                  <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{it.time}</View>
                </View>
                <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', marginTop: 4, lineHeight: 1.5 }}>{it.text}</View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
