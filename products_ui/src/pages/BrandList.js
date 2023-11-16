import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../store/reducer/brandSlice";

const BrandList = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-4">Brand List</h2>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "rejected" && <p className="text-red-500">{error}</p>}
      {loading === "fulfilled" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white p-4 rounded-md shadow-md">
              <img
                src={brand.avatar}
                alt={brand.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <p className="text-lg font-semibold mb-2">{brand.short_name}</p>
              <p className="text-gray-600 mb-2">SKU: {brand.store_number}</p>
              <p className="text-green-500 font-bold">
                <span>Status: </span>
                {brand.status.toString() ? "Active" : "inActive"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandList;
