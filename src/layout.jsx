import { Outlet } from 'react-router-dom';
import NavFooter from './components/NavFooter';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const navRoutes = ["/app", "/app/", "/app/activity","/app/activity/", "/app/forum", "/app/forum/", "/app/profile" , "/app/profile/"];

  const showNavbar = navRoutes.includes(activePath) || activePath === "/app" || activePath === "/";

  return ( 
    <div className="bg-white flex flex-col w-full h-[100dvh] min-h-screen overflow-hidden">
      <main className="flex h-[100vh] overflow-auto flex-1 bg-[#F7FAFC] p-2">
        <Outlet />
      </main>

      {showNavbar && (
        <footer className="fixed w-full bottom-0">
          <NavFooter />
        </footer>
      )}
    </div>
  );
};

export default Layout;
