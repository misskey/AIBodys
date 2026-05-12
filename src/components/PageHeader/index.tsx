import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Icon from '../Icon'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title?: string
  onBack?: () => void
  right?: ReactNode
  transparent?: boolean
}

export default function PageHeader({ title, onBack, right, transparent }: PageHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  }

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      padding: '0 16px',
      marginTop: 56,
      position: 'relative',
      zIndex: 4,
      flexShrink: 0,
      background: transparent ? 'transparent' : 'var(--bg)',
      boxSizing: 'border-box',
    }}>
      {onBack !== undefined ? (
        <View
          className='iconbtn'
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon.Back size={18} sw={2} color='#fff' />
        </View>
      ) : (
        <View style={{ width: 36 }} />
      )}

      {title ? (
        <View style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 17,
          fontWeight: 600,
          color: '#fff',
          whiteSpace: 'nowrap',
        }}>
          {title}
        </View>
      ) : null}

      {right ?? <View style={{ width: 36 }} />}
    </View>
  )
}
