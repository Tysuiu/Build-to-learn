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
 * URL do player para o vídeo em destaque no hero: começa sozinho, sem som,
 * em loop — o visitante vê a edição acontecendo assim que abre o site.
 */
export function bunnyHeroEmbedUrl(videoId: string): string {
  return `${bunnyEmbedUrl(videoId)}?autoplay=true&muted=true&loop=true&preload=true`;
}

/**
 * URL do player para os cards das categorias: SEM autoplay — o player do
 * Bunny liga o autoplay por padrão, e vários vídeos tocando juntos na
 * mesma página é ruim. Aqui o vídeo só começa quando o visitante dá play.
 */
export function bunnyCardEmbedUrl(videoId: string): string {
  return `${bunnyEmbedUrl(videoId)}?autoplay=false&preload=false`;
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
