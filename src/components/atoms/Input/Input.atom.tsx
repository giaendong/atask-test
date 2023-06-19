import React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({className, ...props}) => {
  return (
    <input
      type={props.type || 'text'}
      className={`
        px-[15px] py-2 text-base line-height[20px] rounded text-neutral-700 focus:outline-blue-500
        ${props.disabled ? ' bg-neutral-400 placeholder:text-neutral-700' : ' bg-neutral-100 placeholder:text-neutral-400'}
        ${className ? ` ${className}` : ''}
      `}
      {...props}
    />
  );
};

export default Input;
