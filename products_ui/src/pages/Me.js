import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/reducer/meSlice';

const Me = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { data, loading, error } = useSelector((state) => state.me);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-8 bg-white shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">User Profile</h2>
        {loading === 'pending' && <p>Loading...</p>}
        {loading === 'rejected' && <p className="text-red-500">{error}</p>}
        {loading === 'fulfilled' && data && (
          <div className='text-left'>
            <div>
              <p className="mt-1 p-2 w-full border rounded-md"><span>Username: </span>{data.name}</p>
            </div>
            <div>
              <p className="mt-1 p-2 w-full border rounded-md"><span>Email: </span>{data.email}</p>
            </div>
            <div>
              <p className="mt-1 p-2 w-full border rounded-md"><span>Role: </span>{data.role}</p>
            </div>
            {/* Add more user information as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Me;