import { View } from '@tarojs/components'

interface AvatarProps {
  name?: string
  size?: number
}

export default function Avatar({ name = '智', size = 44 }: AvatarProps) {
  return (
    <View style={{
      width: size,
      height: size,
      borderRadius: size,
      background: 'linear-gradient(135deg, #ceff4d 0%, #7ec23a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0a0d0a',
      fontWeight: 700,
      fontSize: size * 0.4,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {name.slice(-1)}
    </View>
  )
}
