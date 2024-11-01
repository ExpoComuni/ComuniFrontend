import ActivityCard from "../components/ActivityCard";
import {
  Truck,
  PhoneCall,
  MapPin,
  FlagTriangleRight,
  CalendarHeart,
  CupSoda,
  Cross,
  PartyPopper,
} from "lucide-react";
import FunFact from "../components/FunFact";
import "../assets/styles/activity.css";

const cardData = [
  {
    icon: CupSoda,
    title: "La bebida tradicional",
    description: "Es el chinchiví, es hecha a base de maíz.",
  },
  {
    icon: Cross,
    title: "La cruz de Alajuelita",
    description: "Está ubicada a 2036 MSNM.",
  },
  {
    icon: PartyPopper,
    title: "Fiestas en diciembre",
    description: "Se celebra la fiesta de la Inmaculada Concepción.",
  }
];

const activityData = [
  {
    title: "Basura",
    description: "Horarios de recolección de basura en tu zona.",
    headerColor: "bg-green-500",
    iconBackgroundColor: "bg-green-300",
    icon: <Truck size={22} className="text-green-600" />,
    route: "garbage"
  },
  {
    title: "Telefónico",
    description: "Directorio telefónico de tu comunidad.",
    headerColor: "bg-yellow-500",
    iconBackgroundColor: "bg-yellow-300",
    icon: <PhoneCall size={20} className="text-yellow-600"/>,
    route: "phones"
  },
  {
    title: "Actividades",
    description: "Dale un vistazo a las actividades de este mes.",
    headerColor: "bg-violet-500",
    iconBackgroundColor: "bg-violet-300",
    icon: <CalendarHeart size={20} className="text-violet-800" />,
    route: "events"
  },
  // {
  //   title: "Mi Cantón",
  //   description: "Información acerca de Alajuelita.",
  //   headerColor: "bg-red-700",
  //   iconBackgroundColor: "bg-red-300",
  //   icon: <MapPin size={22} className="text-red-600" />,
  // },
];

export default function Activity() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-1">
        <header className="flex justify-center">
          <section className="text-white rounded-3xl text-center flex items-center justify-center w-full park py-10 relative">
            <div>
              <h1 className="text-2xl font-bold text-left pl-4 shadow-lg">
                ¡Descubre!
              </h1>
              <p className="text-sm mt-2 text-left pl-4 font-semibold shadow-lg">
                Aquí puedes conocer más de tu cantón, Alajuelita.
              </p>
            </div>
          </section>
        </header>

        <section className="flex flex-col gap-8">
          <h1 className="pl-4 text-xl font-medium text-stellar-blue">
            <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
              <b>¿Qué deseas conocer?</b>
            </span>
          </h1>

          <section className="mb-5 flex gap-y-5 gap-x-7 w-[96vw] overflow-x-auto snap-x snap-mandatory scroll-smooth px-4">
            {activityData.map((card, index) => (
              <ActivityCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                headerColor={card.headerColor}
                iconBackgroundColor={card.iconBackgroundColor}
                route={card.route}
              />
            ))}
          </section>
        </section>

        <section className="flex flex-col gap-4 h-full overflow-auto">
          <h2 className="pl-4 text-xl font-medium text-stellar-blue">
            <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
              <b>¿Sabías qué...?</b>
            </span>
          </h2>
          {cardData.map((card, index) => (
            <FunFact
              key={index}
              Icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </section>
      </div>
    </>
  );
}
