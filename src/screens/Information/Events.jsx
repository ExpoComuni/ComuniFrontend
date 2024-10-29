import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Event from "../../components/EventCard";
import { getAllEventsByMonthAndYear } from "../../api/events";
import monthNames from "../../utils/month";
import "../../assets/styles/activity.css";

export default function Events() {
  // Combined state for both current month and year
  const [date, setDate] = useState({
    month: new Date().getMonth() + 1, // Adjust to be 1-12
    year: new Date().getFullYear(),
  });

  // Fetch events based on month and year
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ["events", date.month, date.year],
    queryFn: () => getAllEventsByMonthAndYear(date.month, date.year),
  });

  // Move to the previous month
  const handlePreviousMonth = () => {
    setDate((prevDate) => {
      const { month, year } = prevDate;
      if (month === 1) {
        return { month: 12, year: year - 1 }; // Go to December of the previous year
      }
      return { month: month - 1, year }; // Go to the previous month of the same year
    });
  };

  // Move to the next month
  const handleNextMonth = () => {
    setDate((prevDate) => {
      const { month, year } = prevDate;
      if (month === 12) {
        return { month: 1, year: year + 1 }; // Go to January of the next year
      }
      return { month: month + 1, year }; // Go to the next month of the same year
    });
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <Link to={"/app/activity"}>
        <ChevronLeft size={40} />
      </Link>
      <header className="flex justify-center">
        <section className="park2 text-white rounded-3xl text-center flex items-center justify-center w-[98%] bg-[#36a6ba] px-9 py-8 relative">
          <div>
            <div className="flex w-full justify-between items-center">
              {/* Previous Month Button */}
              <button onClick={handlePreviousMonth} className="p-2">
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Display Current Month and Year */}
              <h1 className="text-2xl font-bold text-left pl-4">
                {monthNames[date.month - 1]} {date.year}
              </h1>

              {/* Next Month Button */}
              <button onClick={handleNextMonth} className="p-2">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Display message with the current month */}
            <p className="text-sm mt-2 text-left pl-4 font-semibold">
              Estas son las actividades del mes de {monthNames[date.month - 1]}
            </p>
          </div>
        </section>
      </header>

      {/* Events of the month */}
      <div className="p-4 flex flex-col gap-6 h-[75vh] overflow-auto">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading events...</p>
        ) : isError ? (
          <p className="text-center text-lg text-gray-500">Error fetching events</p>
        ) : events?.length > 0 ? (
          events.map((event, idx) => <Event key={idx} {...event} />)
        ) : (
          <p className="text-center text-lg text-gray-500">No hay eventos para este mes</p>
        )}
      </div>
    </div>
  );
}
