import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const Button: React.FC<Props> = ({
  variant = "primary",
  className = "",
  children,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md px-4 py-2 focus:outline-none";
  const variants: Record<string, string> = {
    primary: "text-white",
    secondary: "bg-white border text-gray-800",
    ghost: "bg-transparent text-gray-800",
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          background:
            "linear-gradient(90deg,var(--color-primary), var(--color-primary-600))",
          boxShadow: "0 6px 18px rgba(15,118,110,0.12)",
        }
      : {};

  return (
    <button
      {...rest}
      className={`${base} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
