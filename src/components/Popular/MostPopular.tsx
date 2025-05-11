// src/components/MostPopular/MostPopular.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PopilarTitle from './PopilarTitle';
import SingleItem from './Item';

function MostPopular() {
  const { availableProduct, status } = useSelector(
    (state: RootState) => state.availableProducts
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const handleLeftallowclick = async () => {
    if (start > 0) {
      setEnd(end - 3);
      setStart(start - 3);
    } else {
      setEnd(3);
      setStart(0);
    }
  };

  const handleRightallowclick = async () => {
    if (end < availableProduct.length) {
      setEnd(end + 3);
      setStart(start + 3);
    }
  };

  const mostRecentProducts = [...availableProduct]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(start, end);

  return (
    <div className="flex flex-col mb-8">
      <PopilarTitle
        section="Most Popular"
        onLeftArrowClick={handleLeftallowclick}
        onRightArrowClick={handleRightallowclick}
      />

      <div className="grid gap-3 bg-white rounded-2xl p-4 shadow-lg">
        {status === 'loading' &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-4 p-3 rounded-xl bg-gray-50 animate-pulse"
                role="status"
              >
                <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}

        {status === 'failed' &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 rounded-xl bg-red-50 text-red-600 font-medium"
              >
                Failed to load products. Please try again.
              </div>
            ))}

        {mostRecentProducts.map((product) => (
          <SingleItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MostPopular;
