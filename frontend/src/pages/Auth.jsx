import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.user);

  const [preview, setPreview] = useState('../../public/user-profile.png');
  const registerFunc = () => {
    dispatch(register(data));
  };
  const loginFunc = () => {
    dispatch(login(data));
  };

  const handleChange = (e) => {
    if (e.target.name == 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log(data);
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  console.log('user', user);
  console.log('isAuth', isAuth);

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
            name="name"
            id={'1'}
            placeholder="Name"
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          type={'text'}
          name={'email'}
          id={'2'}
          placeholder={'Email'}
        />
        <Input
          onChange={handleChange}
          value={data.password}
          type={'password'}
          name={'password'}
          id={'3'}
          placeholder={'Password'}
        />
        {signUp && (
          <div className="flex items-center gap-2 ">
            <img src={preview} className="size-10 rounded-full" />
            <Input
              onChange={handleChange}
              type={'file'}
              name={'avatar'}
              id={'4'}
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
        {!signUp && (
          <div
            className="text-red-600 text-md cursor-pointer text-end"
            onClick={() => navigate('/forgotPassword')}
          >
            Forgot Password?
          </div>
        )}

        <div className="flex justify-center">
          <Button
            text={signUp ? 'Register' : 'Login'}
            onClick={signUp ? registerFunc : loginFunc}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
