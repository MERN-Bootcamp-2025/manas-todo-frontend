

import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { FiBell } from 'react-icons/fi';

const NotificationsPopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const current = useSelector((s: RootState) => s.auth.user);

//   const filterInvited = (list: any[]) => {
//     const myId = current?.id;
//     return list.filter((u: any) => {
//       const inv = (u && (u.invited_by ?? u.invitedBy));
//       if (!inv) return false;
//       if (typeof inv === 'string') return inv === myId;
//       return inv?.user_id === myId || inv?.id === myId;
//     });
//   };

  useEffect(() => {
    if (!open) 
    return;

    (async () => {
    const invited = await userService.listAll();
      setUsers(invited);
    })();
  }, [open]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} 
           className="relative flex items-center">
            <FiBell />
           {users.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {users.length}
        </span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow p-3 z-40">
          <div className="font-semibold mb-2">Invited Users</div>
          <div className="max-h-64 overflow-auto space-y-2">
            {users.length === 0 && <div className="text-sm text-gray-500">No invites yet.</div>}
            {users.map((u) => (
              <div 
                  key={u.user_id || u.id} 
                  className="text-sm border-b last:border-b-0 pb-2">
                  {u.name || u.email} — 
                  <span className="text-gray-500">{u.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopover;
