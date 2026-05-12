// Main app shell — route stack + scaled iPhone frame

function App() {
  const [authed, setAuthed] = React.useState(false);
  const [needsOnboard, setNeedsOnboard] = React.useState(false);
  const [splashing, setSplashing] = React.useState(true);
  const [tab, setTab] = React.useState('home');
  const [stack, setStack] = React.useState([]);
  const [user, setUser] = React.useState({ name: '健身新手', id: '8213' });
  const [pendingWorkout, setPendingWorkout] = React.useState(null);

  const push = (id, props) => setStack(s => [...s, { id, props }]);
  const pop = () => setStack(s => s.slice(0, -1));
  const reset = () => setStack([]);

  const onLogin = (kind) => {
    setUser(u => ({ ...u, name: kind === 'wechat' ? '小炼' : '健身新手' }));
    setNeedsOnboard(true);
  };
  const onLogout = () => { setAuthed(false); setSplashing(true); setStack([]); setTab('home'); };

  let content;
  if (splashing) {
    content = <SplashScreen onContinue={() => setSplashing(false)} />;
  } else if (!authed && needsOnboard === false) {
    content = <LoginScreen onLogin={onLogin} />;
  } else if (!authed && needsOnboard) {
    content = <OnboardingScreen onDone={() => { setAuthed(true); setNeedsOnboard(false); }} />;
  } else {
    const topOfStack = stack[stack.length - 1];
    let tabScreen;
    if (tab === 'home') tabScreen = <HomeScreen user={user} onNav={(r) => push(r)} onStartWorkout={() => push('workout-intro')} />;
    else if (tab === 'train') tabScreen = <TrainTabScreen onPick={(p) => { setPendingWorkout(p); push('workout-intro'); }} />;
    else if (tab === 'me') tabScreen = <ProfileScreen user={user} onNav={(r) => push(r)} onLogout={onLogout} />;

    let pushed = null;
    if (topOfStack) {
      switch (topOfStack.id) {
        case 'workout-intro': pushed = <WorkoutIntro onStart={() => { pop(); push('workout-go'); }} onBack={pop} />; break;
        case 'workout-go': pushed = <WorkoutInProgress onBack={pop} onDone={() => { pop(); push('workout-summary'); }} onMoveDetail={(m) => push('eq-detail', { eq: EQUIPMENT.find(e => e.id === m.eq) || EQUIPMENT[0] })} />; break;
        case 'workout-summary': pushed = <WorkoutSummary onDone={() => reset()} onBack={pop} />; break;
        case 'library': pushed = <EquipmentLibrary onBack={pop} onPick={(e) => push('eq-detail', { eq: e })} onScan={() => push('scan')} />; break;
        case 'eq-detail': pushed = <EquipmentDetail eq={topOfStack.props?.eq} onBack={pop} />; break;
        case 'scan': pushed = <ScanScreen onBack={pop} onResult={(e) => { pop(); push('eq-detail', { eq: e }); }} />; break;
        case 'history': case 'stats': pushed = <HistoryScreen onBack={pop} />; break;
        case 'favs': pushed = <EquipmentLibrary onBack={pop} onPick={(e) => push('eq-detail', { eq: e })} onScan={() => push('scan')} />; break;
        case 'achievement': case 'help': pushed = <ComingSoonScreen title={({ achievement: '我的成就', help: '帮助中心' })[topOfStack.id]} onBack={pop} />; break;
        case 'settings': pushed = <SettingsScreen onBack={pop} onLogout={onLogout} />; break;
        case 'notifications': pushed = <NotificationsScreen onBack={pop} />; break;
        case 'vip': pushed = <VipScreen onBack={pop} />; break;
        default: pushed = null;
      }
    }

    const showTab = !pushed;
    content = (
      <div className="screen-stack">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: showTab ? 78 : 0 }}>{tabScreen}</div>
        {showTab && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><TabBar active={tab} onNav={(t) => { setTab(t); reset(); }}/></div>}
        {pushed && <StackPage key={stack.length + ':' + topOfStack.id}>{pushed}</StackPage>}
      </div>
    );
  }
  return content;
}

function StackPage({ children }) {
  const [t, setT] = React.useState('translateX(100%)');
  React.useEffect(() => {
    const id = requestAnimationFrame(() => { requestAnimationFrame(() => setT('translateX(0)')); });
    return () => cancelAnimationFrame(id);
  }, []);
  return <div style={{ position: 'absolute', inset: 0, transform: t, transition: 'transform .3s cubic-bezier(.2,.8,.2,1)', background: 'var(--bg)' }}>{children}</div>;
}

function ComingSoonScreen({ title, onBack }) {
  return (
    <div className="screen">
      <PageHeader title={title} onBack={onBack}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)' }}><Icon.Sparkle size={36} sw={1.6}/></div>
        <div style={{ fontSize: 18, fontWeight: 600, marginTop: 18 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6, textAlign: 'center', lineHeight: 1.6 }}>该模块正在打磨中,<br/>敬请期待 ✨</div>
      </div>
    </div>
  );
}

function Stage() {
  const [scale, setScale] = React.useState(1);
  const FRAME_W = 402, FRAME_H = 874;
  React.useEffect(() => {
    const fit = () => { const w = window.innerWidth, h = window.innerHeight; setScale(Math.min(w / (FRAME_W + 80), h / (FRAME_H + 80), 1)); };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #15191a 0%, #0a0d0a 60%, #050605 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <IOSDevice width={FRAME_W} height={FRAME_H} dark><App/></IOSDevice>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Stage/>);
