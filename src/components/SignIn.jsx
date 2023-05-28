import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SignUp = () => {
  const [hidePass, setHidePass] = useState(true);
  const [mailVal, setMailVal] = useState('');
  const [pass, setPass] = useState('');

  const handleHidePass = () => {
    setHidePass(!hidePass);
  };

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

  return (
    <div className='grid place-items-center h-[calc(100vh-64px)]'>
      <div className='w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-xl'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign in to your account
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={mailVal}
                onChange={(e) => handleChange(e, setMailVal)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
              />
            </div>
            <div className='relative'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type={hidePass ? 'password' : 'text'}
                name='password'
                id='password'
                placeholder='••••••••'
                value={pass}
                onChange={(e) => handleChange(e, setPass)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <span
                className='absolute top-[54%] right-[10px] cursor-pointer'
                onClick={handleHidePass}
              >
                {hidePass ? (
                  <EyeSlashIcon className='h-6 w-6 text-gray-500' />
                ) : (
                  <EyeIcon className='h-6 w-6 text-gray-500' />
                )}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='remember'
                    aria-describedby='remember'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='remember'
                    className='text-gray-500 dark:text-gray-300'
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href='#'
                className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Forgot password?
              </a>
            </div>
            <button
              type='button'
              className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:pointer-events-none'
              disabled={pass.length === 0}
            >
              Sign In
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{' '}
              <a
                href='#'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
