import React, { InputHTMLAttributes } from "react";
import { cn } from "@utils/index";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon, IconTypes } from "@icon";

const inputClass = cva(
  "relative flex w-full items-center justify-center flex-grow gap-3 rounded-lg border text-neutral-700 border-gray-300 bg-gray-50 text-sm",
  {
    variants: {
      color: {
        primary: "focus-within:border-primary ",
        secondary: "focus-within:border-secondary ",
        tertiary: "focus-within:border-tertiary ",
      },
      size: {
        large: "h-12 p-4 text-base",
        medium: "h-10 p-3 text-base",
        small: "h-8 p-2 text-sm",
      },
      isError: {
        true: "border-warning text-warning focus-within:border-warning",
      },
      isSuccess: {
        true: "border-success focus-within:border-success",
      },
      disabled: {
        true: "cursor-not-allowed border-gray-200 bg-gray-200 text-gray-300 ",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    VariantProps<typeof inputClass> {
  disabled?: boolean;
  errorMessage?: string;
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  rightIconOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      color,
      size,
      disabled,
      leftIcon,
      rightIcon,
      errorMessage,
      isError,
      isSuccess,
      rightIconOnClick,
      ...rest
    },
    ref
  ) => {
    const inputIconClass = cn(
      size === "large" && "h-4 w-4",
      size === "medium" && "h-4 w-4",
      size === "small" && "h-3 w-3"
    );
    const inputErrorMessageClass = cn(
      "text-warning",
      size === "large" && "text-sm",
      size === "medium" && "text-xs",
      size === "small" && "text-xs"
    );

    const icon = cn({
      cancel: !!errorMessage && !isSuccess,
      [rightIcon as IconTypes]: rightIcon && !errorMessage && !isSuccess,
      check: !errorMessage && isSuccess,
    }) as IconTypes;

    if (rest.type === "checkbox")
      return (
        <label className="flex w-fit items-center gap-2">
          {id}
          <input {...rest} className="peer absolute appearance-none" id={id} />
          <label
            className={cn(
              "peer-checked:bg-image relative flex h-[20px] w-[20px] items-center justify-center rounded-md border-2 bg-no-repeat  p-4  peer-checked:border-primary"
            )}
            htmlFor={id}
          ></label>
        </label>
      );

    return (
      <label htmlFor={id}>
        <p>{id}</p>
        <div
          className={cn(
            inputClass({
              color,
              size,
              isError: !!errorMessage,
              isSuccess,
              disabled,
            })
          )}
        >
          {leftIcon && (
            <Icon className={inputIconClass} key={leftIcon} icon={leftIcon} />
          )}
          <input
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
            className={`${
              disabled && "cursor-not-allowed"
            } w-full flex-1 bg-transparent outline-none`}
          />
        </div>
        {errorMessage && !disabled && (
          <p className={cn(inputErrorMessageClass)}>{errorMessage}</p>
        )}
      </label>
    );
  }
);

export default Input;
