// Constantes do site — um lugar só para nome, contato e textos fixos.

export const SITE = {
  nome: "Miguel Edits",
  titulo: "Miguel Edits — Editor de Vídeo",
  descricao:
    "Edição de vídeo com ritmo, sound design e cor: Reels, vídeos institucionais e eventos. Vale do Paraíba — SP.",
};

// Número: (12) 99791-7416 → formato internacional 55 12 99791 7416
const WHATSAPP_NUMERO = "5512997917416";
const WHATSAPP_MENSAGEM = encodeURIComponent(
  "Olá Miguel! Vi seu portfólio e gostaria de conversar."
);

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MENSAGEM}`;
