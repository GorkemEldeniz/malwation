import NavBar from "@components/NavBar";

import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <div className="relative min-h-screen w-screen">
      <Toaster />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
