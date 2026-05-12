import { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import LimeButton from '../../../components/LimeButton'
import Icon from '../../../components/Icon'
import { EqSilhouette, Bar } from '../../../components'
import { findEquipment } from '../../../data/equipment'

const TABS = ['使用指南', '肌肉解析', '参数建议']

const SETUP_STEPS = [
  '调整座椅高度，使膝盖与转轴对齐。',
  '调整靠垫位置，确保小腿在靠垫上方，脚踝贴合。',
  '选择合适重量，双手握住把手，保持上身稳定。',
]

const COMMON_ERRORS = [
  { name: '腰部离开靠背', desc: '容易导致腰部代偿受伤' },
  { name: '膝盖内扣', desc: '可能增加膝关节压力' },
  { name: '过度伸直膝盖', desc: '可能造成膝关节超伸' },
]

const DEMO_POSES = ['起始姿势', '发力伸腿', '顶峰收缩']

const PARAMS = [
  { l: '建议重量', v: '22-28 kg' },
  { l: '建议次数', v: '10-12 次' },
  { l: '建议组数', v: '3 组' },
  { l: '组间休息', v: '60 秒' },
]

export default function EquipmentDetailPage() {
  const router = useRouter()
  const id = router.params?.id as string
  const item = findEquipment(id)
  const [tab, setTab] = useState(0)

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='器械详情'
        right={
          <View className='iconbtn'>
            <Icon.Heart size={18} sw={1.8} color='#fff' />
          </View>
        }
      />

      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        {/* 器械信息头部 */}
        <View style={{ padding: '4px 20px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <View style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>{item.name}</View>
            <View style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, marginTop: 4 }}>主要锻炼部位</View>
            <View style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {item.focus.map(f => (
                <View key={f} className='chip'>{f}</View>
              ))}
            </View>
          </View>
          <View className='img-ph' style={{ width: 130, height: 100, borderRadius: 14, position: 'relative', flexShrink: 0 }}>
            <EqSilhouette kind={item.silhouette ?? 'leg-extension'} />
          </View>
        </View>

        {/* 分段 Tab */}
        <View style={{ padding: '0 20px' }}>
          <View className='tabs'>
            {TABS.map((t, i) => (
              <View key={t} className={`tab-item${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</View>
            ))}
          </View>
        </View>

        {/* 使用指南 */}
        {tab === 0 && (
          <View style={{ padding: '18px 20px 24px' }}>
            <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>器械设置步骤</View>
            <View className='card' style={{ padding: 0, overflow: 'hidden' }}>
              {SETUP_STEPS.map((t, i) => (
                <View key={i} className='row' style={{ padding: '12px 14px', alignItems: 'flex-start', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
                  <View style={{
                    width: 22, height: 22, borderRadius: 22,
                    border: '1.5px solid #ceff4d',
                    color: '#ceff4d', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                    boxSizing: 'border-box',
                  }}>
                    {i + 1}
                  </View>
                  <View style={{ fontSize: 13, lineHeight: 1.55, color: '#fff' }}>{t}</View>
                </View>
              ))}
            </View>

            <View style={{ fontSize: 17, fontWeight: 600, marginTop: 22, marginBottom: 12, color: '#fff' }}>常见错误</View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMMON_ERRORS.map((err, i) => (
                <View key={i} className='card-dim' style={{ padding: '10px 12px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <View className='img-ph' style={{ width: 50, height: 44, borderRadius: 8, position: 'relative', flexShrink: 0 }}>
                    <View style={{
                      position: 'absolute', right: -4, bottom: -4,
                      width: 18, height: 18, borderRadius: 18,
                      background: '#ff6363',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon.Close size={11} color='#fff' sw={3} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{err.name}</View>
                    <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{err.desc}</View>
                  </View>
                </View>
              ))}
            </View>

            {/* 安全提示 */}
            <View style={{
              marginTop: 22, padding: 14, borderRadius: 14,
              background: 'rgba(206,255,77,0.08)',
              border: '1px solid rgba(206,255,77,0.20)',
              display: 'flex', gap: 12,
            }}>
              <Icon.Shield size={22} color='#ceff4d' sw={1.8} />
              <View style={{ flex: 1 }}>
                <View style={{ fontSize: 14, fontWeight: 600, color: '#ceff4d' }}>安全提示</View>
                <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, marginTop: 4 }}>
                  保持动作可控，避免惯性借力；如有膝关节伤病，请在教练指导下进行训练。
                </View>
              </View>
            </View>

            {/* 动作演示 */}
            <View style={{ fontSize: 17, fontWeight: 600, marginTop: 22, marginBottom: 12, color: '#fff' }}>
              动作演示 <View style={{ display: 'inline', color: 'rgba(255,255,255,0.38)', fontSize: 11, fontWeight: 500 }}>(AI 生成)</View>
            </View>
            <ScrollView scrollX>
              <View style={{ display: 'flex', gap: 10, paddingBottom: 4 }}>
                {DEMO_POSES.map(t => (
                  <View key={t} style={{ width: 110, flexShrink: 0 }}>
                    <View className='img-ph' style={{ height: 80, borderRadius: 12, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{
                        width: 30, height: 30, borderRadius: 30,
                        background: 'rgba(255,255,255,0.85)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon.Play size={14} color='#0a0d0a' />
                      </View>
                    </View>
                    <View style={{ fontSize: 12, marginTop: 6, textAlign: 'center', color: 'rgba(255,255,255,0.62)' }}>{t}</View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* 肌肉解析 */}
        {tab === 1 && (
          <View style={{ padding: '18px 20px 24px' }}>
            <View className='card' style={{ padding: 18 }}>
              <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>主要肌群</View>
              {item.focus.map((f, i) => (
                <View key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: i === 0 ? 0 : 12 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{f}</View>
                    <View style={{ marginTop: 6 }}>
                      <Bar value={i === 0 ? 0.85 : 0.55} />
                    </View>
                  </View>
                  <View style={{ fontSize: 13, color: '#ceff4d', fontWeight: 600 }}>{i === 0 ? '主练' : '辅助'}</View>
                </View>
              ))}
            </View>
            <View className='card' style={{ padding: 14, marginTop: 12, display: 'flex', gap: 12 }}>
              <View style={{ width: 38, height: 38, borderRadius: 38, background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)', flexShrink: 0 }} />
              <View style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
                <View style={{ display: 'inline', color: '#ceff4d', fontWeight: 600 }}>AI 解析：</View>
                该动作主要刺激股四头肌的四个头，特别是股直肌；同时对膝关节稳定肌群有强化作用，适合恢复期和入门训练者。
              </View>
            </View>
          </View>
        )}

        {/* 参数建议 */}
        {tab === 2 && (
          <View style={{ padding: '18px 20px 24px' }}>
            <View style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: '#fff' }}>
              建议参数 <View style={{ display: 'inline', color: 'rgba(255,255,255,0.38)', fontSize: 11, fontWeight: 500 }}>(基于你的数据)</View>
            </View>
            <View className='card' style={{ padding: 0 }}>
              {PARAMS.map((r, i) => (
                <View key={r.l} className='row' style={{ padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
                  <View style={{ flex: 1, fontSize: 14, color: '#fff' }}>{r.l}</View>
                  <View style={{ fontSize: 14, fontWeight: 600, color: '#ceff4d' }}>{r.v}</View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)', boxSizing: 'border-box' }}>
        <LimeButton onClick={() => Taro.showToast({ title: '已加入今日训练', icon: 'success' })}>
          <Icon.Plus size={16} color='#0a0d0a' sw={2.5} />
          <View style={{ color: '#0a0d0a', fontWeight: 700, fontSize: 17 }}>加入今日训练</View>
        </LimeButton>
      </View>
    </View>
  )
}
