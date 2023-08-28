import { Icon } from "@icon";

import { useRef } from "react";
import { useState } from "react";

import Modal from "./Modal";
import Cell from "./Cell";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@libs/redux/hook";

import type { GetUsersList } from "@utils/api/user/types/GetUsersList";

interface ITableProps {
  data: Partial<GetUsersList> | undefined;
}
function Table({ data }: ITableProps) {
  const [deletedUserId, setDeletedUserId] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

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
    <>
      <Modal
        open={false}
        ref={modalRef}
        currentUserPermissions={currentUserPermissions}
        currentUserId={currentUserId}
        deletedUserId={deletedUserId}
      />
      <div className="flex w-full flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle marker:py-2">
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
                        return <Cell key={index} value={value} />;
                      })}
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletedUserId(user.id);
                            modalRef.current?.showModal();
                          }}
                          className="cursor-pointer fill-primary stroke-primary"
                          width="20"
                          height="20"
                          icon="rubbish"
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
    </>
  );
}

export default Table;
