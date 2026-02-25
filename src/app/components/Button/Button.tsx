import type { ButtonProps } from "./Button.type";

import { motion } from "motion/react";

const variantStyles = {
  primary: "bg-primary text-white shadow-[1px_1px_4px_rgba(0,0,0,0.25)]",
  secondary: "border border-primary text-primary",
  tertiary: "bg-gray-bg text-text-primary",
  text: "text-text-secondary",
} as const;

const disabledVariantStyles = {
  primary: "bg-disabled text-text-disabled shadow-none",
  secondary: "border-disabled text-text-disabled",
  tertiary: "bg-disabled text-text-disabled",
  text: "text-text-disabled",
} as const;

const sizeStyles = {
  s: "h-[2.4rem] py-[0.4rem] px-[0.8rem] text-[1.2rem] leading-[1.4rem]",
  m: "h-[3.2rem] py-[0.4rem] px-[1.6rem] text-[1.4rem] leading-[1.7rem]",
  l: "h-[4rem] py-[0.4rem] px-[1.6rem] text-[1.5rem] leading-[1.8rem]",
} as const;

const tapStyles = {
  primary: { backgroundColor: "var(--color-primary-dark)" },
  secondary: { backgroundColor: "var(--color-primary-light)" },
  tertiary: { backgroundColor: "var(--color-disabled)" },
  text: { color: "var(--color-text-primary)" },
} as const;

const Button = ({
  variant = "primary",
  size = "m",
  icon,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) => {
  const showIcon = icon && size !== "s";

  return (
    <motion.button
      disabled={disabled}
      whileTap={disabled ? undefined : tapStyles[variant]}
      transition={{ duration: 0.15 }}
      className={`rounded-[0.6rem] font-semibold gap-[0.8rem] inline-flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${sizeStyles[size]} ${disabled ? disabledVariantStyles[variant] : variantStyles[variant]} ${className}`}
      {...rest}>
      {showIcon && (
        <span className="w-[2rem] h-[2rem] inline-flex items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
