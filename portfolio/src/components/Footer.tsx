// Rodapé do site com botão "Fale comigo" → WhatsApp do Miguel.
// Número: (12) 99791-7416 → formato internacional 55 12 99791 7416

const WHATSAPP_NUMERO = "5512997917416";
const WHATSAPP_MENSAGEM = encodeURIComponent(
  "Olá Miguel! Vi seu portfólio e gostaria de conversar."
);

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-center">
      <a
        href={`https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MENSAGEM}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-500"
      >
        Fale comigo
      </a>
      <p className="mt-4 text-sm text-white/40">
        © {new Date().getFullYear()} Miguel Edits
      </p>
    </footer>
  );
}
