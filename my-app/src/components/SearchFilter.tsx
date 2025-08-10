
import React, { useState } from 'react';
import Dropdown from '../constants/Dropdown';

type Props = {
  onSearch: (text: string) => void;
  onFilter: (f: { status?: string; priority?: string }) => void;
};

const statuses = ['Todo','In Progress','On Hold','Done','Will Not Do'].map(s => ({label: s, value:s}));
const priorities = ['Low','Medium','High','Critical'].map(s => ({label: s, value:s}));

const SearchFilter: React.FC<Props> = ({ onSearch, onFilter }) => {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  return (
    <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center">
      <input
        type="text"
        placeholder="Search tasks by name..."
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Dropdown className="w-full md:w-56" placeholder="Filter by Status" value={status} onChange={(v)=>{setStatus(v); onFilter({ status: v || undefined, priority });}} options={statuses} />
      <Dropdown className="w-full md:w-56" placeholder="Filter by Priority" value={priority} onChange={(v)=>{setPriority(v); onFilter({ status, priority: v || undefined });}} options={priorities} />
    </div>
  );
};

export default SearchFilter;
