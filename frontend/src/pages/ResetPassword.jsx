import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { resetPassword } from '../redux/slice/userSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { token } = useParams();
  const forgotFunc = () => {
    let res = dispatch(resetPassword({ token, password }));
    console.log(res, 'ress');
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-5">
        <h1 className="text-3xl">Create New Password</h1>
        <Input
          placeholder={'Enter your new password'}
          onChange={(e) => setPassword(e.target.value)}
          name={'password'}
          id={'45'}
          type={'password'}
        />
        <Button text={'Confirm'} onClick={forgotFunc} />
      </div>
    </div>
  );
};

export default ResetPassword;
