import Image from "next/image";
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

type OpenLibraryResponse = {
  docs: {
    title: string;
    cover_i?: number;
  }[];
};

async function getBookCover(genero: string): Promise<string | null> {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${genero}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data: OpenLibraryResponse = await res.json();

  const bookWithCover = data.docs.find((book) => book.cover_i);

  if (!bookWithCover?.cover_i) return null;

  return `https://covers.openlibrary.org/b/id/${bookWithCover.cover_i}-L.jpg`;
}

export default async function LibrosPage() {
  const cards = await Promise.all(
    generos.map(async (genero) => ({
      genero,
      image: await getBookCover(genero),
    }))
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-svh bg-slate-900/10">
      {cards.map(({ genero, image }) => (
        <Link
          key={genero}
          href={`/libros/${genero}`}
          className="m-4"
        >
          <div className="text-center flex flex-col gap-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition">
            {image ? (
              <div className="relative h-64 w-full">
                <Image
                  src={image}
                  alt={`Libros de ${genero}`}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center bg-gray-200 rounded-t-lg">
                <span className="text-gray-500">Sin portada</span>
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold capitalize">
                {genero.replace("-", " ")}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
