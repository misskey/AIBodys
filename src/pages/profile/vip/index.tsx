import { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import Icon from '../../../components/Icon'

interface Plan { id: string; name: string; price: number; period: string; tag?: string; save?: string }

const PLANS: Plan[] = [
  { id: 'month', name: '月度会员', price: 28, period: '/月' },
  { id: 'year', name: '年度会员', price: 198, period: '/年', tag: '省 41%', save: '日均 ¥0.54' },
  { id: 'lifetime', name: '终身会员', price: 988, period: '一次性' },
]

const BENEFITS = [
  { l: 'AI 教练高级模式', d: '语音指导 · 动作实时纠正' },
  { l: '专属训练计划', d: '基于体测数据深度定制' },
  { l: '全量器械识别', d: '500+ 器械支持' },
  { l: '数据深度分析', d: '肌群训练分布报告' },
]

export default function VipPage() {
  const [plan, setPlan] = useState('year')

  return (
    <View style={{ position: 'fixed', inset: 0, background: 'linear-gradient(180deg, #1a1408 0%, #0a0d0a 40%)', display: 'flex', flexDirection: 'column' }}>
      <PageHeader transparent />

      <ScrollView scrollY style={{ flex: 1, padding: '4px 20px 24px', boxSizing: 'border-box' }} className='scroll-body'>
        {/* 头部 */}
        <View style={{ textAlign: 'center', padding: '12px 0 28px' }}>
          <View style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'linear-gradient(135deg, #f9d28a, #f9b04a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 12px 30px rgba(249,176,74,0.30)',
          }}>
            <Icon.Crown size={32} color='#3a2208' sw={2} />
          </View>
          <View style={{ fontSize: 26, fontWeight: 700, marginTop: 16, color: '#fff' }}>
            智炼 <View style={{ display: 'inline', color: '#f9d28a' }}>PRO</View>
          </View>
          <View style={{ marginTop: 6, color: 'rgba(255,255,255,0.62)', fontSize: 14 }}>解锁全部 AI 能力</View>
        </View>

        {/* 权益列表 */}
        <View className='card' style={{ padding: 18, marginBottom: 18 }}>
          {BENEFITS.map((b, i) => (
            <View key={b.l} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: i === 0 ? 0 : 14 }}>
              <View style={{
                width: 22, height: 22, borderRadius: 22,
                background: 'rgba(249,176,74,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                <Icon.Check size={13} sw={3} color='#f9d28a' />
              </View>
              <View>
                <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{b.l}</View>
                <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{b.d}</View>
              </View>
            </View>
          ))}
        </View>

        {/* 套餐选择 */}
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PLANS.map(p => (
            <View
              key={p.id}
              onClick={() => setPlan(p.id)}
              style={{
                padding: 16, borderRadius: 16,
                background: plan === p.id ? 'rgba(249,210,138,0.10)' : 'var(--surface)',
                border: `1.5px solid ${plan === p.id ? '#f9d28a' : 'var(--line)'}`,
                display: 'flex', alignItems: 'center', gap: 12,
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              <View style={{
                width: 18, height: 18, borderRadius: 18,
                border: plan === p.id ? 'none' : '1.5px solid rgba(255,255,255,0.38)',
                background: plan === p.id ? '#f9d28a' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxSizing: 'border-box',
              }}>
                {plan === p.id && <Icon.Check size={12} color='#3a2208' sw={3} />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{p.name}</View>
                {p.save && <View style={{ fontSize: 11, color: '#f9d28a', marginTop: 3 }}>{p.save}</View>}
              </View>
              <View style={{ textAlign: 'right' }}>
                <View style={{ fontSize: 18, fontWeight: 700, color: '#f9d28a' }}>
                  ¥{p.price}
                  <View style={{ display: 'inline', fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}>{p.period}</View>
                </View>
              </View>
              {p.tag && (
                <View style={{
                  position: 'absolute', top: -8, right: 12,
                  fontSize: 10, color: '#3a2208',
                  background: '#f9d28a', padding: '2px 8px', borderRadius: 100, fontWeight: 700,
                }}>
                  {p.tag}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ padding: '12px 20px 36px', boxSizing: 'border-box' }}>
        <View
          onClick={() => Taro.showToast({ title: '支付功能开发中', icon: 'none' })}
          style={{
            width: '100%', padding: 16,
            borderRadius: 100, fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(120deg, #f9d28a, #f9b04a)',
            color: '#3a2208',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          立即开通
        </View>
        <View style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 10 }}>
          自动续费可在「设置」中关闭 · 支持微信/Apple 支付
        </View>
      </View>
    </View>
  )
}
