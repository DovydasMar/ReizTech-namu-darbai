import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className='bg-green-300 rounded-lg px-4 py-2'>
      {children}
    </button>
  );
}
