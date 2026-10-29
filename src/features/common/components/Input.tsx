import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          error
            ? 'border-red-500 bg-red-50/40 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-verdolaga-principal focus:ring-verdolaga-principal/30'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} role="alert" className="text-xs font-medium text-red-600 mt-0.5">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-xs text-gray-500 mt-0.5">{helperText}</span>
      )}
    </div>
  );
};
