'use client'

import Link from "next/link";
import Image from "next/image";

export default function Error() {
  return (
    <section className="flex flex-col container">
        <h1 className="text-5xl text-center font-bold text-gray-800 my-16">Ops, não encontramos esse país!</h1>

        <Link href="/" className="flex items-center py-2">
            <Image src="/arrow-back.svg"
            alt="Ícone de seta de voltar"
            width={24}
            height={24} 
            />

            Voltar
        </Link>
        
    </section>
  )
}
