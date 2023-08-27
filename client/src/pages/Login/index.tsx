import Button from "@components/ui/button";
import Input from "@components/ui/Input";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import { useAppDispatch } from "@libs/redux/hook";
import { login } from "@libs/redux/reducers/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginForm } from "@utils/api/auth/types/Login";
import type { ILoginInput } from "@utils/api/auth/types/Login";

import { useMutation } from "@apollo/client";
import LOGIN from "@utils/api/auth";
import type { Login, LoginVariables } from "@utils/api/auth/types/Login";

function LoginComponent() {
  const dispatch = useAppDispatch();

  const [Login, { loading }] = useMutation<Login, LoginVariables>(LOGIN, {
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ILoginInput>({
    resolver: zodResolver(LoginForm),
  });
  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    Login({
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
        <h1 className="text-2xl">Login</h1>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-1/2 min-w-[300px] flex-col gap-2"
      >
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          className="peer w-full"
          disabled={loading}
          error={!!errors.name}
          name="name"
          register={register}
          rigthIcon="people"
        />

        {errors.name && (
          <span className="text-destructive">{errors.name.message}</span>
        )}

        <label htmlFor="password">Password</label>
        <Input
          id="password"
          disabled={loading}
          error={!!errors.password}
          name="password"
          register={register}
          rigthIcon="lock"
        />

        {errors.password && (
          <span className="text-destructive">{errors.password.message}</span>
        )}

        <Button
          variant="primary"
          disabled={!isDirty}
          loading={loading}
          type="submit"
          label="Login"
        />
        <span>
          Don't have an account,{" "}
          <Link className="font-bold" to="/register">
            Create an account.
          </Link>
        </span>
      </form>
    </div>
  );
}

export default LoginComponent;
