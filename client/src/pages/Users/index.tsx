import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, DELETE_USER } from "@services";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import Spinner from "@components/ui/Spinner";
import { IUser } from "../../types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/Table";
import { client } from "@libs/Apollo";
import { toast } from "react-toastify";
import { useAppSelector } from "@libs/Redux/hook";
import { useState } from "react";

function Users() {
  const [clickedButton, setClickedButton] = useState<undefined | string>(
    undefined
  );
  const navigator = useNavigate();
  const currentUserPermission = useAppSelector(
    (state) => state.user.permissions
  );

  const [deleteUser, { loading: mutationLoader }] = useMutation(DELETE_USER, {
    onCompleted: async (response) => {
      console.log(response);
      client.cache.evict({ fieldName: "getUsersList" });
      await client.query({
        query: GET_ALL_USERS,
        variables: { input: { name: "" } },
      });
      toast.success(response.deleteUser.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    if (!currentUserPermission?.includes("Delete")) {
      toast.error("Kullanıcıda silme izni yoktur");
    } else {
      setClickedButton(id);
      deleteUser({
        variables: {
          input: { id: id },
        },
      });
    }
  };

  const { loading: QueryLoader, data } = useQuery(GET_ALL_USERS, {
    variables: {
      input: {
        name: "",
      },
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (QueryLoader)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="w-1/5 fill-primary" />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.getUsersList.users.map((user: IUser, userIdx: number) => (
          <TableRow
            onClick={() => navigator(`/user/${user?.id}`)}
            className="group/test cursor-pointer hover:bg-primaryHover hover:text-white"
            key={userIdx}
          >
            {Object.values(user).map((value, idx) => (
              <TableCell className="font-medium" key={idx}>
                {typeof value === "boolean"
                  ? value === true
                    ? "🟢"
                    : "🔴"
                  : value}
              </TableCell>
            ))}
            <TableCell>
              <Button
                variant="secondary"
                isLoading={mutationLoader && clickedButton === user.id}
                className="group-hover/test:bg-white group-hover/test:text-primary"
                onClick={(e) => handleDelete(e, user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Users;
