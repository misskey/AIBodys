// Equipment screens: library, detail, scan

const EQUIPMENT = [
  { id: 'leg-extension', name: '坐姿腿屈伸机', cn: 'Leg Extension', focus: ['股四头肌', '膝关节稳定肌群'], level: '入门', img: '坐姿腿屈伸 IMG' },
  { id: 'leg-curl', name: '坐姿腿弯举机', cn: 'Leg Curl', focus: ['腘绳肌'], level: '入门', img: '腿弯举 IMG' },
  { id: 'leg-press', name: '腿举机', cn: 'Leg Press', focus: ['股四头肌', '臀大肌'], level: '进阶', img: '腿举 IMG' },
  { id: 'chest-press', name: '坐姿推胸机', cn: 'Chest Press', focus: ['胸大肌', '三角肌前束'], level: '入门', img: '推胸 IMG' },
  { id: 'lat-pull', name: '高位下拉', cn: 'Lat Pulldown', focus: ['背阔肌', '肱二头肌'], level: '入门', img: '下拉 IMG' },
  { id: 'shoulder-press', name: '肩部推举机', cn: 'Shoulder Press', focus: ['三角肌'], level: '进阶', img: '推举 IMG' },
  { id: 'cable-row', name: '坐姿划船机', cn: 'Seated Row', focus: ['背阔肌', '菱形肌'], level: '入门', img: '划船 IMG' },
  { id: 'calf-raise', name: '小腿提踵机', cn: 'Calf Raise', focus: ['腓肠肌', '比目鱼肌'], level: '入门', img: '提踵 IMG' },
];

function EquipmentLibrary({ onPick, onBack, onScan }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('全部');
  const filters = ['全部', '下肢', '上肢', '背部', '核心'];
  const list = EQUIPMENT.filter(e => !q || e.name.includes(q) || e.cn.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="screen">
      <PageHeader title="器械库" onBack={onBack} right={
        <button className="iconbtn" onClick={onScan}><Icon.Scan size={18} sw={1.8}/></button>
      }/>
      <div style={{ padding: '4px 20px 14px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="搜索器械名称" style={{
            flex: 1, background: 'transparent', border: 0, outline: 'none', color: '#fff', fontSize: 14,
          }}/>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 20px 12px', overflowX: 'auto' }} className="scrollable">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500,
            background: filter === f ? 'var(--lime)' : 'var(--surface)',
            color: filter === f ? '#0a0d0a' : 'var(--text-2)',
            border: '1px solid ' + (filter === f ? 'var(--lime)' : 'var(--line)'),
            flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      <div className="scroll-body" style={{ padding: '6px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {list.map((e, i) => {
            const kinds = ['leg-extension', 'press', 'cable', 'dumbbell'];
            const kind = kinds[i % kinds.length];
            return (
            <button key={e.id} onClick={() => onPick(e)} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left' }}>
              <div className="img-ph with-eq" style={{ height: 90, position: 'relative' }}>
                <EqSilhouette kind={kind}/>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{e.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{e.focus[0]}</div>
              </div>
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EquipmentDetail({ eq, onBack }) {
  const [tab, setTab] = React.useState(0);
  const item = eq || EQUIPMENT[0];

  return (
    <div className="screen">
      <PageHeader title="器械详情" onBack={onBack} right={
        <button className="iconbtn"><Icon.Heart size={18} sw={1.8}/></button>
      }/>
      <div className="scroll-body">
        <div style={{ padding: '4px 20px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>{item.name}</div>
            <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 4 }}>主要锻炼部位</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {item.focus.map(f => <span key={f} className="chip">{f}</span>)}
            </div>
          </div>
          <div className="img-ph with-eq" style={{ width: 130, height: 100, borderRadius: 14, position: 'relative', flexShrink: 0 }}>
            <EqSilhouette kind="leg-extension"/>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          <div className="tabs">
            {['使用指南', '肌肉解析', '参数建议'].map((t, i) => (
              <div key={t} className={'t' + (tab === i ? ' active' : '')} onClick={() => setTab(i)}>{t}</div>
            ))}
          </div>
        </div>

        {tab === 0 && (
          <div style={{ padding: '18px 20px 24px' }}>
            <div className="section-h">器械设置步骤</div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {[
                '调整座椅高度, 使膝盖与转轴对齐。',
                '调整靠垫位置, 确保小腿在靠垫上方, 脚踝贴合。',
                '选择合适重量, 双手握住把手, 保持上身稳定。',
              ].map((t, i) => (
                <div key={i} className="row" style={{ padding: '12px 14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 100,
                    border: '1.5px solid var(--lime)',
                    color: 'var(--lime)', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>{i+1}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{t}</div>
                </div>
              ))}
            </div>

            <div className="section-h" style={{ marginTop: 22 }}>常见错误</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: '腰部离开靠背', desc: '容易导致腰部代偿受伤' },
                { name: '膝盖内扣', desc: '可能增加膝关节压力' },
                { name: '过度伸直膝盖', desc: '可能造成膝关节超伸' },
              ].map((err, i) => (
                <div key={i} className="card-dim" style={{ padding: '10px 12px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="img-ph" data-label="" style={{ width: 50, height: 44, borderRadius: 8, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', right: -4, bottom: -4,
                      width: 18, height: 18, borderRadius: 100,
                      background: 'var(--danger)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon.Close size={11} color="#fff" sw={3}/>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{err.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{err.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 22, padding: 14, borderRadius: 14,
              background: 'rgba(206,255,77,0.08)',
              border: '1px solid rgba(206,255,77,0.20)',
              display: 'flex', gap: 12,
            }}>
              <Icon.Shield size={22} color="var(--lime)" sw={1.8}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--lime)' }}>安全提示</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 4 }}>
                  保持动作可控, 避免惯性借力; 如有膝关节伤病, 请在教练指导下进行训练。
                </div>
              </div>
            </div>

            <div className="section-h" style={{ marginTop: 22 }}>动作演示 <span style={{ color: 'var(--text-3)', fontSize: 11, fontWeight: 500 }}>(AI 生成)</span></div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="scrollable">
              {['起始姿势', '发力伸腿', '顶峰收缩'].map(t => (
                <div key={t} style={{ width: 110, flexShrink: 0 }}>
                  <div className="img-ph" data-label="" style={{ height: 80, borderRadius: 12, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: 30, height: 30, borderRadius: 100,
                      background: 'rgba(255,255,255,0.85)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon.Play size={14} color="#0a0d0a"/>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 6, textAlign: 'center', color: 'var(--text-2)' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div style={{ padding: '18px 20px 24px' }}>
            <div className="card" style={{ padding: 18 }}>
              <div className="section-h">主要肌群</div>
              {item.focus.map((f, i) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: i === 0 ? 0 : 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{f}</div>
                    <div style={{ marginTop: 6 }}><Bar value={i === 0 ? 0.85 : 0.55}/></div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--lime)', fontWeight: 600 }}>{i === 0 ? '主练' : '辅助'}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 14, marginTop: 12, display: 'flex', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 100,
                background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)',
                flexShrink: 0,
              }}/>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                <b style={{ color: 'var(--lime)' }}>AI 解析:</b>{' '}
                该动作主要刺激股四头肌的四个头, 特别是股直肌; 同时对膝关节稳定肌群有强化作用, 适合恢复期和入门训练者。
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={{ padding: '18px 20px 24px' }}>
            <div className="section-h">建议参数 <span style={{ color: 'var(--text-3)', fontSize: 11, fontWeight: 500 }}>(基于你的数据)</span></div>
            <div className="card" style={{ padding: 0 }}>
              {[
                { l: '建议重量', v: '22-28 kg' },
                { l: '建议次数', v: '10-12 次' },
                { l: '建议组数', v: '3 组' },
                { l: '组间休息', v: '60 秒' },
              ].map((r, i, a) => (
                <div key={r.l} className="row" style={{ padding: '14px 16px' }}>
                  <div style={{ flex: 1, fontSize: 14 }}>{r.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--lime)' }}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)' }}>
        <LimeButton full><Icon.Plus size={16} color="#0a0d0a" sw={2.5}/>加入今日训练</LimeButton>
      </div>
    </div>
  );
}

function ScanScreen({ onBack, onResult }) {
  const [scanning, setScanning] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => {
      setScanning(false);
      setTimeout(() => onResult(EQUIPMENT[0]), 800);
    }, 2600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="screen" style={{ background: '#000' }}>
      {/* Fake camera viewfinder */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse 90% 60% at 50% 45%, #2a2f31 0%, #0a0d0a 60%, #000 100%)',
      }}/>
      {/* Equipment silhouette placeholder */}
      <div style={{
        position: 'absolute', inset: '20% 20% 30% 20%',
        opacity: 0.6,
      }}>
        <div className="img-ph" data-label="器械识别中" style={{ width: '100%', height: '100%', borderRadius: 20 }}/>
      </div>

      {/* Scan frame */}
      <div style={{ position: 'absolute', inset: '22% 14% 28% 14%', pointerEvents: 'none' }}>
        {['tl', 'tr', 'bl', 'br'].map(c => {
          const pos = {
            tl: { top: 0, left: 0, borderTop: '3px solid var(--lime)', borderLeft: '3px solid var(--lime)', borderRadius: '14px 0 0 0' },
            tr: { top: 0, right: 0, borderTop: '3px solid var(--lime)', borderRight: '3px solid var(--lime)', borderRadius: '0 14px 0 0' },
            bl: { bottom: 0, left: 0, borderBottom: '3px solid var(--lime)', borderLeft: '3px solid var(--lime)', borderRadius: '0 0 0 14px' },
            br: { bottom: 0, right: 0, borderBottom: '3px solid var(--lime)', borderRight: '3px solid var(--lime)', borderRadius: '0 0 14px 0' },
          }[c];
          return <div key={c} style={{ position: 'absolute', width: 36, height: 36, ...pos }}/>;
        })}
        {scanning && (
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--lime), transparent)',
            boxShadow: '0 0 12px var(--lime)',
            animation: 'scan 2.4s ease-in-out infinite',
          }}/>
        )}
      </div>

      <style>{`@keyframes scan { 0%, 100% { top: 0; } 50% { top: calc(100% - 2px); } }`}</style>

      <div style={{ position: 'absolute', top: 56, left: 16 }}>
        <button onClick={onBack} className="iconbtn">
          <Icon.Back size={18} sw={2}/>
        </button>
      </div>

      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{scanning ? '正在识别器械...' : '识别成功 ✓'}</div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>{scanning ? '请保持手机平稳, 对准器械' : '坐姿腿屈伸机'}</div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <button style={{
          width: 72, height: 72, borderRadius: 100,
          border: '4px solid #fff',
          background: 'rgba(255,255,255,0.10)',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 100, background: scanning ? 'var(--lime)' : '#fff' }}/>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { EquipmentLibrary, EquipmentDetail, ScanScreen, EQUIPMENT });
