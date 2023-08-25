import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "@pages/MainLayout";
import AuthLayout from "@pages/AuthLayout";
import Login from "@pages/Login";
import Users from "@pages/Users";
import User from "@pages/User";
import ErrorPage from "@pages/Error";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@libs/Redux/hook";

const router = (isLogin: boolean) => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={isLogin ? <MainLayout /> : <AuthLayout />}>
        <Route
          element={!isLogin && <Navigate to="login" replace />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Users />} />
          <Route path="user">
            <Route path=":id" element={<User />} />
          </Route>
        </Route>
        <Route
          path="login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={isLogin ? <Navigate to="/" /> : <Login />} />
      </Route>
    )
  );
};

function Router() {
  const { isAuth } = useAppSelector((state) => state.user);

  return <RouterProvider router={router(isAuth)} />;
}

export default Router;
