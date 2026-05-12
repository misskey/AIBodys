import { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import Icon from '../../../components/Icon'

interface SwitchItem { kind: 'switch'; label: string; value: boolean; set: (v: boolean) => void }
interface LinkItem { kind: 'link'; label: string; detail?: string }
type RowItem = SwitchItem | LinkItem

export default function SettingsPage() {
  const [push, setPush] = useState(true)
  const [restRem, setRestRem] = useState(true)
  const [sound, setSound] = useState(false)

  const groups: { title: string; items: RowItem[] }[] = [
    {
      title: '账号',
      items: [
        { kind: 'link', label: '微信账号', detail: '已绑定' },
        { kind: 'link', label: '手机号', detail: '138 **** 8842' },
        { kind: 'link', label: '注销账号' },
      ],
    },
    {
      title: '训练偏好',
      items: [
        { kind: 'link', label: '训练目标', detail: '塑形减脂' },
        { kind: 'link', label: '训练天数', detail: '每周 3 次' },
        { kind: 'link', label: '健康数据', detail: '身高 / 体重' },
      ],
    },
    {
      title: '通知',
      items: [
        { kind: 'switch', label: '训练提醒', value: push, set: setPush },
        { kind: 'switch', label: '休息倒计时', value: restRem, set: setRestRem },
        { kind: 'switch', label: '动作完成提示音', value: sound, set: setSound },
      ],
    },
    {
      title: '关于',
      items: [
        { kind: 'link', label: '隐私政策' },
        { kind: 'link', label: '用户协议' },
        { kind: 'link', label: '当前版本', detail: 'v 4.2.1' },
      ],
    },
  ]

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title='设置' />
      <ScrollView scrollY style={{ flex: 1, padding: '4px 20px 32px', boxSizing: 'border-box' }} className='scroll-body'>
        {groups.map(g => (
          <View key={g.title} style={{ marginBottom: 18 }}>
            <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: 0.6, margin: '8px 4px 8px' }}>
              {g.title}
            </View>
            <View className='card' style={{ padding: 0, overflow: 'hidden' }}>
              {g.items.map((it, i) => (
                <View
                  key={it.label}
                  className='row'
                  style={{ padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
                  onClick={it.kind === 'switch' ? () => it.set(!it.value) : undefined}
                >
                  <View style={{ flex: 1, fontSize: 15, color: '#fff' }}>{it.label}</View>
                  {it.kind === 'link' && (
                    <>
                      {it.detail && <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{it.detail}</View>}
                      <Icon.Chevron size={16} color='rgba(255,255,255,0.38)' sw={1.8} />
                    </>
                  )}
                  {it.kind === 'switch' && (
                    <View className={`switch-track${it.value ? ' on' : ''}`}>
                      <View className={`switch-thumb${it.value ? ' on' : ''}`} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View
          onClick={() => {
            Taro.showModal({
              title: '退出登录', content: '确定要退出登录吗？',
              success: (res) => { if (res.confirm) Taro.reLaunch({ url: '/pages/auth/login/index' }) },
            })
          }}
          style={{
            width: '100%', padding: 14, borderRadius: 14,
            background: 'var(--surface)', border: '1px solid var(--line)',
            color: '#ff6363', fontSize: 15, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 8, boxSizing: 'border-box',
          }}
        >
          退出登录
        </View>
      </ScrollView>
    </View>
  )
}
