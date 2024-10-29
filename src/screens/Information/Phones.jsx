import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import PhoneCard from '../../components/PhoneCard'
import '../../assets/styles/phones.css'

const phones = [
    {
        place: "Municipalidad",
        description: "Este es el contacto de la Municipalidad Central.",
        number: "2254-6002",
        lineColor: "#e11d48"
    },
    {
        place: "EBAIS",
        description: "Este es el contacto del EBAIS, llama ante cualquier duda",
        number: "2214-0690",
        lineColor: "#fb923c"
    },
    {
        place: "AyA",
        description: "Este es el número del AyA, llama ante cualquier duda.",
        number: "2543-6308",
        lineColor: "#0284c7"
    },
    {
        place: "Policía Municipal",
        description: "Llama a la municipalidad para ayudas",
        number: "2443-1400",
        lineColor: "#a855f7"
    },
]

export default function Phones() {
    return (
        <div className='flex flex-col w-full gap-4'>
            <Link to={"/app/activity"}>
                <ChevronLeft size={40} />
            </Link>
            <header className="flex justify-center">
                <section className="phones text-white rounded-3xl text-center flex items-center h-[8rem] justify-center w-[97%] relative">
                    <div>
                        <h1 className="text-[20px] font-bold text-left px-10 shadow-lg">
                            Directorio telefónico
                        </h1>
                        <p className="text-sm mt-2 text-left px-10  font-semibold shadow-lg">
                            Consigue los medios para comunicarte con la Municipalidad de Alajuelita.
                        </p>
                    </div>
                </section>
            </header>
            <section className='flex flex-col'>
                <h2 className="pl-4 text-xl font-medium text-stellar-blue">
                    <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
                        <b>Informate de estos medios:</b>
                    </span>
                </h2>
                <article className='flex flex-col p-6 gap-3'>
                    {phones.map((phone, index) => (
                        <PhoneCard
                            key={index}
                            place={phone.place}
                            description={phone.description}
                            number={phone.number}
                            lineColor={phone.lineColor}
                        />
                    ))}
                </article>
            </section>
        </div>
    )
}
