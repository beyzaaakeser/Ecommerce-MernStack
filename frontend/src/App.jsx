import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './layout/Header';
import Footer from './layout/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Detail from './pages/Detail';
import AllProducts from './pages/AllProducts';
import Auth from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from './redux/slice/userSlice';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
