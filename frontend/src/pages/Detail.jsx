import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../redux/slice/productSlice';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import Button from '../components/Button';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const addBasket = () => {};
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <div className="min-h-screen">
          <div className="flex mt-4 justify-center gap-5">
            {product?.product && (
              <div className="w-[400px] ">
                <Slider {...settings}>
                  {product?.product.images?.map((image, index) => (
                    <img src={image.url} key={index} />
                  ))}
                </Slider>
              </div>
            )}
            <div className='space-y-3'>
              <div className="text-3xl ">{product?.product?.name}</div>
              <div className="text-xl">
                Category: {product?.product?.category}
              </div>
              <div className="text-lg ">{product?.product?.description}</div>
              {product?.product?.stock > 0 ? (
                <div className="text-lg">
                  Stock Amount:{' '}
                  <span className="bg-green-300 rounded-md px-3 ">
                    {product?.product.stock}
                  </span>
                </div>
              ) : (
                <div className="bg-red-500 text-center text-lg">
                  The product is out of stock
                </div>
              )}
              <div className="flex gap-5">
                <div className="text-xl">{product?.product?.price}₺</div>
                <div className="text-lg flex gap-1 items-center">
                  {product?.product?.rating}{' '}
                  <FaStar className="text-amber-500" />
                </div>
              </div>

              <div className="flex items-center gap-4 text-3xl font-semibold cursor-pointer">
                <div onClick={decrement}>-</div>
                <div>{quantity}</div>
                <div onClick={increment}>+</div>
              </div>
              <Button text={'Add to Cart'} onClick={addBasket} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
