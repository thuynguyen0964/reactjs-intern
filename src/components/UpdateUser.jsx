import customAxios from './axiosCustomConfig';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const UpdateUser = ({ show, setHide, value, edit }) => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
  });

  const putUpdate = (val) => {
    return customAxios.put(`/api/users/${val.id}`, { val });
  };

  const handleUpdateUsers = async () => {
    const reponse = await putUpdate(values);

    if (reponse) {
      edit({
        first_name: values.fullname,
        email: values.email,
        id: values.id,
      });
    }
    toast.success('Update users successfull');
  };

  React.useEffect(() => {
    if (show) {
      setValues(value);
    }
  }, [show, value]);

  return (
    <div className='modal w-full h-full'>
      {show && (
        <div className='fixed top-0 left-0 right-0 z-20 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full grid place-items-center overlay'>
          <div className='relative w-full max-w-2xl max-h-full'>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Update Users
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={setHide}
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              {/* modal body */}
              <div className='p-6 flex flex-col gap-5'>
                <div>
                  <label
                    htmlFor='username'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    User Name
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={values.fullname}
                    onChange={(e) =>
                      setValues({ ...values, fullname: e.target.value })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    placeholder='Enter username ...'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Email Addr
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    placeholder='name@company.com'
                  />
                </div>

                <button
                  className='max-w-[150px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={handleUpdateUsers}
                >
                  Update
                </button>
              </div>

              {/* modal footer */}
              <div className='flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                <button
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={setHide}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
UpdateUser.propTypes = {
  show: PropTypes.bool.isRequired,
  setHide: PropTypes.func,
  value: PropTypes.object,
  edit: PropTypes.func,
};

export default UpdateUser;
