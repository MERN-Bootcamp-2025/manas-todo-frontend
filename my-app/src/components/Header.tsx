

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import InviteUsersModal from './InviteUsersModal';
import NotificationsPopover from './NotificationPopup';
import { logout } from '../redux/slices/authSlice';

const Header: React.FC = () => {
    
  const { user } = useSelector((s: RootState) => s.auth);
  const isAdmin = user?.role === 'Admin';
  const [openInvite, setOpenInvite] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



   


  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">

          <div className="font-bold">TaskMaster</div>

          <NavLink to="/tasks" className="text-sm text-gray-700 hover:text-black">Tasks</NavLink>
          {isAdmin && (
            <button onClick={()=>setOpenInvite(true)} className="text-sm text-gray-700 hover:text-black">Invite Users</button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && <NotificationsPopover />}
          <button 
             className="w-full bg-blue-500 text-left px-3 py-2 rounded hover:bg-gray-50" 
             onClick={()=>{dispatch(logout()); 
             navigate('/login');}}>
                Logout
          </button>

        </div>
      </div>

      <InviteUsersModal open={openInvite} onClose={()=>setOpenInvite(false)} />
    </header>
  );
};

export default Header;
