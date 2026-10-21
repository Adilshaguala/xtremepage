(() => {
    const palco = document.querySelector("[data-servicos]");
    if (!palco) return;

    const cartoes = Array.from(palco.querySelectorAll(".servico"));
    const INTERVALO = 5000; // milissegundos entre avanços automáticos

    // ordem[0] é o índice do cartão da frente; ordem[1] o seguinte, etc.
    let ordem = cartoes.map((_, indice) => indice);

    let temporizador = null;
    let emVista = false;       // a secção está visível no ecrã?
    let aInteragir = false;    // o utilizador tem o rato/foco sobre a pilha?
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Escreve no HTML a profundidade de cada cartão; o CSS faz o resto. */
    function actualizar() {
        ordem.forEach((indice, profundidade) => {
            cartoes[indice].dataset.profundidade = profundidade;
        });
    }

    /* Roda a lista de modo a que o cartão indicado fique à frente,
       mantendo a sequência cíclica dos restantes. */
    function trazerParaFrente(indice) {
        const posicao = ordem.indexOf(indice);
        if (posicao <= 0) return;
        ordem = ordem.slice(posicao).concat(ordem.slice(0, posicao));
        actualizar();
    }

    function seguinte() {
        trazerParaFrente(ordem[1]);
    }

    /* Liga ou desliga o avanço automático consoante as condições. */
    function gerirAutomatico() {
        const deveCorrer = emVista && !aInteragir && !semMovimento.matches;
        if (deveCorrer && !temporizador) {
            temporizador = setInterval(seguinte, INTERVALO);
        } else if (!deveCorrer && temporizador) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }

    /* Interacção: clique e foco (teclado) trazem o cartão para a frente. */
    cartoes.forEach((cartao, indice) => {
        cartao.addEventListener("click", () => trazerParaFrente(indice));
        cartao.addEventListener("focus", () => trazerParaFrente(indice));
    });

    palco.addEventListener("mouseenter", () => { aInteragir = true;  gerirAutomatico(); });
    palco.addEventListener("mouseleave", () => { aInteragir = false; gerirAutomatico(); });
    palco.addEventListener("focusin",    () => { aInteragir = true;  gerirAutomatico(); });
    palco.addEventListener("focusout",   () => { aInteragir = false; gerirAutomatico(); });
    semMovimento.addEventListener("change", gerirAutomatico);

    /* Só avança automaticamente enquanto a secção está visível. */
    new IntersectionObserver(([entrada]) => {
        emVista = entrada.isIntersecting;
        gerirAutomatico();
    }, { threshold: 0.4 }).observe(palco);

    actualizar();
})();