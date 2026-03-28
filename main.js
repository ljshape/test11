/**
 * Web Components for Global Futures Expert's Key Checklist
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
        :host {
          display: block;
          margin-bottom: 3rem;
        }
        header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(to right, oklch(95% 0.01 250), oklch(65% 0.15 250));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .tagline {
          color: var(--text-dim, #aaa);
          font-size: 1.1rem;
          font-weight: 400;
        }
        .date {
          margin-top: 1rem;
          font-family: monospace;
          color: oklch(65% 0.15 250);
        }
      </style>
      <header>
        <h1>해외선물 전문가의 주요 체크리스트</h1>
        <p class="tagline">글로벌 금융 시장의 핵심 데이터를 실시간으로 모니터링하세요.</p>
        <p class="date">${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
      </header>
    `;
  }
}
customElements.define('checklist-header', ChecklistHeader);

// Market Card Component
class MarketCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const label = this.getAttribute('label');
    const value = this.getAttribute('value');
    const trend = this.getAttribute('trend');
    const type = this.getAttribute('type');

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: oklch(20% 0.03 250);
          border: 1px solid oklch(25% 0.04 250);
          border-radius: 1.5rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: 0 10px 30px -10px oklch(0% 0 0 / 50%);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: oklch(65% 0.15 250 / 30%);
        }
        .label {
          font-size: 0.85rem;
          font-weight: 600;
          color: oklch(75% 0.01 250);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .value {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: 'Inter', sans-serif;
        }
        .trend {
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .trend.up { color: oklch(65% 0.15 150); }
        .trend.down { color: oklch(65% 0.15 30); }
      </style>
      <div class="card">
        <span class="label">${label}</span>
        <span class="value">${value}</span>
        <span class="trend ${trend}">
          ${trend === 'up' ? '▲ 상승' : '▼ 하락'}
        </span>
      </div>
    `;
  }
}
customElements.define('market-card', MarketCard);

// Economic Calendar Component
class EconomicCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const events = [
      { date: '2026-03-28 21:30', name: '미국 근원 개인소비지출(PCE) 물가지수', importance: 'high' },
      { date: '2026-03-31 10:30', name: '중국 제조업 구매관리자지수(PMI)', importance: 'medium' },
      { date: '2026-04-03 21:30', name: '미국 비농업 고용지수 (Non-Farm Payrolls)', importance: 'high' }
    ];

    this.shadowRoot.innerHTML = `
      <style>
        .calendar-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .event-item {
          background: oklch(18% 0.02 250);
          border: 1px solid oklch(25% 0.04 250);
          border-radius: 1rem;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.5rem;
        }
        .date-box {
          text-align: center;
          padding-right: 1.5rem;
          border-right: 1px solid oklch(25% 0.04 250);
        }
        .time {
          font-family: monospace;
          color: oklch(65% 0.15 250);
          font-size: 0.85rem;
        }
        .name {
          font-weight: 600;
          font-size: 1rem;
        }
        .importance {
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .importance.high {
          background: oklch(65% 0.15 30 / 20%);
          color: oklch(65% 0.15 30);
          border: 1px solid oklch(65% 0.15 30 / 40%);
        }
        .importance.medium {
          background: oklch(65% 0.15 80 / 20%);
          color: oklch(65% 0.15 80);
          border: 1px solid oklch(65% 0.15 80 / 40%);
        }
      </style>
      <div class="calendar-list">
        ${events.map(event => `
          <div class="event-item">
            <div class="date-box">
              <div class="time">${event.date.split(' ')[1]}</div>
              <div class="day">${event.date.split(' ')[0].split('-').slice(1).join('/')}</div>
            </div>
            <div class="name">${event.name}</div>
            <div class="importance ${event.importance}">${event.importance === 'high' ? '중요' : '보통'}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
customElements.define('economic-calendar', EconomicCalendar);
