import DeleteButton from "./DeleteButton";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@libs/redux/hook";

import type { GetUsersList } from "@utils/api/user/types/GetUsersList";

interface ITableProps {
  data: Partial<GetUsersList> | undefined;
}
function Table({ data }: ITableProps) {
  const navigator = useNavigate();

  const { permissions: currentUserPermissions, id: currentUserId } =
    useAppSelector((state) => state.user);

  const usersArray =
    data?.getUsersList?.__typename == "GetUsersList" &&
    data?.getUsersList?.users.length
      ? data?.getUsersList?.users.map((user) => ({
          name: user.name,
          id: user.id,
          createdAt: user.createdAt,
          active: user.active,
        }))
      : [
          {
            id: "",
            name: "",
            createdAt: "",
            active: "",
          },
        ];
  const headers = Object.keys(usersArray[0]);

  const handleRead = (id: string) => {
    if (
      currentUserPermissions?.includes("Read") ||
      currentUserPermissions?.includes("Update")
    ) {
      navigator(`${id}`);
    } else toast.error("Kullanıcıda Read hakkı yoktur");
  };

  return (
    <div className="flex w-full flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      <div className="text-center">{header}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white [&>*:nth-child(even)]:bg-borderDisabled">
                {usersArray.map((user) => (
                  <tr
                    className="cursor-pointer"
                    key={user.id}
                    onClick={() => handleRead(user.id)}
                  >
                    {Object.values(user).map((value, index) => {
                      return (
                        <td
                          key={index}
                          className="whitespace-nowrap px-6 py-4 text-center"
                        >
                          {typeof value === "boolean"
                            ? value
                              ? "🟢"
                              : "🔴"
                            : value}
                        </td>
                      );
                    })}
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <DeleteButton
                        currentUserPermissions={currentUserPermissions}
                        currentUserId={currentUserId}
                        deletedUserId={user.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
