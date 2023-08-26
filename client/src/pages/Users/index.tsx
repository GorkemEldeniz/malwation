import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@libs/redux/hook";
import { logout } from "@libs/redux/reducers/user";

import { useMutation, useQuery } from "@apollo/client";

import { GET_USERS_LIST } from "@libs/apollo/api/user";
import type {
  GetUsersList,
  GetUsersListVariables,
} from "@libs/apollo/api/user/types/GetUsersList";

import { DELETE_USER } from "@libs/apollo/api/user";
import type {
  DeleteUser,
  DeleteUserVariables,
} from "@libs/apollo/api/user/types/DeleteUser";

function Users() {
  const dispatch = useAppDispatch();
  const { permissions: currentUserPermissions, id } = useAppSelector(
    (state) => state.user
  );

  const navigator = useNavigate();

  const { data, loading } = useQuery<GetUsersList, GetUsersListVariables>(
    GET_USERS_LIST,
    {
      fetchPolicy: "network-only",
      variables: {
        input: {
          name: "",
        },
      },
      onCompleted: (response) => {
        if (response.getUsersList.__typename === "Error") {
          console.log(response.getUsersList.errorMessage);
        }
        if (response.getUsersList.__typename === "GetUsersList") {
          console.log("başarılı");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const [DeleteUser, { loading: MutationLoading }] = useMutation<
    DeleteUser,
    DeleteUserVariables
  >(DELETE_USER, {
    onCompleted: (response) => {
      if (response.deleteUser.__typename === "Error") {
        console.log(response.deleteUser.errorMessage);
      }
      if (response.deleteUser.__typename === "Message") {
        //kullanıcı kendini silerse
        const [deletedUserId] = response.deleteUser.message.split(" ");
        if (deletedUserId === id) {
          dispatch(logout());
        }
        console.log(response.deleteUser.message);
      }
    },
    onError: (err) => {
      console.log(err);
    },
    refetchQueries: [
      { query: GET_USERS_LIST, variables: { input: { name: "" } } },
    ],
  });

  const handleDelete = (id: string) => {
    if (currentUserPermissions?.includes("Delete")) {
      DeleteUser({
        variables: {
          input: {
            id: id,
          },
        },
      });
    } else console.log("Kullanıcıda Delete hakkı yoktur");
  };

  const handleRead = () => {
    if (
      currentUserPermissions?.includes("Read") ||
      currentUserPermissions?.includes("Update")
    ) {
      navigator(`${id}`);
    } else console.log("Kullanıcıda Read hakkı yoktur");
  };

  if (loading || MutationLoading) return <div>Loading..</div>;

  return (
    <div className="flex flex-col gap-4">
      {data?.getUsersList.users.map((user) => (
        <div key={user.id} onClick={handleRead}>
          <div>name : {user.name}</div>
          <div>id : {user.id}</div>
          <div>active : {user.active ? "active" : "passive"}</div>
          <button
            className="border"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
