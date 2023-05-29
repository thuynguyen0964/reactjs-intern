import 'flowbite';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem('token');
    navigate('/signup');
    toast.success('Logout succeed');
  };

  return (
    <>
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <NavLink to='/' className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8 mr-3'
              alt='Flowbite Logo'
            />
          </NavLink>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <div
            className='w-full md:block md:w-auto hidden custom'
            id='navbar-default'
          >
            <ul className='custom-list font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink
                  to='/'
                  className='block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                 '
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='users'
                  className='block py-2 pl-3 pr-4  rounded md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
               '
                >
                  Users
                </NavLink>
              </li>
              <li>
                <button
                  id='dropdownNavbarLink'
                  data-dropdown-toggle='dropdownNavbar'
                  className='flex items-center justify-between w-full py-2 pl-3 pr-4  rounded md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
                >
                  Action{' '}
                  <svg
                    className='w-5 h-5 ml-1'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>

                <div
                  id='dropdownNavbar'
                  className='z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
                >
                  <ul
                    className='py-2 text-sm text-gray-700 dark:text-gray-400'
                    aria-labelledby='dropdownLargeButton'
                  >
                    <li>
                      <NavLink
                        to='signin'
                        className='block px-4 w-full py-2 font-medium dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100'
                      >
                        Sign In
                      </NavLink>
                    </li>
                    <li>
                      <button
                        type='button'
                        className='block w-full text-left px-4 py-2 font-medium dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100'
                        onClick={logOutUser}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
