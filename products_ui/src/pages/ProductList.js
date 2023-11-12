import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/reducer/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  console.log(products, loading, error,'products, loading, error')

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-4">Product List</h2>
      {loading === 'pending' && <p>Loading...</p>}
      {loading === 'rejected' && <p className="text-red-500">{error}</p>}
      {loading === 'fulfilled' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
              <img
                src={product.avatar}
                alt={product.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <p className="text-lg font-semibold mb-2">{product.name}</p>
              <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
              <p className="text-green-500 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;