import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useAppDispatch, useAppSelector } from "@libs/Redux/hook";
import { logout } from "@libs/Redux/userSlice";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cn } from "@utils/index";

function DropDown() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Çıkış yapıldı..");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn({
          "text-primary": location.pathname.includes("/user/"),
        })}
      >
        My Account
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer hover:bg-primaryHover hover:text-white">
          <Link className="h-full w-full" to={`user/${id}`}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-primaryHover hover:text-white"
          onClick={handleLogout}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
