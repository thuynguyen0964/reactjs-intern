import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <section className='App'>
      <Header />
      <Table />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </section>
  );
}

export default App;
