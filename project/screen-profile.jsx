// Profile (我的), settings, history, notifications

function ProfileScreen({ user, onNav, onLogout }) {
  return (
    <div className="screen">
      <div className="scroll-body" style={{ paddingTop: 56 }}>
        {/* Hero */}
        <div style={{
          margin: '12px 20px 16px',
          padding: 20,
          borderRadius: 22,
          background: 'linear-gradient(150deg, rgba(206,255,77,0.18) 0%, rgba(206,255,77,0.04) 60%, var(--surface) 100%)',
          border: '1px solid var(--line-2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={user.name} size={56}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700 }}>{user.name}</div>
              <div style={{ marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{
                  fontSize: 11, color: 'var(--lime)',
                  background: 'rgba(206,255,77,0.10)',
                  padding: '2px 8px', borderRadius: 100, fontWeight: 600,
                }}><Icon.Crown size={11} color="var(--lime)" sw={2}/> Lv.4 健将</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>ID 8842{user.id || '13'}</span>
              </div>
            </div>
            <button onClick={() => onNav('settings')} className="iconbtn">
              <Icon.Settings size={18} sw={1.6}/>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 20, textAlign: 'center' }}>
            {[
              { v: '23', l: '累计训练' },
              { v: '14.2h', l: '训练时长' },
              { v: '3,820', l: '消耗千卡' },
            ].map(s => (
              <div key={s.l}>
                <div className="num-md" style={{ fontSize: 20 }}>{s.v}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership banner */}
        <div style={{ padding: '0 20px 16px' }}>
          <button onClick={() => onNav('vip')} className="card" style={{
            width: '100%', padding: 16,
            background: 'linear-gradient(120deg, #2a1f08, #1a1a08)',
            border: '1px solid rgba(249,176,74,0.30)',
            display: 'flex', alignItems: 'center', gap: 12,
            textAlign: 'left',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #f9d28a, #f9b04a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon.Crown size={20} color="#3a2208" sw={2}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: '#f9d28a' }}>开通 PRO 会员</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>解锁 AI 教练高级模式 · 无限计划</div>
            </div>
            <Icon.Chevron size={16} color="#f9d28a" sw={2}/>
          </button>
        </div>

        {/* Section 1 */}
        <div style={{ padding: '0 20px 14px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { icon: Icon.Calendar, label: '训练历史', detail: '23 次', go: 'history' },
              { icon: Icon.Chart, label: '数据中心', detail: '本周 +12%', go: 'stats' },
              { icon: Icon.Heart, label: '收藏器械', detail: '5', go: 'favs' },
              { icon: Icon.Trophy, label: '成就', detail: '8/24', go: 'achievement' },
            ].map((r, i, a) => {
              const IC = r.icon;
              return (
                <button key={r.label} onClick={() => onNav(r.go)} className="row" style={{ width: '100%' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)' }}>
                    <IC size={17} sw={1.8}/>
                  </div>
                  <div style={{ flex: 1, fontSize: 15, textAlign: 'left' }}>{r.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{r.detail}</div>
                  <Icon.Chevron size={16} color="var(--text-3)" sw={1.8}/>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2 */}
        <div style={{ padding: '0 20px 14px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { icon: Icon.Bell, label: '消息通知', go: 'notifications' },
              { icon: Icon.Shield, label: '账号与安全', go: 'settings' },
              { icon: Icon.Globe, label: '语言', detail: '简体中文', go: 'settings' },
              { icon: Icon.Help, label: '帮助与反馈', go: 'help' },
              { icon: Icon.Settings, label: '设置', go: 'settings' },
            ].map((r, i) => {
              const IC = r.icon;
              return (
                <button key={r.label} onClick={() => onNav(r.go)} className="row" style={{ width: '100%' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
                    <IC size={17} sw={1.8}/>
                  </div>
                  <div style={{ flex: 1, fontSize: 15, textAlign: 'left' }}>{r.label}</div>
                  {r.detail && <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{r.detail}</div>}
                  <Icon.Chevron size={16} color="var(--text-3)" sw={1.8}/>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '6px 20px 28px' }}>
          <button onClick={onLogout} style={{
            width: '100%', padding: 14, borderRadius: 14,
            background: 'var(--surface)', border: '1px solid var(--line)',
            color: 'var(--danger)', fontSize: 15, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icon.Logout size={17} sw={1.8}/>退出登录
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen({ onBack }) {
  const days = [
    { date: '08月12日 周一', plan: '下肢塑形 · 基础', dur: 42, cal: 316, perf: 'good' },
    { date: '08月10日 周六', plan: '上肢力量 · 推举', dur: 51, cal: 384, perf: 'good' },
    { date: '08月08日 周四', plan: '核心稳定 · 全套', dur: 28, cal: 220, perf: 'ok' },
    { date: '08月06日 周二', plan: '下肢塑形 · 基础', dur: 40, cal: 302, perf: 'good' },
    { date: '08月03日 周六', plan: '背部塑造 · 中级', dur: 56, cal: 410, perf: 'good' },
  ];
  return (
    <div className="screen">
      <PageHeader title="训练历史" onBack={onBack}/>
      <div className="scroll-body" style={{ padding: '4px 20px 32px' }}>
        <div className="card" style={{ padding: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Ring value={0.78} size={70} thick={7}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>78%</div>
          </Ring>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>本月坚持率</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.5 }}>
              比上月提升 +6%, 连续打卡 <b style={{ color: 'var(--lime)' }}>5 天</b>
            </div>
          </div>
        </div>

        <div className="section-h">近期记录</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {days.map((d, i) => (
            <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'rgba(206,255,77,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--lime)',
              }}>
                <Icon.Check size={20} sw={2.5}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{d.plan}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{d.date} · {d.dur} 分钟 · {d.cal} 千卡</div>
              </div>
              <Icon.Chevron size={16} color="var(--text-3)" sw={1.8}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ onBack, onLogout }) {
  const [push, setPush] = React.useState(true);
  const [restRem, setRestRem] = React.useState(true);
  const [sound, setSound] = React.useState(false);
  return (
    <div className="screen">
      <PageHeader title="设置" onBack={onBack}/>
      <div className="scroll-body" style={{ padding: '4px 20px 32px' }}>
        {[
          {
            title: '账号',
            items: [
              { kind: 'link', label: '微信账号', detail: '已绑定' },
              { kind: 'link', label: '手机号', detail: '138 **** 8842' },
              { kind: 'link', label: '注销账号' },
            ],
          },
          {
            title: '训练偏好',
            items: [
              { kind: 'link', label: '训练目标', detail: '塑形减脂' },
              { kind: 'link', label: '训练天数', detail: '每周 3 次' },
              { kind: 'link', label: '健康数据', detail: '身高 / 体重' },
            ],
          },
          {
            title: '通知',
            items: [
              { kind: 'switch', label: '训练提醒', value: push, set: setPush },
              { kind: 'switch', label: '休息倒计时', value: restRem, set: setRestRem },
              { kind: 'switch', label: '动作完成提示音', value: sound, set: setSound },
            ],
          },
          {
            title: '关于',
            items: [
              { kind: 'link', label: '隐私政策' },
              { kind: 'link', label: '用户协议' },
              { kind: 'link', label: '当前版本', detail: 'v 4.2.1' },
            ],
          },
        ].map(g => (
          <div key={g.title} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.6, margin: '8px 4px 8px' }}>{g.title}</div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {g.items.map((it, i) => (
                <div key={it.label} className="row" style={{ padding: '14px 16px' }}>
                  <div style={{ flex: 1, fontSize: 15 }}>{it.label}</div>
                  {it.detail && <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{it.detail}</div>}
                  {it.kind === 'switch' && (
                    <div className={'switch' + (it.value ? ' on' : '')} onClick={() => it.set(!it.value)}/>
                  )}
                  {it.kind === 'link' && <Icon.Chevron size={16} color="var(--text-3)" sw={1.8}/>}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={onLogout} style={{
          width: '100%', padding: 14, borderRadius: 14,
          background: 'var(--surface)', border: '1px solid var(--line)',
          color: 'var(--danger)', fontSize: 15, fontWeight: 500,
          marginTop: 8,
        }}>
          退出登录
        </button>
      </div>
    </div>
  );
}

function NotificationsScreen({ onBack }) {
  const items = [
    { kind: 'ai', title: 'AI 教练', text: '检测到你已 2 天未训练, 今天来打个卡吧 💪', time: '15 分钟前' },
    { kind: 'plan', title: '计划提醒', text: '今日下肢塑形训练即将开始', time: '2 小时前' },
    { kind: 'achievement', title: '成就解锁', text: '🎉 连续打卡 5 天, 解锁「坚持者」徽章', time: '1 天前' },
    { kind: 'plan', title: '反馈生成', text: '上次训练 AI 报告已就绪, 来看看吧', time: '2 天前' },
  ];
  return (
    <div className="screen">
      <PageHeader title="消息通知" onBack={onBack}/>
      <div className="scroll-body" style={{ padding: '4px 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: it.kind === 'ai' ? 'radial-gradient(circle at 30% 30%, #b96bff, #4a36ff)' :
                          it.kind === 'achievement' ? 'rgba(249,176,74,0.18)' : 'rgba(206,255,77,0.10)',
              color: it.kind === 'achievement' ? '#f9b04a' : 'var(--lime)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {it.kind === 'ai' ? null : it.kind === 'achievement' ? <Icon.Trophy size={18} sw={1.8}/> : <Icon.Bell size={18} sw={1.8}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{it.title}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{it.time}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.5 }}>{it.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VipScreen({ onBack }) {
  const [plan, setPlan] = React.useState('year');
  const plans = [
    { id: 'month', name: '月度会员', price: 28, period: '/月', tag: '' },
    { id: 'year', name: '年度会员', price: 198, period: '/年', tag: '省 41%', save: '日均 ¥0.54' },
    { id: 'lifetime', name: '终身会员', price: 988, period: '一次性', tag: '' },
  ];
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #1a1408 0%, var(--bg) 40%)' }}>
      <PageHeader title="" onBack={onBack} transparent/>
      <div className="scroll-body" style={{ padding: '4px 20px 24px' }}>
        <div style={{ textAlign: 'center', padding: '12px 0 28px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'linear-gradient(135deg, #f9d28a, #f9b04a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 12px 30px rgba(249,176,74,0.30)',
          }}>
            <Icon.Crown size={32} color="#3a2208" sw={2}/>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 16 }}>智炼 <span style={{ color: '#f9d28a' }}>PRO</span></div>
          <div style={{ marginTop: 6, color: 'var(--text-2)', fontSize: 14 }}>解锁全部 AI 能力</div>
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 18 }}>
          {[
            { l: 'AI 教练高级模式', d: '语音指导 · 动作实时纠正' },
            { l: '专属训练计划', d: '基于体测数据深度定制' },
            { l: '全量器械识别', d: '500+ 器械支持' },
            { l: '数据深度分析', d: '肌群训练分布报告' },
          ].map((b, i) => (
            <div key={b.l} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: i === 0 ? 0 : 14 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 100,
                background: 'rgba(249,176,74,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f9d28a', flexShrink: 0, marginTop: 1,
              }}>
                <Icon.Check size={13} sw={3}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{b.l}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{b.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {plans.map(p => (
            <button key={p.id} onClick={() => setPlan(p.id)} style={{
              padding: 16, borderRadius: 16,
              background: plan === p.id ? 'rgba(249,210,138,0.10)' : 'var(--surface)',
              border: '1.5px solid ' + (plan === p.id ? '#f9d28a' : 'var(--line)'),
              textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 12, position: 'relative',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 100,
                border: plan === p.id ? '0' : '1.5px solid var(--text-3)',
                background: plan === p.id ? '#f9d28a' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {plan === p.id && <Icon.Check size={12} color="#3a2208" sw={3}/>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                {p.save && <div style={{ fontSize: 11.5, color: '#f9d28a', marginTop: 3 }}>{p.save}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#f9d28a' }}>¥{p.price}<span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400 }}>{p.period}</span></div>
                {p.tag && <span style={{
                  position: 'absolute', top: -8, right: 12,
                  fontSize: 10, color: '#3a2208',
                  background: '#f9d28a', padding: '2px 8px', borderRadius: 100, fontWeight: 700,
                }}>{p.tag}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 20px 36px' }}>
        <button style={{
          width: '100%', padding: '16px',
          borderRadius: 100, fontSize: 16, fontWeight: 700,
          background: 'linear-gradient(120deg, #f9d28a, #f9b04a)',
          color: '#3a2208',
        }}>立即开通</button>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3)', marginTop: 10 }}>
          自动续费可在「设置」中关闭 · 支持微信/Apple 支付
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen, HistoryScreen, SettingsScreen, NotificationsScreen, VipScreen });
