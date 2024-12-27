import React from 'react';

const Filter = () => {
  const categoryList = [
    'Bags',
    'Shoes',
    'Health & Beauty',
    'Clothes',
    'Toys',
    'Children',
    'Food',
    'Books',
    'Pets',
    'Home',
    'Garden',
    'Games',
    'Music',
    'Electronics',
  ];

  const ratingList = [1, 2, 3, 4, 5];
  return (
    <div className="max-sm:w-2/5 sm:w-1/5 mt-3 py-1 px-4 min-h-screen">
      <div className="text-xl font-[400] mb-2">Filter by Price</div>
      <div className="flex items-center max-sm:gap-2 sm:gap-4 my-4">
        <input
          className="border w-16 outline-none p-1 text-center rounded-sm"
          type="number"
          placeholder="Min"
        />
        <input
          className="border w-16 outline-none p-1 text-center rounded-sm"
          type="number"
          placeholder="Max"
        />
      </div>
      <div className="text-xl font-[400] mb-2">Filter by Category</div>
      {categoryList.map((category, index) => (
        <div className="text-md cursor-pointer" key={index}>
          {category}
        </div>
      ))}
      <hr className='my-3 w-[200px]'/>
      <div className="text-xl font-[400] mb-2 ">Filter by Rating Score</div>
      {ratingList.map((rating, index) => (
        <div className="text-md cursor-pointer" key={index}>
          {rating}
        </div>
      ))}
    </div>
  );
};

export default Filter;
