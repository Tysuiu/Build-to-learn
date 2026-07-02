import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoriaPorSlug, getVideosPorCategoria } from "@/lib/data";
import { bunnyEmbedUrl } from "@/lib/bunny";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Página de uma categoria — exibe os vídeos daquele serviço.
// Vídeos verticais (Reels) ficam em cards 9:16; horizontais em 16:9.
// Nesta versão do Next.js, `params` é uma Promise e precisa de await.
export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoria = await getCategoriaPorSlug(slug);
  if (!categoria) notFound();

  const videos = await getVideosPorCategoria(categoria);

  return (
    <main className="min-h-screen">
      <Nav />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        {/* Botão voltar para o dashboard */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 transition hover:text-accent"
        >
          ← Voltar
        </Link>

        <header className="mb-12">
          <p className="font-display text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Categoria
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {categoria.nome}
          </h1>
          {categoria.descricao && (
            <p className="mt-3 max-w-lg text-foreground/50">
              {categoria.descricao}
            </p>
          )}
        </header>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id}>
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/8 bg-surface ${
                  video.vertical ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                <iframe
                  src={bunnyEmbedUrl(video.bunny_video_id)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={video.titulo}
                />
              </div>
              <h3 className="mt-3 font-display font-medium">{video.titulo}</h3>
              {video.cliente && (
                <p className="text-sm text-foreground/40">{video.cliente}</p>
              )}
            </div>
          ))}
        </section>

        {videos.length === 0 && (
          <p className="text-foreground/40">
            Nenhum vídeo nesta categoria ainda — em breve.
          </p>
        )}

        <Footer />
      </div>
    </main>
  );
}
