import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { useAppDispatch } from "@libs/Redux/hook";
import { login } from "@libs/Redux/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LOGIN } from "@services";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const loginSchema = z.object({
  name: z
    .string()
    .min(3, "name must contain at least 3 character")
    .max(12, "name must contain at most 12 character"),
  password: z
    .string()
    .min(3, "password must contain at least 3 character")
    .max(12, "password must contain at most 12 character"),
});

// extracting the type
type UserInput = z.infer<typeof loginSchema>;

function Login() {
  const [Login, { loading }] = useMutation(LOGIN, {
    onCompleted: (response) => {
      const { login: loginServer } = response;
      if (loginServer?.__typename === "Error") {
        toast.error(loginServer?.errorMessage);
      } else {
        toast.success("Başarıyla giriş yapılıdı..");
        dispatch(
          login({
            isAuth: true,
            ...loginServer,
          })
        );
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInput>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<UserInput> = (userData) => {
    Login({
      variables: {
        input: {
          name: userData.name,
          password: userData.password,
        },
      },
    });
  };

  return (
    <div className="w-[70%] text-center lg:w-1/3 ">
      <h1 className="text-2xl">Login</h1>
      <form
        className="flex flex-col gap-4 text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="name"
          errorMessage={errors.name?.message}
          isError={!!errors.name}
          type="text"
          {...register("name")}
        />
        <Input
          id="password"
          errorMessage={errors.password?.message}
          isError={!!errors.password}
          type="password"
          {...register("password")}
        />
        <Button isLoading={loading} disabled={!isValid} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
