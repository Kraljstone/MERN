import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Container className='my-2' />
      <Outlet />
    </div>
  );
};

export default App;
