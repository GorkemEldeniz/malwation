import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ONE_USER, UPDATE_USER, GET_ALL_USERS } from "@services";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@libs/Redux/hook";
// import { client } from "@libs/Apollo";
import { update as updateStore } from "@libs/Redux/userSlice";
import Spinner from "@components/ui/Spinner";

const permissionArray = ["Update", "Delete", "Create"];
const updateSchema = z.object({
  name: z
    .string()
    .min(3, "name must contain at least 3 character")
    .max(12, "name must contain at most 12 character"),
  password: z.string().refine(
    (value) => {
      return value.length === 0 || (value.length > 2 && value.length < 13);
    },
    {
      message: "password must contain minimum of 2 and maximum of 12 character",
    }
  ),
  active: z.boolean(),
  permissions: z.array(
    z.string().refine((permission) => permissionArray.includes(permission))
  ),
});

// extracting the type
type UpdateInput = z.infer<typeof updateSchema>;

function User() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { permissions: currentUserPermissions, id: userId } = useAppSelector(
    (state) => state.user
  );

  const { loading: QueryLoader, error: QueryError } = useQuery(GET_ONE_USER, {
    variables: {
      input: {
        id: id,
      },
    },
    onCompleted: (response) => {
      const { name, active, permissions } = response.getOneUser;
      setValue("name", name);
      setValue("password", "");
      setValue("active", active);
      setValue("permissions", permissions);
      // Kullanıcı kendini güncellerse redux'ı güncelle

      if (userId == id) {
        dispatch(
          updateStore({
            name: name,
            active: active,
            permissions: permissions,
          })
        );
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [Update, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: async (response) => {
      //HANDLE
      if (response.updateUser.message) {
        toast.success(response.updateUser.message);
        // client.cache.evict({ fieldName: "getUsersList" });
        // await client.query({
        //   query: GET_ALL_USERS,
        //   variables: { input: { name: "" } },
        // });
      } else toast.success("hata");
    },
    refetchQueries: [
      { query: GET_ALL_USERS, variables: { input: { name: "" } } },
      { query: GET_ONE_USER, variables: { input: { id: id } } },
    ],
    onError: (error) => {
      toast.error(error.message, {
        style: {
          color: "red",
        },
      });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateInput>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit: SubmitHandler<UpdateInput> = (userData) => {
    if (currentUserPermissions?.includes("Update")) {
      Update({
        variables: {
          input: {
            id: id,
            user: {
              ...userData,
            },
          },
        },
      });
    } else {
      toast.error("Kullanıcıda Güncelleme izni bulunmamaktadır");
    }
  };

  if (QueryLoader)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="w-1/5 fill-primary" />
      </div>
    );

  return (
    <div className="mx-auto w-[70%] lg:w-1/3 ">
      <h1 className="text-center text-2xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="Name"
          errorMessage={errors.name?.message}
          isError={!!errors.name}
          type="text"
          {...register("name")}
        />
        <Input
          id="Password"
          errorMessage={errors.password?.message}
          isError={!!errors.password}
          type="password"
          {...register("password")}
        />
        <label htmlFor="active" className="flex items-center gap-2" key={id}>
          Active
          <input
            className="peer sr-only"
            type="checkbox"
            {...register("active")}
            id="active"
          />
          <label
            className="peer-checked:bg-image relative flex h-[20px] w-[20px] items-center justify-center rounded-md border-2 bg-no-repeat  p-4  peer-checked:border-primary"
            htmlFor="active"
          ></label>
        </label>
        <fieldset>
          <legend>Permissions</legend>
          <div className="flex gap-2">
            {permissionArray.map((permission, id) => (
              <label
                htmlFor={permission}
                className="flex items-center gap-2"
                key={id}
              >
                {permission}
                <input
                  className="peer sr-only"
                  type="checkbox"
                  {...register("permissions")}
                  value={permission}
                  id={permission}
                />
                <label
                  className="peer-checked:bg-image relative flex h-[20px] w-[20px] items-center justify-center rounded-md border-2 bg-no-repeat  p-4  peer-checked:border-primary"
                  htmlFor={permission}
                ></label>
              </label>
            ))}
          </div>
        </fieldset>
        <Button
          disabled={!isValid || !isDirty}
          isLoading={loading}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default User;
