import { NavLink } from "react-router-dom";

import { useAppSelector } from "@libs/Redux/hook";

import DropDown from "./ui/DropDown";

function NavBar() {
  const { name } = useAppSelector((state) => state.user);

  return (
    <nav className="py-4 ">
      <ol className="flex items-center gap-4 rounded-md border border-primary px-6 py-4">
        <li className="font-ligth text-xl text-black">
          {name?.toLocaleUpperCase("tr")}
        </li>
        <li className="ml-auto">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-primary" : undefined
            }
            to="/"
          >
            Users
          </NavLink>
        </li>
        <li>
          <DropDown />
        </li>
      </ol>
    </nav>
  );
}

export default NavBar;
