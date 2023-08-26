import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import client from "@libs/apollo";

import { RegisterForm } from "@libs/apollo/api/user/__generated__/CreateUser";
import type { IRegisterInput } from "@libs/apollo/api/user/__generated__/CreateUser";

import { useAppDispatch } from "@libs/redux/hook";
import { login } from "@libs/redux/reducers/user";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@libs/apollo/api/user";
import LOGIN from "@libs/apollo/api/auth";

import type {
  Login,
  LoginVariables,
} from "@libs/apollo/api/auth/__generated__/Login";

import type {
  CreateUser,
  CreateUserVariables,
} from "@libs/apollo/api/user/__generated__/CreateUser";

function Login() {
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
          console.log(response.login.errorMessage);
        }
      },
      onError: (err) => {
        console.log(err);
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
        console.log("başarılı");
      }
      if (response.createUser.__typename === "Error") {
        console.log(response.createUser.errorMessage);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
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

  if (loading || LoginLoading) return <div>Loading...</div>;

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

      <button type="submit">Register</button>
    </form>
  );
}

export default Login;
