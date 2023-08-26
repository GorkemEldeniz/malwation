import { useAppDispatch } from "@libs/redux/hook";
import { login } from "@libs/redux/reducers/user";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginForm } from "@libs/apollo/api/auth/__generated__/Login";
import type { ILoginInput } from "@libs/apollo/api/auth/__generated__/Login";

import { useMutation } from "@apollo/client";
import LOGIN from "@libs/apollo/api/auth";
import type {
  Login,
  LoginVariables,
} from "@libs/apollo/api/auth/__generated__/Login";

function Login() {
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
        console.log(response.login.errorMessage);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-1/3 max-w-[500px] flex-col gap-2"
    >
      <label htmlFor="">Name</label>
      <input className="border" placeholder="name" {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="">Password</label>
      <input className="border" {...register("password")} />

      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
