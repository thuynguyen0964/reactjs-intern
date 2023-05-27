import './App.css';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';

function App() {
  return (
    <section className='App'>
      <Header />
      <Home />
      <ToastContainer
        position='top-right'
        autoClose={1500}
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
