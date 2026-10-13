/*
 * Guia Tutorial Interativo - CSM SUL / ETA Pirapama
 * Módulo único e autocontido (CSS embutido). Sem dependências externas.
 *
 *   GuiaTutorial.abrir('operador' | 'manutencao' | 'visao')
 *   GuiaTutorial.mostrarBanner(tipo)            -> só no primeiro acesso
 *   GuiaTutorial.mostrarBanner(tipo, { sempre: true })
 *   GuiaTutorial.fechar()
 */
(function (global) {
  'use strict';

  var CHAVE_VISTO = 'guia-tutorial-visto-';
  var TEMPO_BANNER_MS = 15000;
  var LARGURA_CELULAR = 767;

  // ---------------------------------------------------------------------------
  // BLOCOS DE CONTEÚDO COMPARTILHADOS ENTRE OS PERFIS
  // ---------------------------------------------------------------------------
  function dica(texto) { return '<div class="gt-dica"><strong>Dica:</strong> ' + texto + '</div>'; }
  function info(texto) { return '<div class="gt-info"><strong>Importante:</strong> ' + texto + '</div>'; }
  function lista(itens) { return '<ol>' + itens.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>'; }

  var LEGENDA_MAPA = info('<strong>Verde</strong> = OK / em operação &bull; <strong>Vermelho</strong> = parado &bull; ' +
    '<strong>Azul</strong> = removido / em obra.');

  var ESTRUTURA_ALAS = dica('A <strong>Ala Esquerda</strong> reúne os filtros 01 a 08 e a <strong>Ala Direita</strong> os filtros 09 a 16. ' +
    'Cada filtro tem 5 atuadores: Entrada, Descarga, Soprador, Lavagem e Filtrada.');

  function passoConclusao(ondeEncontrar) {
    return {
      icone: '&#127881;',
      titulo: 'Tudo pronto!',
      html: '<p>Parabéns, você conheceu todas as funcionalidades do sistema.</p>' +
        info('Para rever este guia quando quiser, ' + ondeEncontrar + '.')
    };
  }

  // ---------------------------------------------------------------------------
  // PERFIS (um conjunto de passos por aplicação)
  // ---------------------------------------------------------------------------
  var PERFIS = {

    // ===== APP DO OPERADOR ====================================================
    operador: {
      cor: '#0d8a72',
      corEscura: '#065345',
      cabecalho: '.header',
      barraInferior: '.nav-bottom',
      evitar: '#pwa-install-banner',
      passos: [
        {
          icone: '&#128075;',
          titulo: 'Boas-vindas',
          html: '<p>Este é o aplicativo <strong>CSM SUL - ATUADORES ELÉTRICOS</strong>, usado pela operação da ETA Pirapama.</p>' +
            '<p>Com ele você acompanha os atuadores dos 16 filtros e pede manutenção em poucos toques.</p>' +
            dica('Use os botões <strong>Próximo</strong> e <strong>Anterior</strong> para navegar. O <strong>X</strong> fecha o guia a qualquer momento.')
        },
        {
          icone: '&#128273;',
          titulo: 'Login',
          html: lista([
            'Digite seu <strong>E-mail</strong> e sua <strong>Senha</strong>.',
            'Toque em <strong>Entrar</strong>.',
            'Ainda não tem acesso? Toque em <strong>Criar conta de operador</strong> e preencha nome, e-mail e senha.',
            'Para sair do aplicativo, use o botão <strong>Sair</strong> no canto superior direito.'
          ]) +
            info('A senha precisa ter no mínimo 6 caracteres e o sistema aceita até 30 operadores cadastrados.')
        },
        {
          icone: '&#127968;',
          titulo: 'Tela Inicial',
          html: '<p>A tela inicial tem quatro ícones. Toque em um deles para abrir a função:</p>' +
            '<ul>' +
            '<li>&#128736;&#65039; <strong>Solicitar Manutenção</strong></li>' +
            '<li>&#128506;&#65039; <strong>Mapa da Planta</strong></li>' +
            '<li>&#128220; <strong>Histórico de OS</strong></li>' +
            '<li>&#9888;&#65039; <strong>Pendências</strong></li>' +
            '</ul>'
        },
        {
          icone: '&#128736;&#65039;',
          titulo: 'Solicitar Manutenção',
          html: lista([
            'Informe o <strong>Nome Operador</strong>.',
            'Escolha o <strong>Filtro</strong> e a <strong>Posição</strong> do atuador.',
            'O <strong>Modelo</strong> é preenchido automaticamente.',
            'Escreva a <strong>Descrição do Problema</strong>.',
            'Toque em <strong>Enviar Solicitação</strong> para avisar a equipe de manutenção.'
          ]) +
            dica('O botão <strong>Exportar para o Zap</strong> monta a mesma mensagem para você enviar pelo WhatsApp.')
        },
        {
          icone: '&#128506;&#65039;',
          titulo: 'Mapa da Planta',
          html: lista([
            'Em <strong>Tipo de Vista</strong>, escolha <strong>Vista Superior</strong> (Entrada / Descarga) ou <strong>Vista Inferior</strong> (Ar / Lavagem / Filtrada).',
            'Toque em um atuador para ver status, modelo, série e último serviço.',
            'Na janela de detalhes, <strong>Abrir Chamado</strong> leva ao pedido de manutenção já com filtro e posição preenchidos.'
          ]) + LEGENDA_MAPA + ESTRUTURA_ALAS
        },
        {
          icone: '&#128220;',
          titulo: 'Histórico de OS',
          html: lista([
            'Filtre por <strong>Filtro</strong>, <strong>Posição</strong>, <strong>Nº da OS</strong> ou <strong>Equipe</strong>.',
            'Toque em <strong>Buscar Histórico</strong>.',
            'Cada cartão mostra o serviço executado, a descrição e a equipe responsável.'
          ]) +
            dica('Deixe os campos em <strong>Todos</strong> para ver o histórico completo.')
        },
        {
          icone: '&#9888;&#65039;',
          titulo: 'Pendências',
          html: lista([
            'Escolha o <strong>Filtro</strong> que deseja acompanhar.',
            'Em <strong>Status</strong>, selecione <strong>Abertas</strong> ou <strong>Todas</strong>.',
            'A lista é atualizada assim que você muda uma das opções.'
          ]) +
            info('Faixa <strong>vermelha</strong> = pendência em aberto. Faixa <strong>verde</strong> = pendência concluída, com a resolução informada pela manutenção.')
        },
        {
          icone: '&#129517;',
          titulo: 'Navegação',
          html: lista([
            'A barra inferior tem <strong>Início</strong>, <strong>Manutenção</strong>, <strong>Mapa</strong> e <strong>Menu</strong>.',
            'O <strong>Menu</strong> abre as demais opções: <strong>Pendências</strong>, <strong>Histórico</strong> e <strong>Guia do Usuário</strong>.',
            'Dentro de cada tela, o botão <strong>Voltar</strong> retorna ao início.'
          ]) +
            dica('Instale o aplicativo na tela inicial do celular para abrir mais rápido. No iPhone: compartilhar &rarr; <strong>Adicionar à Tela de Início</strong>.')
        },
        passoConclusao('toque em <strong>Menu</strong> na barra inferior e depois em <strong>Guia do Usuário</strong>')
      ]
    },

    // ===== APP DE MANUTENÇÃO (GESTÃO DE ATUADORES) ============================
    manutencao: {
      cor: '#0f9d58',
      corEscura: '#0b8043',
      cabecalho: '.header',
      barraInferior: '.nav-bottom',
      passos: [
        {
          icone: '&#128075;',
          titulo: 'Boas-vindas',
          html: '<p>Este é o sistema <strong>Gestão de Atuadores - ETA Pirapama</strong>, usado pela equipe de manutenção.</p>' +
            '<p>Aqui ficam o cadastro dos atuadores, as ordens de serviço, as pendências, o almoxarifado e o catálogo de peças.</p>' +
            dica('Use os botões <strong>Próximo</strong> e <strong>Anterior</strong> para navegar. O <strong>X</strong> fecha o guia a qualquer momento.')
        },
        {
          icone: '&#127968;',
          titulo: 'Tela Inicial',
          html: '<p>A tela inicial organiza o sistema em setores. Toque em um cartão para abrir os módulos:</p>' +
            '<ul>' +
            '<li><strong>Filtros</strong>: consulta, visão geral, mapa e status</li>' +
            '<li><strong>PCM</strong>: ordens de serviço, pendências e solicitações</li>' +
            '<li><strong>Almoxarifado</strong>: estoque de atuadores e de peças</li>' +
            '<li><strong>Peças</strong>: catálogo e lançamento de peças usadas</li>' +
            '<li><strong>Guia Foto</strong>: fotos dos componentes por modelo</li>' +
            '</ul>'
        },
        {
          icone: '&#128269;',
          titulo: 'Consulta e Visão Geral',
          html: '<p>No setor <strong>Filtros</strong>:</p>' +
            lista([
              'Abra <strong>Consulta Detalhada</strong>, escolha o <strong>Filtro</strong> e o <strong>Tipo de atuador</strong>.',
              'Toque em <strong>Pesquisar Equipamento</strong> para ver os dados e as OS do atuador.',
              'Use <strong>Limpar Consulta</strong> para começar outra pesquisa.',
              'Abra <strong>Visão Geral</strong> para ver o panorama dos 16 filtros de uma vez.'
            ])
        },
        {
          icone: '&#128506;&#65039;',
          titulo: 'Mapa e Status',
          html: lista([
            'Em <strong>Mapa Planta</strong>, escolha a <strong>Vista Superior</strong> ou a <strong>Vista Inferior</strong>.',
            'Toque em um atuador para abrir os detalhes e trocar o <strong>Status Geral</strong> direto pelo atalho.',
            'Os botões <strong>Consulta Completa</strong>, <strong>Alterar Status</strong> e <strong>Pendência</strong> levam às telas já preenchidas.',
            'Em <strong>Atualizar Status</strong>, selecione filtro e posição, ajuste os dados e toque em <strong>Salvar Alterações</strong>.'
          ]) + LEGENDA_MAPA
        },
        {
          icone: '&#128295;',
          titulo: 'Ordens de Serviço',
          html: '<p>No setor <strong>PCM</strong>:</p>' +
            lista([
              'Abra <strong>Lançar OS</strong> e informe filtro, posição, <strong>Número da OS</strong> e <strong>Equipe</strong>.',
              'Preencha <strong>Serviço</strong> e <strong>Descrição</strong> (o que foi feito).',
              'Toque em <strong>Lançar Manutenção</strong> para gravar.',
              'Use <strong>Exportar o Feedback</strong> para enviar o resumo pelo WhatsApp.',
              'Em <strong>Histórico OS</strong>, filtre os registros e use as ações de cada OS para editar ou excluir.'
            ]) +
            dica('O campo <strong>Pendência Gerada</strong> serve para registrar o que ficou por fazer naquela OS.')
        },
        {
          icone: '&#9888;&#65039;',
          titulo: 'Gestão de Pendências',
          html: lista([
            'No setor <strong>PCM</strong>, abra <strong>Gestão Pendências</strong>.',
            'Toque em <strong>Incluir Nova Pendência</strong>, escolha filtro e atuador, descreva e toque em <strong>Salvar</strong>.',
            'Toque em <strong>Consultar / Dar Baixa</strong> para ver a lista.',
            'Para encerrar, selecione a pendência, informe a <strong>Resolução</strong> e toque em <strong>Concluir</strong>.'
          ]) +
            dica('<strong>Exportar Lista p/ WhatsApp</strong> envia as pendências filtradas para o grupo da equipe.') +
            info('As pendências lançadas aqui aparecem para os operadores no aplicativo deles.')
        },
        {
          icone: '&#128203;',
          titulo: 'Solicitação Operador',
          html: lista([
            'No setor <strong>PCM</strong>, abra <strong>Solicitação Operador</strong>.',
            'A lista mostra os chamados abertos pela operação, com filtro, posição, solicitante e situação.',
            'Use o botão de atualizar (&#128260;) para buscar novas solicitações.'
          ])
        },
        {
          icone: '&#128230;',
          titulo: 'Estoque de Atuadores',
          html: '<p>No setor <strong>Almoxarifado</strong>:</p>' +
            lista([
              'Abra <strong>Estoque de Atuadores</strong>.',
              'Filtre por <strong>Busca Textual</strong>, <strong>Categoria</strong>, <strong>Status</strong> ou <strong>Modelo</strong>.',
              'Toque em <strong>+ Reserva Fria</strong> para cadastrar um atuador reserva.',
              'Toque em <strong>Histórico</strong> para registrar retirada, devolução, entrada, saída ou ajuste.',
              'Toque em <strong>Relatório PDF</strong> para gerar o relatório do almoxarifado.'
            ]) +
            dica('<strong>Limpar Filtros</strong> volta a mostrar todos os itens.')
        },
        {
          icone: '&#128451;&#65039;',
          titulo: 'Estoque de Peças',
          html: lista([
            'No setor <strong>Almoxarifado</strong>, abra <strong>Estoque de Peças</strong>.',
            'Busque por descrição ou código, ou filtre por <strong>Modelo</strong> e <strong>Linha</strong>.',
            'Toque em <strong>+ Novo Item</strong>, preencha os dados e toque em <strong>Salvar</strong>.',
            'Use os botões <strong>+</strong> e <strong>&minus;</strong> de cada item para ajustar a quantidade.'
          ])
        },
        {
          icone: '&#128297;',
          titulo: 'Catálogo e Peças',
          html: '<p>No setor <strong>Peças</strong>:</p>' +
            lista([
              'Abra <strong>Catálogo de Peças</strong> e use a aba <strong>Buscar Peças</strong>.',
              'Informe modelo, linha, descrição ou código ERP e toque em <strong>Executar Filtro Avançado</strong>.',
              'Na aba <strong>+ Adicionar Nova Peça</strong>, preencha os dados e toque em <strong>Salvar Peça no Catálogo</strong>.',
              'Em <strong>Lançar Peças</strong>, escolha a peça, a quantidade e o filtro de destino e toque em <strong>Registrar</strong>.'
            ]) +
            dica('<strong>Ver Fluxograma de Evolução</strong> mostra a relação entre os modelos de atuador.')
        },
        {
          icone: '&#128248;',
          titulo: 'Guia Foto',
          html: lista([
            'Na tela inicial, toque em <strong>Guia Foto</strong>.',
            'Escolha o modelo do atuador para ver as peças documentadas.',
            'Toque em <strong>+ Nova Foto</strong> para cadastrar um componente com número, nome, descrição e mídia.'
          ])
        },
        {
          icone: '&#129517;',
          titulo: 'Navegação',
          html: lista([
            'A barra inferior leva direto a <strong>Início</strong>, <strong>Filtros</strong>, <strong>PCM</strong> e <strong>Almoxarifado</strong>.',
            'Os setores <strong>Peças</strong> e <strong>Guia Foto</strong> ficam na tela inicial.',
            'Dentro de cada tela, o botão <strong>Voltar</strong> retorna ao início.'
          ])
        },
        passoConclusao('toque no botão <strong>?</strong> (Guia do Usuário) no canto superior direito da tela')
      ]
    },

    // ===== VISÃO OPERADOR (CONSULTA DE ATUADORES) =============================
    visao: {
      cor: '#1976d2',
      corEscura: '#0d47a1',
      cabecalho: '.header-operador',
      barraInferior: '.nav-bottom-operador',
      passos: [
        {
          icone: '&#128075;',
          titulo: 'Boas-vindas',
          html: '<p>Esta é a <strong>Visão Operador</strong>, o módulo de consulta dos atuadores da ETA Pirapama.</p>' +
            '<p>Aqui você consulta equipamentos, acompanha pendências e pede manutenção.</p>' +
            dica('Use os botões <strong>Próximo</strong> e <strong>Anterior</strong> para navegar. O <strong>X</strong> fecha o guia a qualquer momento.')
        },
        {
          icone: '&#127968;',
          titulo: 'Tela Inicial',
          html: '<p>A tela inicial traz os atalhos principais:</p>' +
            '<ul>' +
            '<li><strong>Acessar Inventário por Tipo</strong></li>' +
            '<li><strong>Solicitação de Manutenção</strong></li>' +
            '<li><strong>Consulta Detalhada</strong></li>' +
            '<li><strong>Mapa da Planta</strong></li>' +
            '</ul>'
        },
        {
          icone: '&#128269;',
          titulo: 'Consulta Detalhada',
          html: lista([
            'Escolha o <strong>Filtro</strong>.',
            'Escolha o <strong>Tipo de atuador</strong>.',
            'Toque em <strong>Pesquisar Equipamento</strong> para ver os dados do atuador.'
          ])
        },
        {
          icone: '&#128065;&#65039;',
          titulo: 'Visão por Tipo',
          html: lista([
            'Em <strong>Selecione o modo</strong>, escolha <strong>Visão Individual</strong> ou <strong>Visão Completa (Todos os 16)</strong>.',
            'Na visão individual, informe o <strong>Número do Filtro</strong>.',
            'O inventário dos atuadores é exibido logo abaixo.'
          ])
        },
        {
          icone: '&#128506;&#65039;',
          titulo: 'Mapa da Planta',
          html: lista([
            'Em <strong>Alterar Vista</strong>, escolha <strong>Superior</strong> (Entrada / Descarga) ou <strong>Inferior</strong> (Ar / Lavagem / Filtrada).',
            'Toque em um atuador para ver os detalhes.',
            'Da janela de detalhes você pode abrir uma solicitação de manutenção para aquele atuador.'
          ]) + ESTRUTURA_ALAS
        },
        {
          icone: '&#9888;&#65039;',
          titulo: 'Pendências',
          html: lista([
            'Abra <strong>Pend.</strong> na barra inferior.',
            'Em <strong>Filtrar por Filtro</strong>, escolha um filtro ou <strong>Todos os Filtros</strong>.',
            'A lista mostra as pendências registradas pela manutenção.'
          ])
        },
        {
          icone: '&#128736;&#65039;',
          titulo: 'Solicitar Manutenção',
          html: lista([
            'Informe <strong>Qual o Filtro</strong> e <strong>Qual a Posição do Atuador</strong>.',
            'Descreva o problema ou defeito observado.',
            'Se quiser, inclua uma foto ou mídia (opcional).',
            'Toque em <strong>Registrar Solicitação de Manutenção</strong>.'
          ]) +
            dica('<strong>Exportar para WhatsApp da Manutenção</strong> envia o mesmo pedido pelo WhatsApp.')
        },
        {
          icone: '&#129517;',
          titulo: 'Navegação',
          html: lista([
            'A barra inferior tem <strong>Início</strong>, <strong>Consulta</strong>, <strong>Visão</strong>, <strong>Mapa</strong>, <strong>Pend.</strong> e <strong>Solicit.</strong>',
            'Dentro de cada tela, o botão <strong>Voltar</strong> retorna ao início.',
            'O botão <strong>Manutenção</strong>, no cabeçalho, abre o módulo da equipe de manutenção.'
          ])
        },
        passoConclusao('toque no botão <strong>?</strong> (Guia do Usuário) no cabeçalho da tela')
      ]
    }
  };

  // ---------------------------------------------------------------------------
  // CSS EMBUTIDO
  // ---------------------------------------------------------------------------
  var CSS = [
    '.gt-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:20000;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .2s ease;font-family:inherit}',
    '.gt-overlay.gt-visivel{opacity:1}',
    '.gt-caixa{background:#fff;color:#1e293b;width:100%;max-width:480px;max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden;transform:translateY(12px);transition:transform .25s ease}',
    '.gt-visivel .gt-caixa{transform:none}',
    '.gt-topo{background:linear-gradient(135deg,var(--gt-cor),var(--gt-cor-escura));color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px}',
    '.gt-icone{font-size:1.6rem;line-height:1;flex:none}',
    '.gt-titulos{flex:1;min-width:0}',
    '.gt-contador{font-size:.7rem;font-weight:600;opacity:.85;text-transform:uppercase;letter-spacing:.4px}',
    '.gt-titulo{font-size:1.1rem;font-weight:800;margin:0;line-height:1.25}',
    '.gt-x{flex:none;width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,.2);color:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;line-height:1}',
    '.gt-corpo{padding:16px 18px;overflow-y:auto;-webkit-overflow-scrolling:touch;font-size:.9rem;line-height:1.5}',
    '.gt-corpo p{margin:0 0 10px}',
    '.gt-corpo ol,.gt-corpo ul{margin:0 0 10px;padding-left:1.25rem}',
    '.gt-corpo li{margin-bottom:6px}',
    '.gt-dica,.gt-info{border-radius:10px;padding:9px 12px;font-size:.82rem;margin-top:10px}',
    '.gt-dica{background:#fef9c3;border:1px solid #fde047;color:#713f12}',
    '.gt-info{background:#dcfce7;border:1px solid #86efac;color:#14532d}',
    '.gt-rodape{display:flex;align-items:center;gap:10px;padding:12px 16px;border-top:1px solid #e2e8f0;background:#f8fafc}',
    '.gt-bolinhas{flex:1;display:flex;justify-content:center;flex-wrap:wrap;gap:5px}',
    '.gt-bolinha{width:7px;height:7px;border-radius:50%;background:#cbd5e1;transition:all .2s ease}',
    '.gt-bolinha.gt-ativa{background:var(--gt-cor);width:18px;border-radius:4px}',
    '.gt-btn{border-radius:10px;padding:10px 16px;font-size:.88rem;font-weight:700;cursor:pointer;min-height:44px;font-family:inherit}',
    '.gt-btn-sec{background:#fff;color:#475569;border:1px solid #cbd5e1}',
    '.gt-btn-sec:disabled{opacity:.4;cursor:default}',
    '.gt-btn-pri{background:var(--gt-cor);color:#fff;border:1px solid var(--gt-cor)}',
    '@media (max-width:' + LARGURA_CELULAR + 'px){',
    '.gt-overlay{align-items:flex-end;padding:0}',
    '.gt-caixa{max-width:none;max-height:85vh;max-height:85dvh;border-radius:18px 18px 0 0;transform:translateY(100%)}',
    '.gt-rodape{padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}',
    '}',
    '.gt-banner{position:fixed;z-index:2500;left:12px;right:12px;margin:0 auto;max-width:560px;background:linear-gradient(135deg,var(--gt-cor),var(--gt-cor-escura));color:#fff;border-radius:14px;padding:12px 12px 12px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 10px 28px rgba(0,0,0,.28);opacity:0;transform:translateY(14px);transition:opacity .3s ease,transform .3s ease;font-family:inherit}',
    '.gt-banner.gt-visivel{opacity:1;transform:none}',
    '.gt-banner-icone{font-size:1.5rem;line-height:1;flex:none;animation:gt-acenar 1.6s ease-in-out infinite;transform-origin:70% 80%}',
    '.gt-banner-texto{flex:1;min-width:0;line-height:1.3}',
    '.gt-banner-texto strong{display:block;font-size:.9rem;font-weight:800}',
    '.gt-banner-texto span{font-size:.76rem;opacity:.9}',
    '.gt-banner-btn{flex:none;background:#fff;color:var(--gt-cor-escura);border:none;border-radius:9px;padding:9px 12px;font-size:.8rem;font-weight:800;cursor:pointer;min-height:40px;white-space:nowrap;font-family:inherit}',
    '.gt-banner-x{flex:none;background:none;border:none;color:rgba(255,255,255,.8);font-size:1.15rem;cursor:pointer;width:32px;height:40px;padding:0;line-height:1}',
    '@keyframes gt-acenar{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(16deg)}20%,40%{transform:rotate(-10deg)}}',
    '@media (prefers-reduced-motion:reduce){.gt-banner-icone{animation:none}.gt-overlay,.gt-caixa,.gt-banner{transition:none}}'
  ].join('');

  function injetarCSS() {
    if (document.getElementById('gt-estilos')) return;
    var estilo = document.createElement('style');
    estilo.id = 'gt-estilos';
    estilo.textContent = CSS;
    document.head.appendChild(estilo);
  }

  // ---------------------------------------------------------------------------
  // AUXILIARES
  // ---------------------------------------------------------------------------
  function jaVisto(tipo) {
    try { return localStorage.getItem(CHAVE_VISTO + tipo) === '1'; } catch (e) { return false; }
  }

  function marcarVisto(tipo) {
    try { localStorage.setItem(CHAVE_VISTO + tipo, '1'); } catch (e) { /* armazenamento indisponível */ }
  }

  function aplicarCores(el, perfil) {
    el.style.setProperty('--gt-cor', perfil.cor);
    el.style.setProperty('--gt-cor-escura', perfil.corEscura || perfil.cor);
  }

  function estaVisivel(el) {
    return !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none';
  }

  // ---------------------------------------------------------------------------
  // WIZARD
  // ---------------------------------------------------------------------------
  var wizard = null; // { overlay, perfil, tipo, indice, overflowAnterior }

  function abrir(tipo) {
    var perfil = PERFIS[tipo];
    if (!perfil) { console.warn('[GuiaTutorial] Perfil desconhecido:', tipo); return; }
    injetarCSS();
    fechar();
    esconderBanner();
    marcarVisto(tipo);

    var overlay = document.createElement('div');
    overlay.className = 'gt-overlay';
    aplicarCores(overlay, perfil);
    overlay.innerHTML =
      '<div class="gt-caixa" role="dialog" aria-modal="true" aria-labelledby="gt-titulo">' +
      '<div class="gt-topo">' +
      '<span class="gt-icone" aria-hidden="true"></span>' +
      '<div class="gt-titulos"><div class="gt-contador"></div><h2 class="gt-titulo" id="gt-titulo"></h2></div>' +
      '<button type="button" class="gt-x" aria-label="Fechar guia">&#10005;</button>' +
      '</div>' +
      '<div class="gt-corpo"></div>' +
      '<div class="gt-rodape">' +
      '<button type="button" class="gt-btn gt-btn-sec gt-anterior">Anterior</button>' +
      '<div class="gt-bolinhas" aria-hidden="true"></div>' +
      '<button type="button" class="gt-btn gt-btn-pri gt-proximo">Próximo</button>' +
      '</div>' +
      '</div>';

    overlay.addEventListener('click', function (e) { if (e.target === overlay) fechar(); });
    overlay.querySelector('.gt-x').addEventListener('click', fechar);
    overlay.querySelector('.gt-anterior').addEventListener('click', function () { irPara(wizard.indice - 1); });
    overlay.querySelector('.gt-proximo').addEventListener('click', function () {
      if (wizard.indice >= wizard.perfil.passos.length - 1) fechar(); else irPara(wizard.indice + 1);
    });

    overlay.querySelector('.gt-bolinhas').innerHTML = perfil.passos.map(function () {
      return '<span class="gt-bolinha"></span>';
    }).join('');

    wizard = { overlay: overlay, perfil: perfil, tipo: tipo, indice: 0, overflowAnterior: document.body.style.overflow };
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', aoTeclar);
    irPara(0);
    requestAnimationFrame(function () { overlay.classList.add('gt-visivel'); });
    overlay.querySelector('.gt-proximo').focus();
  }

  function irPara(indice) {
    if (!wizard) return;
    var passos = wizard.perfil.passos;
    if (indice < 0 || indice >= passos.length) return;
    wizard.indice = indice;
    var passo = passos[indice];
    var o = wizard.overlay;
    var ultimo = indice === passos.length - 1;

    o.querySelector('.gt-icone').innerHTML = passo.icone;
    o.querySelector('.gt-titulo').textContent = passo.titulo;
    o.querySelector('.gt-contador').textContent = 'Passo ' + (indice + 1) + ' de ' + passos.length;
    var corpo = o.querySelector('.gt-corpo');
    corpo.innerHTML = passo.html;
    corpo.scrollTop = 0;
    o.querySelector('.gt-anterior').disabled = indice === 0;
    o.querySelector('.gt-proximo').textContent = ultimo ? 'Concluir' : 'Próximo';
    Array.prototype.forEach.call(o.querySelectorAll('.gt-bolinha'), function (b, i) {
      b.classList.toggle('gt-ativa', i === indice);
    });
  }

  function aoTeclar(e) {
    if (!wizard) return;
    if (e.key === 'Escape') fechar();
    else if (e.key === 'ArrowRight') irPara(wizard.indice + 1);
    else if (e.key === 'ArrowLeft') irPara(wizard.indice - 1);
  }

  function fechar() {
    if (!wizard) return;
    document.removeEventListener('keydown', aoTeclar);
    document.body.style.overflow = wizard.overflowAnterior;
    wizard.overlay.remove();
    wizard = null;
  }

  // ---------------------------------------------------------------------------
  // BANNER DE PRIMEIRO ACESSO
  // ---------------------------------------------------------------------------
  var banner = null; // { el, perfil, timer, intervalo }

  function posicionarBanner() {
    if (!banner) return;
    var perfil = banner.perfil;
    var el = banner.el;
    if (window.innerWidth <= LARGURA_CELULAR) {
      // Celular: acima da barra de navegação inferior (e de outro banner, se houver)
      var topoLivre = window.innerHeight;
      [perfil.barraInferior, perfil.evitar].forEach(function (seletor) {
        var alvo = seletor && document.querySelector(seletor);
        if (estaVisivel(alvo)) topoLivre = Math.min(topoLivre, alvo.getBoundingClientRect().top);
      });
      el.style.top = 'auto';
      el.style.bottom = (window.innerHeight - topoLivre + 10) + 'px';
    } else {
      // Desktop: no topo da área de conteúdo, logo abaixo do cabeçalho
      var cab = perfil.cabecalho && document.querySelector(perfil.cabecalho);
      var base = estaVisivel(cab) ? Math.max(cab.getBoundingClientRect().bottom, 0) : 0;
      el.style.bottom = 'auto';
      el.style.top = (base + 12) + 'px';
    }
  }

  function mostrarBanner(tipo, opcoes) {
    var perfil = PERFIS[tipo];
    if (!perfil) { console.warn('[GuiaTutorial] Perfil desconhecido:', tipo); return; }
    if (wizard || banner) return;
    if (jaVisto(tipo) && !(opcoes && opcoes.sempre)) return;
    injetarCSS();

    var el = document.createElement('div');
    el.className = 'gt-banner';
    el.setAttribute('role', 'status');
    aplicarCores(el, perfil);
    el.innerHTML =
      '<span class="gt-banner-icone" aria-hidden="true">&#128075;</span>' +
      '<div class="gt-banner-texto"><strong>Primeira vez aqui?</strong><span>Conheça todas as funcionalidades</span></div>' +
      '<button type="button" class="gt-banner-btn">Iniciar Guia</button>' +
      '<button type="button" class="gt-banner-x" aria-label="Dispensar">&#10005;</button>';

    el.querySelector('.gt-banner-btn').addEventListener('click', function () { abrir(tipo); });
    el.querySelector('.gt-banner-x').addEventListener('click', function () { marcarVisto(tipo); esconderBanner(); });

    banner = {
      el: el,
      perfil: perfil,
      timer: setTimeout(esconderBanner, TEMPO_BANNER_MS),
      intervalo: setInterval(posicionarBanner, 500)
    };
    document.body.appendChild(el);
    posicionarBanner();
    window.addEventListener('resize', posicionarBanner);
    requestAnimationFrame(function () { el.classList.add('gt-visivel'); });
  }

  function esconderBanner() {
    if (!banner) return;
    clearTimeout(banner.timer);
    clearInterval(banner.intervalo);
    window.removeEventListener('resize', posicionarBanner);
    banner.el.remove();
    banner = null;
  }

  global.GuiaTutorial = {
    abrir: abrir,
    fechar: fechar,
    mostrarBanner: mostrarBanner,
    esconderBanner: esconderBanner
  };
})(window);
