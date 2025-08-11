
import Login from "./pages/auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Tasks from "./pages/Tasks/Tasks";


function App() {

  return (

    <div>
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
       <Routes>
        <Route path="*" element={<Login/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
       </Routes>
    </div>
  )
}

export default App;
