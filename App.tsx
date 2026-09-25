import React from 'react';
import { ArrowUpRight, Compass, DraftingCompass, Globe2, Handshake, Layers3, Mail, Menu, ShieldCheck } from 'lucide-react';
import './style.css';

const contact = 'https://pavelsamuta.com/';
const steps = [
  { n: '01', title: 'Задача', text: 'Компания описывает техническую и экономическую проблему: ограничение, сроки, ожидаемый результат.' },
  { n: '02', title: 'Команда', text: 'Инженеры, исследователи и производственные партнёры собираются вокруг конкретной задачи.' },
  { n: '03', title: 'Проверка', text: 'Гипотеза проходит расчёт, прототипирование и проверку на технологичность.' },
  { n: '04', title: 'Внедрение', text: 'Результат доводится до документации, изготовления и повторяемого применения.' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return <>
    <header className="site-header">
      <div className="wrap nav">
        <a href="#top" className="logo" aria-label="Global Minds Forge, наверх"><span className="logo-mark">GMF<span>.</span></span><span className="logo-name">GLOBAL MINDS<br/>FORGE</span></a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}><Menu size={25}/></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Основная навигация" onClick={() => setMenuOpen(false)}>
          <a href="#concept">Концепция</a><a href="#model">Как работает</a><a href="#investment">Инвесторам</a><a className="nav-contact" href="#contact">Связаться <ArrowUpRight size={15}/></a>
        </nav>
      </div>
    </header>
    <main id="top">
      <section className="hero wrap">
        <div className="hero-copy"><p className="eyebrow"><span className="pulse"/> ПРОЕКТ • GLOBAL MINDS FORGE</p>
          <h1>Идеи становятся<br/><em>инженерными</em><br/>решениями.</h1>
          <p className="lead">GMF объединяет инженеров, исследователей, производителей и инвесторов вокруг задач, которые требуют больше одной компетенции.</p>
          <div className="actions"><a className="button primary" href="#investment">Для инвестора <ArrowUpRight size={18}/></a><a className="button ghost" href="#model">Как это работает <span>↘</span></a></div>
          <p className="hero-note">Инициатор проекта: Павел Самута, инженер-механик. В профессии с 2007 года.</p>
        </div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/><div className="core">GMF</div><span className="node a">ENGINEERING</span><span className="node b">RESEARCH</span><span className="node c">INDUSTRY</span><span className="node d">CAPITAL</span></div>
      </section>
      <section className="band"><div className="wrap band-inner"><span>ОТ ЗАПРОСА К РЕЗУЛЬТАТУ</span><span>ИНЖЕНЕРИЯ × НАУКА × ПРОИЗВОДСТВО</span><span>GLOBAL MINDS FORGE</span></div></section>
      <section id="concept" className="section wrap"><div className="section-head"><p className="eyebrow">01 / КОНЦЕПЦИЯ</p><h2>Между хорошей идеей и работающим изделием обычно стоит целая производственная цепочка.</h2></div><div className="concept-grid"><p className="large-text">GMF задуман как среда, где участники собирают эту цепочку вокруг задачи и видят вклад друг друга.</p><div className="concept-list"><div><Compass/><h3>Найти компетенцию</h3><p>Соединить задачу с нужными специалистами и производственными возможностями.</p></div><div><Layers3/><h3>Сохранить контекст</h3><p>Фиксировать решения, версии и инженерные основания, чтобы знания не исчезали вместе с участником.</p></div><div><ShieldCheck/><h3>Проверить результат</h3><p>Перевести идею в проверяемые требования, прототип и план внедрения.</p></div></div></div></section>
      <section id="model" className="section model"><div className="wrap"><div className="section-head"><p className="eyebrow">02 / МОДЕЛЬ</p><h2>Путь проекта</h2><p>От технического запроса до воспроизводимого результата.</p></div><div className="step-grid">{steps.map(step => <article className="step" key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className="caption">Это проектная модель GMF. Возможности платформы и правила участия будут уточняться по мере разработки.</p></div></section>
      <section id="investment" className="section investment"><div className="wrap investment-grid"><div><p className="eyebrow">03 / ИНВЕСТОРАМ И ПАРТНЁРАМ</p><h2>Инвестировать в путь от экспертизы до внедрения.</h2><p className="large-text">GMF предлагает проверить модель сети на реальных промышленных задачах: собрать компетенции, проследить ход разработки и довести решение до производства.</p><a className="button primary" href={contact}>Обсудить партнёрство <ArrowUpRight size={18}/></a></div><div className="investment-panel"><div className="panel-top"><span>GMF / ИНВЕСТИЦИОННЫЙ ТЕЗИС</span><Globe2 size={23}/></div><div className="panel-row"><DraftingCompass/><div><h3>Проблема</h3><p>Сложным проектам трудно собрать вместе инженерию, научную экспертизу, производство и капитал.</p></div></div><div className="panel-row"><Handshake/><div><h3>Гипотеза</h3><p>Единая среда для поиска участников и ведения проекта сократит потери на стыках этих команд.</p></div></div><div className="panel-row"><Compass/><div><h3>Что проверять сначала</h3><p>Спрос со стороны предприятий, повторяемость процесса и готовность партнёров участвовать в пилотах.</p></div></div><p className="panel-foot">Стадия: концепция / ранний прототип. Финансовые показатели и условия инвестирования обсуждаются после проверки исходных данных.</p></div></div></section>
      <section id="contact" className="section contact wrap"><p className="eyebrow">04 / КОНТАКТ</p><h2>Есть промышленная задача<br/>или интерес к GMF?</h2><p>Свяжитесь с Павлом Самутой через его сайт. Укажите задачу, роль вашей команды и удобный способ связи.</p><a className="button primary" href={contact}><Mail size={18}/> Контакты Павла <ArrowUpRight size={18}/></a></section>
    </main><footer><div className="wrap footer-inner"><span className="logo-mark">GMF<span>.</span></span><span>© {new Date().getFullYear()} Global Minds Forge · Павел Самута</span><a href="#top">Наверх ↑</a></div></footer>
  </>;
}
