import Button from "@components/ui/button";
import Input from "@components/ui/Input";
import ToggleButton from "@components/ui/ToggleButton";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@libs/redux/hook";
import { useAppDispatch } from "@libs/redux/hook";
import { update } from "@libs/redux/reducers/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_USER } from "@utils/api/user";
import type {
  GetOneUser,
  GetOneUserVariables,
} from "@utils/api/user/types/GetOneUser";

import { UPDATE_USER } from "@utils/api/user";
import {
  UpdateUser,
  UpdateUserVariables,
  UpdateForm,
  IUpdateInput,
  permissionsArray,
} from "@utils/api/user/types/UpdateUser";

function User() {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { userId } = useParams();

  const { permissions: currentUserPermissions, id } = useAppSelector(
    (state) => state.user
  );

  const { loading } = useQuery<GetOneUser, GetOneUserVariables>(GET_ONE_USER, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        id: userId as string,
      },
    },
    onCompleted: (response) => {
      if (response.getOneUser.__typename == "GetOneUser") {
        const { name, active, permissions } = response.getOneUser;
        setValue("name", name);
        setValue("active", active);
        setValue("permissions", permissions);
      }
      if (response.getOneUser.__typename == "Error") {
        console.log(response.getOneUser.errorMessage);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [UpdateUser, { loading: MutationLoading }] = useMutation<
    UpdateUser,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (response) => {
      if (response.updateUser.__typename === "Error") {
        console.log(response.updateUser.errorMessage);
      }
      if (response.updateUser.__typename === "Message") {
        console.log(response.updateUser.message);
        // kullanıcı kendini güncellediyse redux store u güncelle
        if (id === userId) {
          const { name, password, active, permissions } = getValues();
          console.log("kendimi güncelledim");
          dispatch(
            update({
              isLogin: true,
              name,
              permissions,
            })
          );
        }
        navigator("/users");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IUpdateInput>({
    resolver: zodResolver(UpdateForm),
  });
  const onSubmit: SubmitHandler<IUpdateInput> = (userData) => {
    if (currentUserPermissions?.includes("Update")) {
      UpdateUser({
        variables: {
          input: {
            id: userId as string,
            user: {
              ...userData,
            },
          },
        },
      });
    } else console.log("maalesef güncelleme hakkınız yoktur");
  };

  if (loading) return <div>Loading..</div>;

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-4/5 max-w-[700px] flex-col gap-4 rounded-md border px-7 py-10 shadow-md md:w-2/5"
      >
        <label htmlFor="">Name</label>
        <Input
          readOnly={!currentUserPermissions?.includes("Update")}
          className="border"
          disabled={MutationLoading}
          error={!!errors.name}
          placeholder="name"
          name="name"
          register={register}
          rigthIcon="people"
        />
        {errors.name && <div>{errors.name.message}</div>}

        <label htmlFor="">Password</label>
        <Input
          readOnly={!currentUserPermissions?.includes("Update")}
          className="border"
          disabled={MutationLoading}
          error={!!errors.password}
          placeholder="password"
          name="password"
          register={register}
          rigthIcon="lock"
        />
        {errors.password && <div>{errors.password.message}</div>}

        <ToggleButton
          readOnly={!currentUserPermissions?.includes("Update")}
          disabled={MutationLoading}
          register={register}
          name="active"
          id="active"
        />

        <label htmlFor="">Permissions</label>
        {permissionsArray.map((perm, id) => (
          <div key={id}>
            <label htmlFor={perm}>{perm}</label>
            <input
              disabled={!currentUserPermissions?.includes("Update")}
              {...register("permissions")}
              id={perm}
              value={perm}
              type="checkbox"
            />
          </div>
        ))}

        <Button
          variant="primary"
          loading={MutationLoading}
          type="submit"
          label="Update"
        />
      </form>
    </div>
  );
}

export default User;
