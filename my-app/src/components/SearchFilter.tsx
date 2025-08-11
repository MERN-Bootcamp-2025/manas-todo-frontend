
import React, { useState } from 'react';
import Dropdown from '../constants/Dropdown';

type Props = {
  onSearch: (text: string) => void;
  onFilter: (f: { status?: string; priority?: string }) => void;
};

const statuses = ['Todo', 'In Progress', 'On Hold', 'Done', 'Will Not Do'].map(s => ({ label: s, value: s }));
const priorities = ['Low', 'Medium', 'High', 'Critical'].map(s => ({ label: s, value: s }));

const SearchFilter: React.FC<Props> = ({ onSearch, onFilter }) => {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-md'>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search tasks by name..."
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm 
                     placeholder:text-gray-600 outline-none focus:bg-white 
                     focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <Dropdown
          className="flex-1"
          placeholder="Filter by Status"
          value={status}
          onChange={(v) => {
            setStatus(v);
            onFilter({ status: v || undefined, priority });
          }}
          options={statuses}
        />

        <Dropdown
          className="flex-1"
          placeholder="Filter by Priority "
          value={priority}
          onChange={(v) => {
            setPriority(v);
            onFilter({ status, priority: v || undefined });
          }}
          options={priorities}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
