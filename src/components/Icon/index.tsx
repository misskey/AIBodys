/**
 * SVG 图标组件
 * 通过 data:image/svg+xml 编码跨平台渲染（微信小程序 + H5 + RN）
 */
import { Image } from '@tarojs/components'

interface IconProps {
  size?: number
  sw?: number
  color?: string
  style?: React.CSSProperties
}

function makeSvg(path: string, size: number, sw: number, color: string, fill = 'none', extra = ''): string {
  const enc = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}>${path}</svg>`
  )
  return `data:image/svg+xml;charset=utf8,${enc}`
}

function icon(path: string, opts: { fill?: string; extra?: string } = {}) {
  return ({ size = 24, sw = 1.7, color = 'currentColor', style }: IconProps) => (
    <Image
      src={makeSvg(path, size, sw, color, opts.fill ?? 'none', opts.extra ?? '')}
      style={{ width: size, height: size, display: 'block', ...style }}
      mode='scaleToFill'
    />
  )
}

const Icon = {
  Home: icon(`<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-4v-7h-8v7H4a1 1 0 01-1-1v-9z"/>`),
  Dumbbell: icon(`<path d="M3 9v6M21 9v6M6 6v12M18 6v12M6 12h12"/>`),
  User: icon(`<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>`),
  Chevron: icon(`<path d="M9 6l6 6-6 6"/>`),
  Back: icon(`<path d="M15 6l-6 6 6 6"/>`),
  Scan: icon(`<path d="M4 8V6a2 2 0 012-2h2M20 8V6a2 2 0 00-2-2h-2M4 16v2a2 2 0 002 2h2M20 16v2a2 2 0 01-2 2h-2M7 12h10"/>`),
  Book: icon(`<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M9 7h6M9 11h6"/>`),
  Wave: icon(`<path d="M3 12h3l2-6 3 12 3-9 2 5 2-2h3"/>`),
  Heart: icon(`<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/>`),
  Plus: icon(`<path d="M12 5v14M5 12h14"/>`),
  Check: icon(`<path d="M5 12l4 4 10-10"/>`),
  Close: icon(`<path d="M6 6l12 12M18 6L6 18"/>`),
  Clock: icon(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  Fire: icon(`<path d="M12 3s4 4 4 8a4 4 0 11-8 0c0-2 1-3 1-3s.5 2 2 2c0-3-1-5 1-7z"/>`),
  Calendar: icon(`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>`),
  Settings: icon(`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>`),
  Bell: icon(`<path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/>`),
  Shield: icon(`<path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/>`),
  Help: icon(`<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r=".5"/>`),
  Play: icon(`<path d="M7 5l12 7-12 7V5z"/>`, { fill: 'currentColor' }),
  Pause: icon(`<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>`, { fill: 'currentColor' }),
  Sparkle: icon(`<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>`),
  Crown: icon(`<path d="M3 18h18M3 7l4 5 5-7 5 7 4-5v11H3V7z"/>`),
  Trophy: icon(`<path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M5 6H3v2a3 3 0 003 3M19 6h2v2a3 3 0 01-3 3M9 14v3h6v-3M8 21h8"/>`),
  Chart: icon(`<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`),
  Bell2: icon(`<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>`),
  Phone: icon(`<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/>`),
  Send: icon(`<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>`),
  Star: icon(`<path d="M12 3l3 6 6 .9-4.5 4.3 1 6.3L12 17.5 6.5 20.5l1-6.3L3 9.9 9 9l3-6z"/>`),
  Lock: icon(`<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>`),
  Logout: icon(`<path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>`),
  Globe: icon(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>`),
  Card: icon(`<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18"/>`),
}

// 微信图标（特殊形状，单独处理）
export function WeChatIcon({ size = 24 }: { size?: number }) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 24" width="${size}" height="${Math.round(size * 24 / 28)}" fill="currentColor"><path d="M10.5 1C5 1 .8 4.6.8 9.1c0 2.6 1.4 4.8 3.7 6.5l-.9 2.8 3.3-1.7c1.2.3 2.1.6 3.6.6.3 0 .6 0 .9-.1-.2-.6-.3-1.3-.3-2 0-4.1 3.9-7.4 8.7-7.4l.6.1C19.5 3.9 15.4 1 10.5 1zM7.5 7c-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2zm6 0c-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2zm13.7 8.4c0-3.8-3.6-6.9-7.7-6.9-4.4 0-7.8 3.1-7.8 6.9 0 3.8 3.4 6.9 7.8 6.9.9 0 1.8-.2 2.7-.4l2.5 1.4-.7-2.3c1.9-1.4 3.2-3.2 3.2-5.6zm-10.3-1.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm5.1 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg>`
  )
  return (
    <Image
      src={`data:image/svg+xml;charset=utf8,${svg}`}
      style={{ width: size, height: Math.round(size * 24 / 28), display: 'block' }}
      mode='scaleToFill'
    />
  )
}

export default Icon
