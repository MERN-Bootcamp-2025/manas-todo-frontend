
import React from 'react';

type Option = { label: string; value: string };

type Props = {
  label?: string;
  value?: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

const Dropdown: React.FC<Props> = ({ label, value, onChange, options, placeholder, className }) => {
  return (
    <div className={className}>
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 outline-none"
      >
        <option value="">{placeholder || 'Select'}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
