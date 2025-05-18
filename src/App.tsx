import UsersProvider from './users/components/UsersProvider';
import { ToastContainer, Bounce } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <div className='w-screen h-screen flex justify-center content-center overflow-auto'>
      <UsersProvider />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </div>
  );
}

export default App;
