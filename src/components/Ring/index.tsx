import { View } from '@tarojs/components'
import type { ReactNode } from 'react'

interface RingProps {
  value?: number
  size?: number
  thick?: number
  color?: string
  children?: ReactNode
}

export default function Ring({ value = 0.6, size = 92, thick = 8, color = '#ceff4d', children }: RingProps) {
  const r = (size - thick) / 2
  const C = 2 * Math.PI * r
  const dashOffset = C * (1 - value)

  // 通过 SVG data URL 渲染进度环，兼容小程序
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="transform:rotate(-90deg)">` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="${thick}"/>` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${thick}" ` +
    `stroke-dasharray="${C}" stroke-dashoffset="${dashOffset}" stroke-linecap="round"/>` +
    `</svg>`
  const src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgStr)}`

  return (
    <View style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <image src={src} style={{ width: size, height: size, position: 'absolute', top: 0, left: 0 }} />
      <View style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        {children}
      </View>
    </View>
  )
}
