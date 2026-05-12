import { View } from '@tarojs/components'
import Icon from '../Icon'
import type { TabId } from '../../types'

interface TabBarProps {
  active: TabId
  onNav: (tab: TabId) => void
}

const TABS: { id: TabId; label: string; Icon: typeof Icon.Home }[] = [
  { id: 'home', label: '首页', Icon: Icon.Home },
  { id: 'train', label: '训练', Icon: Icon.Dumbbell },
  { id: 'me', label: '我的', Icon: Icon.User },
]

export default function TabBar({ active, onNav }: TabBarProps) {
  return (
    <View style={{
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-around',
      padding: '8px 16px 28px',
      background: 'linear-gradient(180deg, rgba(10,13,10,0) 0%, rgba(10,13,10,0.85) 30%, rgba(10,13,10,0.96) 100%)',
      borderTop: '1px solid var(--line)',
      boxSizing: 'border-box',
    }}>
      {TABS.map(t => {
        const isActive = active === t.id
        const IC = t.Icon
        return (
          <View
            key={t.id}
            onClick={() => onNav(t.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 0 6px',
              color: isActive ? 'var(--lime)' : 'var(--text-3)',
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            <IC size={24} sw={isActive ? 2.1 : 1.6} color={isActive ? '#ceff4d' : 'rgba(255,255,255,0.38)'} />
            <View style={{ fontSize: 11, color: isActive ? '#ceff4d' : 'rgba(255,255,255,0.38)' }}>
              {t.label}
            </View>
          </View>
        )
      })}
    </View>
  )
}
