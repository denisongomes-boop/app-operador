// Atualização silenciosa do app.
// Quando sai uma versão nova (sw.js mudou), o app troca sozinho na próxima vez
// que a pessoa sair dele ou deixá-lo em segundo plano. Sem aviso e sem limpar cache.
// Não troca enquanto houver texto digitado e ainda não salvo na tela.
// Para segurar a troca em outro caso, use window.__editando = true (e false depois).
(function () {
  if (!('serviceWorker' in navigator) || window.__atualizacaoSilenciosa) return;
  window.__atualizacaoSilenciosa = true;

  var sw = navigator.serviceWorker;
  var tinhaControle = !!sw.controller;
  var pendente = false;
  var recarregou = false;
  var escondidoEm = 0;
  var tocados = [];

  // Guarda os campos em que a pessoa digitou.
  document.addEventListener('input', function (e) {
    var c = e.target;
    if (c && (c.tagName === 'INPUT' || c.tagName === 'TEXTAREA') && tocados.indexOf(c) < 0) tocados.push(c);
  }, true);

  function ocupado() {
    if (window.__editando) return true;
    tocados = tocados.filter(function (c) { return c.isConnected; });
    return tocados.some(function (c) {
      var tipo = (c.type || '').toLowerCase();
      if (tipo === 'checkbox' || tipo === 'radio' || tipo === 'range') return false;
      return c.value !== '' && c.getClientRects().length > 0;
    });
  }

  function trocar() {
    if (recarregou || !pendente || ocupado()) return;
    recarregou = true;
    location.reload();
  }

  function verificar() {
    sw.getRegistration().then(function (reg) { if (reg) return reg.update(); }).catch(function () {});
  }

  sw.addEventListener('controllerchange', function () {
    // Primeiro acesso: o app acabou de ganhar o service worker, não há o que trocar.
    if (!tinhaControle) { tinhaControle = true; return; }
    pendente = true;
    if (document.visibilityState === 'hidden') trocar();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      escondidoEm = Date.now();
      trocar();
    } else {
      // Se o celular congelou o app antes de trocar, troca ao voltar depois de 1 minuto fora.
      if (escondidoEm && Date.now() - escondidoEm > 60000) trocar();
      verificar();
    }
  });

  window.addEventListener('online', verificar);
  setInterval(function () { if (document.visibilityState === 'visible') verificar(); }, 30 * 60 * 1000);
})();
