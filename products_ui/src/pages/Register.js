// Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/reducer/registerSlice';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const registrationStatus = useSelector((state) => state.register.status);

  const handleRegister = () => {
    // Basic validation
    if (!email || !password || !password_confirmation) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== password_confirmation) {
      alert('Passwords do not match');
      return;
    }

    // Dispatch the register action with user data
    dispatch(registerUser({ email, password, password_confirmation }));
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Your email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
                <input
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Confirm Password:</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="••••••••"
                  type="password_confirmation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password_confirmation}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
               <button
                type="button"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  registrationStatus === 'pending' && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleRegister}
                disabled={registrationStatus === 'pending'}
              >
                {registrationStatus === 'pending' ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;