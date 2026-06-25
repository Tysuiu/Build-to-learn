import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoriaPorSlug, getVideosPorCategoria } from "@/lib/data";
import { bunnyEmbedUrl } from "@/lib/bunny";
import Footer from "@/components/Footer";

// Página de uma categoria — exibe os vídeos daquele serviço.
// Nesta versão do Next.js, `params` é uma Promise e precisa de await.
export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoria = await getCategoriaPorSlug(slug);
  if (!categoria) notFound();

  const videos = await getVideosPorCategoria(categoria.id);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Botão voltar para o dashboard */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          ← Voltar
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            {categoria.nome}
          </h1>
          {categoria.descricao && (
            <p className="mt-3 text-white/60">{categoria.descricao}</p>
          )}
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id}>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900">
                <iframe
                  src={bunnyEmbedUrl(video.bunny_video_id)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="mt-3 font-medium">{video.titulo}</h3>
            </div>
          ))}
        </section>

        {videos.length === 0 && (
          <p className="text-white/40">
            Nenhum vídeo nesta categoria ainda.
          </p>
        )}

        <Footer />
      </div>
    </main>
  );
}
