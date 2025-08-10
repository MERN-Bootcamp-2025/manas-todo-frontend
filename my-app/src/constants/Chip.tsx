
import React from 'react';

const colorMap: Record<string, string> = {
  'Todo': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'On Hold': 'bg-yellow-100 text-yellow-700',
  'Done': 'bg-green-100 text-green-700',
  'Will Not Do': 'bg-gray-200 text-gray-700',
  'Low': 'bg-green-100 text-green-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'High': 'bg-red-100 text-red-700',
  'Critical': 'bg-red-200 text-red-800',
};

type Props = { children: string };

const Chip: React.FC<Props> = ({ children }) => {
  return <span className={`rounded-full text-xs px-2 py-1 ${colorMap[children] || 'bg-gray-100 text-gray-700'}`}>{children}</span>;
};

export default Chip;
