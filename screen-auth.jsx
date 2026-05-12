// Auth screens: Splash → Login (WeChat) → onboarding

function SplashScreen({ onContinue }) {
  React.useEffect(() => { const t = setTimeout(onContinue, 1800); return () => clearTimeout(t); }, []);
  return (
    <div className="screen" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-bg" />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 120, height: 120, borderRadius: 32, background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(206,255,77,0.30)' }}>
          <FigureMark size={72} color="#0a0d0a" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>智炼 <span style={{ color: 'var(--lime)' }}>AI</span></div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', letterSpacing: 4 }}>SMART · FITNESS · COACH</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 60, color: 'var(--text-3)', fontSize: 12, letterSpacing: 1 }}>Powered by 智炼 AI Lab</div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [agreed, setAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handle = (kind) => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(kind); }, 900);
  };
  return (
    <div className="screen">
      <div className="auth-bg" />
      <div style={{ position: 'relative', flex: 1, padding: '88px 28px 40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FigureMark size={32} color="#0a0d0a" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>智炼 <span style={{ color: 'var(--lime)' }}>AI</span></div>
        </div>
        <div style={{ marginTop: 72 }}>
          <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.12, letterSpacing: -0.5 }}>欢迎回来,<br/><span style={{ color: 'var(--lime)' }}>开始今天</span>的训练吧</div>
          <div style={{ marginTop: 16, color: 'var(--text-2)', fontSize: 15, lineHeight: 1.5 }}>AI 教练全程陪练 · 智能识别器械<br/>为你量身打造科学训练计划</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => handle('wechat')} disabled={!agreed || loading} style={{ background: '#1aad19', color: '#fff', borderRadius: 14, padding: '17px 20px', fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: agreed ? 1 : 0.45 }}>
            {loading ? <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Icon.WeChat size={22}/>}
            微信一键登录
          </button>
          <button onClick={() => handle('phone')} style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 14, padding: '17px 20px', fontSize: 16, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: '1px solid var(--line-2)' }}>
            <Icon.Phone size={20}/>手机号登录
          </button>
          <button style={{ background: 'transparent', color: 'var(--text-2)', padding: '12px', fontSize: 14 }}>其他方式登录</button>
        </div>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <button onClick={() => setAgreed(!agreed)} style={{ width: 18, height: 18, borderRadius: 100, border: agreed ? '0' : '1.5px solid var(--text-3)', background: agreed ? 'var(--lime)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            {agreed && <Icon.Check size={12} color="#0a0d0a" sw={3} />}
          </button>
          <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>阅读并同意 <span style={{ color: 'var(--lime)' }}>《用户协议》</span>和 <span style={{ color: 'var(--lime)' }}>《隐私政策》</span>，未注册手机号将自动创建账号</div>
        </div>
      </div>
    </div>
  );
}

function OnboardingScreen({ onDone }) {
  const [step, setStep] = React.useState(0);
  const [goal, setGoal] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [days, setDays] = React.useState(3);

  const steps = [
    {
      title: '你的训练目标是?', subtitle: '帮你定制专属计划',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'shape', label: '塑形减脂', desc: '降低体脂 · 雕刻线条', icon: '🔥' },
            { id: 'muscle', label: '增肌增重', desc: '增加围度 · 提升力量', icon: '💪' },
            { id: 'health', label: '保持健康', desc: '改善体态 · 维持体能', icon: '🌿' },
            { id: 'rehab', label: '功能康复', desc: '改善体态 · 缓解疼痛', icon: '🩹' },
          ].map(g => (
            <button key={g.id} onClick={() => setGoal(g.id)} style={{ padding: 18, borderRadius: 18, textAlign: 'left', background: goal === g.id ? 'rgba(206,255,77,0.12)' : 'var(--surface)', border: '1px solid ' + (goal === g.id ? 'var(--lime)' : 'var(--line)'), display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 26 }}>{g.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600 }}>{g.label}</div><div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 3 }}>{g.desc}</div></div>
              {goal === g.id && <Icon.Check size={20} color="var(--lime)" sw={2.5}/>}
            </button>
          ))}
        </div>
      ),
      valid: !!goal,
    },
    {
      title: '健身经验如何?', subtitle: '帮我们调整难度',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'new', label: '新手', desc: '从未或刚接触器械训练' },
            { id: 'mid', label: '进阶', desc: '能独立完成大部分训练' },
            { id: 'pro', label: '资深', desc: '系统训练 1 年以上' },
          ].map(g => (
            <button key={g.id} onClick={() => setLevel(g.id)} style={{ padding: 18, borderRadius: 18, textAlign: 'left', background: level === g.id ? 'rgba(206,255,77,0.12)' : 'var(--surface)', border: '1px solid ' + (level === g.id ? 'var(--lime)' : 'var(--line)') }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{g.label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 3 }}>{g.desc}</div>
            </button>
          ))}
        </div>
      ),
      valid: !!level,
    },
    {
      title: '一周训练几次?', subtitle: '可随时在「我的」中调整',
      body: (
        <div>
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <div className="num-xl" style={{ color: 'var(--lime)', fontSize: 88 }}>{days}</div>
            <div style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>次 / 周</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
            {[2,3,4,5,6].map(d => (
              <button key={d} onClick={() => setDays(d)} style={{ width: 48, height: 48, borderRadius: 100, background: days === d ? 'var(--lime)' : 'var(--surface)', color: days === d ? '#0a0d0a' : '#fff', fontWeight: 600, fontSize: 16, border: '1px solid ' + (days === d ? 'var(--lime)' : 'var(--line)') }}>{d}</button>
            ))}
          </div>
          <div style={{ marginTop: 36, padding: 16, background: 'var(--surface)', borderRadius: 16, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>💡 建议每周训练 3-4 次, 保识 48 小时肌群恢复时间</div>
        </div>
      ),
      valid: true,
    },
  ];

  const current = steps[step];
  const next = () => { if (!current.valid) return; if (step < steps.length - 1) setStep(step + 1); else onDone(); };

  return (
    <div className="screen">
      <div style={{ padding: '60px 24px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 0 ? setStep(step-1) : null} className="iconbtn" style={{ visibility: step > 0 ? 'visible' : 'hidden' }}><Icon.Back size={18} sw={2}/></button>
        <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{ width: `${((step+1)/steps.length)*100}%`, height: '100%', background: 'var(--lime)', transition: 'width .3s ease' }}/>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500, minWidth: 28 }}>{step+1}/{steps.length}</div>
      </div>
      <div className="scroll-body" style={{ padding: '20px 24px 24px' }}>
        <div key={step}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3 }}>{current.title}</div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)', marginTop: 8, marginBottom: 28 }}>{current.subtitle}</div>
          {current.body}
        </div>
      </div>
      <div style={{ padding: '12px 24px 36px' }}>
        <LimeButton full onClick={next} disabled={!current.valid}>{step === steps.length - 1 ? '完成,开始训练' : '下一步'}</LimeButton>
      </div>
    </div>
  );
}

Object.assign(window, { SplashScreen, LoginScreen, OnboardingScreen });
