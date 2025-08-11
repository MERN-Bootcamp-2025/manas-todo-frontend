

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import NotificationsPopover from './NotificationPopup';
import { logout } from '../redux/slices/authSlice';

type HeaderProps = { onOpenInvite?: () => void };

const Header: React.FC<HeaderProps> = ({ onOpenInvite }) => {
  const { user } = useSelector((s: RootState) => s.auth);
  const isAdmin = user?.role === 'Admin';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const avatarText =
    (user?.name && user.name.trim()[0]?.toUpperCase()) ||
    (user?.email && user.email.trim()[0]?.toUpperCase()) ||
    'U';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop shadow-xl">
   <div className="relative mx-auto flex h-14 max-w-8xl items-center px-6">
     <div className="text-2xl font-extrabold tracking-tight text-gray-900">
      TaskMaster
    </div>

     <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `text-md font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
        }
      >
        Tasks
      </NavLink>

      {isAdmin && (
        <button
          onClick={onOpenInvite}
          className="text-md font-medium text-gray-700 hover:text-blue-600"
        >
          Invite Users
        </button>
      )}
    </nav>

    <div className="ml-auto flex items-center gap-4">
      {isAdmin && <NotificationsPopover />}

      <div
        className="relative"
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenuOpen(false);
        }}
      >
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200
                     text-base font-semibold text-gray-700 hover:ring-2 hover:ring-blue-500"
        >
          {avatarText}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</header>

  );
};

export default Header;
