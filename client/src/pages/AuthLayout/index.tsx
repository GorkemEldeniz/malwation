import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
