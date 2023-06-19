import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'filled' | 'outlined' | 'anchor' | 'inactive';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ buttonType = 'filled', className, ...props }) => {
  return (
    <button
      className={`
        px-4 py-2 text-base line-height[20px] rounded
        ${!props.disabled && buttonType === 'filled' ? ' bg-blue-600 text-white' : ''}
        ${!props.disabled && buttonType === 'outlined' ? ' border border-blue-500 text-blue-500' : ''}
        ${!props.disabled && buttonType === 'anchor' ? ' text-blue-500 underline' : ''}
        ${!props.disabled && buttonType === 'inactive' ? ' border border-neutral-400 text-neutral-400' : ''}
        ${props.disabled ? ' bg-neutral-600 text-neutral-800' : ''}
        ${className ? ` ${className}` : ''}
      `}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
