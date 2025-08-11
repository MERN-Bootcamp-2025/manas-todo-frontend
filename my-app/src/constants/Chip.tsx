

import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

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

export type ChipOption = { label: string; value: string };

type Props = {
  value: string;
  options?: ChipOption[];
  onSelect?: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
};

const Chip: React.FC<Props> = ({
  value,
  options,
  onSelect,
  readOnly,
  disabled,
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const classes = colorMap[value] || 'bg-gray-100 text-gray-700';
  const interactive = !!options && !!onSelect && !readOnly;

  if (!interactive) {
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes} ${className}`}>
        {value}
      </span>
    );
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes} disabled:opacity-50`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value || 'Select'}
        <FiChevronDown className="ml-1 opacity-70" size={12} aria-hidden="true" />
      </button>

      {open && Array.isArray(options) && options.length > 0 && (
        <div
          className="absolute z-20 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => {
                onSelect!(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-50 ${
                opt.value === value ? 'font-semibold' : ''
              }`}
              role="option"
              aria-selected={opt.value === value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chip;
