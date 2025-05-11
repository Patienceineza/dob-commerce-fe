import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ProductCard from './ProductCard';
import { RootState } from '@/app/store';
import { Product } from '@/types/Product';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  selectProducts,
  fetchProducts,
} from '@/features/Products/ProductSlice';
import { useEffect } from 'react';

function FeaturedSection() {
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state: RootState) =>
    selectProducts(state)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const latestProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="w-full mx-auto mt-8 md:mt-12 px-16">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-col lg:flex-row gap-2 md:gap-2 lg:gap-6 w-full md:w-3/4 items-center">
          <h2 className="text-3xl font-semibold text-black w-full lg:w-auto text-center md:text-left">
            New Arrivals
          </h2>
          <p className="text-sm font-light text-black w-full lg:w-auto text-center md:text-left">
            Check out our latest products just added to our collection.
          </p>
        </div>
        <Link
          to="/shop"
          className="hidden md:flex items-center p-2 rounded-xl border-violet-700 border text-violet-700 text-sm hover:bg-violet-200"
        >
          View All <IoIosArrowForward />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.length === 0 && (
          <div>
            <p className="text-center text-xl text-black">No Products Found</p>
          </div>
        )}
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedSection;
