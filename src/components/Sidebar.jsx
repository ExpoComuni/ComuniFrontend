import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  FileText,
  Settings,
  BarChart,
  Newspaper,
  Activity
} from 'lucide-react';
import { Logo } from '../assets/logo';

const Sidebar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const sidebarItems = [
    // { name: 'Home', path: '/console', icon: <Home /> },
    { name: 'Reportes', path: '/console/reports', icon: <FileText /> },
    { name: 'Noticias', path: '/console/news', icon: <Newspaper /> },
    { name: 'Eventos', path: '/console/events', icon: <Activity/> },
    // { name: 'Analytics', path: '/console/analytics', icon: <BarChart /> },
    { name: 'Ajustes', path: '/console/settings', icon: <Settings /> },
  ];

  return (
    <div className="h-screen bg-green-dark text-white flex flex-col p-10">
      <Link to="/console/reports" className=" flex items-center gap-3 p-4 text-lg font-bold">
      <img draggable="false" src={Logo} alt="Communi" className="rounded-xl h-16 w-16" />
      Consola Comuni</Link>
      <nav className="flex-1 mt-16">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-6 p-2 text-xl font-medium rounded-lg ${
                  activePath === item.path
                    ? 'bg-[#B0BCCA] text-white' 
                    : 'hover:opacity-35 hover:text-white' 
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
