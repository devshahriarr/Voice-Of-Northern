import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    // Base interactive styles
    const baseStyle =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 focus-visible:ring-glow-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    // Curated color themes from tailwind.config.js
    const variants = {
      primary: "bg-glow-500 hover:bg-glow-600 text-navy-950 shadow-md shadow-glow-500/10 font-semibold",
      secondary: "border-2 border-navy-700 bg-navy-900/50 hover:bg-navy-800 text-slate-100 hover:border-navy-600",
      danger: "bg-protest-red hover:bg-red-600 text-white shadow-md shadow-red-500/10 font-semibold",
      ghost: "hover:bg-navy-800/60 text-slate-300 hover:text-slate-100",
    };

    // Responsive dimensions
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
      lg: "h-13 px-7 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
