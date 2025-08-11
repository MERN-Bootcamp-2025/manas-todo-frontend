
import React from 'react';
import Chip from './Chip';
import type {ChipOption} from './Chip'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

type Props = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  statusOptions: ChipOption[];
  priorityOptions: ChipOption[];
  onChangeStatus: (id: string, value: string) => void;
  onChangePriority: (id: string, value: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  busy?: boolean;
};

const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  status,
  priority,
  statusOptions,
  priorityOptions,
  onChangeStatus,
  onChangePriority,
  onEdit,
  onDelete,
  busy,
}) => {
  const isDone = status === 'Done';

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className={`text-base font-semibold ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {title}
          </h4>

          {description && (
            <p className={`mt-1 text-sm ${isDone ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Chip
              value={status}
              options={statusOptions}
              onSelect={(v) => onChangeStatus(id, v)}
              disabled={busy}
            />
            <Chip
              value={priority}
              options={priorityOptions}
              onSelect={(v) => onChangePriority(id, v)}
              disabled={busy}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 opacity-70 group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              aria-label="edit"
              disabled={busy}
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
              aria-label="delete"
              disabled={busy}
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
