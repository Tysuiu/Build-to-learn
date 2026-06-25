// Helpers do Bunny Stream — montam as URLs públicas de cada vídeo a partir do
// Library ID + CDN Hostname (configurados no .env.local).

const LIBRARY_ID = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!;
const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME!;

/**
 * URL do player embutido (iframe) do Bunny Stream.
 * É a forma recomendada de exibir vídeos: player pronto, responsivo e com HLS.
 */
export function bunnyEmbedUrl(videoId: string): string {
  return `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`;
}

/**
 * URL da thumbnail (imagem de capa) gerada automaticamente pelo Bunny.
 */
export function bunnyThumbnailUrl(videoId: string): string {
  return `https://${CDN_HOSTNAME}/${videoId}/thumbnail.jpg`;
}

/**
 * URL do stream HLS direto (caso queira usar um player customizado no futuro).
 */
export function bunnyHlsUrl(videoId: string): string {
  return `https://${CDN_HOSTNAME}/${videoId}/playlist.m3u8`;
}
