import { ForwardedRef } from "react";

import Button from "./ui/button";

import toast from "react-hot-toast";

import { useAppDispatch } from "@libs/redux/hook";

import { logout } from "@libs/redux/reducers/user";

import { useMutation } from "@apollo/client";

import { GET_USERS_LIST } from "@utils/api/user";
import {
  DeleteUser,
  DeleteUserVariables,
} from "@utils/api/user/types/DeleteUser";
import { DELETE_USER } from "@utils/api/user";

export interface IDeleteButton {
  modalRef: React.RefObject<HTMLDialogElement>;
  currentUserId: string | undefined;
  deletedUserId: string;
  currentUserPermissions:
    | ("Read" | "Create" | "Delete" | "Update")[]
    | undefined;
}

function DeleteButton({
  currentUserId,
  deletedUserId,
  currentUserPermissions,
  modalRef,
}: IDeleteButton) {
  const dispatch = useAppDispatch();

  const [DeleteUser, { loading: MutationLoading }] = useMutation<
    DeleteUser,
    DeleteUserVariables
  >(DELETE_USER, {
    onCompleted: (response) => {
      if (response.deleteUser.__typename === "Error") {
        toast.error(response.deleteUser.errorMessage);
      }
      if (response.deleteUser.__typename === "Message") {
        //kullanıcı kendini silerse
        if (currentUserId === deletedUserId) {
          dispatch(logout());
        }
        modalRef?.current?.close();
        toast.success(response.deleteUser.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
    refetchQueries: [
      { query: GET_USERS_LIST, variables: { input: { name: "" } } },
    ],
  });

  const handleDelete = () => {
    if (currentUserPermissions?.includes("Delete")) {
      DeleteUser({
        variables: {
          input: {
            id: deletedUserId,
          },
        },
      });
    } else toast.error("Kullanıcıda Delete hakkı yoktur");
  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        loading={MutationLoading}
        label="Delete"
        variant="destructive"
      />
    </>
  );
}

export default DeleteButton;
