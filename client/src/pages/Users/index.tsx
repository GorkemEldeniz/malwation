import SearchBar from "@components/SearchBar";
import Table from "@components/Table";

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
          console.log("başarılı");
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  if (loading) return <div>Loading..</div>;

  return (
    <div className="mx-auto flex w-5/6 max-w-[1400px] flex-col items-start gap-2">
      <SearchBar />
      <Table data={data} />
    </div>
  );
}

export default Users;
