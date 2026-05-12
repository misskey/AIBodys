import { useState } from 'react'
import { View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Icon, { WeChatIcon } from '../../../components/Icon'
import LimeButton from '../../../components/LimeButton'

function FigureMark({ size = 64, color = '#0a0d0a' }: { size?: number; color?: string }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">` +
    `<circle cx="32" cy="14" r="6" fill="${color}" opacity="0.9"/>` +
    `<path d="M22 26h20l-3 14h-6l-3-14z" fill="${color}" opacity="0.4"/>` +
    `<rect x="14" y="34" width="36" height="3" rx="1.5" fill="${color}"/>` +
    `<rect x="10" y="30" width="4" height="11" rx="1" fill="${color}"/>` +
    `<rect x="50" y="30" width="4" height="11" rx="1" fill="${color}"/>` +
    `</svg>`
  const src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`
  return <image src={src} style={{ width: size, height: size }} mode='scaleToFill' />
}

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (kind: 'wechat' | 'phone') => {
    if (!agreed) {
      Taro.showToast({ title: '请先同意用户协议', icon: 'none' })
      return
    }
    setLoading(true)
    // 实际项目此处调用微信登录 API：wx.login() → 服务端换取 openid → JWT
    setTimeout(() => {
      setLoading(false)
      Taro.navigateTo({ url: '/pages/auth/onboarding/index' })
    }, 900)
  }

  return (
    <View style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0d0a',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 背景渐变 */}
      <View style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 60% at 30% 0%, rgba(206,255,77,0.10) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(80,160,80,0.08) 0%, transparent 60%), #0a0d0a',
      }} />

      <View style={{
        position: 'relative',
        flex: 1,
        padding: '88px 28px 40px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        {/* 品牌 logo */}
        <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <View style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FigureMark size={32} color='#0a0d0a' />
          </View>
          <View style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>
            智炼 <View style={{ display: 'inline', color: '#ceff4d' }}>AI</View>
          </View>
        </View>

        {/* 标语 */}
        <View style={{ marginTop: 72 }}>
          <View style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.12, letterSpacing: -0.5, color: '#fff' }}>
            欢迎回来,{'\n'}
            <View style={{ display: 'inline', color: '#ceff4d' }}>开始今天</View>的训练吧
          </View>
          <View style={{ marginTop: 16, color: 'rgba(255,255,255,0.62)', fontSize: 15, lineHeight: 1.5 }}>
            AI 教练全程陪练 · 智能识别器械{'\n'}
            为你量身打造科学训练计划
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* 登录按钮组 */}
        <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* 微信登录 */}
          <View
            onClick={() => handleLogin('wechat')}
            style={{
              background: '#1aad19',
              color: '#fff',
              borderRadius: 14,
              padding: '17px 20px',
              fontSize: 17, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10,
              opacity: agreed ? 1 : 0.45,
              boxSizing: 'border-box',
            }}
          >
            {loading
              ? <View style={{ width: 20, height: 20, borderRadius: 10, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff' }} />
              : <WeChatIcon size={22} />
            }
            <View style={{ color: '#fff', fontSize: 17, fontWeight: 600 }}>微信一键登录</View>
          </View>

          {/* 手机号登录 */}
          <View
            onClick={() => handleLogin('phone')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              borderRadius: 14,
              padding: '17px 20px',
              fontSize: 16, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10,
              border: '1px solid rgba(255,255,255,0.10)',
              boxSizing: 'border-box',
            }}
          >
            <Icon.Phone size={20} sw={1.8} color='#fff' />
            <View style={{ color: '#fff', fontSize: 16 }}>手机号登录</View>
          </View>

          {/* 其他方式 */}
          <View style={{ color: 'rgba(255,255,255,0.62)', textAlign: 'center', padding: 12, fontSize: 14 }}>
            其他方式登录
          </View>
        </View>

        {/* 协议勾选 */}
        <View style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <View
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 18, height: 18, borderRadius: 18,
              border: agreed ? 'none' : '1.5px solid rgba(255,255,255,0.38)',
              background: agreed ? '#ceff4d' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
              boxSizing: 'border-box',
            }}
          >
            {agreed && <Icon.Check size={12} color='#0a0d0a' sw={3} />}
          </View>
          <View style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>
            阅读并同意{' '}
            <View style={{ display: 'inline', color: '#ceff4d' }}>《用户协议》</View>
            和{' '}
            <View style={{ display: 'inline', color: '#ceff4d' }}>《隐私政策》</View>，
            未注册手机号将自动创建账号
          </View>
        </View>
      </View>
    </View>
  )
}
