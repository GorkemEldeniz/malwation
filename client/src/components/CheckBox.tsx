import { Icon } from "@icon";

import { InputHTMLAttributes } from "react";

import { UseFormRegister } from "react-hook-form";

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<any>;
}

function CheckBox({ id, name, register, ...rest }: ICheckbox) {
  return (
    <label
      className="flex h-6 w-6 cursor-pointer items-center justify-center border bg-white p-1"
      htmlFor={id}
    >
      <input
        type="checkbox"
        className="peer hidden"
        id={id}
        {...rest}
        {...register(name as string)}
      />
      <Icon
        className="text-purple pointer-events-none opacity-0 peer-checked:opacity-100"
        icon="check"
      />
    </label>
  );
}

export default CheckBox;
