import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ButtonProps {
  color?: 'blue' | 'white';
  className?: string;
  href?: string;
  children: React.ReactNode;
}

export function Button({ color = 'blue', className = '', href, children }: ButtonProps) {
  const baseStyles = clsx(
    'inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
    {
      'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-blue-600':
        color === 'blue',
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 focus-visible:outline-white':
        color === 'white',
    },
    className
  );

  return href ? (
    <Link to={href} className={baseStyles}>
      {children}
    </Link>
  ) : (
    <button className={baseStyles}>{children}</button>
  );
} 