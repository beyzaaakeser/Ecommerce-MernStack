import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminProducts, getAdminProducts } from '../redux/slice/productSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { openModalFunc } from '../redux/slice/generalSlice';
import Modal from '../components/Modal';
import Input from '../components/Input';

const Admin = () => {
  const dispatch = useDispatch();
  const { adminProducts } = useSelector((state) => state.products);
  const { openModal } = useSelector((state) => state.general);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: null,
    rating: null,
    stock: null,
    category: '',
    images: [],
  });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const addProduct = () => {
    dispatch(openModalFunc());
  };

  const productHandle = (e) => {
    if (e.target.value == 'avatar') {
      const files = Array.from(e.target.value);
      const imagesArray = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imagesArray.push(reader.result);
            setData((prev) => ({ ...prev, images: imagesArray }));
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const modalFunc = () => {
    dispatch(addAdminProducts(data));
    dispatch(openModalFunc());
  };

  const content = (
    <div className="my-3">
      <Input
        onChange={productHandle}
        name={'name'}
        id={'5555'}
        placeholder={'Product Name'}
        type={'text'}
      />
      <Input
        onChange={productHandle}
        name={'description'}
        id={'5556'}
        placeholder={'Product Description'}
        type={'text'}
      />
      <Input
        onChange={productHandle}
        name={'price'}
        id={'5557'}
        placeholder={'Product Price'}
        type={'number'}
      />
      <Input
        onChange={productHandle}
        name={'category'}
        id={'5559'}
        placeholder={'Product Category'}
        type={'text'}
      />
      <Input
        onChange={productHandle}
        name={'stock'}
        id={'5558'}
        placeholder={'Product Stock Amount'}
        type={'number'}
      />
      <Input
        onChange={productHandle}
        name={'rating'}
        id={'5550'}
        placeholder={'Product Rating'}
        type={'number'}
      />
      <Input
        onChange={productHandle}
        name={'images'}
        id={'5551'}
        type={'file'}
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Button text={'Add Product'} onClick={addProduct} />
      {adminProducts?.products && (
        <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
          {adminProducts?.products?.map((product, index) => (
            <ProductCard product={product} key={index} edit={true} />
          ))}
        </div>
      )}
      {openModal && (
        <Modal
          title={'Add Product'}
          content={content}
          btnText={'Add Product'}
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default Admin;
