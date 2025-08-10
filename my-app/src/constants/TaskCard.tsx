
import React from 'react';
import Chip from './Chip';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

type Props = {
  title: string;
  description: string;
  status: string;
  priority: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const TaskCard: React.FC<Props> = ({ title, description, status, priority, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="mt-3 flex gap-2">
            <Chip>{status}</Chip>
            <Chip>{priority}</Chip>
          </div>
        </div>
        <div className="flex gap-3 text-gray-500">
          <button onClick={onEdit} className="hover:text-gray-900" aria-label="edit"><FiEdit2 /></button>
          <button onClick={onDelete} className="hover:text-red-600" aria-label="delete"><FiTrash2 /></button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
