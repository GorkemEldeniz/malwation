import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@utils/index";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
  name: string;
}

function ToggleButton({ register, name, id, className, ...rest }: InputProps) {
  return (
    <label
      htmlFor={id}
      className="flex w-fit cursor-pointer items-center gap-2"
    >
      <div className="ml-3 font-medium text-gray-700">Active</div>
      <div className="relative">
        <input
          className={cn(className, "peer sr-only")}
          id={id}
          {...rest}
          {...register(name)}
          type="checkbox"
        />

        <div className="h-4 w-10 rounded-full bg-gray-400 shadow-inner"></div>

        <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-borderDisabled shadow transition peer-checked:translate-x-[100%] peer-checked:bg-primary"></div>
      </div>
    </label>
  );
}

export default ToggleButton;
