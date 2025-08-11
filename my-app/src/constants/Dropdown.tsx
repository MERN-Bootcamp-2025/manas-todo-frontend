


import React, { useId } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Option = { label: string; value: string };

type Props = {
  label?: string;
  value?: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string; 
};

const Dropdown: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select',
  className = '',
}) => {
  const id = useId();

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-400 bg-gray-50 px-3 pr-10 py-2.5
                     text-sm text-black-700 outline-none focus:bg-white focus:border-blue-500
                     focus:ring-2 focus:ring-blue-500/60"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          size={18}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Dropdown;
