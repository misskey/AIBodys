import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Icon from '../../../components/Icon'

export default function ScanPage() {
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setScanning(false)
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/equipment/detail/index?id=leg-extension' })
      }, 800)
    }, 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* 模拟相机取景 */}
      <View style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 60% at 50% 45%, #2a2f31 0%, #0a0d0a 60%, #000 100%)',
      }} />

      {/* 器械剪影占位 */}
      <View style={{ position: 'absolute', top: '20%', left: '20%', right: '20%', bottom: '30%', opacity: 0.6 }}>
        <View className='img-ph' style={{ width: '100%', height: '100%', borderRadius: 20 }} />
      </View>

      {/* 扫描框四角 */}
      <View style={{ position: 'absolute', top: '22%', left: '14%', right: '14%', bottom: '28%', pointerEvents: 'none' }}>
        {[
          { top: 0, left: 0, borderTop: '3px solid #ceff4d', borderLeft: '3px solid #ceff4d', borderRadius: '14px 0 0 0' },
          { top: 0, right: 0, borderTop: '3px solid #ceff4d', borderRight: '3px solid #ceff4d', borderRadius: '0 14px 0 0' },
          { bottom: 0, left: 0, borderBottom: '3px solid #ceff4d', borderLeft: '3px solid #ceff4d', borderRadius: '0 0 0 14px' },
          { bottom: 0, right: 0, borderBottom: '3px solid #ceff4d', borderRight: '3px solid #ceff4d', borderRadius: '0 0 14px 0' },
        ].map((style, i) => (
          <View key={i} style={{ position: 'absolute', width: 36, height: 36, ...style }} />
        ))}

        {/* 扫描线 */}
        {scanning && (
          <View style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #ceff4d, transparent)',
            boxShadow: '0 0 12px #ceff4d',
            animation: 'scan 2.4s ease-in-out infinite',
          }} />
        )}
      </View>

      {/* 返回按钮 */}
      <View style={{ position: 'absolute', top: 56, left: 16 }}>
        <View className='iconbtn' onClick={() => Taro.navigateBack()}>
          <Icon.Back size={18} sw={2} color='#fff' />
        </View>
      </View>

      {/* 状态文字 */}
      <View style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center' }}>
        <View style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>
          {scanning ? '正在识别器械...' : '识别成功 ✓'}
        </View>
        <View style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', marginTop: 6 }}>
          {scanning ? '请保持手机平稳，对准器械' : '坐姿腿屈伸机'}
        </View>
      </View>

      {/* 拍照按钮 */}
      <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <View style={{
          width: 72, height: 72, borderRadius: 72,
          border: '4px solid #fff',
          background: 'rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>
          <View style={{
            width: '100%', height: '100%', borderRadius: 72,
            background: scanning ? '#ceff4d' : '#fff',
            margin: 4,
          }} />
        </View>
      </View>

      <style>{`@keyframes scan { 0%, 100% { top: 0; } 50% { top: calc(100% - 2px); } }`}</style>
    </View>
  )
}
