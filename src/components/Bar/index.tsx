import { View } from '@tarojs/components'

interface BarProps {
  value?: number
  color?: string
}

export default function Bar({ value = 0.5, color = '#ceff4d' }: BarProps) {
  return (
    <View style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
      <View style={{
        width: `${Math.min(100, value * 100)}%`,
        height: '100%',
        background: color,
        borderRadius: 100,
        transition: 'width 0.6s ease',
      }} />
    </View>
  )
}
