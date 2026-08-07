// =============================================
//  MEUFOCOAPP — QUIZ DE CONVERSÃO
//  Quiz Logic & Conversion Engine
// =============================================

// ---- QUESTIONS DATA ----
const questions = [
  {
    id: 1,
    image: 'assets/img_goal.png',
    imageAlt: 'Objetivo de estudos',
    coachHint: 'Vamos começar pelo mais importante 🎯',
    text: 'Qual é o seu objetivo principal agora?',
    key: 'objetivo',
    options: [
      { emoji: '🏛️', text: 'Concurso Público (Federal, Estadual ou Municipal)', value: 'concurso' },
      { emoji: '📝', text: 'ENEM — quero entrar em uma universidade pública', value: 'enem' },
      { emoji: '🎓', text: 'Vestibular de faculdade particular ou curso técnico', value: 'vestibular' },
      { emoji: '🤔', text: 'Ainda não decidi direito', value: 'indeciso' },
    ]
  },
  {
    id: 2,
    image: null,
    coachHint: 'Ótimo! Me conta mais sobre seu alvo 🎯',
    text: 'Me conta um pouco mais sobre a prova que você quer fazer:',
    key: 'prova_especifica',
    conditional: true, // dynamically set based on objective
    options: [] // filled dynamically
  },
  {
    id: 3,
    image: 'assets/img_chaos.png',
    imageAlt: 'Fase dos estudos',
    coachHint: 'Isso me ajuda a entender onde você está ✍️',
    text: 'Em que fase você está nos seus estudos hoje?',
    key: 'fase',
    options: [
      { emoji: '🌱', text: 'Começando do zero — ainda nem sei por onde começar', value: 'zero' },
      { emoji: '📚', text: 'Já estudando, mas sem constância ou direção', value: 'medio' },
      { emoji: '🔥', text: 'Na reta final — prova chegando, preciso revisar tudo', value: 'reta_final' },
      { emoji: '🔄', text: 'Já tentei antes e vou tentar de novo', value: 'segunda_tentativa' },
    ]
  },
  {
    id: 4,
    image: 'assets/img_time.png',
    imageAlt: 'Tempo disponível',
    coachHint: 'Realismo aqui é fundamental para montar o cronograma certo ⏰',
    text: 'Quantas horas por dia você consegue dedicar aos estudos?',
    key: 'tempo_diario',
    options: [
      { emoji: '⚡', text: 'Menos de 1 hora (tenho pouco tempo livre)', value: 'menos_1h' },
      { emoji: '⏱️', text: '1 a 2 horas por dia', value: '1_2h' },
      { emoji: '📖', text: '3 a 4 horas por dia', value: '3_4h' },
      { emoji: '💪', text: '5 horas ou mais (estudo em tempo integral)', value: '5h_mais' },
    ]
  },
  {
    id: 5,
    image: 'assets/img_anxiety.png',
    imageAlt: 'Maior dificuldade',
    coachHint: 'Essa é a pergunta mais importante de todas 💡',
    text: 'Qual é a sua maior dificuldade hoje quando o assunto é estudar?',
    key: 'maior_dificuldade',
    options: [
      { emoji: '📅', text: 'Organização — não consigo montar um cronograma que funcione', value: 'organizacao' },
      { emoji: '🐌', text: 'Constância — começo bem, mas paro depois de alguns dias', value: 'constancia' },
      { emoji: '😰', text: 'Ansiedade — fico travado com medo de estudar a coisa errada', value: 'ansiedade' },
      { emoji: '🗺️', text: 'Direção — não sei quais matérias priorizar', value: 'direcao' },
      { emoji: '📵', text: 'Distração — celular e outras coisas sempre atrapalham', value: 'distracao' },
    ]
  },
  {
    id: 6,
    image: null,
    coachHint: 'Importante entender sua situação atual 📋',
    text: 'Como você está estudando hoje? (Seu método atual)',
    key: 'metodo_atual',
    options: [
      { emoji: '📓', text: 'Só com livros e cadernos, de forma bem tradicional', value: 'tradicional' },
      { emoji: '📱', text: 'Uso alguns apps e vídeos no YouTube', value: 'apps_youtube' },
      { emoji: '🎓', text: 'Faço um curso ou cursinho presencial ou online', value: 'cursinho' },
      { emoji: '🌀', text: 'Sem método definido — cada dia é diferente', value: 'sem_metodo' },
    ]
  },
  {
    id: 7,
    image: null,
    coachHint: 'Quase lá! Isso vai fazer toda diferença no resultado 🎯',
    text: 'Como você prefere estudar?',
    key: 'estilo_aprendizado',
    options: [
      { emoji: '📹', text: 'Videoaulas — aprenço melhor assistindo e ouvindo', value: 'visual_auditivo' },
      { emoji: '📚', text: 'Leitura e resumos — prefiro ler e fazer anotações', value: 'leitura' },
      { emoji: '✍️', text: 'Exercícios e questões — aprenco na prática', value: 'exercicios' },
      { emoji: '🔀', text: 'Vario conforme a matéria — gosto de misturar', value: 'misto' },
    ]
  },
  {
    id: 8,
    image: 'assets/img_routine.png',
    imageAlt: 'Rotina de estudos',
    coachHint: 'Essa informação me ajuda a calibrar sua trilha 🛠️',
    text: 'Você tem uma rotina de estudos definida?',
    key: 'tem_rotina',
    options: [
      { emoji: '✅', text: 'Sim, tenho horários fixos e sigo bem', value: 'tem_rotina_boa' },
      { emoji: '😬', text: 'Tenho, mas não consigo seguir direito', value: 'rotina_fraca' },
      { emoji: '❌', text: 'Não tenho — estudo quando dá', value: 'sem_rotina' },
    ]
  },
  {
    id: 9,
    image: null,
    coachHint: 'Quase chegando ao seu diagnóstico 💪',
    text: 'Quando você pensa em começar a estudar hoje, o que normalmente acontece?',
    key: 'comportamento',
    options: [
      { emoji: '🏃', text: 'Começo logo — sem problemas com procrastinação', value: 'proativo' },
      { emoji: '📱', text: 'Pego o celular primeiro e o tempo passa voando', value: 'procrastina_celular' },
      { emoji: '😴', text: 'Me sinto cansado e deixo pra depois', value: 'procrastina_cansaço' },
      { emoji: '😟', text: 'Trava — fico indeciso sobre o que estudar primeiro', value: 'trava_decisao' },
    ]
  },
  {
    id: 10,
    image: null,
    coachHint: 'Importante para montar o plano certo para você 💰',
    text: 'Você já investiu em algum produto ou serviço de preparação para a sua prova?',
    key: 'investimento_anterior',
    options: [
      { emoji: '✅', text: 'Sim, já comprei cursos, apostilas ou app e me ajudou bastante', value: 'investiu_positivo' },
      { emoji: '😕', text: 'Sim, mas não me ajudou muito — desisti no meio', value: 'investiu_negativo' },
      { emoji: '🆓', text: 'Nunca investi — sempre tentei só com material gratuito', value: 'nunca_investiu' },
    ]
  },
  {
    id: 11,
    image: null,
    coachHint: 'Última reta! Vamos fechar seu diagnóstico 📊',
    text: 'O que te falta hoje para você se sentir confiante na prova?',
    key: 'falta_confianca',
    options: [
      { emoji: '📖', text: 'Dominar melhor o conteúdo das matérias', value: 'conteudo' },
      { emoji: '📅', text: 'Um cronograma organizado que eu realmente consiga seguir', value: 'cronograma' },
      { emoji: '📊', text: 'Saber quais são minhas forças e fraquezas por matéria', value: 'desempenho' },
      { emoji: '🧘', text: 'Controlar a ansiedade e a falta de motivação', value: 'motivacao_ansiedade' },
    ]
  },
  {
    id: 12,
    image: 'assets/img_final.png',
    imageAlt: 'Chegou até aqui — sua aprovação está próxima',
    coachHint: 'Última pergunta! Promessa de Nina 🤞',
    text: 'Qual dessas frases mais representa você agora?',
    key: 'perfil_final',
    options: [
      { emoji: '🔥', text: '"Estou pronto(a) pra começar de verdade — só me diz o caminho"', value: 'pronto' },
      { emoji: '🤝', text: '"Preciso de ajuda para me organizar e criar disciplina"', value: 'precisa_disciplina' },
      { emoji: '⚡', text: '"Já estudo, mas quero otimizar meu tempo e ir mais longe"', value: 'quer_otimizar' },
      { emoji: '🧐', text: '"Ainda estou explorando — quero entender antes de decidir"', value: 'explorando' },
    ]
  }
];

// Dynamic options for Q2 based on Q1
const conditionalOptions = {
  concurso: [
    { emoji: '🏦', text: 'Receita Federal / SEFAZ — Fiscal', value: 'concurso_fiscal_federal' },
    { emoji: '👮', text: 'Polícia Federal / Rodoviária / Civil', value: 'concurso_policia' },
    { emoji: '📋', text: 'Tribunal (TRF, TRT, TJ, STF, STJ)', value: 'concurso_tribunal' },
    { emoji: '📬', text: 'Correios, IBGE ou outra estatal', value: 'concurso_estatal' },
    { emoji: '🌆', text: 'Prefeitura ou governo estadual (cargo municipal/estadual)', value: 'concurso_municipal' },
    { emoji: '❓', text: 'Ainda não decidi qual concurso', value: 'concurso_indeciso' },
  ],
  enem: [
    { emoji: '⚕️', text: 'Medicina, Direito ou Engenharia (cursos mais concorridos)', value: 'enem_alta_concorrencia' },
    { emoji: '🎨', text: 'Humanas, Artes, Educação ou Comunicação', value: 'enem_humanas' },
    { emoji: '🔬', text: 'Exatas, Computação ou cursos tecnológicos', value: 'enem_exatas' },
    { emoji: '📋', text: 'Ainda não sei o curso — quero aumentar minha nota geral', value: 'enem_geral' },
  ],
  vestibular: [
    { emoji: '🏫', text: 'Faculdade particular com vestibular próprio (ex: Fuvest, Unicamp)', value: 'vestibular_proprio' },
    { emoji: '🎓', text: 'Curso técnico ou tecnólogo', value: 'vestibular_tecnico' },
    { emoji: '🔁', text: 'Usar nota do ENEM para entrar em particular (ProUni/Sisu)', value: 'vestibular_prouni' },
  ],
  indeciso: [
    { emoji: '🏛️', text: 'Tenho mais interesse em concurso público', value: 'inclinado_concurso' },
    { emoji: '🎓', text: 'Tenho mais interesse em faculdade (ENEM/vestibular)', value: 'inclinado_faculdade' },
    { emoji: '⚖️', text: 'Estou pesando os dois — ainda não decidi', value: 'indeciso_total' },
  ]
};

// ---- STATE ----
let currentQ = 0;
let answers = {};
let startTime = null;
let isAdvancing = false; // lock to prevent double-advance

// ---- UTILS ----
const $ = id => document.getElementById(id);
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ---- INTRO ANIMATION ----
window.addEventListener('DOMContentLoaded', () => {
  const typing = $('typing-indicator');
  const text = $('intro-text');
  const bottom = $('intro-bottom');

  setTimeout(() => {
    typing.classList.add('hidden');
    text.classList.remove('hidden');
    text.classList.add('fade-in');
  }, 2000);

  setTimeout(() => {
    bottom.classList.remove('hidden');
    bottom.classList.add('fade-in');
  }, 3200);
});

// ---- QUIZ START ----
function startQuiz() {
  startTime = Date.now();
  currentQ = 0;
  answers = {};
  showScreen('quiz-screen');
  renderQuestion();
}

// ---- DYNAMIC Q2 OPTIONS ----
function resolveOptions(q) {
  if (q.conditional) {
    const obj = answers['objetivo'] || 'concurso';
    return conditionalOptions[obj] || conditionalOptions['concurso'];
  }
  return q.options;
}

function resolveQ2Text(objective) {
  const texts = {
    concurso: 'Qual concurso ou área você está mirando?',
    enem: 'Qual área ou curso você quer ingressar pelo ENEM?',
    vestibular: 'Qual tipo de processo seletivo você vai fazer?',
    indeciso: 'Para onde você está mais inclinado(a)?',
  };
  return texts[objective] || texts['concurso'];
}

// ---- RENDER QUESTION ----
function renderQuestion() {
  const q = questions[currentQ];
  const totalQ = questions.length;

  // Progress
  const pct = (currentQ / totalQ) * 100;
  $('progress-bar').style.width = pct + '%';
  $('q-counter').textContent = `${currentQ + 1} / ${totalQ}`;
  // NOTE: set coach-hint FIRST — it replaces innerHTML (including any child spans)
  $('coach-hint').textContent = q.coachHint;

  // Dynamic Q2
  let questionText = q.text;
  if (q.conditional) {
    questionText = resolveQ2Text(answers['objetivo'] || 'concurso');
  }
  $('question-text').textContent = questionText;

  // Image
  const imageWrap = $('q-image-wrap');
  const qImg = $('q-image');
  if (q.image) {
    qImg.src = q.image;
    qImg.alt = q.imageAlt || '';
    imageWrap.classList.remove('no-image');
  } else {
    imageWrap.classList.add('no-image');
  }

  // Options
  const opts = resolveOptions(q);
  const grid = $('options-grid');
  grid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${i}`;
    if (answers[q.key] === opt.value) btn.classList.add('selected');

    btn.innerHTML = `
      <div class="option-letter">${letters[i]}</div>
      ${opt.emoji ? `<span class="option-emoji">${opt.emoji}</span>` : ''}
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectOption(q.key, opt.value, btn));
    grid.appendChild(btn);
  });

  // Animate card
  const card = $('question-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'slideUp 0.4s ease';

  // Back btn
  $('back-btn').style.visibility = currentQ === 0 ? 'hidden' : 'visible';

  // Next btn
  const nextBtn = $('next-btn');
  if (answers[q.key]) {
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.add('hidden');
  }

  // Last question → change next btn label
  if (currentQ === totalQ - 1) {
    nextBtn.innerHTML = `Ver meu diagnóstico <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  } else {
    nextBtn.innerHTML = `Próxima <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }
}

// ---- SELECT OPTION ----
function selectOption(key, value, btn) {
  if (isAdvancing) return; // ignore clicks during transition
  answers[key] = value;

  // Update UI
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Show next btn
  $('next-btn').classList.remove('hidden');

  // Auto-advance after short delay (mobile UX)
  setTimeout(() => {
    nextQuestion();
  }, 480);
}

// ---- NAVIGATION ----
function nextQuestion() {
  if (isAdvancing) return; // prevent double-fire
  const q = questions[currentQ];
  if (!answers[q.key]) return; // guard: must have an answer

  isAdvancing = true;
  setTimeout(() => { isAdvancing = false; }, 500); // unlock after transition

  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showLoading();
  }
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

// ---- LOADING SCREEN ----
function showLoading() {
  showScreen('loading-screen');
  const bar = $('loading-bar');
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  const durations = [800, 600, 900, 700]; // ms per step
  let elapsed = 0;
  let total = durations.reduce((a, b) => a + b, 0) + 600;

  // Animate steps
  steps.forEach((sid, i) => {
    let delay = durations.slice(0, i).reduce((a, b) => a + b, 0);
    setTimeout(() => {
      // Mark previous as done
      if (i > 0) {
        $(steps[i - 1]).classList.remove('active');
        $(steps[i - 1]).classList.add('done');
      }
      $(sid).classList.add('active');
    }, delay + 200);
  });

  // Mark last step done
  setTimeout(() => {
    $(steps[steps.length - 1]).classList.remove('active');
    $(steps[steps.length - 1]).classList.add('done');
  }, durations.reduce((a, b) => a + b, 0) + 300);

  // Animate bar
  let startTs = null;
  function animBar(ts) {
    if (!startTs) startTs = ts;
    const progress = Math.min((ts - startTs) / total, 1);
    bar.style.width = (progress * 100) + '%';
    if (progress < 1) requestAnimationFrame(animBar);
    else showResult();
  }
  requestAnimationFrame(animBar);
}

// ---- RESULT ENGINE ----
function computeResult() {
  const obj = answers['objetivo'] || 'concurso';
  const prova = answers['prova_especifica'] || '';
  const fase = answers['fase'] || '';
  const tempo = answers['tempo_diario'] || '';
  const dor = answers['maior_dificuldade'] || '';
  const perfil = answers['perfil_final'] || '';
  const rotina = answers['tem_rotina'] || '';
  const falta = answers['falta_confianca'] || '';
  const investimento = answers['investimento_anterior'] || '';

  let result = {
    badge: '🎯 Diagnóstico Completo',
    title: '',
    subtitle: '',
    planIcon: '🚀',
    planName: '',
    planDesc: '',
    features: [],
    ctaText: 'Quero começar minha trilha agora',
    diagItems: []
  };

  // ---- DIAGNOSIS ITEMS ----
  const objetivoLabels = {
    concurso: '🏛️ Concurso Público',
    enem: '📝 ENEM',
    vestibular: '🎓 Vestibular',
    indeciso: '🤔 Em definição'
  };

  const provaLabels = {
    concurso_fiscal_federal: 'Receita Federal / SEFAZ — Área Fiscal',
    concurso_policia: 'Carreira Policial (PF / PRF / PC)',
    concurso_tribunal: 'Tribunais (TRF / TRT / TJ / STF)',
    concurso_estatal: 'Empresa Estatal (Correios, IBGE...)',
    concurso_municipal: 'Prefeitura ou Governo Estadual',
    concurso_indeciso: 'Ainda definindo o edital',
    enem_alta_concorrencia: 'Medicina, Direito ou Engenharia',
    enem_humanas: 'Humanas / Artes / Comunicação',
    enem_exatas: 'Exatas / Computação / Tecnologia',
    enem_geral: 'Aumentar nota geral no ENEM',
    vestibular_proprio: 'Vestibular próprio (Fuvest, Unicamp...)',
    vestibular_tecnico: 'Curso Técnico / Tecnólogo',
    vestibular_prouni: 'ProUni / Sisu (nota ENEM)',
    inclinado_concurso: 'Inclinado a Concurso Público',
    inclinado_faculdade: 'Inclinado a Faculdade',
    indeciso_total: 'Ainda decidindo o caminho',
  };

  const faseLabels = {
    zero: 'Iniciante — do zero',
    medio: 'Em andamento — falta direção',
    reta_final: 'Reta final — precisa revisar',
    segunda_tentativa: 'Nova tentativa após reprovação',
  };

  const tempoLabels = {
    menos_1h: 'Menos de 1h por dia',
    '1_2h': '1 a 2 horas diárias',
    '3_4h': '3 a 4 horas diárias',
    '5h_mais': '5h ou mais por dia',
  };

  const dorLabels = {
    organizacao: '📅 Organização e cronograma',
    constancia: '🐌 Falta de constância',
    ansiedade: '😰 Ansiedade e medo de errar',
    direcao: '🗺️ Não saber o que priorizar',
    distracao: '📵 Distrações e foco',
  };

  result.diagItems = [
    { icon: '🎯', label: 'Objetivo', value: objetivoLabels[obj] || obj },
    { icon: '📌', label: 'Prova / Foco', value: provaLabels[prova] || 'Em definição' },
    { icon: '📍', label: 'Fase atual', value: faseLabels[fase] || fase },
    { icon: '⏰', label: 'Tempo disponível', value: tempoLabels[tempo] || tempo },
    { icon: '⚡', label: 'Principal desafio', value: dorLabels[dor] || dor },
  ];

  // ---- PLAN LOGIC ----
  if (obj === 'concurso') {
    result.planIcon = '🏛️';
    result.planName = 'Trilha Concurso Público';
    result.planDesc = 'Cronograma personalizado baseado no edital e na banca do seu concurso';
    result.features = [
      'Cronograma adaptado ao seu edital e banca (CESPE, FCC, FGV...)',
      'Banco de questões por disciplina e grau de dificuldade',
      'Ciclo automático de revisão espaçada para fixar o conteúdo',
      'Dashboard de desempenho por matéria — veja suas fraquezas',
      'Lembretes diários para manter a constância nos estudos',
      'Trilha ajustável conforme novo edital ou mudança de objetivo',
    ];

    if (prova === 'concurso_fiscal_federal') {
      result.title = 'Você tem perfil de Fiscal! 🏦';
      result.subtitle = 'Pela conversa que tivemos, o que mais vai te ajudar é uma trilha focada nas disciplinas da Receita Federal com ciclo de revisão intensivo.';
      result.ctaText = 'Começar trilha Receita Federal';
    } else if (prova === 'concurso_policia') {
      result.title = 'Trilha Carreira Policial identificada! 👮';
      result.subtitle = 'Seu perfil indica que você precisa de uma rotina estruturada com cronograma focado no edital da carreira policial.';
      result.ctaText = 'Começar trilha Carreira Policial';
    } else if (prova.includes('tribunal')) {
      result.title = 'Perfil Tribunal detectado! ⚖️';
      result.subtitle = 'Você vai se sair bem com uma trilha focada em Direito, Português e Raciocínio Lógico — as disciplinas rei dos tribunais.';
      result.ctaText = 'Começar trilha Tribunais';
    } else {
      result.title = 'Sua trilha de Concurso está pronta! 🏛️';
      result.subtitle = 'Com base no seu perfil, montamos uma trilha que encaixa no seu tempo disponível e ataca seu principal ponto de dor.';
      result.ctaText = 'Começar minha trilha de Concurso';
    }
  } else if (obj === 'enem') {
    result.planIcon = '📝';
    result.planName = 'Trilha ENEM';
    result.planDesc = 'Estratégia personalizada por competência, com foco nas disciplinas de maior impacto na sua nota';
    result.features = [
      'Cronograma por matéria alinhado com a grade do ENEM',
      'Simulados completos com correção e análise de desempenho',
      'Módulo especial de Redação — do tema à nota 1000',
      'Estratégia TRI: aprenda a pontuar melhor com as mesmas respostas',
      'Metas semanais realistas para o seu tempo disponível',
      'Revisão inteligente das matérias de menor desempenho',
    ];
    result.title = 'Sua trilha do ENEM foi montada! 📝';
    result.subtitle = 'Você tem tudo para sair na frente. O MeuFocoApp vai organizar sua preparação para o ENEM de um jeito que você realmente consiga seguir.';
    result.ctaText = 'Começar minha trilha do ENEM';
  } else if (obj === 'vestibular') {
    result.planIcon = '🎓';
    result.planName = 'Trilha Vestibular';
    result.planDesc = 'Cronograma adaptado ao processo seletivo específico que você vai fazer';
    result.features = [
      'Cronograma por matéria ajustado ao vestibular escolhido',
      'Banco de provas anteriores com resolução comentada',
      'Análise de frequência de assuntos por vestibular',
      'Gestão de tempo: como responder mais questões na prova',
      'Módulo de redação para vestibulares com dissertação',
      'Simulados cronometrados para treinar a performance real',
    ];
    result.title = 'Trilha Vestibular personalizada! 🎓';
    result.subtitle = 'Com um plano organizado e adaptado ao seu vestibular, sua chance de aprovação aumenta muito. Vamos lá?';
    result.ctaText = 'Começar minha trilha do Vestibular';
  } else {
    result.planIcon = '🗺️';
    result.planName = 'Trilha Exploratória';
    result.planDesc = 'Comece com uma base sólida enquanto decide seu objetivo final';
    result.features = [
      'Trilha inicial de conteúdos comuns (Português, Matemática, Raciocínio)',
      'Orientação personalizada para escolher seu caminho ideal',
      'Flexível: pode virar trilha de Concurso ou ENEM a qualquer momento',
      'Cronograma leve para começar sem pressão',
      'Conversa com a Nina para diagnosticar o melhor rumo',
    ];
    result.title = 'Vamos descobrir seu melhor caminho! 🗺️';
    result.subtitle = 'Mesmo sem certeza sobre qual prova fazer, você já pode começar a se preparar. A trilha exploratória é perfeita pra isso.';
    result.ctaText = 'Explorar minha trilha agora';
  }

  // Add dor-specific feature
  if (dor === 'constancia') {
    result.features.unshift('🔔 Lembretes diários e streaks de estudo para criar hábito real');
  } else if (dor === 'organizacao') {
    result.features.unshift('📅 Cronograma automático e inteligente — sem precisar planejar do zero');
  } else if (dor === 'ansiedade') {
    result.features.unshift('🧘 Metas diárias pequenas e alcançáveis para reduzir a sobrecarga');
  } else if (dor === 'direcao') {
    result.features.unshift('🎯 Priorização inteligente — estude o que mais cai na sua prova primeiro');
  }

  return result;
}

// ---- SHOW RESULT ----
function showResult() {
  const r = computeResult();
  showScreen('result-screen');

  $('result-badge').textContent = r.badge;
  $('result-title').textContent = r.title;
  $('result-subtitle').textContent = r.subtitle;
  $('plan-icon').textContent = r.planIcon;
  $('plan-name').textContent = r.planName;
  $('plan-desc').textContent = r.planDesc;
  $('cta-btn').textContent = r.ctaText;
  $('cta-btn').insertAdjacentHTML('beforeend', `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`);

  // Features
  const featuresList = $('plan-features');
  featuresList.innerHTML = r.features.slice(0, 5).map(f => `<li>${f}</li>`).join('');

  // Diagnosis
  const diagBody = $('diagnosis-body');
  diagBody.innerHTML = r.diagItems.map(item => `
    <div class="diag-item">
      <div class="diag-icon">${item.icon}</div>
      <div>
        <div class="diag-label">${item.label}</div>
        <div class="diag-value">${item.value}</div>
      </div>
    </div>
  `).join('');

  // Animate result in
  const resultContent = document.querySelector('.result-content');
  resultContent.style.animation = 'none';
  resultContent.offsetHeight;
  resultContent.style.animation = 'slideUp 0.5s ease';
}

// ---- RESTART ----
function restartQuiz() {
  currentQ = 0;
  answers = {};
  showScreen('intro-screen');
  // Reset intro
  $('typing-indicator').classList.remove('hidden');
  $('intro-text').classList.add('hidden');
  $('intro-bottom').classList.add('hidden');
  setTimeout(() => {
    $('typing-indicator').classList.add('hidden');
    $('intro-text').classList.remove('hidden');
    $('intro-text').classList.add('fade-in');
  }, 2000);
  setTimeout(() => {
    $('intro-bottom').classList.remove('hidden');
    $('intro-bottom').classList.add('fade-in');
  }, 3200);
}
