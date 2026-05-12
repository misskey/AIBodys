import { View } from '@tarojs/components'
import type { ReactNode, CSSProperties } from 'react'

interface LimeButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
}

export default function LimeButton({ children, onClick, disabled, style }: LimeButtonProps) {
  return (
    <View
      onClick={disabled ? undefined : onClick}
      className='btn-lime'
      style={{
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
    >
      {children}
    </View>
  )
}
