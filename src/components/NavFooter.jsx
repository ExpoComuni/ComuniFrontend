import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Telescope, User, MessageCircleMore, Plus } from "lucide-react";
import { useDisclosure } from "@chakra-ui/react";
import ReportModal from "./ReportModal"; 

export default function NavFooter() {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const links = [
    {
      name: "Home",
      dir: "/app",
      icon: <Home size={28} color={activePath === "/app" || activePath === "/app/" ? "#36a6ba" : "gray"} />,
    },
    {
      name: "Activities",
      dir: "/app/activity",
      icon: <Telescope size={30} color={activePath === "/app/activity" || activePath === "/app/activity/" ? "#36a6ba" : "gray"} />,
    },
    {
      name: "Forum",
      dir: "/app/forum",
      icon: <MessageCircleMore size={28} color={activePath === "/app/forum" || activePath === "/app/forum/" ? "#36a6ba" : "gray"} />,
    },
    {
      name: "Profile",
      dir: "/app/profile",
      icon: <User size={28} color={activePath === "/app/profile" || activePath === "/app/profile/" ? "#36a6ba" : "gray"} />,
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg py-[1.3rem]">
        <ul className="flex justify-around items-center ">
          {links.slice(0, 2).map((link) => (
            <li key={link.name} className="flex flex-col items-center">
              <Link to={link.dir} className="flex flex-col items-center text-gray-500">
                {link.icon}
              </Link>
            </li>
          ))}
          
          <li className="relative">
            <div className="absolute top-[-36px] transform -translate-x-1/2">
              <button onClick={onOpen} className="bg-[#36a6ba] text-white rounded-full p-2.5 flex items-center justify-center">
                <Plus size={32} className={isOpen ? "rotate-45 transition-all" : "transition-all"} />
              </button>
            </div>
          </li>

          {links.slice(2).map((link) => (
            <li key={link.name} className="flex flex-col items-center">
              <Link to={link.dir} className="flex flex-col items-center text-gray-500">
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal */}
      <ReportModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
