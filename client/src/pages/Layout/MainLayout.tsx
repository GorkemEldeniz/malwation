import NavBar from "@components/NavBar";

import { Icon } from "@icon";

import { Outlet, useNavigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

function MainLayout() {
  const navigator = useNavigate();

  return (
    <div className="relative min-h-screen w-screen">
      <Toaster />
      <Icon
        onClick={() => navigator(-1)}
        className="absolute right-[10%] top-[10%] cursor-pointer rounded-full border-2 border-primary fill-current p-2"
        icon="back"
        width="40"
        height="40"
      />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
