import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-[200px] h-10 flex items-center justify-center text-xl bg-black text-white rounded-md mt-5 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;