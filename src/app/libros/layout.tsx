import Link from "next/link";

const generos = [
  "accion",
  "aventura",
  "ciencia-ficcion",
  "clasicos",
  "economia",
  "escolar",
  "juvenil",
  "miedo",
  "romance",
  "suspenso",
];

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-900 text-white">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <ul className="flex flex-wrap justify-center gap-3">
            {generos.map((genero) => (
              <li key={genero}>
                <Link
                  href={`/libros/${genero}`}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-700 transition"
                >
                  {genero.replace("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      <footer className="bg-blue-900 text-black-300 text-center py-4 text-sm">
        {new Date().getFullYear()} · Librería
      </footer>
    </div>
  );
}
