import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import useLogin from "@hooks/useLogin";

import Login from "@pages/Login";
import Register from "@pages/Register";

const router = (isLogin: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <div>
          Home- <Outlet />
        </div>
      ) : (
        <Navigate to="/login" replace />
      ),
      caseSensitive: true,
      errorElement: <div>hata</div>,
      children: [
        {
          index: true,
          element: <Navigate to="/users" replace />,
        },
        {
          path: "users",
          element: (
            <div>
              Users Layout <Outlet />
            </div>
          ),
          caseSensitive: false,
          children: [
            {
              index: true,
              element: <div>Users</div>,
              errorElement: <div>hata</div>,
            },
            {
              path: ":userId",
              element: <div>User</div>,
              caseSensitive: true,
              errorElement: <div>hata</div>,
            },
          ],
        },
        {
          path: "*",
          element: <div>Not found</div>,
          caseSensitive: true,
        },
      ],
    },
    {
      path: "/login",
      element: !isLogin ? (
        <div>
          Login Layout <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace />
      ),
      errorElement: <div>hata</div>,
      caseSensitive: true,
      children: [
        {
          index: true,
          element: <Login />,
          errorElement: <div>hata</div>,
          caseSensitive: true,
        },
      ],
    },
    {
      path: "/register",
      element: !isLogin ? (
        <div>
          Register Layout <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace />
      ),
      errorElement: <div>hata</div>,
      caseSensitive: true,
      children: [
        {
          index: true,
          element: <Register />,
          errorElement: <div>hata</div>,
          caseSensitive: true,
        },
      ],
    },
  ]);
};

function Router() {
  const isLogin = useLogin();

  return <RouterProvider router={router(isLogin)} />;
}

export default Router;
