import Button from "@components/ui/button";
import Input from "@components/ui/Input";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import { useAppDispatch } from "@libs/redux/hook";
import { login } from "@libs/redux/reducers/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@apollo/client";

import { RegisterForm } from "@utils/api/user/types/CreateUser";
import type { IRegisterInput } from "@utils/api/user/types/CreateUser";

import { CREATE_USER } from "@utils/api/user";
import LOGIN from "@utils/api/auth";

import type { Login, LoginVariables } from "@utils/api/auth/types/Login";

import type {
  CreateUser,
  CreateUserVariables,
} from "@utils/api/user/types/CreateUser";

function RegisterComponent() {
  const dispatch = useAppDispatch();

  const [Login, { loading: LoginLoading }] = useMutation<Login, LoginVariables>(
    LOGIN,
    {
      onCompleted: (response) => {
        if (response.login.__typename === "LoginData") {
          const { id, name, permissions } = response.login;
          dispatch(
            login({
              id,
              name,
              permissions,
            })
          );
        }
        if (response.login.__typename === "Error") {
          toast.error(response.login.errorMessage);
        }
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  const [CreateUser, { loading }] = useMutation<
    CreateUser,
    CreateUserVariables
  >(CREATE_USER, {
    onCompleted: async (response) => {
      if (response.createUser.__typename === "Message") {
        await Login({
          variables: {
            input: {
              name: getValues("name"),
              password: getValues("password"),
            },
          },
        });
      }
      if (response.createUser.__typename === "Error") {
        toast.error(response.createUser.errorMessage);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<IRegisterInput>({
    resolver: zodResolver(RegisterForm),
  });
  const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
    CreateUser({
      variables: {
        input: {
          name: data.name,
          password: data.password,
        },
      },
    });
  };

  return (
    <div className="mx-auto flex w-4/5 max-w-[700px] flex-col items-center gap-4 rounded-md border px-7 py-10 text-gray-700 shadow-md">
      <header>
        <h1 className="text-2xl">Register</h1>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-1/2 min-w-[300px] flex-col gap-2"
      >
        <label htmlFor="name">Name</label>
        <Input
          disabled={loading || LoginLoading}
          error={!!errors.name}
          id="name"
          name="name"
          register={register}
          rigthIcon="people"
        />
        {errors.name && (
          <span className="text-destructive">{errors.name.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <Input
          disabled={loading || LoginLoading}
          error={!!errors.password}
          id="password"
          name="password"
          type="password"
          register={register}
          rigthIcon="lock"
        />
        {errors.password && (
          <span className="text-destructive">{errors.password.message}</span>
        )}

        <Button
          variant="primary"
          disabled={!isDirty}
          loading={loading || LoginLoading}
          type="submit"
          label="Register"
        />
        <span>
          If you have an account,{" "}
          <Link className="font-bold" to="/login">
            Sign in now.
          </Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterComponent;
