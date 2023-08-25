import { Icon, IconTypes } from "@icon";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/index";
import React from "react";

const selectBoxClass = cva(
  "relative h-10  overflow-hidden rounded-md  border-2",
  {
    variants: {
      color: {
        primary: "border-primary  text-gray-600 outline-primaryActive",
        secondary: "border-secondary  text-gray-600 outline-secondaryActive",
        tertiary: "border-tertiary  text-gray-600 outline-tertiaryActive ",
      },
      size: {
        large: "h-12 text-base",
        medium: "h-10 text-base",
        small: "h-8  text-sm",
      },
      isError: {
        true: " border-warning text-warning outline-warning",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

export interface ISelectProps
  extends Omit<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      "error" | "color" | "size"
    >,
    VariantProps<typeof selectBoxClass> {
  data: string[];
  disabled?: boolean;
  errorMessage?: string;
  isError?: boolean;
  leftIcon?: IconTypes;
}

const Select = ({
  errorMessage,
  disabled,
  data,
  size,
  color,
  leftIcon,
  ...rest
}: ISelectProps) => {
  const selectIcon = cn(
    "pointer-events-none absolute",
    size === "large" && "h-5 w-5 top-3 mx-2",
    size === "medium" && "h-4 w-4 top-2.5 mx-1.5",
    size === "small" && "h-3 w-3 top-2 mx-1"
  );

  const selectSize = cn(
    "h-full w-full appearance-none outline-none",
    size === "large" && leftIcon && "!px-9",
    size === "large" && !leftIcon && "!pl-2 !pr-9",

    size === "medium" && leftIcon && "!px-7",
    size === "medium" && !leftIcon && "!pl-1.5 !pr-7",

    size === "small" && leftIcon && "!px-5",
    size === "small" && !leftIcon && "!pl-1 !pr-5"
  );

  const SelectErrorMessageClass = cn(
    "text-warning",
    size === "large" && "text-sm",
    size === "medium" && "text-xs",
    size === "small" && "text-xs"
  );

  return (
    <div>
      <div
        className={cn(selectBoxClass({ color, size, isError: !!errorMessage }))}
      >
        {leftIcon && (
          <Icon className={`${selectIcon}  left-0 `} icon={leftIcon} />
        )}
        <Icon icon="attach" className={`${selectIcon} right-0 fill-current`} />

        <select {...rest} className={selectSize} disabled={disabled}>
          {data?.map((item: string, id: number) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && (
        <span className={SelectErrorMessageClass}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
