import React, { useState } from 'react';
import { SlBasket } from 'react-icons/sl';
import { IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKeyword } from '../redux/slice/generalSlice';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { user, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: 'Profile',
      url: '/profile',
    },
    {
      name: 'Admin',
      url: '/admin',
    },
    {
      name: 'Log out',
      url: '/logout',
    },
  ];

  const keywordFunc = () => {
    dispatch(getKeyword(keyword));
    setKeyword('');
    navigate('/products');
  };


  return (
    <div className="bg-gray-100 h-16 px-5 flex items-center justify-between">
      <Link to="/" className="text-4xl ">
        E.com
      </Link>
      <div className="flex items-center gap-5 ">
        <div className="flex items-center ">
          <input
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="p-2 outline-none"
            type="text"
            placeholder="Search here..."
          />
          <div className="ml-1 cursor-pointer bg-white" onClick={keywordFunc}>
            <IoMdSearch className="text-2xl m-2 " />
          </div>
        </div>
        <div className="relative">
          <img
            onClick={() => setOpenMenu(!openMenu)}
            src={
              user?.user
                ? user?.user?.avatar?.url
                : '../../public/user-profile.png'
            }
            alt=""
            className="size-8 rounded-full cursor-pointer"
          />
          {openMenu && (
            <div className="absolute right-0 mt-4 w-[200px] bg-gray-100 shadow-lg shadow-amber-500/80">
              {menuItems.map((item, index) => (
                <div
                  onClick={() => (window.location = item.url)}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  key={index}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <SlBasket size={30} />
          <div className="absolute -top-2 -right-2 size-5 bg-amber-500 rounded-full flex items-center justify-center ">
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
