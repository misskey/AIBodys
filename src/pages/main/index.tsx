/**
 * 主容器页面：管理三个 Tab（首页 / 训练 / 我的）
 * 子页面通过 Taro.navigateTo 跳转，无需在此管理
 */
import { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TabBar from '../../components/TabBar'
import Icon from '../../components/Icon'
import { Avatar, Ring, Bar, EqSilhouette } from '../../components'
import type { TabId } from '../../types'
import { WORKOUT_PLANS } from '../../data/workouts'

// ─────────────────────────────────────────────────────────────
// 首页 Tab
// ─────────────────────────────────────────────────────────────
function HomeTab() {
  const hour = new Date().getHours()
  const greet = hour < 6 ? '夜深了' : hour < 11 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
  const [aiOpen, setAiOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { from: 'ai', text: '嗨，今天想练哪个部位？我可以基于你最近的训练数据给出建议 ✨' },
  ])
  const [input, setInput] = useState('')

  const sendMsg = () => {
    if (!input.trim()) return
    const q = input.trim()
    setMsgs(m => [...m, { from: 'me', text: q }])
    setInput('')
    setTimeout(() => {
      setMsgs(m => [...m, { from: 'ai', text: '建议先做坐姿腿屈伸 3 组热身，再进入主项目。我已为你准备好今日计划，要现在开始吗？' }])
    }, 700)
  }

  return (
    <View style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        <View style={{ paddingTop: 56 }}>
          {/* 顶部栏 */}
          <View style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <View style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 20, height: 20, background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)', borderRadius: 6 }} />
              </View>
              <View style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>智炼 AI</View>
            </View>
            <View className='iconbtn' onClick={() => Taro.navigateTo({ url: '/pages/profile/notifications/index' })}>
              <Icon.Bell size={18} sw={1.8} color='#fff' />
            </View>
          </View>

          {/* 问候语 */}
          <View style={{ padding: '6px 20px 18px' }}>
            <View style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3, color: '#fff' }}>
              {greet}，小炼 👋
            </View>
            <View style={{ marginTop: 4, color: 'rgba(255,255,255,0.62)', fontSize: 14 }}>
              今天也一起变得更强吧。
            </View>
          </View>

          {/* AI 教练入口 */}
          <View style={{ padding: '0 20px 16px' }}>
            <View
              onClick={() => setAiOpen(true)}
              style={{
                background: 'var(--surface)',
                borderRadius: 100,
                padding: '10px 14px 10px 10px',
                display: 'flex', alignItems: 'center', gap: 10,
                border: '1px solid var(--line)',
                boxSizing: 'border-box',
              }}
            >
              <View style={{ width: 30, height: 30, borderRadius: 30, background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)', flexShrink: 0 }} />
              <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>AI 教练</View>
              <View style={{ fontSize: 11, color: '#ceff4d', background: 'rgba(206,255,77,0.10)', padding: '3px 7px', borderRadius: 100, fontWeight: 500 }}>
                ● 在线
              </View>
              <View style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>随时为你指导</View>
              <View style={{ marginLeft: 'auto' }}>
                <Icon.Chevron size={16} sw={2} color='rgba(255,255,255,0.38)' />
              </View>
            </View>
          </View>

          {/* 下次训练卡 */}
          <View style={{ padding: '0 20px 16px' }}>
            <View className='card' style={{ overflow: 'hidden', position: 'relative' }}>
              <View style={{ display: 'flex', alignItems: 'stretch' }}>
                <View style={{ padding: '18px 16px 18px 18px', flex: 1, position: 'relative', zIndex: 1 }}>
                  <View style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12, marginBottom: 6 }}>下一次训练</View>
                  <View style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, color: '#fff' }}>下肢塑形 · 基础</View>
                  <View style={{ marginTop: 8, color: 'rgba(255,255,255,0.62)', fontSize: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <View>固定器械</View>
                    <View style={{ color: 'rgba(255,255,255,0.38)' }}>·</View>
                    <View>安全优先</View>
                    <View style={{ color: 'rgba(255,255,255,0.38)' }}>·</View>
                    <View>45 分钟</View>
                  </View>
                  <View
                    className='btn-lime'
                    onClick={() => Taro.navigateTo({ url: '/pages/train/workout-intro/index' })}
                    style={{ marginTop: 16, padding: '11px 18px', fontSize: 14, width: 'auto', display: 'inline-flex', borderRadius: 100 }}
                  >
                    开始训练
                    <Icon.Chevron size={14} sw={2.5} color='#0a0d0a' />
                  </View>
                </View>
                <View style={{ width: 130, flexShrink: 0, position: 'relative' }}>
                  <View className='img-ph' style={{ position: 'absolute', inset: 0 }}>
                    <EqSilhouette kind='leg-extension' />
                  </View>
                  <View style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--surface) 0%, transparent 35%)' }} />
                </View>
              </View>
            </View>
          </View>

          {/* 周进度 */}
          <View style={{ padding: '0 20px 16px' }}>
            <View className='card' style={{ padding: 18 }}>
              <View style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: '#fff' }}>本周进度</View>
              <View style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <Ring value={0.75} size={84} thick={8}>
                  <View style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>75%</View>
                  <View style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>完成度</View>
                </Ring>
                <View style={{ flex: 1 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)' }}>本周训练</View>
                    <View style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>3<View style={{ display: 'inline', color: 'rgba(255,255,255,0.38)' }}> / 4 次</View></View>
                  </View>
                  <View style={{ marginTop: 8 }}><Bar value={0.75} /></View>
                  <View style={{ display: 'flex', gap: 18, marginTop: 14 }}>
                    <View>
                      <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>总时长</View>
                      <View style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: '#fff' }}>126<View style={{ display: 'inline', fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}> 分钟</View></View>
                    </View>
                    <View>
                      <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>消耗</View>
                      <View style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: '#fff' }}>1,020<View style={{ display: 'inline', fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}> 千卡</View></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 上次反馈 */}
          <View style={{ padding: '0 20px 16px' }}>
            <View className='card' style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => Taro.navigateTo({ url: '/pages/profile/history/index' })}>
              <View style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(206,255,77,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ceff4d' }}>
                <Icon.Wave size={24} sw={2} color='#ceff4d' />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>上次训练反馈</View>
                <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', marginTop: 3, lineHeight: 1.4 }}>
                  整体表现不错！动作稳定性提升，继续保持 💪
                </View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 5 }}>腿部推蹬机 · 8 月 10 日</View>
              </View>
              <Icon.Chevron size={18} color='rgba(255,255,255,0.38)' sw={1.8} />
            </View>
          </View>

          {/* 快捷入口 */}
          <View style={{ padding: '0 20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <View
              className='card'
              onClick={() => Taro.navigateTo({ url: '/pages/equipment/scan/index' })}
              style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <View style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(206,255,77,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.Scan size={22} sw={1.8} color='#ceff4d' />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>扫描器械</View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>AI 识别 · 一键指导</View>
              </View>
            </View>
            <View
              className='card'
              onClick={() => Taro.navigateTo({ url: '/pages/equipment/library/index' })}
              style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <View style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(206,255,77,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.Book size={22} sw={1.8} color='#ceff4d' />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>器械库</View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>浏览 · 正确用法</View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* AI 教练底部弹窗 */}
      {aiOpen && (
        <View style={{ position: 'absolute', inset: 0, zIndex: 90 }}>
          <View style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setAiOpen(false)} />
          <View style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: '#1a1e1f',
            borderRadius: '28px 28px 0 0',
            padding: '14px 20px 32px',
            height: '74%',
            display: 'flex', flexDirection: 'column',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            boxSizing: 'border-box',
          }}>
            <View style={{ width: 40, height: 4, borderRadius: 100, background: 'rgba(255,255,255,0.18)', margin: '4px auto 16px' }} />
            <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <View style={{ width: 36, height: 36, borderRadius: 36, background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)' }} />
              <View>
                <View style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>AI 教练</View>
                <View style={{ fontSize: 11, color: '#ceff4d' }}>● 在线 · 智炼 4.0</View>
              </View>
              <View className='iconbtn' style={{ marginLeft: 'auto' }} onClick={() => setAiOpen(false)}>
                <Icon.Close size={16} sw={2} color='#fff' />
              </View>
            </View>
            <ScrollView scrollY style={{ flex: 1 }}>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 12 }}>
                {msgs.map((m, i) => (
                  <View key={i} style={{
                    alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                    padding: '10px 14px',
                    borderRadius: 16,
                    fontSize: 14, lineHeight: 1.5,
                    background: m.from === 'me' ? '#ceff4d' : 'rgba(255,255,255,0.07)',
                    color: m.from === 'me' ? '#0a0d0a' : '#fff',
                  }}>{m.text}</View>
                ))}
              </View>
            </ScrollView>
            <View style={{
              display: 'flex', gap: 8, alignItems: 'center',
              background: 'rgba(255,255,255,0.06)', borderRadius: 100,
              padding: '6px 6px 6px 16px', marginTop: 8,
            }}>
              <input
                value={input}
                onChange={(e: any) => setInput(e.detail?.value ?? e.target?.value ?? '')}
                onConfirm={sendMsg}
                placeholder='向 AI 教练提问...'
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14, padding: '8px 0' }}
              />
              <View
                onClick={sendMsg}
                style={{ width: 36, height: 36, borderRadius: 36, background: '#ceff4d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <Icon.Send size={16} color='#0a0d0a' sw={2} />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

// ─────────────────────────────────────────────────────────────
// 训练 Tab
// ─────────────────────────────────────────────────────────────
function TrainTab() {
  const filters = ['全部', '下肢', '上肢', '核心', '背部', '全身']
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
      <View style={{ paddingTop: 56 }}>
        <View style={{ padding: '18px 20px 6px' }}>
          <View style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.3, color: '#fff' }}>训练计划</View>
          <View style={{ marginTop: 4, color: 'rgba(255,255,255,0.62)', fontSize: 14 }}>为你定制的 4 个计划 · 本周</View>
        </View>

        {/* 分类筛选 */}
        <ScrollView scrollX style={{ padding: '14px 20px 18px' }}>
          <View style={{ display: 'flex', gap: 8 }}>
            {filters.map((t, i) => (
              <View
                key={t}
                onClick={() => setActiveFilter(i)}
                style={{
                  padding: '8px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500,
                  background: activeFilter === i ? '#ceff4d' : 'var(--surface)',
                  color: activeFilter === i ? '#0a0d0a' : 'rgba(255,255,255,0.62)',
                  border: `1px solid ${activeFilter === i ? '#ceff4d' : 'var(--line)'}`,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                {t}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* 计划列表 */}
        <View style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {WORKOUT_PLANS.map((p, i) => (
            <View
              key={p.id}
              className='card'
              onClick={() => Taro.navigateTo({ url: '/pages/train/workout-intro/index' })}
              style={{ overflow: 'hidden' }}
            >
              <View style={{ display: 'flex', alignItems: 'stretch' }}>
                <View className='img-ph' style={{ width: 110, flexShrink: 0, position: 'relative', minHeight: 100 }}>
                  <EqSilhouette kind={p.silhouette ?? 'dumbbell'} />
                </View>
                <View style={{ flex: 1, padding: 14 }}>
                  {p.tag && (
                    <View style={{ fontSize: 10, color: '#ceff4d', background: 'rgba(206,255,77,0.10)', padding: '3px 7px', borderRadius: 6, fontWeight: 600, display: 'inline-flex' }}>
                      {p.tag}
                    </View>
                  )}
                  <View style={{ fontSize: 16, fontWeight: 600, marginTop: p.tag ? 8 : 0, color: '#fff' }}>{p.name}</View>
                  <View style={{ marginTop: 10, color: 'rgba(255,255,255,0.62)', fontSize: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <View>{p.level}</View>
                    <View style={{ color: 'rgba(255,255,255,0.38)' }}>·</View>
                    <View>{p.moves} 动作</View>
                    <View style={{ color: 'rgba(255,255,255,0.38)' }}>·</View>
                    <View>{p.dur} 分钟</View>
                    <View style={{ color: 'rgba(255,255,255,0.38)' }}>·</View>
                    <View>约 {p.cal} 千卡</View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

// ─────────────────────────────────────────────────────────────
// 我的 Tab
// ─────────────────────────────────────────────────────────────
function MeTab() {
  const menuGroup1 = [
    { icon: Icon.Calendar, label: '训练历史', detail: '23 次', url: '/pages/profile/history/index' },
    { icon: Icon.Chart, label: '数据中心', detail: '本周 +12%', url: '/pages/profile/history/index' },
    { icon: Icon.Heart, label: '收藏器械', detail: '5', url: '/pages/equipment/library/index' },
    { icon: Icon.Trophy, label: '成就', detail: '8/24', url: '/pages/profile/history/index' },
  ]
  const menuGroup2 = [
    { icon: Icon.Bell, label: '消息通知', url: '/pages/profile/notifications/index' },
    { icon: Icon.Shield, label: '账号与安全', url: '/pages/profile/settings/index' },
    { icon: Icon.Globe, label: '语言', detail: '简体中文', url: '/pages/profile/settings/index' },
    { icon: Icon.Help, label: '帮助与反馈', url: '/pages/profile/settings/index' },
    { icon: Icon.Settings, label: '设置', url: '/pages/profile/settings/index' },
  ]

  return (
    <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
      <View style={{ paddingTop: 56 }}>
        {/* 个人信息卡 */}
        <View style={{
          margin: '12px 20px 16px',
          padding: 20,
          borderRadius: 22,
          background: 'linear-gradient(150deg, rgba(206,255,77,0.18) 0%, rgba(206,255,77,0.04) 60%, var(--surface) 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxSizing: 'border-box',
        }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name='小炼' size={56} />
            <View style={{ flex: 1 }}>
              <View style={{ fontSize: 19, fontWeight: 700, color: '#fff' }}>小炼</View>
              <View style={{ marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                <View style={{ fontSize: 11, color: '#ceff4d', background: 'rgba(206,255,77,0.10)', padding: '2px 8px', borderRadius: 100, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Icon.Crown size={11} color='#ceff4d' sw={2} /> Lv.4 健将
                </View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>ID 884213</View>
              </View>
            </View>
            <View className='iconbtn' onClick={() => Taro.navigateTo({ url: '/pages/profile/settings/index' })}>
              <Icon.Settings size={18} sw={1.6} color='#fff' />
            </View>
          </View>
          <View style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 20, textAlign: 'center' }}>
            {[{ v: '23', l: '累计训练' }, { v: '14.2h', l: '训练时长' }, { v: '3,820', l: '消耗千卡' }].map(s => (
              <View key={s.l}>
                <View style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.v}</View>
                <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>{s.l}</View>
              </View>
            ))}
          </View>
        </View>

        {/* PRO 会员 */}
        <View style={{ padding: '0 20px 16px' }}>
          <View
            className='card'
            onClick={() => Taro.navigateTo({ url: '/pages/profile/vip/index' })}
            style={{
              padding: 16,
              background: 'linear-gradient(120deg, #2a1f08, #1a1a08)',
              border: '1px solid rgba(249,176,74,0.30)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <View style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #f9d28a, #f9b04a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.Crown size={20} color='#3a2208' sw={2} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ fontSize: 14, fontWeight: 600, color: '#f9d28a' }}>开通 PRO 会员</View>
              <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', marginTop: 2 }}>解锁 AI 教练高级模式 · 无限计划</View>
            </View>
            <Icon.Chevron size={16} color='#f9d28a' sw={2} />
          </View>
        </View>

        {/* 菜单组 1 */}
        <View style={{ padding: '0 20px 14px' }}>
          <View className='card' style={{ padding: 0, overflow: 'hidden' }}>
            {menuGroup1.map((r, i) => {
              const IC = r.icon
              return (
                <View
                  key={r.label}
                  className='row'
                  onClick={() => Taro.navigateTo({ url: r.url })}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
                >
                  <View style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IC size={17} sw={1.8} color='#ceff4d' />
                  </View>
                  <View style={{ flex: 1, fontSize: 15, color: '#fff' }}>{r.label}</View>
                  {r.detail && <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{r.detail}</View>}
                  <Icon.Chevron size={16} color='rgba(255,255,255,0.38)' sw={1.8} />
                </View>
              )
            })}
          </View>
        </View>

        {/* 菜单组 2 */}
        <View style={{ padding: '0 20px 14px' }}>
          <View className='card' style={{ padding: 0, overflow: 'hidden' }}>
            {menuGroup2.map((r, i) => {
              const IC = r.icon
              return (
                <View
                  key={r.label}
                  className='row'
                  onClick={() => Taro.navigateTo({ url: r.url })}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
                >
                  <View style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IC size={17} sw={1.8} color='rgba(255,255,255,0.62)' />
                  </View>
                  <View style={{ flex: 1, fontSize: 15, color: '#fff' }}>{r.label}</View>
                  {(r as any).detail && <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{(r as any).detail}</View>}
                  <Icon.Chevron size={16} color='rgba(255,255,255,0.38)' sw={1.8} />
                </View>
              )
            })}
          </View>
        </View>

        {/* 退出登录 */}
        <View style={{ padding: '6px 20px 28px' }}>
          <View
            onClick={() => {
              Taro.showModal({ title: '退出登录', content: '确定要退出登录吗？', success: (res) => { if (res.confirm) Taro.reLaunch({ url: '/pages/auth/login/index' }) } })
            }}
            style={{
              width: '100%', padding: 14, borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--line)',
              color: '#ff6363', fontSize: 15, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxSizing: 'border-box',
            }}
          >
            <Icon.Logout size={17} sw={1.8} color='#ff6363' />
            <View style={{ color: '#ff6363', fontSize: 15 }}>退出登录</View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

// ─────────────────────────────────────────────────────────────
// 主页面容器
// ─────────────────────────────────────────────────────────────
export default function MainPage() {
  const [tab, setTab] = useState<TabId>('home')

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      {/* Tab 内容区 */}
      <View style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {tab === 'home' && <HomeTab />}
        {tab === 'train' && <TrainTab />}
        {tab === 'me' && <MeTab />}
      </View>

      {/* 底部 TabBar */}
      <TabBar active={tab} onNav={setTab} />
    </View>
  )
}
