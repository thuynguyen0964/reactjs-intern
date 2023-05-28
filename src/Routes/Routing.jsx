import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Loading from '../components/Loading';

const Table = lazy(() => import('../components/Table'));

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route
          path='users'
          element={
            <Suspense fallback={<Loading />}>
              <Table />
            </Suspense>
          }
        ></Route>
        <Route path='signin' element={<SignIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
      </Routes>
    </>
  );
};

export default Routing;
