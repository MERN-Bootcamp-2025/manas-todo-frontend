
import Login from "./pages/auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from "./pages/Tasks/Tasks";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";


function App() {
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  return (

    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Routes>
       <Route path="/login" element={<Login />} />

       <Route
        path="/tasks"
        element={isAuthenticated ? <Tasks /> : <Navigate to="/login" replace />}
      />

       <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </div>
  )
}

export default App;
