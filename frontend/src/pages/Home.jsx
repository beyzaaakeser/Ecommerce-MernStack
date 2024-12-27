import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slice/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='min-h-screen'>
      <div className='bg-[#111111]'>
        <img
          src="../../public/banner1.jpg"
          className="w-full h-[500px] object-contain
        "
        />
      </div>

      {loading ? (
        'Loading...'
      ) : (
        <div>
          {products?.products && (
            <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
              {products?.products?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
