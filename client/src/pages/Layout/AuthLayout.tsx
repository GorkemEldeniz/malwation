import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";

function AuthLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Toaster />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
