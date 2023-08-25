import { Icon, IconTypes } from "@icon";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/index";
import React from "react";
import Spinner from "./Spinner";

const buttonClass = cva(
  "flex items-center justify-center h-20 gap-3 cursor-pointer rounded-md fill-white text-white relative",
  {
    variants: {
      variant: {
        primary: "text-white",
        secondary: "bg-transparent border ",
        textOnly: "bg-transparent",
      },
      size: {
        small: "h-8 w-max px-2 py-1 text-xs",
        medium: "h-10 w-max px-4 py-2 text-sm",
        large: "h-12 w-max px-6 py-3 text-sm",
      },
      color: {
        primary: "bg-primary hover:bg-primaryHover active:bg-primaryActive",
        secondary:
          "bg-secondary hover:bg-secondaryHover active:bg-secondaryActive",
        tertiary: "bg-tertiary hover:bg-tertiaryHover active:bg-tertiaryActive",
        success: "bg-success hover:bg-successHover active:bg-successActive",
        warning: "bg-warning  hover:bg-warningHover active:bg-warningActive",
      },
      disabled: {
        true: "cursor-not-allowed border-gray-300 bg-gray-300 text-gray-400 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-400 active:bg-gray-300",
      },
      onlyIcon: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      color: "primary",
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "secondary",
        className:
          "bg-transparent fill-primary text-primary border-primary hover:bg-primary/10 active:bg-primary/20",
      },
      {
        color: "secondary",
        variant: "secondary",
        className:
          "bg-transparent fill-secondary text-secondary border-secondary hover:bg-secondary/10 active:bg-secondary/20",
      },
      {
        variant: "secondary",
        color: "tertiary",
        className:
          "bg-transparent fill-tertiary text-tertiary border-tertiary hover:bg-tertiary/10 active:bg-tertiary/20",
      },
      {
        variant: "secondary",
        color: "success",
        className:
          "bg-transparent text-success border-success hover:bg-success/10 active:bg-success/20",
      },
      {
        variant: "secondary",
        color: "warning",
        className:
          "bg-transparent text-warning border-warning hover:bg-warning/10 active:bg-warning/20",
      },
      {
        variant: "textOnly",
        color: "primary",
        className:
          "bg-transparent fill-primary text-primary hover:bg-primary/10 active:bg-primary/20",
      },
      {
        variant: "textOnly",
        color: "secondary",
        className:
          "bg-transparent fill-secondary text-secondary hover:bg-secondary/10 active:bg-secondary/20",
      },
      {
        variant: "textOnly",
        color: "tertiary",
        className:
          "bg-transparent fill-tertiary text-tertiary hover:bg-tertiary/10 active:bg-tertiary/20",
      },
      {
        variant: "textOnly",
        color: "success",
        className:
          "bg-transparent text-success hover:bg-success/10 active:bg-success/20",
      },
      {
        variant: "textOnly",
        color: "warning",
        className:
          "bg-transparent text-warning hover:bg-warning/10 active:bg-warning/20",
      },
      {
        variant: "secondary",
        disabled: true,
        className:
          "cursor-not-allowed border-gray-300 text-gray-300 hover:border-gray-300 hover:bg-transparent hover:text-gray-300 active:bg-transparent",
      },
      {
        variant: "textOnly",
        disabled: true,
        className:
          "cursor-not-allowed  bg-gray-50  text-gray-300  hover:bg-gray-50 hover:text-gray-300 active:bg-gray-50",
      },
      {
        size: "large",
        onlyIcon: true,
        className: "p-0 w-12",
      },
      {
        size: "medium",
        onlyIcon: true,
        className: "p-0 w-10",
      },
      {
        size: "small",
        onlyIcon: true,
        className: "p-0 w-8",
      },
    ],
  }
);

export interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonClass> {
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: IconTypes;
}
const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<IButtonProps, "onlyIcon">
>(
  (
    {
      variant,
      size,
      color,
      disabled,
      icon,
      leftIcon,
      onClick,
      children,
      rightIcon,
      isLoading,
      className,
    },
    ref
  ) => {
    const btnIconClass = cn(
      size === "large" && "h-5 w-5",
      size === "medium" && "h-4 w-4",
      size === "small" && "h-3 w-3"
    );

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        onClick={onClick}
        className={cn(
          buttonClass({
            variant,
            size,
            color,
            disabled,
            onlyIcon: !!icon,
            className,
          })
        )}
      >
        {leftIcon && !isLoading ? (
          <>
            {!disabled ? (
              <Icon
                height="20"
                width="20"
                className={btnIconClass}
                key={leftIcon}
                icon={leftIcon}
              />
            ) : (
              <Spinner className={cn(btnIconClass)} />
            )}
          </>
        ) : (
          <>
            {isLoading && !icon && !disabled ? (
              <Spinner
                height="20"
                width="20"
                className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
              />
            ) : null}
          </>
        )}

        {icon ? (
          <>
            {isLoading && !disabled ? (
              <Spinner className={cn(btnIconClass)} />
            ) : (
              <Icon
                height="20"
                width="20"
                className={btnIconClass}
                key={icon}
                icon={icon}
              />
            )}
          </>
        ) : (
          <p
            className={cn("grow p-4", {
              "text-transparent": isLoading,
            })}
          >
            {children}
          </p>
        )}

        {rightIcon && !icon && (
          <Icon
            height="20"
            width="20"
            className={btnIconClass}
            key={rightIcon}
            icon={rightIcon}
          />
        )}
      </button>
    );
  }
);

export default Button;
