import Link from "next/link"
import Image from "next/image"

export default function CountryCard({ 
    name,
    ptName, 
    flag, 
    flagAlt, 
}: {
    name: string;
    ptName: string
    flag: string; 
    flagAlt: string; 
}) {
  return (
    <Link href={`/pais/${name}`}>
          <article
            className="h-64 min-w-full bg-white border-2 rounded- hover:border-indigo-200 transition-all hover:shadow-xl"
            key={name}
          >
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl ">
              <Image
                className="object-cover"
                fill
                src={flag}
                alt={flagAlt}
              />
            </div>

            <h1 className="text-center mt-8 font-bold text-xl">
              {ptName}
            </h1>
          </article>
        </Link>
  )
}
