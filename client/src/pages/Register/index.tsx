import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CREATE_USER } from "@services";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
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
type UserInput = z.infer<typeof registerSchema>;

function Register() {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<UserInput>({
    resolver: zodResolver(registerSchema),
  });

  const [Login, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (response) => {
      const {
        createUser: { __typename },
      } = response;
      if (__typename === "Error") {
        toast.error(`kullanıcı oluşturulamadı..`);
      } else toast.success("kullanıcı olusturuldu lütfen giriş yapınız..");
    },
    onError: (error) => {
      toast.error(`kullanıcı oluşturulamadı..:${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<UserInput> = async (userData) => {
    const { data } = await Login({
      variables: {
        input: userData,
      },
    });

    if (data.createUser.__typename === "Error") {
      const {
        createUser: { errorMessage },
      } = data;
      if (errorMessage.includes("Name")) {
        setError("name", {
          message: errorMessage,
        });
      } else {
        setError("password", {
          message: errorMessage,
        });
      }
    } else {
      navigator("/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="w-1/3 text-center">
      <h1 className="text-2xl">Register</h1>
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
          Register
        </Button>
      </form>
      <h4>
        Already have an accout?{" "}
        <Link className="text-primary" to="/login">
          Login
        </Link>{" "}
      </h4>
    </div>
  );
}

export default Register;
