import { useSearchParams } from "react-router-dom";

import Button from "./ui/button";
import Input from "./ui/Input";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const SearchForm = z.object({
  name: z
    .string()
    .max(20)
    .regex(new RegExp("^[a-z0-9]*$", "gi"), "Invalid Character"),
});

export type ISearchInput = z.infer<typeof SearchForm>;

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchInput>({
    resolver: zodResolver(SearchForm),
  });
  const onSubmit: SubmitHandler<ISearchInput> = (data) => {
    setSearchParams({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-5/12 max-w-[500px]">
      <div className="flex w-full flex-wrap gap-2">
        <Input
          className="min-w-[25ch]"
          placeholder="search"
          size="large"
          name="name"
          maxLength={18}
          register={register}
          error={!!errors.name}
          rigthIcon="search"
        />
        <Button size="large" variant="primary" type="submit" label="Search" />
      </div>
      {errors.name && (
        <span className="text-destructive">{errors.name.message}</span>
      )}
    </form>
  );
}

export default SearchBar;
