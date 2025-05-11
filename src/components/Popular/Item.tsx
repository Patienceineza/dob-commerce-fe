import Product from '../../interfaces/product';

interface MostPopularItemProps {
  product: Product;
}

function SingleItem({ product }: MostPopularItemProps) {
  return (
    <a
      href={`product-details/${product.id}`}
      className="flex flex-row items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
    >
      <div className="relative flex items-center justify-center h-20 w-20 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-red-600 font-bold text-lg">
            ${product.salesPrice}
          </p>
          <p className="text-gray-400 line-through text-sm">
            ${product.regularPrice}
          </p>
        </div>
      </div>
    </a>
  );
}

export default SingleItem;
