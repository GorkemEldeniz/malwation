import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <div className="min-h-screen w-screen">
      <Toaster />
      <Outlet />
    </div>
  );
}

export default MainLayout;
