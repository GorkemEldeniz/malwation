import { Icon } from "@icon";
import type { IconTypes } from "@icon";

import { InputHTMLAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/index";

import type { UseFormRegister } from "react-hook-form";

const input = cva("rounded-md relative border w-full", {
  variants: {
    variant: {
      default: "bg-white text-text shadow-button border border-gray-400",
      primary: "border-primary text-text",
      destructive: "border-destructive text-text",
      monochrome: "bg-white text-text border border-gray-400",
    },
    modifier: {
      outline:
        "bg-transparent border border-current shadow-[0_0_0_1px_currentColor]",
      plain: "shadow-none bg-transparent border-none px-2 py-1 text-sm",
    },
    size: {
      slim: "text-sm",
      medium: "text-sm",
      large: "text-base",
    },
    fullWidth: {
      true: "w-full",
    },
    error: {
      true: "border-destructive text-text outline-destructive",
    },
    disabled: {
      true: "bg-surfaceDisabled text-textDisabled",
    },
  },
  compoundVariants: [
    {
      modifier: "outline",
      variant: "destructive",
      className: "text-destructive",
    },
    {
      modifier: "outline",
      variant: "primary",
      className: "text-primary",
    },
    {
      modifier: "plain",
      variant: "destructive",
      className: "text-destructive",
    },
    {
      modifier: "plain",
      variant: "primary",
      className: "text-primary",
    },
    {
      modifier: undefined,
      size: "slim",
      className: "px-3 py-[3px]",
    },
    {
      modifier: "outline",
      size: "slim",
      className: "px-3 py-[3px]",
    },
    {
      modifier: undefined,
      size: "medium",
      className: "px-4 py-2",
    },
    {
      modifier: "outline",
      size: "medium",
      className: "px-4 py-2",
    },
    {
      modifier: undefined,
      size: "large",
      className: "px-6 py-3",
    },
    {
      modifier: "outline",
      size: "large",
      className: "px-6 py-3",
    },
    {
      disabled: true,
      variant: "default",
      className: "border-borderDisabled",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "size">,
    VariantProps<typeof input> {
  loading?: boolean;
  register: UseFormRegister<any>;
  leftIcon?: IconTypes;
  rigthIcon?: IconTypes;
}
function Input({
  register,
  name,
  variant,
  modifier,
  size,
  fullWidth,
  disabled,
  error,
  leftIcon,
  rigthIcon,
  loading = false,
  className,
  maxLength,
  ...rest
}: InputProps) {
  return (
    <div
      className={cn("relative", {
        "text-destructive": error,
      })}
    >
      {leftIcon && (
        <Icon
          width="20"
          height="20"
          className="absolute left-2 top-[50%] z-10 translate-y-[-50%]"
          icon={leftIcon}
        />
      )}
      {rigthIcon && (
        <Icon
          width="20"
          height="20"
          className="absolute right-2 top-[50%] z-10 translate-y-[-50%]"
          icon={rigthIcon}
        />
      )}
      <input
        {...rest}
        maxLength={maxLength || 20}
        disabled={!!disabled}
        {...register(name as string)}
        className={cn(
          input({ variant, modifier, size, fullWidth, disabled, error }),
          className
        )}
      />
    </div>
  );
}

export default Input;
