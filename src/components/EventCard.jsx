import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import weekDays from "../utils/weekDays";
export default function Event({ title, description, eventdate, hour, place, audience, id }) {
    // Convert the eventdate string to a JavaScript Date object
    const dateObj = new Date(eventdate);
    const day = dateObj.getDate();  // Extract the day
    const weekDayIndex = dateObj.getDay();  // Get the index for the day of the week
  
    const weekDay = weekDays[weekDayIndex];  // Get the abbreviated name of the week day
  
    return (
      <article className="w-full rounded-xl bg-slate-100 flex p-3 gap-3 justify-between items-center shadow-xl">
        <div className="flex ml-[-4px] items-center">
            <div className="h-16 w-1 bg-green-light rounded-full"></div>
          <div className="flex justify-between items-center p-4">
            <div className="flex flex-col gap-2">
              <p className=" text-black font-bold text-xl">{day}</p>
              <p className="text-sm text-gray-600">{weekDay}</p>
            </div>
          </div>
          <div className="p-4 border-l-2 border-gray-600">
            <p className="text-xl text-black font-bold">{title}</p>
            <p className="text-sm text-gray-600">{hour}</p>
          </div>
        </div>
        <Link to={`${id}`}>
            <ChevronRight color="#000" size={36}/>
        </Link>
      </article>
    );
  }
  