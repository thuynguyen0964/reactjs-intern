import { useEffect, useState } from 'react';
import customAxios from './axiosCustomConfig';
import Pagination from './Pagination';
import AddUser from './PostUser';
import defaultAvatar from '../img/default-avatar.jpg';
import UpdateUser from './UpdateUser';
import _, { debounce } from 'lodash';
import DeleteUser from './DeleteUser';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  FolderArrowDownIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

const Table = () => {
  const defaultPage = 1;

  const [info, setInfo] = useState([]);
  const [val, setVal] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isUser, setIsUser] = useState({});
  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataCsv, setDataCsv] = useState([]);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  const setHide = () => {
    setShowUpdate(false);
  };

  // filter users
  const handleChangeTerm = debounce((e) => {
    let resultsValue = e.target.value;
    setSearchTerm(resultsValue);
    let cloneValue = [...info];
    if (resultsValue) {
      cloneValue = cloneValue.filter((item) => {
        return item.email.includes(resultsValue);
      });
      setInfo(cloneValue);
      cloneValue.length === 0
        ? toast.info('No user was found')
        : toast.success(`${cloneValue.length} user was found`);
    } else {
      fetchData(defaultPage);
    }
  }, 1000);

  const handleUpdate = (user) => {
    setInfo([...info, user]);
  };

  const areYouSure = (user = {}) => {
    setShowDelete(!showDelete);

    if (user.first_name && user.last_name) {
      setIsUser(user);
    }
  };

  const handleSort = (typeSort, typeField) => {
    setSortBy(typeSort);
    setSortField(typeField);

    let cloneInfo = [...info];
    cloneInfo = _.orderBy(cloneInfo, [typeField], [typeSort]);
    setInfo(cloneInfo);
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

  const handleDeleteUser = (user) => {
    let cloneUsers = _.cloneDeep(info);
    cloneUsers = cloneUsers.filter((item) => item.id !== user.id);
    setInfo(cloneUsers);
  };

  const handleEdit = (user) => {
    setShowUpdate(true);
    setVal({
      fullname: user.first_name,
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

  const getUserFromApi = (event, done) => {
    let results = [];
    if (info && info.length > 0) {
      results.push(['ID', 'Email', 'First Name', 'Avatar']);
      info.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.avatar;
        results.push(arr);
      });
      setDataCsv(results);
      done();
    }
  };

  return (
    <>
      <div className='flex justify-between items-center my-5 max-sm:flex-wrap max-sm:flex-col max-md:items-start max-sm:gap-3'>
        {/* input  */}
        <div className='max-sm:w-full'>
          <input
            defaultValue={searchTerm}
            onChange={(e) => handleChangeTerm(e)}
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            placeholder='Enter email ....'
          />
        </div>

        <div className='flex items-center gap-3 max-md:flex-wrap max-sm:w-full'>
          {/* import */}
          <label
            htmlFor='file'
            className='import max-sm:m-0 max-sm:bg-emerald-400 max-sm:w-full hover:opacity-70 cursor-pointer'
          >
            <DocumentArrowUpIcon className='h-6 w-6 text-white' />
            <span>Import</span>
          </label>
          <input type='file' id='file' hidden />

          {/* export btn */}
          <span className='flex gap-1 items-center max-sm:m-0 max-sm:bg-emerald-400 text-white bg-green-600 hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center px-5 py-2.5 dark:bg-blue-600 max-sm:w-full  dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            <FolderArrowDownIcon className='h-6 w-6 text-white' />
            <CSVLink
              data={dataCsv}
              asyncOnClick={true}
              onClick={getUserFromApi}
            >
              Export Data
            </CSVLink>
          </span>

          {/* Add btn */}
          <AddUser
            show={showModal}
            handleShow={handleShow}
            handleHide={handleHide}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>

      <div className='relative w-full max-w-screen-xl mx-auto overflow-x-auto shadow-sm sm:rounded-md mt-5'>
        <table className='w-full border-x-2 border-y-2 border-gray-100 text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th className='px-6 py-3'>Email</th>
              <th className='px-6 py-3'>Avatar</th>
              <th className='px-6 py-3'>
                <div className='flex-1 flex gap-1 items-center'>
                  <span>FullName</span>
                  <div className='flex items-center gap-1'>
                    <button onClick={() => handleSort('desc', 'first_name')}>
                      <ArrowDownCircleIcon className='h-5 w-5 text-gray-500' />
                    </button>
                    <button onClick={() => handleSort('asc', 'first_name')}>
                      <ArrowUpCircleIcon className='h-5 w-5 text-gray-500' />
                    </button>
                  </div>
                </div>
              </th>
              <th className='px-6 py-3'>
                <div className='flex-1 flex gap-1 items-center'>
                  <span>User ID</span>
                  <div className='flex items-center gap-1'>
                    <button onClick={() => handleSort('desc', 'id')}>
                      <ArrowDownCircleIcon className='h-5 w-5 text-gray-500' />
                    </button>
                    <button onClick={() => handleSort('asc', 'id')}>
                      <ArrowUpCircleIcon className='h-5 w-5 text-gray-500' />
                    </button>
                  </div>
                </div>
              </th>
              <th className='px-6 py-3'>Action</th>
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
                    {user?.last_name
                      ? `${user?.first_name} ${user?.last_name}`
                      : `${user.first_name}`}
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
                      <button
                        onClick={() => areYouSure(user)}
                        className='px-4 py-2 bg-red-500 rounded-md text-white'
                      >
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
      {showDelete && (
        <DeleteUser
          nameWantDelete={isUser}
          handleShow={() => areYouSure()}
          handeDelete={handleDeleteUser}
        />
      )}

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
