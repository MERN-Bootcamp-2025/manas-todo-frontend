
import Login from "./pages/auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

    <div>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
        <Login/>
    </div>
  )
}

export default App;
