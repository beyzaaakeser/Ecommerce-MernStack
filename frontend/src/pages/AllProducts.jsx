import React, { useEffect } from 'react';
import Filter from '../layout/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slice/productSlice';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter />
        <div>
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
      </div>
      <div>pagination</div>
    </div>
  );
};

export default AllProducts;
