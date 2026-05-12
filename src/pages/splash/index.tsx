import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

function FigureMark({ size = 64, color = '#0a0d0a' }: { size?: number; color?: string }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">` +
    `<circle cx="32" cy="14" r="6" fill="${color}" opacity="0.9"/>` +
    `<path d="M22 26h20l-3 14h-6l-3-14z" fill="${color}" opacity="0.4"/>` +
    `<rect x="14" y="34" width="36" height="3" rx="1.5" fill="${color}"/>` +
    `<rect x="10" y="30" width="4" height="11" rx="1" fill="${color}"/>` +
    `<rect x="50" y="30" width="4" height="11" rx="1" fill="${color}"/>` +
    `<rect x="6" y="33" width="3" height="5" rx="1" fill="${color}" opacity="0.6"/>` +
    `<rect x="55" y="33" width="3" height="5" rx="1" fill="${color}" opacity="0.6"/>` +
    `</svg>`
  const src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svg)}`
  return <image src={src} style={{ width: size, height: size }} mode='scaleToFill' />
}

export default function SplashPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      Taro.reLaunch({ url: '/pages/auth/login/index' })
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0d0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* 背景渐变光晕 */}
      <View style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 60% at 30% 0%, rgba(206,255,77,0.10) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(80,160,80,0.08) 0%, transparent 60%), #0a0d0a',
      }} />

      <View style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 32,
          background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(206,255,77,0.30)',
        }}>
          <FigureMark size={72} color='#0a0d0a' />
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <View style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, color: '#fff' }}>
            智炼 <View style={{ display: 'inline', color: '#ceff4d' }}>AI</View>
          </View>
          <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', letterSpacing: 4 }}>
            SMART · FITNESS · COACH
          </View>
        </View>
      </View>

      <View style={{
        position: 'absolute',
        bottom: 60,
        color: 'rgba(255,255,255,0.38)',
        fontSize: 12,
        letterSpacing: 1,
      }}>
        Powered by 智炼 AI Lab
      </View>
    </View>
  )
}
