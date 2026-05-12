import { useState } from 'react'
import { View, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PageHeader from '../../../components/PageHeader'
import Icon from '../../../components/Icon'
import { EqSilhouette } from '../../../components'
import { EQUIPMENT } from '../../../data/equipment'

const FILTERS = ['全部', '下肢', '上肢', '背部', '核心']
const SILHOUETTES = ['leg-extension', 'press', 'cable', 'dumbbell'] as const

export default function EquipmentLibraryPage() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('全部')

  const list = EQUIPMENT.filter(e =>
    !q || e.name.includes(q) || e.cn.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <View style={{ position: 'fixed', inset: 0, background: '#0a0d0a', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title='器械库'
        right={
          <View className='iconbtn' onClick={() => Taro.navigateTo({ url: '/pages/equipment/scan/index' })}>
            <Icon.Scan size={18} sw={1.8} color='#fff' />
          </View>
        }
      />

      {/* 搜索框 */}
      <View style={{ padding: '4px 20px 14px', boxSizing: 'border-box' }}>
        <View style={{
          background: 'var(--surface)', borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon.Scan size={16} sw={1.8} color='rgba(255,255,255,0.38)' />
          <Input
            value={q}
            onInput={(e: any) => setQ(e.detail.value)}
            placeholder='搜索器械名称'
            placeholderStyle='color: rgba(255,255,255,0.38)'
            style={{ flex: 1, background: 'transparent', color: '#fff', fontSize: 14 }}
          />
        </View>
      </View>

      {/* 分类筛选 */}
      <ScrollView scrollX style={{ padding: '0 20px 12px', boxSizing: 'border-box' }}>
        <View style={{ display: 'flex', gap: 8 }}>
          {FILTERS.map(f => (
            <View
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500,
                background: filter === f ? '#ceff4d' : 'var(--surface)',
                color: filter === f ? '#0a0d0a' : 'rgba(255,255,255,0.62)',
                border: `1px solid ${filter === f ? '#ceff4d' : 'var(--line)'}`,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {f}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 器械网格 */}
      <ScrollView scrollY style={{ flex: 1 }} className='scroll-body'>
        <View style={{ padding: '6px 20px 24px' }}>
          <View style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {list.map((e, i) => {
              const kind = SILHOUETTES[i % SILHOUETTES.length]
              return (
                <View
                  key={e.id}
                  className='card'
                  onClick={() => Taro.navigateTo({ url: `/pages/equipment/detail/index?id=${e.id}` })}
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <View className='img-ph' style={{ height: 90, position: 'relative' }}>
                    <EqSilhouette kind={kind} />
                  </View>
                  <View style={{ padding: 12 }}>
                    <View style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{e.name}</View>
                    <View style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>{e.focus[0]}</View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
