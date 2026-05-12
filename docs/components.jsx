// Shared building blocks across screens

function TabBar({ active, onNav }) {
  const tabs = [
    { id: 'home', label: '首页', icon: Icon.Home },
    { id: 'train', label: '训练', icon: Icon.Dumbbell },
    { id: 'me', label: '我的', icon: Icon.User },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => {
        const IC = t.icon;
        const isActive = active === t.id;
        return (
          <button key={t.id} className={'tabbar-btn' + (isActive ? ' active' : '')} onClick={() => onNav(t.id)}>
            <div className="icon">
              <IC size={24} sw={isActive ? 2.1 : 1.6} />
            </div>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PageHeader({ title, onBack, right, transparent }) {
  return (
    <div className="pageheader" style={{ background: transparent ? 'transparent' : 'var(--bg)' }}>
      {onBack ? (
        <button className="iconbtn" onClick={onBack}>
          <Icon.Back size={18} sw={2} />
        </button>
      ) : <div style={{ width: 36 }} />}
      <div className="title">{title}</div>
      {right || <div style={{ width: 36 }} />}
    </div>
  );
}

// Lime CTA pill
function LimeButton({ children, onClick, full, style, disabled }) {
  return (
    <button
      className="btn-lime btn-pill"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: full ? '100%' : undefined,
        opacity: disabled ? 0.4 : 1,
        ...style
      }}
    >
      {children}
    </button>
  );
}

// Animated circular progress ring
function Ring({ value = 0.6, size = 92, thick = 8, color = 'var(--lime)', children }) {
  const r = (size - thick) / 2;
  const C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={thick}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={thick}
          strokeDasharray={C} strokeDashoffset={C * (1 - value)} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .8s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// Linear progress bar
function Bar({ value = 0.5, color = 'var(--lime)' }) {
  return (
    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, value*100)}%`, height: '100%', background: color, borderRadius: 100, transition: 'width .6s ease' }} />
    </div>
  );
}

// Avatar w/ initials
function Avatar({ name = '小智', size = 44, src }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 100,
      background: 'linear-gradient(135deg, #ceff4d 0%, #7ec23a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#0a0d0a', fontWeight: 700, fontSize: size * 0.4,
      overflow: 'hidden', flexShrink: 0,
    }}>
      {name.slice(-1)}
    </div>
  );
}

// Subtle figure illustration placeholder (the muscular silhouette in reference)
// Original abstract dumbbell-figure mark
function FigureMark({ size = 64, color = 'var(--lime)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="14" r="6" fill={color} opacity="0.9"/>
      <path d="M22 26h20l-3 14h-6l-3-14z" fill={color} opacity="0.4"/>
      <rect x="14" y="34" width="36" height="3" rx="1.5" fill={color}/>
      <rect x="10" y="30" width="4" height="11" rx="1" fill={color}/>
      <rect x="50" y="30" width="4" height="11" rx="1" fill={color}/>
      <rect x="6" y="33" width="3" height="5" rx="1" fill={color} opacity="0.6"/>
      <rect x="55" y="33" width="3" height="5" rx="1" fill={color} opacity="0.6"/>
    </svg>
  );
}

// Toast
function Toast({ msg, show }) {
  return (
    <div style={{
      position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(20,24,25,0.95)',
      border: '1px solid var(--line-2)',
      backdropFilter: 'blur(20px)',
      color: '#fff', padding: '10px 16px', borderRadius: 100,
      fontSize: 14, zIndex: 200,
      opacity: show ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity .25s',
      whiteSpace: 'nowrap',
    }}>{msg}</div>
  );
}

// Stylized equipment silhouette — original abstract gym machine drawings
function EqSilhouette({ kind = 'leg-extension' }) {
  const paths = {
    'leg-extension': (
      <svg viewBox="0 0 120 100" fill="none">
        <defs>
          <linearGradient id="ls1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a6063"/>
            <stop offset="1" stopColor="#1a1d1f"/>
          </linearGradient>
        </defs>
        {/* base */}
        <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
        {/* seat back */}
        <path d="M30 28 L30 70 L48 70 L52 22 Z" fill="url(#ls1)"/>
        {/* seat */}
        <rect x="46" y="60" width="40" height="14" rx="3" fill="#3a4042"/>
        {/* leg pad arm */}
        <rect x="78" y="44" width="6" height="32" rx="2" fill="#4a5052"/>
        {/* lime accent pad */}
        <rect x="82" y="56" width="22" height="8" rx="3" fill="#ceff4d" opacity="0.85"/>
        {/* weight stack */}
        <rect x="14" y="38" width="14" height="42" rx="2" fill="#2a2f31"/>
        <rect x="14" y="44" width="14" height="3" fill="#0e1112"/>
        <rect x="14" y="50" width="14" height="3" fill="#0e1112"/>
        <rect x="14" y="56" width="14" height="3" fill="#0e1112"/>
        <rect x="14" y="62" width="14" height="3" fill="#0e1112"/>
        <rect x="14" y="68" width="14" height="3" fill="#0e1112"/>
        {/* highlight */}
        <rect x="30" y="22" width="2" height="48" fill="#fff" opacity="0.10"/>
      </svg>
    ),
    'dumbbell': (
      <svg viewBox="0 0 120 100" fill="none">
        <rect x="40" y="44" width="40" height="12" rx="2" fill="#5a6063"/>
        <rect x="20" y="30" width="22" height="40" rx="4" fill="#3a4042"/>
        <rect x="78" y="30" width="22" height="40" rx="4" fill="#3a4042"/>
        <rect x="12" y="38" width="10" height="24" rx="2" fill="#2a2f31"/>
        <rect x="98" y="38" width="10" height="24" rx="2" fill="#2a2f31"/>
        <rect x="40" y="48" width="40" height="2" fill="#ceff4d" opacity="0.6"/>
      </svg>
    ),
    'press': (
      <svg viewBox="0 0 120 100" fill="none">
        <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
        <rect x="44" y="20" width="32" height="58" rx="4" fill="#3a4042"/>
        <rect x="44" y="32" width="32" height="3" fill="#0e1112"/>
        <rect x="44" y="44" width="32" height="3" fill="#0e1112"/>
        <rect x="44" y="56" width="32" height="3" fill="#0e1112"/>
        <rect x="20" y="58" width="22" height="14" rx="3" fill="#ceff4d" opacity="0.8"/>
        <rect x="78" y="58" width="22" height="14" rx="3" fill="#ceff4d" opacity="0.8"/>
        <rect x="56" y="14" width="8" height="68" fill="#5a6063"/>
      </svg>
    ),
    'cable': (
      <svg viewBox="0 0 120 100" fill="none">
        <rect x="14" y="80" width="92" height="6" rx="2" fill="#0e1112"/>
        <rect x="56" y="14" width="8" height="68" fill="#4a5052"/>
        <circle cx="60" cy="20" r="6" fill="#5a6063"/>
        <path d="M60 26 L34 70" stroke="#ceff4d" strokeWidth="1.5" opacity="0.8"/>
        <path d="M60 26 L86 70" stroke="#ceff4d" strokeWidth="1.5" opacity="0.8"/>
        <rect x="22" y="68" width="22" height="8" rx="3" fill="#3a4042"/>
        <rect x="76" y="68" width="22" height="8" rx="3" fill="#3a4042"/>
        <rect x="38" y="38" width="44" height="34" rx="3" fill="#2a2f31"/>
      </svg>
    ),
  };
  return <div className="eq-silhouette">{paths[kind] || paths['leg-extension']}</div>;
}

window.EqSilhouette = EqSilhouette;
Object.assign(window, { TabBar, PageHeader, LimeButton, Ring, Bar, Avatar, FigureMark, Toast });
