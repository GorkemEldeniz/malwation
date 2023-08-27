import Button from "./ui/button";

import { NavLink } from "react-router-dom";

import { logout } from "@libs/redux/reducers/user";
import { useAppSelector } from "@libs/redux/hook";
import { useAppDispatch } from "@libs/redux/hook";

function NavBar() {
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="sticky left-0 top-0 mb-8 flex flex-shrink-0 items-center bg-gray-800 px-4 py-2">
      <div className="flex w-fit items-center justify-between">
        <span className="text-xl text-white">Malwation</span>
      </div>
      <div className="flex flex-grow items-center" id="navbar-collapse">
        <ul className="mx-auto flex flex-row gap-2">
          <li>
            <NavLink
              to="users"
              className="block py-2 text-gray-500 hover:text-gray-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`users/${id}`}
              className="block py-2 text-gray-500 hover:text-gray-300"
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <div className="my-3 flex lg:my-0">
          <Button
            onClick={() => dispatch(logout())}
            label="Logout"
            variant="monochrome"
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
