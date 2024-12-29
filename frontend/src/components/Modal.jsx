import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { openModalFunc } from '../redux/slice/generalSlice';
import Button from './Button';

const Modal = ({ title, content, onClick, btnText }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full">
      <div className="w-[500px] bg-white border- p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div className='text-2xl'>{title}</div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(openModalFunc())}
          >
            <IoMdClose className="text-2xl" />
          </div>
        </div>
        {content}
        <Button text={btnText} onClick={onClick} />
      </div>
    </div>
  );
};

export default Modal;
