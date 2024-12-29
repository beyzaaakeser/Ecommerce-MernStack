import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { profile } from '../redux/slice/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth, loading } = useSelector((state) => state.user);

   useEffect(() => {
    if (!isAuth) {
      dispatch(profile());
    }
  }, [dispatch, isAuth]);

  if (loading) {
    return <div>Loading...</div>;
  } 

  return (
    <div className="min-h-screen">
      <div className="flex justify-center gap-5 my-20">
        <div>
          <img
            src={user?.user?.avatar?.url || '../../public/user-profile.png'}
            className="size-[300px] rounded-full"
          />
        </div>
        <div className="space-y-3">
          <div className="text-4xl font-bold">
            {user?.user?.name || 'Name not available'}
          </div>
          <div className="text-3xl">
            {user?.user?.email || 'Email not available'}
          </div>

          <Button
            text="Back to Home Page"
            onClick={() => (window.location = '/')}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
