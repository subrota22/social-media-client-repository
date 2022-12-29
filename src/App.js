
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './components/routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
 <>
 <ToastContainer></ToastContainer>
<RouterProvider router={routes}></RouterProvider>
 </>
  );
}

export default App;
