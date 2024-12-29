import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/slice/userSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const forgotFunc = () => {
    let res = dispatch(forgotPassword(email));
    console.log(res, 'ress');
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-5">
        <h1 className="text-3xl">Forgot Password</h1>
        <Input
          placeholder={'Enter your email address'}
          onChange={(e) => setEmail(e.target.value)}
          name={'email'}
          id={'55'}
          type={'text'}
        />
        <Button text={'Confirm'} onClick={forgotFunc} />
      </div>
    </div>
  );
};

export default ForgotPassword;
