import React, { useEffect, useState } from 'react';
import Filter from '../layout/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchProducts } from '../redux/slice/productSlice';
import ProductCard from '../components/ProductCard';
import ReactPaginate from 'react-paginate';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 3;
  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 3);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % products?.products?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getSearchProducts({ keyword, price, rating, category }));
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            'Loading...'
          ) : (
            <div>
              {products?.products && (
                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                  {currentItems?.map((product, index) => (
                    <ProductCard product={product} key={index} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName="pagination-container" // Eklenen sınıf
          pageClassName="pagination-page"
          pageLinkClassName="pagination-link"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
          breakClassName="pagination-break"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default AllProducts;
