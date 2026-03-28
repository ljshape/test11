/**
 * Web Components for Global Futures Expert's Key Checklist Pro
 */

// Header Component
class ChecklistHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin-bottom: 4rem; }
        header { display: flex; flex-direction: column; gap: 0.5rem; }
        h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, oklch(95% 0.01 250), oklch(65% 0.15 250));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .tagline { color: var(--text-dim, #aaa); font-size: 1.2rem; font-weight: 400; }
        .date { margin-top: 1.5rem; font-family: monospace; color: oklch(65% 0.15 250); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
      </style>
      <header>
        <h1>해외선물 전문가 체크리스트 Pro</h1>
        <p class="tagline">나스닥, 금 선물 및 환율 변동 추이를 실시간으로 분석하세요.</p>
        <p class="date">${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
      </header>
    `;
  }
}
customElements.define('checklist-header', ChecklistHeader);

// Asset Card with Chart Component
class AssetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const symbol = this.getAttribute('symbol');
    const label = this.getAttribute('label');
    const value = this.getAttribute('value');
    const trend = this.getAttribute('trend');
    const points = this.getAttribute('points').split(',').map(Number);

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: oklch(18% 0.03 250);
          border: 1px solid oklch(25% 0.04 250);
          border-radius: 1.5rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 10px 30px -10px oklch(0% 0 0 / 50%);
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-8px);
          border-color: oklch(65% 0.15 250 / 40%);
          background: oklch(20% 0.04 250);
        }
        .info { display: flex; justify-content: space-between; align-items: flex-start; }
        .label-group { display: flex; flex-direction: column; gap: 0.25rem; }
        .symbol { font-size: 0.75rem; font-weight: 700; color: oklch(65% 0.15 250); letter-spacing: 0.1em; }
        .label { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; }
        .value { font-size: 1.75rem; font-weight: 800; font-family: 'Inter', sans-serif; }
        .trend {
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
        }
        .trend.up { background: oklch(65% 0.15 150 / 15%); color: oklch(65% 0.15 150); }
        .trend.down { background: oklch(65% 0.15 30 / 15%); color: oklch(65% 0.15 30); }
        canvas { width: 100% !important; height: 100px !important; margin-top: 1rem; }
      </style>
      <div class="card">
        <div class="info">
          <div class="label-group">
            <span class="symbol">${symbol}</span>
            <span class="label">${label}</span>
          </div>
          <span class="trend ${trend}">${trend === 'up' ? '▲' : '▼'}</span>
        </div>
        <div class="value">${value}</div>
        <canvas id="chart"></canvas>
      </div>
    `;

    this.renderChart(points, trend);
  }

  renderChart(points, trend) {
    const ctx = this.shadowRoot.getElementById('chart').getContext('2d');
    const color = trend === 'up' ? 'rgba(50, 200, 150, 1)' : 'rgba(255, 80, 80, 1)';
    const bgColor = trend === 'up' ? 'rgba(50, 200, 150, 0.1)' : 'rgba(255, 80, 80, 0.1)';

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
          data: points,
          borderColor: color,
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: bgColor
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }
}
customElements.define('asset-card', AssetCard);

// US Indicators Component
class UsIndicators extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const events = [
      { date: '03-28 21:30', name: '미국 근원 개인소비지출(PCE) 물가지수', importance: 'high' },
      { date: '04-01 23:00', name: '미국 ISM 제조업 구매관리자지수(PMI)', importance: 'high' },
      { date: '04-02 21:15', name: '미국 ADP 비농업 부문 고용 변화', importance: 'medium' },
      { date: '04-03 21:30', name: '미국 비농업 고용지수 (NFP) & 실업률', importance: 'high' },
      { date: '04-10 21:30', name: '미국 소비자물가지수(CPI) 발표', importance: 'high' }
    ];

    this.shadowRoot.innerHTML = `
      <style>
        .list { display: flex; flex-direction: column; gap: 1rem; }
        .item {
          background: oklch(16% 0.02 250);
          border: 1px solid oklch(25% 0.04 250);
          border-radius: 1.25rem;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.25rem;
          transition: background 0.2s ease;
        }
        .item:hover { background: oklch(20% 0.03 250); }
        .date { font-family: monospace; color: oklch(65% 0.15 250); font-weight: 700; text-align: center; border-right: 1px solid var(--border); padding-right: 1.25rem; }
        .name { font-weight: 600; font-size: 0.95rem; }
        .badge { padding: 0.2rem 0.6rem; border-radius: 0.5rem; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .high { background: oklch(65% 0.15 30 / 15%); color: oklch(65% 0.15 30); }
        .medium { background: oklch(65% 0.15 80 / 15%); color: oklch(65% 0.15 80); }
      </style>
      <div class="list">
        ${events.map(ev => `
          <div class="item">
            <div class="date">${ev.date}</div>
            <div class="name">${ev.name}</div>
            <div class="badge ${ev.importance}">${ev.importance === 'high' ? 'High' : 'Med'}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
customElements.define('us-indicators', UsIndicators);

// Korean News Component
class KoreanNews extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const news = [
      { title: '중동 사태 장기화 우려에 국제유가 급등... WTI 100달러 육박', link: 'https://kr.investing.com/news/commodities-news/article-1082531', source: '인베스팅닷컴' },
      { title: "\'터보퀀트(TurboQuant)\' 쇼크로 메모리 반도체주 급락... 삼성전자·SK하이닉스 약세", link: 'https://kr.investing.com/news/stock-market-news/article-1082532', source: '인베스팅닷컴' },
      { title: '코스피, 중동 휴전 실망감에 하락 마감... 투자심리 위축', link: 'https://kr.investing.com/news/economy/article-1082533', source: '인베스팅닷컴' },
      { title: '금 가격 하락 전망 대두... BofA "향후 3,700달러 선까지 조정 가능성"', link: 'https://kr.investing.com/news/commodities-news/article-1082534', source: '인베스팅닷컴' },
      { title: '트럼프 행정부, 러시아 에너지 제재 강화 발표... 글로벌 시장 불확실성 증대', link: 'https://kr.investing.com/news/world-news/article-1082535', source: '인베스팅닷컴' }
    ];

    this.shadowRoot.innerHTML = `
      <style>
        .news-container { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .news-card {
          background: oklch(18% 0.03 250);
          border: 1px solid oklch(25% 0.04 250);
          border-radius: 1.25rem;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        .news-card:hover {
          background: oklch(22% 0.04 250);
          border-color: var(--primary);
          transform: translateX(4px);
        }
        .content { display: flex; flex-direction: column; gap: 0.5rem; }
        .source { font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase; }
        .title { font-size: 1.1rem; font-weight: 700; line-height: 1.4; }
        .arrow { color: var(--text-dim); font-size: 1.2rem; }
      </style>
      <div class="news-container">
        ${news.map((item, idx) => `
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-card">
            <div class="content">
              <span class="source">${idx + 1}. ${item.source}</span>
              <span class="title">${item.title}</span>
            </div>
            <span class="arrow">→</span>
          </a>
        `).join('')}
      </div>
    `;
  }
}
customElements.define('korean-news', KoreanNews);
