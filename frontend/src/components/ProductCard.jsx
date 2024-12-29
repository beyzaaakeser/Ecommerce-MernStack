import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaEdit,FaTrashAlt } from 'react-icons/fa';

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-[300px] bg-gray-100 relative"
    >
      <Slider {...settings}>
        {product.images?.map((image, index) => (
          <img src={image.url} key={index} />
        ))}
      </Slider>
      <div className="text-xl px-3">{product?.name}</div>
      <div className="text-2xl px-3">{product?.price}₺</div>
      {edit && (
        <div className='absolute top-1 right-1 flex items-center gap-2 bg-white px-2 py-1 rounded-md'>
          <FaEdit className=' size-6 cursor-pointer'  />
          <FaTrashAlt className='size-6 cursor-pointer' />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
