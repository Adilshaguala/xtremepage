/* Faixa de tecnologias: duplica a lista para que a animação
   (que desloca -100% da largura de UMA lista) forme um ciclo sem saltos. */
(() => {
    const faixa = document.querySelector("[data-faixa]");
    if (faixa) {
        const lista = faixa.querySelector(".faixa__lista");
        if (lista) {
            const copia = lista.cloneNode(true);
            copia.setAttribute("aria-hidden", "true");
            faixa.appendChild(copia);
        }
    }

    const depoimentos = document.querySelector("[data-depoimentos]");
    if (!depoimentos || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const grupo = depoimentos.querySelector(".depoimentos__grupo");
    if (!grupo || grupo.querySelectorAll(".depoimento").length < 2) return;

    const copia = grupo.cloneNode(true);
    copia.setAttribute("aria-hidden", "true");
    depoimentos.classList.add("depoimentos--animado");
    depoimentos.appendChild(copia);
})();
