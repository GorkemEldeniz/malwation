import { ButtonHTMLAttributes } from "react";

import { Icon } from "@icon";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/index";

const button = cva("rounded-md relative", {
  variants: {
    variant: {
      default: "bg-white text-text shadow-button border border-gray-400",
      primary: "bg-primary text-white",
      destructive: "bg-destructive text-white",
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
    disabled: {
      true: "opacity-70",
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

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {
  loading?: boolean;
  label: string;
}

function Button({
  variant,
  modifier,
  size,
  fullWidth,
  disabled,
  label,
  loading = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={!!disabled}
      className={cn(
        button({ variant, modifier, size, fullWidth, disabled }),
        className
      )}
    >
      <span className={cn("leading-[1.25rem]", loading && "text-transparent")}>
        {label}
      </span>
      {loading && (
        <span className="absolute left-1/2 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2">
          <Icon
            width="20"
            height="20"
            className="animate-spin"
            fill="currentColor"
            icon="spinner"
          />
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  );
}

export default Button;
