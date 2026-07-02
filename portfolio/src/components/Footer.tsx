// Rodapé do site com chamada final e botão "Fale comigo" → WhatsApp do Miguel.
import { WHATSAPP_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Vamos criar algo <span className="text-accent">juntos</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-foreground/50">
          Me conta a sua ideia — respondo rápido no WhatsApp.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-3.5 font-medium text-white transition hover:bg-green-500"
        >
          {/* Ícone do WhatsApp */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path d="M12 2a9.94 9.94 0 0 0-8.59 15L2 22l5.13-1.35A9.96 9.96 0 1 0 12 2Zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.05.8.81-2.97-.2-.31a8.14 8.14 0 1 1 7 3.82Zm4.47-6.1c-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06a6.66 6.66 0 0 1-3.33-2.91c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.02 0 1.2.87 2.35 1 2.51.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.45-.6 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.46-.28Z" />
          </svg>
          Fale comigo
        </a>
        <p className="mt-10 text-sm text-foreground/30">
          © {new Date().getFullYear()} Miguel Edits — Editor de vídeo
        </p>
      </div>
    </footer>
  );
}
