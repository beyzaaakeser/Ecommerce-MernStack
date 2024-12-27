import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [preview, setPreview] = useState('../../public/user-profile.png');
  const regiterFunc = () => {};
  const loginFunc = () => {};
  const handleChange = () => {};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-sm:w-full max-sm:m-4 sm:w-1/3 sm:mx-auto -mt-20 p-4 border shadow rounded-md">
        <div className="text-3xl font-semibold">
          {signUp ? 'Register' : 'Login'}
        </div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type={'text'}
            name={'name'}
            id={''}
            placeholder={'Name'}
          />
        )}
        <Input
        onChange={handleChange}
          value={data.email}
          type={'text'}
          name={'email'}
          id={''}
          placeholder={'Email'}
        />
        <Input
        onChange={handleChange}
          value={data.password}
          type={'password'}
          name={'password'}
          id={''}
          placeholder={'Password'}
        />
        {signUp && (
          <div className="flex items-center gap-2 ">
            <img src={preview} className="size-10 rounded-full" />
            <Input
            onChange={handleChange}
              type={'file'}
              name={'avatar'}
              id={''}
              placeholder={'Profile Picture'}
            />
          </div>
        )}
        <div
          className="text-blue-600 text-md cursor-pointer text-end"
          onClick={() => setSignUp(!signUp)}
        >
          {signUp
            ? 'If you have an account please log in'
            : "If you don't have an account please sign up."}
        </div>

        <div className="flex justify-center">
          <Button
            text={signUp ? 'Register' : 'Login'}
            onClick={signUp ? regiterFunc : loginFunc}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
