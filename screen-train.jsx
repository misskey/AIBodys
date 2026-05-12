// Training flow: plan list (train tab), workout intro, in-progress, rest, summary

function TrainTabScreen({ onPick }) {
  const plans = [
    { id: 'lower-1', name: '下肢塑形 · 基础', dur: 45, moves: 6, level: '入门', img: '腿部 IMG', tag: '今日推荐', cal: 320 },
    { id: 'upper-1', name: '上肢力量 · 推举', dur: 50, moves: 7, level: '进阶', img: '上肢 IMG', cal: 380 },
    { id: 'core-1', name: '核心稳定 · 全套', dur: 30, moves: 5, level: '入门', img: '核心 IMG', cal: 240 },
    { id: 'back-1', name: '背部塑造 · 中级', dur: 55, moves: 8, level: '进阶', img: '背部 IMG', cal: 410 },
  ];
  return (
    <div className="screen">
      <div className="scroll-body" style={{ paddingTop: 56 }}>
        <div style={{ padding: '18px 20px 6px' }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.3 }}>训练计划</div>
          <div style={{ marginTop: 4, color: 'var(--text-2)', fontSize: 14 }}>为你定制的 4 个计划 · 本周</div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '14px 20px 18px', overflowX: 'auto' }} className="scrollable">
          {['全部', '下肢', '上肢', '核心', '背部', '全身'].map((t,i) => (
            <button key={t} style={{
              padding: '8px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500,
              background: i === 0 ? 'var(--lime)' : 'var(--surface)',
              color: i === 0 ? '#0a0d0a' : 'var(--text-2)',
              border: '1px solid ' + (i === 0 ? 'var(--lime)' : 'var(--line)'),
              flexShrink: 0,
            }}>{t}</button>
          ))}
        </div>

        <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map((p, i) => (
            <button key={p.id} onClick={() => onPick(p)} className="card" style={{ overflow: 'hidden', padding: 0, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div className="img-ph" data-label={p.img} style={{ width: 110, flexShrink: 0 }}/>
                <div style={{ flex: 1, padding: 14 }}>
                  {p.tag && <span style={{
                    fontSize: 10.5, color: 'var(--lime)',
                    background: 'rgba(206,255,77,0.10)',
                    padding: '3px 7px', borderRadius: 6, fontWeight: 600,
                  }}>{p.tag}</span>}
                  <div style={{ fontSize: 16.5, fontWeight: 600, marginTop: p.tag ? 8 : 0 }}>{p.name}</div>
                  <div style={{ marginTop: 10, color: 'var(--text-2)', fontSize: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span>{p.level}</span>
                    <span style={{ color: 'var(--text-3)' }}>·</span>
                    <span>{p.moves} 动作</span>
                    <span style={{ color: 'var(--text-3)' }}>·</span>
                    <span>{p.dur} 分钟</span>
                    <span style={{ color: 'var(--text-3)' }}>·</span>
                    <span>约 {p.cal} 千卡</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const WORKOUT_MOVES = [
  { name: '坐姿腿屈伸', sets: 3, reps: '10-12', rest: 60, weight: 25, focus: '股四头肌', eq: 'leg-extension' },
  { name: '坐姿腿弯举', sets: 3, reps: '12', rest: 60, weight: 22, focus: '腘绳肌', eq: 'leg-curl' },
  { name: '腿举', sets: 4, reps: '10', rest: 90, weight: 80, focus: '股四头肌 · 臀大肌', eq: 'leg-press' },
  { name: '坐姿小腿提踵', sets: 3, reps: '15', rest: 45, weight: 30, focus: '腓肠肌', eq: 'calf-raise' },
];

function WorkoutIntro({ onStart, onBack }) {
  return (
    <div className="screen">
      <PageHeader title="今日训练" onBack={onBack} right={
        <button className="iconbtn"><Icon.Heart size={18} sw={1.8}/></button>
      }/>
      <div className="scroll-body">
        <div style={{ padding: '8px 20px 16px' }}>
          <div className="img-ph" data-label="封面 IMG" style={{ height: 180, borderRadius: 22 }}/>
        </div>
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.3 }}>下肢塑形 · 基础</div>
          <div style={{ marginTop: 8, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.5 }}>
            围绕股四头、腘绳与小腿展开, 以固定器械为主, 安全且易上手。
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="chip">🔥 320 千卡</span>
            <span className="chip">⏱ 45 分钟</span>
            <span className="chip">📍 入门</span>
          </div>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <div className="section-h">动作列表 · {WORKOUT_MOVES.length}</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {WORKOUT_MOVES.map((m, i) => (
              <div key={i} className="row" style={{ padding: '14px 16px' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 100,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
                  flexShrink: 0,
                }}>{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{m.focus} · {m.sets}×{m.reps} · {m.weight}kg</div>
                </div>
                <div className="img-ph" data-label="" style={{ width: 38, height: 38, borderRadius: 8 }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)' }}>
        <LimeButton full onClick={onStart}>
          <Icon.Play size={16} color="#0a0d0a"/>
          开始训练
        </LimeButton>
      </div>
    </div>
  );
}

function WorkoutInProgress({ onDone, onBack, onMoveDetail }) {
  const [moveIdx, setMoveIdx] = React.useState(0);
  const [setIdx, setSetIdx] = React.useState(0);
  const [resting, setResting] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const [restLeft, setRestLeft] = React.useState(60);
  const m = WORKOUT_MOVES[moveIdx];

  React.useEffect(() => {
    if (!resting) return;
    setRestLeft(m.rest);
    const id = setInterval(() => {
      setRestLeft(s => {
        if (s <= 1) { clearInterval(id); setResting(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resting]);

  const completeSet = () => {
    setFeedback(null);
    if (setIdx < m.sets - 1) {
      setSetIdx(setIdx + 1);
      setResting(true);
    } else {
      if (moveIdx < WORKOUT_MOVES.length - 1) {
        setMoveIdx(moveIdx + 1);
        setSetIdx(0);
        setResting(true);
      } else {
        onDone();
      }
    }
  };

  const totalSetsDone = WORKOUT_MOVES.slice(0, moveIdx).reduce((a, mv) => a + mv.sets, 0) + setIdx;
  const totalSets = WORKOUT_MOVES.reduce((a, mv) => a + mv.sets, 0);
  const overallProgress = totalSetsDone / totalSets;

  return (
    <div className="screen">
      <PageHeader title="训练中" onBack={onBack} right={
        <button className="iconbtn" onClick={() => onMoveDetail(m)}><Icon.Help size={18} sw={1.8}/></button>
      }/>

      <div className="scroll-body">
        <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.4 }}>{m.name}</div>
            <div style={{
              marginTop: 8, display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              fontSize: 12, color: 'var(--text-2)',
            }}>第 {moveIdx+1}/{WORKOUT_MOVES.length} 个动作</div>
          </div>
          <div className="img-ph" data-label="器械 IMG" style={{ width: 108, height: 90, borderRadius: 14 }}/>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 6 }}>第 {setIdx+1} 组 / 共 {m.sets} 组</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="num-xl" style={{ fontSize: 56 }}>{setIdx+1 <= m.sets ? '10' : '0'}</span>
            <span style={{ color: 'var(--text-3)', fontSize: 16 }}>/ {m.reps} 次</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: 'var(--text-2)', fontSize: 13 }}>
            <Icon.Clock size={15} sw={1.8}/>
            {resting ? `休息 ${restLeft} 秒` : `本组目标 ${m.weight}kg`}
          </div>
          <div style={{ marginTop: 10 }}>
            <Bar value={resting ? (1 - restLeft / m.rest) : overallProgress} />
          </div>
        </div>

        <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: '重量(kg)', value: m.weight },
            { label: '次数', value: m.reps },
            { label: '休息(秒)', value: m.rest },
          ].map(s => (
            <div key={s.label} className="card-dim" style={{ padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{s.label}</div>
              <div className="num-md" style={{ marginTop: 6, fontSize: 22 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 20px 14px' }}>
          <div className="section-h">动作要点</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '调整座椅, 使膝盖与转轴对齐, 大腿贴紧靠垫, 腰背挺直。',
              '收缩大腿前侧肌肉, 向上伸直膝盖, 感受股四头肌发力。',
              '控制速度缓慢下放, 避免膝盖锁死, 动作全程可控。',
            ].map((t, i) => (
              <div key={i} className="card-dim" style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 100,
                  background: 'rgba(206,255,77,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--lime)', fontSize: 12, fontWeight: 700,
                  flexShrink: 0, marginTop: 1,
                }}>{i+1}</div>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>{t}</div>
                <div className="img-ph" data-label="" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px 18px' }}>
          <div style={{
            padding: '10px 14px',
            background: 'rgba(249,176,74,0.10)',
            border: '1px solid rgba(249,176,74,0.30)',
            borderRadius: 14,
            display: 'flex', gap: 10, alignItems: 'center',
            fontSize: 12.5, color: '#f9d28a',
          }}>
            <span style={{ color: '#f9b04a', fontSize: 16 }}>⚠</span>
            如感到膝关节疼痛或不适, 请立即停止并咨询教练。
          </div>
        </div>

        <div style={{ padding: '0 20px 24px' }}>
          <div style={{ color: 'var(--text-2)', fontSize: 13.5, marginBottom: 10 }}>本组感觉如何?</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { id: 'easy', label: '轻松', color: '#5cd07b', emoji: '😊' },
              { id: 'ok', label: '适中', color: '#f9b04a', emoji: '😐' },
              { id: 'hard', label: '吃力', color: '#ff6363', emoji: '😣' },
            ].map(f => (
              <button key={f.id} onClick={() => setFeedback(f.id)} style={{
                flex: 1, padding: '12px',
                borderRadius: 100,
                background: feedback === f.id ? 'rgba(255,255,255,0.08)' : 'var(--surface)',
                border: '1px solid ' + (feedback === f.id ? f.color : 'var(--line)'),
                color: f.color,
                fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}><span style={{ fontSize: 16 }}>{f.emoji}</span>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 20px 36px', borderTop: '1px solid var(--line)' }}>
        <LimeButton full onClick={completeSet}>
          {resting ? `休息中 ${restLeft}s` : '完成本组'}
        </LimeButton>
      </div>
    </div>
  );
}

function WorkoutSummary({ onDone, onBack }) {
  return (
    <div className="screen">
      <PageHeader title="训练完成" onBack={onBack}/>
      <div className="scroll-body" style={{ padding: '12px 20px 32px' }}>
        <div style={{ textAlign: 'center', padding: '20px 0 30px' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 100,
            background: 'linear-gradient(160deg, #ceff4d 0%, #7fc62d 100%)',
            margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 40px rgba(206,255,77,0.30)',
          }}>
            <Icon.Trophy size={48} color="#0a0d0a" sw={2}/>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 20 }}>训练完成 🎉</div>
          <div style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 6 }}>下肢塑形 · 基础</div>
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div className="section-h">本次表现</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: '用时', value: '42', unit: '分钟' },
              { label: '消耗', value: '316', unit: '千卡' },
              { label: '总组数', value: '13', unit: '组' },
              { label: '总次数', value: '142', unit: '次' },
            ].map(s => (
              <div key={s.label} className="card-dim" style={{ padding: 14 }}>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{s.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                  <span className="num-md" style={{ fontSize: 22 }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16, marginBottom: 14, display: 'flex', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 100,
            background: 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)',
            flexShrink: 0,
          }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: 'var(--lime)', fontWeight: 600 }}>AI 教练点评</div>
            <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.6, marginTop: 6 }}>
              整组动作稳定性较上次有 12% 提升, 第 3 个动作离心阶段控制略快, 下次可放慢节奏。建议下次将腿举重量提升到 85kg。
            </div>
          </div>
        </div>

        <div className="card-dim" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon.Star size={20} color="var(--lime)" sw={1.8}/>
          <div style={{ flex: 1, fontSize: 13 }}>
            获得 <span style={{ color: 'var(--lime)', fontWeight: 700 }}>+24</span> 经验, 距离下个等级还差 76 经验
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 20px 36px' }}>
        <LimeButton full onClick={onDone}>完成</LimeButton>
      </div>
    </div>
  );
}

Object.assign(window, { TrainTabScreen, WorkoutIntro, WorkoutInProgress, WorkoutSummary });
