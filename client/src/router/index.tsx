import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import useLogin from "@hooks/useLogin";

import AuthLayout from "@pages/Layout/AuthLayout";
import MainLayout from "@pages/Layout/MainLayout";

import Users from "@pages/Users";
import User from "@pages/Users/User";

import LoginComponent from "@pages/Login";
import RegisterComponent from "@pages/Register";

const router = (isLogin: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      element: isLogin ? <MainLayout /> : <Navigate to="/login" replace />,
      caseSensitive: true,
      errorElement: <div>hata</div>,
      children: [
        {
          index: true,
          element: <Navigate to="/users" replace />,
        },
        {
          path: "users",
          caseSensitive: false,
          children: [
            {
              index: true,
              element: <Users />,
              errorElement: <div>hata</div>,
            },
            {
              path: ":userId",
              element: <User />,
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
      element: !isLogin ? <AuthLayout /> : <Navigate to="/" replace />,
      errorElement: <div>hata</div>,
      caseSensitive: true,
      children: [
        {
          index: true,
          element: <LoginComponent />,
          errorElement: <div>hata</div>,
          caseSensitive: true,
        },
      ],
    },
    {
      path: "/register",
      element: !isLogin ? <AuthLayout /> : <Navigate to="/" replace />,
      errorElement: <div>hata</div>,
      caseSensitive: true,
      children: [
        {
          index: true,
          element: <RegisterComponent />,
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
