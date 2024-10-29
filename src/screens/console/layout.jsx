import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
const Layout = () => {

  return (
    <div className="bg-white flex w-full h-[100dvh] min-h-screen overflow-hidden">
        <Sidebar/>
      <main className="flex h-[100vh] overflow-auto flex-1 bg-[#F7FAFC] p-2">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;
