// Home screen + AI Coach

function HomeScreen({ user, onNav, onStartWorkout }) {
  const hour = new Date().getHours();
  const greet = hour < 6 ? '夜深了' : hour < 11 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';
  const [aiOpen, setAiOpen] = React.useState(false);

  return (
    <div className="screen">
      <div className="scroll-body" style={{ paddingTop: 56 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FigureMark size={20} color="#0a0d0a" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 600 }}>智炼 AI</span>
          </div>
          <button className="iconbtn" onClick={() => onNav('notifications')}>
            <Icon.Bell size={18} sw={1.8}/>
          </button>
        </div>

        {/* Greeting */}
        <div style={{ padding: '6px 20px 18px' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 8 }}>
            {greet}, {user.name} <span style={{ fontSize: 26 }}>👋</span>
          </div>
          <div style={{ marginTop: 4, color: 'var(--text-2)', fontSize: 14.5 }}>
            今天也一起变得更强吧。
          </div>
        </div>

        {/* AI Coach pill */}
        <div style={{ padding: '0 20px 16px' }}>
          <button onClick={() => setAiOpen(true)} style={{
            width: '100%',
            background: 'var(--surface)',
            borderRadius: 100,
            padding: '10px 14px 10px 10px',
            display: 'flex', alignItems: 'center', gap: 10,
            border: '1px solid var(--line)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 100,
              background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)',
              flexShrink: 0,
            }}/>
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>AI 教练</span>
            <span style={{
              fontSize: 11.5, color: 'var(--lime)',
              background: 'rgba(206,255,77,0.10)',
              padding: '3px 7px', borderRadius: 100, fontWeight: 500,
            }}>● 在线</span>
            <span style={{ color: 'var(--text-3)', fontSize: 13 }}>随时为你指导</span>
            <div style={{ marginLeft: 'auto', color: 'var(--text-3)' }}>
              <Icon.Chevron size={16} sw={2}/>
            </div>
          </button>
        </div>

        {/* Next workout card */}
        <div style={{ padding: '0 20px 16px' }}>
          <div className="card" style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{ padding: '18px 16px 18px 18px', flex: 1, position: 'relative', zIndex: 1 }}>
                <div style={{ color: 'var(--text-3)', fontSize: 12.5, marginBottom: 6 }}>下一次训练</div>
                <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15 }}>下肢塑形<span style={{ color: 'var(--text-3)' }}>·</span>基础</div>
                <div style={{ marginTop: 8, color: 'var(--text-2)', fontSize: 12.5, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>固定器械</span>
                  <span style={{ color: 'var(--text-3)' }}>·</span>
                  <span>安全优先</span>
                  <span style={{ color: 'var(--text-3)' }}>·</span>
                  <span>45 分钟</span>
                </div>
                <button onClick={onStartWorkout} className="btn-lime btn-pill" style={{ marginTop: 16, padding: '11px 18px', fontSize: 14.5 }}>
                  开始训练
                  <Icon.Chevron size={14} sw={2.5} color="#0a0d0a"/>
                </button>
              </div>
              <div style={{ width: 130, flexShrink: 0, position: 'relative' }}>
                <div className="img-ph with-eq" style={{ position: 'absolute', inset: 0, borderRadius: 0 }}>
                  <EqSilhouette kind="leg-extension"/>
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, var(--surface) 0%, transparent 35%)',
                }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly progress */}
        <div style={{ padding: '0 20px 16px' }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 14 }}>本周进度</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Ring value={0.75} size={84} thick={8}>
                <div className="num-md" style={{ fontSize: 20 }}>75%</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>完成度</div>
              </Ring>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>本周训练</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>3<span style={{ color: 'var(--text-3)' }}> / 4 次</span></span>
                </div>
                <div style={{ marginTop: 8 }}><Bar value={0.75} /></div>
                <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>总时长</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>126<span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400 }}> 分钟</span></div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>消耗</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>1,020<span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400 }}> 千卡</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last feedback */}
        <div style={{ padding: '0 20px 16px' }}>
          <button onClick={() => onNav('history')} style={{ width: '100%', textAlign: 'left' }}>
            <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: 'rgba(206,255,77,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--lime)',
              }}>
                <Icon.Wave size={24} sw={2}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>上次训练反馈</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 3, lineHeight: 1.4 }}>
                  整体表现不错!动作稳定性提升, 继续保持 💪
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5 }}>腿部推蹬机 · 8 月 10 日</div>
              </div>
              <Icon.Chevron size={18} color="var(--text-3)" sw={1.8}/>
            </div>
          </button>
        </div>

        {/* Two-column actions */}
        <div style={{ padding: '0 20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button onClick={() => onNav('scan')} className="card" style={{ padding: '14px 16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(206,255,77,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', flexShrink: 0 }}>
              <Icon.Scan size={22} sw={1.8}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.2 }}>扫描器械</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>AI 识别 · 一键指导</div>
            </div>
          </button>
          <button onClick={() => onNav('library')} className="card" style={{ padding: '14px 16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(206,255,77,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', flexShrink: 0 }}>
              <Icon.Book size={22} sw={1.8}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.2 }}>器械库</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>浏览 · 正确用法</div>
            </div>
          </button>
        </div>
      </div>

      <AICoachSheet open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}

function AICoachSheet({ open, onClose }) {
  const [msgs, setMsgs] = React.useState([
    { from: 'ai', text: '嗨, 今天想练哪个部位? 我可以基于你最近的训练数据给出建议 ✨' },
  ]);
  const [input, setInput] = React.useState('');
  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs(m => [...m, { from: 'me', text: q }]);
    setInput('');
    setTimeout(() => {
      setMsgs(m => [...m, { from: 'ai', text: '建议先做坐姿腿屈伸 3 组热身, 再进入主项目。我已为你准备好今日计划, 要现在开始吗?' }]);
    }, 700);
  };
  return (
    <React.Fragment>
      <div className={'sheet-backdrop' + (open ? ' show' : '')} onClick={onClose}/>
      <div className={'sheet' + (open ? ' show' : '')} style={{ height: '74%', display: 'flex', flexDirection: 'column' }}>
        <div className="grabber"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 100,
            background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)',
          }}/>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>AI 教练</div>
            <div style={{ fontSize: 11.5, color: 'var(--lime)' }}>● 在线 · 智炼 4.0</div>
          </div>
          <button className="iconbtn" style={{ marginLeft: 'auto' }} onClick={onClose}><Icon.Close size={16} sw={2}/></button>
        </div>
        <div className="scroll-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
              maxWidth: '78%',
              padding: '10px 14px',
              borderRadius: 16,
              fontSize: 14, lineHeight: 1.5,
              background: m.from === 'me' ? 'var(--lime)' : 'rgba(255,255,255,0.07)',
              color: m.from === 'me' ? '#0a0d0a' : '#fff',
            }}>{m.text}</div>
          ))}
        </div>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          background: 'rgba(255,255,255,0.06)', borderRadius: 100,
          padding: '6px 6px 6px 16px', marginTop: 8,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="向 AI 教练提问..."
            style={{
              flex: 1, background: 'transparent', border: 0, outline: 'none',
              color: '#fff', fontSize: 14, padding: '8px 0',
            }}
          />
          <button onClick={send} style={{
            width: 36, height: 36, borderRadius: 100,
            background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.Send size={16} color="#0a0d0a" sw={2}/>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { HomeScreen });
