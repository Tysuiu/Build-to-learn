import Link from "next/link";
import { getCategorias } from "@/lib/data";
import Footer from "@/components/Footer";

// Página inicial / dashboard — lista todas as categorias de serviço.
export default async function Dashboard() {
  const categorias = await getCategorias();

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Miguel Edits</h1>
          <p className="mt-3 text-white/60">Portfólio de edição de vídeo</p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group flex aspect-video flex-col justify-end rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-white/30 hover:bg-neutral-800"
            >
              <h2 className="text-xl font-semibold">{cat.nome}</h2>
              {cat.descricao && (
                <p className="mt-1 text-sm text-white/50">{cat.descricao}</p>
              )}
            </Link>
          ))}
        </section>

        {categorias.length === 0 && (
          <p className="text-center text-white/40">
            Nenhuma categoria cadastrada ainda.
          </p>
        )}

        <Footer />
      </div>
    </main>
  );
}
