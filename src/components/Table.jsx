import { useEffect, useState } from 'react';
import customAxios from './axiosCustomConfig';
import Pagination from './Pagination';
import AddUser from './PostUser';
import defaultAvatar from '../img/default-avatar.jpg';
import UpdateUser from './UpdateUser';
import _ from 'lodash';

const Table = () => {
  const defaultPage = 1;

  const [info, setInfo] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [val, setVal] = useState({});

  const handleShow = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  const setHide = () => {
    setShowUpdate(false);
  };

  const handleUpdate = (user) => {
    setInfo([user, ...info]);
  };

  const handleEditUser = (users) => {
    let cloneInfo = _.cloneDeep(info);

    let index = cloneInfo.findIndex((item) => item.id === users.id);

    if (cloneInfo[index].first_name && cloneInfo[index].email) {
      cloneInfo[index].first_name = users.first_name;
      cloneInfo[index].email = users.email;
    }
    setInfo(cloneInfo);
    setShowUpdate(false);
  };

  const handleEdit = (user) => {
    setShowUpdate(true);
    setVal({
      fullname: `${user.first_name} ${user.last_name}`,
      email: user.email,
      id: user.id,
    });
  };

  const fetchData = async (page) => {
    try {
      const reponse = await customAxios.get(`/api/users?page=${page}`);
      if (reponse && reponse?.data) {
        setInfo(reponse?.data);
        setTotalPage(reponse.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event) => {
    fetchData(event.selected + 1);
  };

  useEffect(() => {
    fetchData(defaultPage);
  }, []);

  return (
    <>
      <AddUser
        show={showModal}
        handleShow={handleShow}
        handleHide={handleHide}
        handleUpdate={handleUpdate}
      />
      <div className='relative w-full max-w-screen-xl mx-auto overflow-x-auto shadow-sm sm:rounded-md mt-5'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Avatar
              </th>
              <th scope='col' className='px-6 py-3'>
                FullName
              </th>
              <th scope='col' className='px-6 py-3'>
                Users ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {info.length > 0 &&
              info.map((user) => (
                <tr
                  key={`user-${user?.id}`}
                  className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {user?.email}
                  </th>
                  <td className='px-6 py-4'>
                    <img
                      src={user?.avatar || defaultAvatar}
                      className='w-8 h-8 rounded-full object-cover'
                      alt=''
                    />
                  </td>
                  <td className='px-6 py-4'>
                    {user.last_name
                      ? `${user?.first_name} ${user?.last_name}`
                      : user.first_name}
                  </td>
                  <td className='px-6 py-4'>{user?.id}</td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-wrap gap-2'>
                      <button
                        onClick={() => handleEdit(user)}
                        className='px-4 py-2 bg-sky-500 mr-2 rounded-md text-white'
                      >
                        Edit
                      </button>
                      <button className='px-4 py-2 bg-red-500 rounded-md text-white'>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end my-5'>
        <Pagination count={totalPage} clicked={handlePageClick} />
      </div>

      {showUpdate && (
        <UpdateUser
          value={val}
          edit={handleEditUser}
          show={showUpdate}
          setHide={setHide}
        />
      )}
    </>
  );
};

export default Table;
