interface BooksPageProps {
  params: Promise<{
    generos: string;
  }>;
}

type Book = {
  title: string;
  author_name?: string[];
  cover_i?: number;
};

export default async function BooksPage({ params }: BooksPageProps) {
  const { generos } = await params;

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${generos}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p className="text-center mt-10">Error al cargar libros</p>;
  }

  const data = await res.json();
  const books: Book[] = data.docs.slice(0, 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">

        
        <h1 className="text-4xl font-bold text-blue-600 mb-8 capitalize">
          Libros de {generos.replace("-", " ")}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
              <div className="aspect-2/3 w-full bg-gray-200">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 text-sm">
                    Sin portada
                  </div>
                )}
              </div>

              <div className="p-3">
                <h2 className="text-sm font-semibold leading-tight line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  {book.author_name?.[0] ?? "Autor desconocido"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
