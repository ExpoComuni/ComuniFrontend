import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Captions, Sparkle, TicketCheck, Link as LinkIcon, ChevronLeft } from "lucide-react";
import monthNames from "../../utils/month";
import { getEventById } from "../../api/events"; // Assuming this is your API function
import "../../assets/styles/event.css";

export default function Event() {
  const { id } = useParams(); // Get event ID from the URL

  // Fetch the event data by ID using React Query
  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  if (isLoading) {
    return <p>Loading event details...</p>;
  }

  if (isError || !event) {
    return <p>Error loading event details or event not found.</p>;
  }

  const dateObj = new Date(event.eventdate);
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()]; // Get month string
  const year = dateObj.getFullYear(); // Get year

  return (
    <div className="flex w-full flex-col gap-2">
      <Link to={"/app/activity"}>
        <ChevronLeft size={40} />
      </Link>
      <header className="flex flex-col gap-3 items-center justify-center p-8 mountain">
        <h1 className="text-white font-bold text-5xl">{day}</h1>
        <p className="text-gray-200 text-2xl">
          {month} {year}
        </p>
      </header>
      <section className="flex flex-col gap-2 mt-2 p-6">
        <div className="flex items-center justify-between">
          <p className="font-bold text-yellow-500 text-2xl">
            Lugar: {event.place}
          </p>
          <p className="text-gray-500 text-lg">Para: {event.audience}</p>
        </div>
        <div className="h-full mt-6 flex flex-col gap-6">
          {/* Descripción */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex bg-yellow-500 rounded-full p-1">
                <Captions color="#FFF" size={30} />
              </div>
              <h2 className="font-bold text-xl">Descripción</h2>
            </div>
            <p className="text-left">{event.description}</p>
          </div>

          {/* Requerimientos */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex bg-green-400 rounded-full p-1">
                <TicketCheck color="#FFF" size={30} />
              </div>
              <h2 className="font-bold text-xl">Requerimientos</h2>
            </div>

          </div>

          {/* Consideraciones */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex bg-blue-400 rounded-full p-1">
                <Sparkle color="#FFF" size={30} />
              </div>
              <h2 className="font-bold text-xl">Consideraciones</h2>
            </div>
            <p className="text-left">{event.considerations}</p>
          </div>

          {/* Link para más información */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex bg-blue-400 rounded-full p-1">
                <LinkIcon color="#FFF" size={30} />
              </div>
              <h2 className="font-bold text-xl">Link para más información</h2>
            </div>
            <a href={event.link} className="text-left text-blue-600" target="_blank" rel="noopener noreferrer">
              {event.link}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
