import { createRoot } from "react-dom/client";
import GradientWaves from "./componentes/GradientWaves/GradientWaves";
import GhostCursor from "./componentes/GhostCursor/GhostCursor";
import GlitchText from "./componentes/GlitchText/GlitchText";
import LiquidEther from "./componentes/LiquidEther/LiquidEther";
import SwarmCursor from "./componentes/SwarmCursor/SwarmCursor";

const GlitchTextIlha = ({ text, ...props }) => <GlitchText {...props}>{text}</GlitchText>;

// Registo: nome usado no HTML (data-efeito) → componente
const registo = {
    gradientwaves: GradientWaves,
    ghostcursor: GhostCursor,
    glitchtext: GlitchTextIlha,
    liquidether: LiquidEther,
    swarmcursor: SwarmCursor,
};



// Efeitos puramente decorativos, que não se animam com "reduzir movimento"
const decorativos = new Set(["liquidether"]);

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-efeito]").forEach((elemento) => {
    const nome = elemento.dataset.efeito;
    const Componente = registo[nome];
    if (!Componente) return;
    if (reduzirMovimento && decorativos.has(nome)) return;

    try {
        const props = elemento.dataset.props ? JSON.parse(elemento.dataset.props) : {};
        createRoot(elemento).render(<Componente {...props} />);
    } catch (erro) {
        console.error(`Falha ao montar o efeito "${nome}":`, erro);
    }
});
