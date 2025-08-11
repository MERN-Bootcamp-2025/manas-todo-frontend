


import React, { useState } from 'react';
import Modal from '../constants/Modal';
import Dropdown from '../constants/Dropdown';
import { userService } from '../services/userService';
 import { toast } from 'react-toastify';
 
type Props = { open: boolean; onClose: () => void; onInvited?: () => void; };

const roles = [{ label: 'Admin', value: 'Admin' }, { label: 'User', value: 'User' }];

const InviteUsersModal: React.FC<Props> = ({ open, onClose, onInvited }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
 
  const submit = async () => {
    try {
      if (!name || !email || !role) 
        throw new Error('All fields are required');

      setLoading(true);
      await userService.invite({ name, email, role: role as 'Admin'|'User' });
      toast.success('Invitation sent !! ')

      setName(''); setEmail(''); setRole('');
      onInvited && onInvited();
      onClose();

    } catch (e: any) {
        toast.error('Invitation Failed !')
        
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <Modal open={open} onClose={onClose} title="Invite User" footer={
      <>
        <button 
           className="px-4 py-2 rounded-lg border" 
           onClick={onClose}>
            Cancel
        </button>
        <button 
            disabled={loading} 
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60" 
            onClick={submit}>
               {loading ? 'Sending...' : 'Send Invite'}
         </button>
      </>
    }>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="text-sm font-medium mb-1">Name</div>
          <input 
              value={name} 
              onChange={(e)=>setName(e.target.value)} 
              className="w-full border rounded-lg px-3 py-2" 
              placeholder="Full name" />
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Email</div>
          <input 
               value={email} 
               onChange={(e)=>setEmail(e.target.value)} 
               className="w-full border rounded-lg px-3 py-2" 
               placeholder="email@example.com" />
        </div>
        <Dropdown 
              label="Role" 
              value={role} 
              onChange={setRole} 
              options={roles} 
              placeholder="Select role" />
      </div>
    </Modal>
  );
};

export default InviteUsersModal;
