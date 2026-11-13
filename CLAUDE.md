# App Operador · CSM SUL — Atuadores Elétricos

PWA do operador da ETA Pirapama para consultar o mapa dos atuadores (filtros, alas), pendências técnicas e enviar solicitação de manutenção. Lê e grava no mesmo Supabase do app Gestão de Atuadores (repo `gestao_atuadores-COMPESA-`).

## Como publica
- HTML/JS puro na raiz: `index.html` (telas, estilos e lógica num arquivo só, ~1700 linhas), `manifest.json`, `sw.js`, `icons/`, `img/` (fotos dos atuadores).
- Vercel (projeto `app-operador`), sem build: cada push na `main` publica sozinho.

## Mapa
- `index.html`: login e cadastro (Supabase Auth + tabela `perfis`, a mesma da Gestão; cadastro cria perfil `operador`; limite de 30 operadores ativos garantido por gatilho no banco), Mapa Visual (campo `status_atual`, atualiza a cada 30 s), Pendências (tabela `pendencia`), solicitação (`solicitacoes_operador`) com envio pelo WhatsApp, banner de instalação.
- `js/guia-tutorial.js`: guia com banner de primeiro acesso.
- `js/atualizacao.js`: versão nova entra sozinha quando o app vai para segundo plano (nunca mostrar aviso de atualização).
- Barra inferior com 4 opções; Menu agrupa Pendências e Histórico.

## Regras
- Cada entrega sobe a versão do cache no `sw.js`.
- Nomes de campo compartilhados com a Gestão: não renomear coluna sem mudar os dois apps.

## Habilidades do Claude Code para este repo
- Sempre, antes de commit/PR: `checklist-de-entrega`.
- Repo sem mapa ou com estrutura nova: `mapa-do-projeto` (atualize este arquivo).
- Visual: `resposividade-premium` + `8px`; menus e listas: `menus-interativos`; ícones e fotos: `icones-e-imagens`.
- PWA e cache: `pwa-instalavel`; sem sinal: `modo-offline`; push: `notificacoes-push-onesignal`.
- Banco: `supabase-seguro`; dados de planilha: `planilha-para-supabase`.
- Guia do usuário: `guia-tutorial`; texto para o Zap: `resumo-whatsapp`; ler PDF/foto/QR: `importar-documentos`.
- CI: `verificacao-automatica`; lógica e coerência: `logica-funcionamento`.

## Preferências do Denison
- Conversar em pt-BR simples, sem jargão. Celular primeiro (iPhone e Android).
- PR com título `Menu: o que muda para quem usa`; nunca aplicar migração em produção sem ele pedir.
- Nenhuma chave secreta no código, no PR ou no chat.
