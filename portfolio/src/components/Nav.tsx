import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

// Barra de navegação fixa: logo à esquerda, contato à direita.
// Fundo com blur para o vídeo continuar aparecendo por baixo ao rolar.
export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-[0.3em]"
        >
          Miguel<span className="text-accent">.</span>Edits
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-foreground/80 transition hover:border-accent hover:text-accent"
        >
          Fale comigo
        </a>
      </div>
    </nav>
  );
}
