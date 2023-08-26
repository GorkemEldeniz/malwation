import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@libs/redux/hook";
import { useAppDispatch } from "@libs/redux/hook";
import { update } from "@libs/redux/reducers/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_USER } from "@libs/apollo/api/user";
import type {
  GetOneUser,
  GetOneUserVariables,
} from "@libs/apollo/api/user/types/GetOneUser";

import { UPDATE_USER } from "@libs/apollo/api/user";
import type {
  UpdateUser,
  UpdateUserVariables,
} from "@libs/apollo/api/user/types/UpdateUser";

const permissionsArray = ["Read", "Create", "Delete", "Update"] as const;
export const UpdateForm = z.object({
  name: z
    .string()
    .min(2)
    .max(15)
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character"),
  password: z
    .string()
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character")
    .refine(
      (value) => value.length === 0 || (value.length > 2 && value.length < 15),
      "Password must be maximum 15 and minimum 2 characters"
    ),
  active: z.boolean(),
  permissions: z.array(z.enum(permissionsArray)),
});

export type IUpdateInput = z.infer<typeof UpdateForm>;

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

  if (loading || MutationLoading) return <div>Loading..</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-1/3 max-w-[500px] flex-col gap-2"
    >
      <label htmlFor="">Name</label>
      <input
        readOnly={!currentUserPermissions?.includes("Update")}
        className="border"
        placeholder="name"
        {...register("name")}
      />
      {errors.name && <div>{errors.name.message}</div>}

      <label htmlFor="">Password</label>
      <input
        readOnly={!currentUserPermissions?.includes("Update")}
        className="border"
        {...register("password")}
      />
      {errors.password && <div>{errors.password.message}</div>}

      <label htmlFor="">Active</label>
      <input
        disabled={!currentUserPermissions?.includes("Update")}
        type="checkbox"
        className="border"
        {...register("active")}
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

      <button type="submit">Update</button>
    </form>
  );
}

export default User;
