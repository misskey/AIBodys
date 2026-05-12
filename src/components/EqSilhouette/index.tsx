import { View } from '@tarojs/components'

type Kind = 'leg-extension' | 'dumbbell' | 'press' | 'cable'

interface EqSilhouetteProps {
  kind?: Kind
}

const SVGS: Record<Kind, string> = {
  'leg-extension': `
    <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
    <path d="M30 28 L30 70 L48 70 L52 22 Z" fill="#3a4042"/>
    <rect x="46" y="60" width="40" height="14" rx="3" fill="#3a4042"/>
    <rect x="78" y="44" width="6" height="32" rx="2" fill="#4a5052"/>
    <rect x="82" y="56" width="22" height="8" rx="3" fill="#ceff4d" opacity="0.85"/>
    <rect x="14" y="38" width="14" height="42" rx="2" fill="#2a2f31"/>
    <rect x="14" y="44" width="14" height="3" fill="#0e1112"/>
    <rect x="14" y="50" width="14" height="3" fill="#0e1112"/>
    <rect x="14" y="56" width="14" height="3" fill="#0e1112"/>
    <rect x="14" y="62" width="14" height="3" fill="#0e1112"/>
    <rect x="14" y="68" width="14" height="3" fill="#0e1112"/>
    <rect x="30" y="22" width="2" height="48" fill="#fff" opacity="0.10"/>
  `,
  'dumbbell': `
    <rect x="40" y="44" width="40" height="12" rx="2" fill="#5a6063"/>
    <rect x="20" y="30" width="22" height="40" rx="4" fill="#3a4042"/>
    <rect x="78" y="30" width="22" height="40" rx="4" fill="#3a4042"/>
    <rect x="12" y="38" width="10" height="24" rx="2" fill="#2a2f31"/>
    <rect x="98" y="38" width="10" height="24" rx="2" fill="#2a2f31"/>
    <rect x="40" y="48" width="40" height="2" fill="#ceff4d" opacity="0.6"/>
  `,
  'press': `
    <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
    <rect x="44" y="20" width="32" height="58" rx="4" fill="#3a4042"/>
    <rect x="44" y="32" width="32" height="3" fill="#0e1112"/>
    <rect x="44" y="44" width="32" height="3" fill="#0e1112"/>
    <rect x="44" y="56" width="32" height="3" fill="#0e1112"/>
    <rect x="20" y="58" width="22" height="14" rx="3" fill="#ceff4d" opacity="0.8"/>
    <rect x="78" y="58" width="22" height="14" rx="3" fill="#ceff4d" opacity="0.8"/>
    <rect x="56" y="14" width="8" height="68" fill="#5a6063"/>
  `,
  'cable': `
    <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
    <rect x="56" y="14" width="8" height="68" fill="#4a5052"/>
    <circle cx="60" cy="20" r="6" fill="#5a6063"/>
    <line x1="60" y1="26" x2="34" y2="70" stroke="#ceff4d" stroke-width="1.5" opacity="0.8"/>
    <line x1="60" y1="26" x2="86" y2="70" stroke="#ceff4d" stroke-width="1.5" opacity="0.8"/>
    <rect x="22" y="68" width="22" height="8" rx="3" fill="#3a4042"/>
    <rect x="76" y="68" width="22" height="8" rx="3" fill="#3a4042"/>
    <rect x="38" y="38" width="44" height="34" rx="3" fill="#2a2f31"/>
  `,
}

export default function EqSilhouette({ kind = 'leg-extension' }: EqSilhouetteProps) {
  const svgContent = SVGS[kind]
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none">${svgContent}</svg>`
  const src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(fullSvg)}`

  return (
    <View style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <image
        src={src}
        style={{ width: '78%', height: '78%' }}
        mode='aspectFit'
      />
    </View>
  )
}
