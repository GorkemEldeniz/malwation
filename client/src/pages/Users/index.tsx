import SearchBar from "@components/SearchBar";
import Table from "@components/Table";

import { Icon } from "@icon";

import toast from "react-hot-toast";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_USERS_LIST } from "@utils/api/user";
import type {
  GetUsersList,
  GetUsersListVariables,
} from "@utils/api/user/types/GetUsersList";

function Users() {
  const [searchParams] = useSearchParams();

  const nameParamsValue = searchParams.get("name") as string;

  const { data, loading } = useQuery<GetUsersList, GetUsersListVariables>(
    GET_USERS_LIST,
    {
      fetchPolicy: "network-only",
      variables: {
        input: {
          name: nameParamsValue ? nameParamsValue : "",
        },
      },
      onCompleted: (response) => {
        if (response.getUsersList.__typename === "Error") {
          toast.error(response.getUsersList.errorMessage);
        }
        if (response.getUsersList.__typename === "GetUsersList") {
          //kullanıcı listesi alındı
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  if (loading)
    return (
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Icon
          width="60"
          height="60"
          icon="spinner"
          className="animate-spin fill-current"
        />
      </div>
    );

  return (
    <div className="mx-auto flex w-5/6 max-w-[1000px] flex-col items-start gap-2">
      <SearchBar />
      <Table data={data} />
    </div>
  );
}

export default Users;
