import { Outlet } from "react-router-dom";
import NavBar from "@components/NavBar";

function MainLayout() {
  return (
    <div className="grid-col-1 grid h-full w-full gap-4 px-6">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
