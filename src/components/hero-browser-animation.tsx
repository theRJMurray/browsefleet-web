'use client';

/* ================================================================
   HeroBrowserAnimation
   An animated miniature browser demonstrating BrowseFleet capabilities.
   Phase 1 (0–10s): single browser — cursor navigates, types, clicks
   Phase 2 (10–20s): 4 simultaneous browsers doing independent work
   Pure CSS animations, no JS timers.
   ================================================================ */

/* ---------- shared small pieces ---------- */

function TrafficLights({ size = 'normal' }: { size?: 'normal' | 'small' }) {
  const d = size === 'small' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  return (
    <div className="flex gap-1">
      <div className={`${d} rounded-full bg-[#ff5f57]`} />
      <div className={`${d} rounded-full bg-[#febc2e]`} />
      <div className={`${d} rounded-full bg-[#28c840]`} />
    </div>
  );
}

function CursorIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      className={`drop-shadow-lg ${className}`}
    >
      <path
        d="M0.5 0.5L0.5 14.5L4.5 10.5L7.5 17L9.5 16L6.5 9.5L11.5 9.5L0.5 0.5Z"
        fill="white"
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="0.75"
      />
    </svg>
  );
}

/* ---------- single-browser content ---------- */

function DashboardContent() {
  return (
    <div className="absolute inset-0 p-2.5 overflow-hidden hba-tab1-content">
      {/* stat cards */}
      <div className="flex gap-1.5 mb-2">
        {[
          { label: 'Sessions', value: '1,247' },
          { label: 'Active', value: '42' },
          { label: 'Uptime', value: '99.9%' },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-1 rounded bg-zinc-800/60 border border-zinc-700/40 px-2 py-1.5"
          >
            <p className="text-[7px] text-zinc-500 leading-none">{s.label}</p>
            <p className="text-[11px] font-bold text-white leading-tight mt-0.5">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* search bar */}
      <div className="bg-zinc-800/40 rounded border border-zinc-700/30 px-2 py-1 mb-2 flex items-center gap-1.5">
        <svg
          width="8"
          height="8"
          viewBox="0 0 16 16"
          fill="none"
          className="text-zinc-600 shrink-0"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" />
          <line
            x1="11"
            y1="11"
            x2="14"
            y2="14"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="text-[8px] text-zinc-500 hba-type-search whitespace-nowrap overflow-hidden inline-block">
          product scraping sessions
        </span>
        <span className="text-[8px] text-zinc-500 hba-caret-search">|</span>
      </div>

      {/* data table */}
      <div className="rounded border border-zinc-700/30 overflow-hidden">
        {/* header */}
        <div className="flex gap-1 px-2 py-1 bg-zinc-800/50 border-b border-zinc-700/30">
          <span className="text-[7px] text-zinc-500 w-[18%]">ID</span>
          <span className="text-[7px] text-zinc-500 w-[38%]">URL</span>
          <span className="text-[7px] text-zinc-500 w-[22%]">Status</span>
          <span className="text-[7px] text-zinc-500 w-[22%]">Duration</span>
        </div>
        {/* rows */}
        {[
          { id: 'bf_01', url: 'amazon.com/dp/...', status: 'Active', dur: '2m 14s', active: true },
          { id: 'bf_02', url: 'shopify.com/admin', status: 'Active', dur: '1m 03s', active: true },
          { id: 'bf_03', url: 'zillow.com/homes', status: 'Done', dur: '4m 52s', active: false },
          { id: 'bf_04', url: 'linkedin.com/in/...', status: 'Active', dur: '0m 47s', active: true },
          { id: 'bf_05', url: 'yelp.com/biz/...', status: 'Queued', dur: '—', active: false },
        ].map((r, i) => (
          <div
            key={r.id}
            className={`flex gap-1 px-2 py-1 border-b border-zinc-800/30 hba-table-row-${i}`}
          >
            <span className="text-[7px] text-zinc-400 w-[18%] font-mono">
              {r.id}
            </span>
            <span className="text-[7px] text-zinc-400 w-[38%] truncate">
              {r.url}
            </span>
            <span
              className={`text-[7px] w-[22%] ${
                r.active ? 'text-green-400' : r.status === 'Queued' ? 'text-yellow-400' : 'text-zinc-500'
              }`}
            >
              {r.status}
            </span>
            <span className="text-[7px] text-zinc-500 w-[22%]">{r.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormContent() {
  return (
    <div className="absolute inset-0 p-2.5 overflow-hidden hba-tab2-content">
      <p className="text-[9px] font-semibold text-white mb-2">
        Create Session
      </p>

      <div className="space-y-2">
        <div>
          <label className="text-[7px] text-zinc-500 block mb-0.5">
            Target URL
          </label>
          <div className="bg-zinc-800/40 rounded border border-zinc-700/30 px-2 py-1">
            <span className="text-[8px] text-zinc-400 hba-type-form whitespace-nowrap overflow-hidden inline-block">
              https://example.com/products
            </span>
            <span className="text-[8px] text-zinc-400 hba-caret-form">|</span>
          </div>
        </div>

        <div>
          <label className="text-[7px] text-zinc-500 block mb-0.5">
            Stealth Mode
          </label>
          <div className="flex gap-2">
            <div className="bg-purple-600/30 border border-purple-500/40 rounded px-2 py-0.5">
              <span className="text-[7px] text-purple-300">Full</span>
            </div>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded px-2 py-0.5">
              <span className="text-[7px] text-zinc-500">Basic</span>
            </div>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded px-2 py-0.5">
              <span className="text-[7px] text-zinc-500">None</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-[7px] text-zinc-500 block mb-0.5">
            Viewport
          </label>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-zinc-800/40 rounded border border-zinc-700/30 px-2 py-1">
              <span className="text-[7px] text-zinc-400">1920</span>
            </div>
            <span className="text-[8px] text-zinc-600 self-center">x</span>
            <div className="flex-1 bg-zinc-800/40 rounded border border-zinc-700/30 px-2 py-1">
              <span className="text-[7px] text-zinc-400">1080</span>
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="pt-1">
          <div className="hba-submit-btn bg-purple-600 hover:bg-purple-500 rounded px-3 py-1 text-center">
            <span className="text-[8px] font-semibold text-white">
              Launch Session
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleBrowser() {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-700/50 bg-[#0c0c0f] shadow-2xl shadow-purple-950/20">
      {/* ---- chrome: tabs ---- */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/70 border-b border-zinc-700/40">
        <TrafficLights />
        <div className="flex gap-px ml-2 flex-1 min-w-0">
          <div className="hba-tab-1 flex items-center gap-1 px-2.5 py-0.5 rounded-t text-[8px] bg-[#0c0c0f] text-zinc-300 border-t border-x border-zinc-700/40 max-w-[90px] truncate">
            Sessions
          </div>
          <div className="hba-tab-2 flex items-center gap-1 px-2.5 py-0.5 rounded-t text-[8px] bg-zinc-800/50 text-zinc-500 max-w-[90px] truncate">
            New Session
          </div>
        </div>
      </div>

      {/* ---- chrome: address bar ---- */}
      <div className="px-2.5 py-1 bg-zinc-800/40 border-b border-zinc-700/30">
        <div className="flex items-center gap-1.5 bg-zinc-900/70 rounded px-2 py-0.5">
          <svg
            width="8"
            height="8"
            viewBox="0 0 16 16"
            fill="none"
            className="text-green-500/60 shrink-0"
          >
            <rect
              x="2"
              y="4"
              width="12"
              height="8"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M5 4V3a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-[8px] text-zinc-400 hba-type-url whitespace-nowrap overflow-hidden inline-block">
            localhost:3000/v1/sessions
          </span>
          <span className="text-[8px] text-zinc-400 hba-caret-url">|</span>
        </div>
      </div>

      {/* loading bar */}
      <div className="h-[2px] bg-zinc-800/30 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-purple-500 hba-loading-bar" />
      </div>

      {/* ---- content area ---- */}
      <div className="relative" style={{ height: 'calc(100% - 54px)' }}>
        <DashboardContent />
        <FormContent />

        {/* screenshot flash */}
        <div className="absolute inset-0 bg-white pointer-events-none hba-flash" />
      </div>

      {/* ---- cursor ---- */}
      <div className="absolute top-0 left-0 pointer-events-none z-30 hba-cursor-single">
        <CursorIcon />
        {/* click ripple */}
        <div className="absolute top-0 left-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400 hba-click-ripple" />
      </div>
    </div>
  );
}

/* ---------- mini browser for grid phase ---------- */

function MiniBrowser({
  variant,
}: {
  variant: 'scrape' | 'form' | 'navigate' | 'screenshot';
}) {
  const labels: Record<string, { tab: string; url: string }> = {
    scrape: { tab: 'Scraping', url: 'amazon.com/dp/B09...' },
    form: { tab: 'Login', url: 'app.example.com/login' },
    navigate: { tab: 'Research', url: 'linkedin.com/company' },
    screenshot: { tab: 'Capture', url: 'competitor.com' },
  };
  const { tab, url } = labels[variant];

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-zinc-700/40 bg-[#0c0c0f]">
      {/* chrome */}
      <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800/60 border-b border-zinc-700/30">
        <TrafficLights size="small" />
        <span className="text-[6px] text-zinc-400 ml-1 truncate">{tab}</span>
      </div>

      {/* address bar */}
      <div className="px-1.5 py-0.5 bg-zinc-800/30 border-b border-zinc-700/20">
        <div className="bg-zinc-900/50 rounded px-1.5 py-px">
          <span className="text-[6px] text-zinc-500 truncate block">{url}</span>
        </div>
      </div>

      {/* content area */}
      <div
        className="relative overflow-hidden"
        style={{ height: 'calc(100% - 32px)' }}
      >
        <MiniBrowserContent variant={variant} />

        {/* cursor */}
        <div className={`absolute top-0 left-0 pointer-events-none z-10 hba-cursor-${variant}`}>
          <CursorIcon className="scale-75" />
          <div className={`absolute top-0 left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400 hba-click-mini-${variant}`} />
        </div>

        {/* screenshot flash for the screenshot variant */}
        {variant === 'screenshot' && (
          <div className="absolute inset-0 bg-white pointer-events-none hba-flash-mini" />
        )}
      </div>
    </div>
  );
}

function MiniBrowserContent({ variant }: { variant: string }) {
  if (variant === 'scrape') {
    return (
      <div className="p-1.5 space-y-1 hba-mini-scroll">
        {/* fake product page */}
        <div className="h-8 rounded bg-zinc-800/40 border border-zinc-700/20" />
        <div className="flex gap-1">
          <div className="w-10 h-10 rounded bg-zinc-800/40 border border-zinc-700/20 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="h-1.5 w-3/4 rounded bg-zinc-700/40" />
            <div className="h-1.5 w-1/2 rounded bg-zinc-700/30" />
            <div className="h-1.5 w-2/3 rounded bg-purple-500/20" />
            <div className="h-1.5 w-1/3 rounded bg-zinc-700/20" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="h-1 w-full rounded bg-zinc-700/20" />
          <div className="h-1 w-5/6 rounded bg-zinc-700/20" />
          <div className="h-1 w-4/5 rounded bg-zinc-700/20" />
          <div className="h-1 w-full rounded bg-zinc-700/20" />
          <div className="h-1 w-3/4 rounded bg-zinc-700/20" />
        </div>
        <div className="space-y-0.5 pt-1">
          <div className="h-1 w-full rounded bg-zinc-700/20" />
          <div className="h-1 w-5/6 rounded bg-zinc-700/20" />
          <div className="h-1 w-2/3 rounded bg-zinc-700/20" />
          <div className="h-1 w-full rounded bg-zinc-700/20" />
        </div>
      </div>
    );
  }

  if (variant === 'form') {
    return (
      <div className="p-2 space-y-1.5">
        <p className="text-[7px] text-white font-semibold">Sign In</p>
        <div>
          <div className="text-[5px] text-zinc-500 mb-0.5">Email</div>
          <div className="bg-zinc-800/40 border border-zinc-700/30 rounded px-1.5 py-0.5">
            <span className="text-[6px] text-zinc-400 hba-mini-type-email whitespace-nowrap overflow-hidden inline-block">
              agent@browsefleet.com
            </span>
          </div>
        </div>
        <div>
          <div className="text-[5px] text-zinc-500 mb-0.5">Password</div>
          <div className="bg-zinc-800/40 border border-zinc-700/30 rounded px-1.5 py-0.5">
            <span className="text-[6px] text-zinc-400 hba-mini-type-pass whitespace-nowrap overflow-hidden inline-block">
              ••••••••••••
            </span>
          </div>
        </div>
        <div className="bg-purple-600 rounded px-2 py-0.5 text-center mt-1 hba-mini-form-btn">
          <span className="text-[6px] font-semibold text-white">Sign In</span>
        </div>
      </div>
    );
  }

  if (variant === 'navigate') {
    return (
      <div className="p-1.5 hba-mini-nav-content">
        {/* page 1 */}
        <div className="hba-mini-page1">
          <div className="flex gap-1 mb-1">
            <div className="w-6 h-6 rounded-full bg-zinc-800/40 border border-zinc-700/20 shrink-0" />
            <div className="flex-1 space-y-0.5 pt-0.5">
              <div className="h-1.5 w-2/3 rounded bg-zinc-700/40" />
              <div className="h-1 w-1/2 rounded bg-zinc-700/20" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-full rounded bg-zinc-700/20" />
            <div className="h-1 w-4/5 rounded bg-zinc-700/20" />
            <div className="h-1 w-full rounded bg-zinc-700/20" />
          </div>
        </div>
      </div>
    );
  }

  /* screenshot variant */
  return (
    <div className="p-1.5 space-y-1">
      <div className="h-5 rounded bg-zinc-800/40 border border-zinc-700/20 flex items-center px-1.5">
        <div className="h-1.5 w-2/3 rounded bg-zinc-700/30" />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="h-8 rounded bg-zinc-800/40 border border-zinc-700/20" />
        <div className="h-8 rounded bg-zinc-800/40 border border-zinc-700/20" />
      </div>
      <div className="space-y-0.5">
        <div className="h-1 w-full rounded bg-zinc-700/20" />
        <div className="h-1 w-3/4 rounded bg-zinc-700/20" />
      </div>
    </div>
  );
}

/* ---------- main export ---------- */

export function HeroBrowserAnimation() {
  return (
    <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
      <style>{KEYFRAMES}</style>

      {/* ambient glow */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none hba-glow"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(147,51,234,0.12) 0%, transparent 70%)',
        }}
      />

      {/* phase 1: single browser */}
      <div className="absolute inset-0 hba-phase-single">
        <SingleBrowser />
      </div>

      {/* split lines for transition */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
        <div className="absolute w-full h-px bg-purple-400/60 hba-split-h" />
        <div className="absolute h-full w-px bg-purple-400/60 hba-split-v" />
      </div>

      {/* phase 2: grid of 4 */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 hba-phase-grid">
        <MiniBrowser variant="scrape" />
        <MiniBrowser variant="form" />
        <MiniBrowser variant="navigate" />
        <MiniBrowser variant="screenshot" />
      </div>
    </div>
  );
}

/* =================================================================
   CSS KEYFRAMES
   Master loop: 20s
   0–48%   single browser visible (0–9.6s)
   48–52%  transition (9.6–10.4s)
   52–96%  grid visible (10.4–19.2s)
   96–100% transition back (19.2–20s)
   ================================================================= */

const KEYFRAMES = `
/* ---- phase visibility ---- */
.hba-phase-single {
  animation: hba-phaseSingle 20s ease-in-out infinite;
}
.hba-phase-grid {
  animation: hba-phaseGrid 20s ease-in-out infinite;
}

@keyframes hba-phaseSingle {
  0%   { opacity: 1; transform: scale(1); }
  46%  { opacity: 1; transform: scale(1); }
  50%  { opacity: 0; transform: scale(0.92); }
  96%  { opacity: 0; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes hba-phaseGrid {
  0%   { opacity: 0; transform: scale(1.06); }
  48%  { opacity: 0; transform: scale(1.06); }
  52%  { opacity: 1; transform: scale(1); }
  96%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.06); }
}

/* ---- split lines ---- */
.hba-split-h {
  animation: hba-splitH 20s ease-out infinite;
}
.hba-split-v {
  animation: hba-splitV 20s ease-out infinite;
}

@keyframes hba-splitH {
  0%, 46%  { transform: scaleX(0); opacity: 0; }
  49%      { transform: scaleX(1); opacity: 1; }
  53%      { transform: scaleX(1); opacity: 0; }
  100%     { opacity: 0; }
}
@keyframes hba-splitV {
  0%, 46%  { transform: scaleY(0); opacity: 0; }
  49%      { transform: scaleY(1); opacity: 1; }
  53%      { transform: scaleY(1); opacity: 0; }
  100%     { opacity: 0; }
}

/* ---- ambient glow ---- */
.hba-glow {
  animation: hba-glow 4s ease-in-out infinite;
}
@keyframes hba-glow {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
}

/* ---- cursor movement (single browser) ---- */
.hba-cursor-single {
  animation: hba-cursorSingle 20s ease-in-out infinite;
  will-change: transform;
}

@keyframes hba-cursorSingle {
  0%        { transform: translate(260px, 200px); opacity: 0; }
  2%        { transform: translate(260px, 200px); opacity: 1; }
  /* move to URL bar */
  5%        { transform: translate(250px, 38px); }
  7%        { transform: translate(250px, 38px); }
  /* wait for URL to type, then move to search */
  15%       { transform: translate(250px, 38px); }
  19%       { transform: translate(190px, 108px); }
  /* wait for search to type, then move to table row 3 */
  27%       { transform: translate(190px, 108px); }
  30%       { transform: translate(270px, 180px); }
  /* click on row → tab switch */
  31%       { transform: translate(270px, 180px); }
  /* move to form URL field */
  35%       { transform: translate(250px, 90px); }
  /* wait for form typing */
  40%       { transform: translate(250px, 90px); }
  /* move to Launch button */
  42%       { transform: translate(200px, 158px); }
  /* click → screenshot */
  43%       { transform: translate(200px, 158px); }
  45%       { transform: translate(200px, 158px); opacity: 1; }
  47%       { transform: translate(200px, 158px); opacity: 0; }
  100%      { transform: translate(200px, 158px); opacity: 0; }
}

/* ---- click ripple ---- */
.hba-click-ripple {
  animation: hba-clickRipple 20s ease-out infinite;
}

@keyframes hba-clickRipple {
  0%, 30.5%  { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  31%        { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  32.5%      { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
  42.5%      { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  43%        { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  44.5%      { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
  100%       { opacity: 0; }
}

/* ---- typing animations ---- */
.hba-type-url {
  animation: hba-typeUrl 20s step-end infinite;
}
@keyframes hba-typeUrl {
  0%, 5%     { max-width: 0; }
  6%         { max-width: 20px; }
  7%         { max-width: 40px; }
  8%         { max-width: 60px; }
  9%         { max-width: 80px; }
  10%        { max-width: 100px; }
  11%        { max-width: 120px; }
  12%        { max-width: 140px; }
  13%        { max-width: 160px; }
  14%        { max-width: 300px; }
  100%       { max-width: 300px; }
}

.hba-type-search {
  animation: hba-typeSearch 20s step-end infinite;
}
@keyframes hba-typeSearch {
  0%, 19%    { max-width: 0; }
  20%        { max-width: 15px; }
  21%        { max-width: 30px; }
  22%        { max-width: 50px; }
  23%        { max-width: 70px; }
  24%        { max-width: 90px; }
  25%        { max-width: 110px; }
  26%        { max-width: 140px; }
  27%        { max-width: 300px; }
  100%       { max-width: 300px; }
}

.hba-type-form {
  animation: hba-typeForm 20s step-end infinite;
}
@keyframes hba-typeForm {
  0%, 35%    { max-width: 0; }
  36%        { max-width: 25px; }
  37%        { max-width: 55px; }
  38%        { max-width: 90px; }
  39%        { max-width: 130px; }
  40%        { max-width: 300px; }
  100%       { max-width: 300px; }
}

/* ---- tab switching ---- */
.hba-tab-1 {
  animation: hba-tab1 20s step-end infinite;
}
.hba-tab-2 {
  animation: hba-tab2 20s step-end infinite;
}
.hba-tab1-content {
  animation: hba-tab1Content 20s step-end infinite;
}
.hba-tab2-content {
  animation: hba-tab2Content 20s step-end infinite;
}

@keyframes hba-tab1 {
  0%     { background: #0c0c0f; color: #d4d4d8; border-color: rgba(63,63,70,0.4); }
  32%    { background: rgba(39,39,42,0.5); color: #71717a; border-color: transparent; }
  100%   { background: rgba(39,39,42,0.5); color: #71717a; border-color: transparent; }
}
@keyframes hba-tab2 {
  0%     { background: rgba(39,39,42,0.5); color: #71717a; }
  32%    { background: #0c0c0f; color: #d4d4d8; }
  100%   { background: #0c0c0f; color: #d4d4d8; }
}
@keyframes hba-tab1Content {
  0%     { opacity: 1; }
  32%    { opacity: 0; }
  100%   { opacity: 0; }
}
@keyframes hba-tab2Content {
  0%     { opacity: 0; }
  32%    { opacity: 1; }
  100%   { opacity: 1; }
}

/* ---- row highlight on click ---- */
.hba-table-row-2 {
  animation: hba-rowHighlight 20s step-end infinite;
}
@keyframes hba-rowHighlight {
  0%, 30%  { background: transparent; }
  31%      { background: rgba(147,51,234,0.15); }
  32%      { background: rgba(147,51,234,0.1); }
  100%     { background: rgba(147,51,234,0.1); }
}

/* ---- submit button pulse ---- */
.hba-submit-btn {
  animation: hba-submitPulse 20s ease-out infinite;
}
@keyframes hba-submitPulse {
  0%, 42.5%  { box-shadow: none; }
  43%        { box-shadow: 0 0 0 2px rgba(147,51,234,0.5); }
  44%        { box-shadow: 0 0 0 4px rgba(147,51,234,0.2); }
  45%        { box-shadow: none; }
  100%       { box-shadow: none; }
}

/* ---- loading bar ---- */
.hba-loading-bar {
  animation: hba-loadingBar 20s ease-out infinite;
}
@keyframes hba-loadingBar {
  0%, 13%  { width: 0%; opacity: 1; }
  14%      { width: 60%; opacity: 1; }
  14.5%    { width: 85%; opacity: 1; }
  15%      { width: 100%; opacity: 1; }
  16%      { width: 100%; opacity: 0; }
  31%      { width: 0%; opacity: 0; }
  31.5%    { width: 0%; opacity: 1; }
  32%      { width: 50%; }
  32.5%    { width: 100%; opacity: 1; }
  33.5%    { width: 100%; opacity: 0; }
  100%     { opacity: 0; }
}

/* ---- blinking carets ---- */
.hba-caret-url {
  animation: hba-caretUrl 20s step-end infinite, hba-blink 0.6s step-end infinite;
}
@keyframes hba-caretUrl {
  0%, 5%   { display: inline; }
  15%      { display: none; }
  100%     { display: none; }
}
.hba-caret-search {
  animation: hba-caretSearch 20s step-end infinite, hba-blink 0.6s step-end infinite;
}
@keyframes hba-caretSearch {
  0%, 19%  { display: inline; opacity: 0; }
  19.5%    { display: inline; opacity: 1; }
  27.5%    { display: none; opacity: 0; }
  100%     { display: none; opacity: 0; }
}
.hba-caret-form {
  animation: hba-caretForm 20s step-end infinite, hba-blink 0.6s step-end infinite;
}
@keyframes hba-caretForm {
  0%, 35%  { display: inline; opacity: 0; }
  35.5%    { display: inline; opacity: 1; }
  41%      { display: none; opacity: 0; }
  100%     { display: none; opacity: 0; }
}
@keyframes hba-blink {
  0%, 50%  { visibility: visible; }
  50.1%, 100% { visibility: hidden; }
}

/* ---- screenshot flash ---- */
.hba-flash {
  animation: hba-flash 20s ease-out infinite;
}
@keyframes hba-flash {
  0%, 43.5%  { opacity: 0; }
  44%        { opacity: 0.35; }
  45.5%      { opacity: 0; }
  100%       { opacity: 0; }
}

/* ============================================================
   GRID PHASE — mini browser animations
   Each runs on its own loop duration for natural independence
   ============================================================ */

/* ---- scrape: cursor scrolls down content ---- */
.hba-cursor-scrape {
  animation: hba-cursorScrape 6s ease-in-out infinite;
}
@keyframes hba-cursorScrape {
  0%   { transform: translate(60px, 20px); }
  15%  { transform: translate(40px, 30px); }
  30%  { transform: translate(50px, 50px); }
  50%  { transform: translate(35px, 70px); }
  70%  { transform: translate(55px, 45px); }
  85%  { transform: translate(45px, 25px); }
  100% { transform: translate(60px, 20px); }
}
.hba-mini-scroll {
  animation: hba-miniScroll 6s ease-in-out infinite;
}
@keyframes hba-miniScroll {
  0%   { transform: translateY(0); }
  40%  { transform: translateY(-15px); }
  60%  { transform: translateY(-25px); }
  80%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
.hba-click-mini-scrape {
  animation: hba-clickMiniScrape 6s ease-out infinite;
}
@keyframes hba-clickMiniScrape {
  0%, 29%  { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  30%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  35%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  100%     { opacity: 0; }
}

/* ---- form: cursor fills fields ---- */
.hba-cursor-form {
  animation: hba-cursorForm 8s ease-in-out infinite;
}
@keyframes hba-cursorForm {
  0%        { transform: translate(50px, 15px); }
  10%       { transform: translate(65px, 32px); }
  35%       { transform: translate(65px, 32px); }
  40%       { transform: translate(65px, 52px); }
  65%       { transform: translate(65px, 52px); }
  70%       { transform: translate(50px, 72px); }
  75%       { transform: translate(50px, 72px); }
  85%       { transform: translate(50px, 15px); }
  100%      { transform: translate(50px, 15px); }
}
.hba-mini-type-email {
  animation: hba-miniTypeEmail 8s step-end infinite;
}
@keyframes hba-miniTypeEmail {
  0%, 10%   { max-width: 0; }
  15%       { max-width: 20px; }
  20%       { max-width: 45px; }
  25%       { max-width: 70px; }
  30%       { max-width: 100px; }
  35%       { max-width: 200px; }
  80%, 100% { max-width: 200px; }
}
.hba-mini-type-pass {
  animation: hba-miniTypePass 8s step-end infinite;
}
@keyframes hba-miniTypePass {
  0%, 40%   { max-width: 0; }
  45%       { max-width: 15px; }
  50%       { max-width: 30px; }
  55%       { max-width: 50px; }
  60%       { max-width: 70px; }
  65%       { max-width: 200px; }
  80%, 100% { max-width: 200px; }
}
.hba-click-mini-form {
  animation: hba-clickMiniForm 8s ease-out infinite;
}
@keyframes hba-clickMiniForm {
  0%, 74%  { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  75%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  80%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  100%     { opacity: 0; }
}
.hba-mini-form-btn {
  animation: hba-miniFormBtn 8s ease-out infinite;
}
@keyframes hba-miniFormBtn {
  0%, 74%  { box-shadow: none; }
  75%      { box-shadow: 0 0 0 2px rgba(147,51,234,0.6); }
  78%      { box-shadow: 0 0 0 3px rgba(147,51,234,0.2); }
  80%      { box-shadow: none; }
  100%     { box-shadow: none; }
}

/* ---- navigate: cursor clicks around, content changes ---- */
.hba-cursor-navigate {
  animation: hba-cursorNav 7s ease-in-out infinite;
}
@keyframes hba-cursorNav {
  0%   { transform: translate(30px, 20px); }
  15%  { transform: translate(50px, 15px); }
  30%  { transform: translate(20px, 45px); }
  45%  { transform: translate(60px, 35px); }
  60%  { transform: translate(40px, 55px); }
  75%  { transform: translate(25px, 30px); }
  100% { transform: translate(30px, 20px); }
}
.hba-click-mini-navigate {
  animation: hba-clickMiniNav 7s ease-out infinite;
}
@keyframes hba-clickMiniNav {
  0%, 14%  { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  15%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  20%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  44%      { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  45%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  50%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  74%      { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  75%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  80%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  100%     { opacity: 0; }
}
.hba-mini-page1 {
  animation: hba-miniPage 7s ease-in-out infinite;
}
@keyframes hba-miniPage {
  0%   { opacity: 1; }
  15%  { opacity: 0.3; }
  20%  { opacity: 1; }
  45%  { opacity: 0.3; }
  50%  { opacity: 1; }
  75%  { opacity: 0.3; }
  80%  { opacity: 1; }
  100% { opacity: 1; }
}

/* ---- screenshot: cursor points, flash fires ---- */
.hba-cursor-screenshot {
  animation: hba-cursorShot 9s ease-in-out infinite;
}
@keyframes hba-cursorShot {
  0%   { transform: translate(45px, 15px); }
  20%  { transform: translate(30px, 35px); }
  40%  { transform: translate(55px, 50px); }
  55%  { transform: translate(55px, 50px); }
  60%  { transform: translate(40px, 20px); }
  80%  { transform: translate(25px, 40px); }
  90%  { transform: translate(25px, 40px); }
  100% { transform: translate(45px, 15px); }
}
.hba-flash-mini {
  animation: hba-flashMini 9s ease-out infinite;
}
@keyframes hba-flashMini {
  0%, 39%  { opacity: 0; }
  40%      { opacity: 0.4; }
  44%      { opacity: 0; }
  89%      { opacity: 0; }
  90%      { opacity: 0.4; }
  94%      { opacity: 0; }
  100%     { opacity: 0; }
}
.hba-click-mini-screenshot {
  animation: hba-clickMiniShot 9s ease-out infinite;
}
@keyframes hba-clickMiniShot {
  0%, 19%  { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  20%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  25%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  59%      { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  60%      { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
  65%      { opacity: 0; transform: translate(-50%,-50%) scale(2); }
  100%     { opacity: 0; }
}
`;
