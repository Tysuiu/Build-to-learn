import Link from "next/link";
import Image from "next/image";
import { getCategorias } from "@/lib/data";
import { bunnyHeroEmbedUrl } from "@/lib/bunny";
import { CAPAS_LOCAIS, CURSOS, DESTAQUE } from "@/lib/conteudo";
import { WHATSAPP_URL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Página inicial: hero com o reel em destaque (autoplay, sem som, em loop),
// grid de categorias e um resumo do jeito de editar.
export default async function Home() {
  const categorias = await getCategorias();

  return (
    <main className="min-h-screen">
      <Nav />

      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-36">
        <div
          className={
            DESTAQUE.vertical
              ? "grid items-center gap-12 md:grid-cols-2"
              : undefined
          }
        >
          <div>
            <p className="font-display text-xs font-medium uppercase tracking-[0.35em] text-accent">
              Vídeo Editor
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Histórias que
              <br />
              se <span className="text-accent">movem</span>.
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/55">
              Reels, vídeos institucionais e eventos — do corte ao sound
              design, cada frame no lugar certo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-7 py-3 font-medium text-white transition hover:bg-green-500"
              >
                Fale comigo
              </a>
              <a
                href="#trabalhos"
                className="rounded-full border border-white/15 px-7 py-3 font-medium text-foreground/80 transition hover:border-accent hover:text-accent"
              >
                Ver trabalhos
              </a>
            </div>

            <p className="mt-10 text-sm text-foreground/40">
              Em destaque:{" "}
              <span className="text-foreground/70">{DESTAQUE.titulo}</span>
              {DESTAQUE.cliente && <> · {DESTAQUE.cliente}</>}
            </p>
          </div>

          {DESTAQUE.vertical ? (
            /* Reel em destaque numa moldura de celular — formato 9:16 */
            <div className="flex justify-center md:justify-end">
              <div className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_0_80px_-20px_rgba(224,170,62,0.25)]">
                <iframe
                  src={bunnyHeroEmbedUrl(DESTAQUE.bunny_video_id)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={DESTAQUE.titulo}
                />
              </div>
            </div>
          ) : (
            /* Vídeo horizontal em destaque — painel cinema 16:9 em largura cheia */
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_0_80px_-20px_rgba(224,170,62,0.25)]">
              <iframe
                src={bunnyHeroEmbedUrl(DESTAQUE.bunny_video_id)}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={DESTAQUE.titulo}
              />
            </div>
          )}
        </div>
      </section>

      {/* ---------- TRABALHOS / CATEGORIAS ---------- */}
      <section id="trabalhos" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Trabalhos
          </h2>
          <p className="hidden text-sm text-foreground/40 sm:block">
            Escolha uma categoria
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat, i) => {
            const capa = cat.capa_url ?? CAPAS_LOCAIS[cat.slug];
            return (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-surface p-6 transition hover:border-accent/60"
              >
                {/* Capa: frame do próprio trabalho + gradiente pra leitura do texto */}
                {capa && (
                  <>
                    <Image
                      src={capa}
                      alt={`Capa da categoria ${cat.nome}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 transition group-hover:from-black/75" />
                  </>
                )}

                <span className="relative font-display text-sm text-foreground/50 transition group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {cat.nome}
                  </h3>
                  {cat.descricao && (
                    <p className="mt-1.5 text-sm text-foreground/60">
                      {cat.descricao}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm text-accent opacity-0 transition group-hover:opacity-100">
                    Ver vídeos →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- COMO EU EDITO ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight">
          Cada detalhe conta
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              titulo: "Ritmo",
              texto:
                "Cortes no tempo da música: aberturas que prendem nos primeiros segundos e respiros na hora certa.",
            },
            {
              titulo: "Sound design",
              texto:
                "Transições, whooshes e ambiente casados frame a frame com a imagem — o som conduz a emoção.",
            },
            {
              titulo: "Acabamento",
              texto:
                "Cor, movimento e legendas revisadas: o vídeo pronto para publicar, do jeito que a marca precisa.",
            },
          ].map((item) => (
            <div
              key={item.titulo}
              className="rounded-2xl border border-white/8 bg-surface p-6"
            >
              <h3 className="font-display text-lg font-semibold text-accent">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FORMAÇÃO ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight">
          Formação
        </h2>
        <p className="mb-10 text-sm text-foreground/40">
          Sempre estudando — cursos e imersões da área
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {CURSOS.map((curso) => (
            <div
              key={curso.nome}
              className="flex flex-col justify-between rounded-2xl border border-white/8 bg-surface p-6"
            >
              <div>
                <h3 className="font-display font-semibold leading-snug">
                  {curso.nome}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/45">
                  {curso.escola}
                </p>
              </div>
              <span
                className={`mt-4 inline-block w-fit rounded-full border px-3 py-1 text-xs ${
                  curso.status === "concluído"
                    ? "border-accent/40 text-accent"
                    : "border-white/15 text-foreground/50"
                }`}
              >
                {curso.status === "concluído"
                  ? "✓ Concluído"
                  : "Em andamento"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <Footer />
      </div>
    </main>
  );
}
