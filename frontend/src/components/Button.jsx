import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-full h-10 flex items-center justify-center text-xl bg-black text-white rounded-md mt-5 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
