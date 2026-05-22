import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-300 select-none"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-4 py-3 rounded-lg border-2 border-navy-700 bg-navy-900 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:border-glow-500 focus:ring-1 focus:ring-glow-500 disabled:opacity-50 disabled:bg-navy-950 disabled:cursor-not-allowed text-base ${
            error ? "border-protest-red focus:border-protest-red focus:ring-protest-red" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm font-medium text-protest-red">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
