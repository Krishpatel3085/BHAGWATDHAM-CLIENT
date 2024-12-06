'use client';

import React, { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

const SelectContext = createContext();

export const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, toggleOpen, closeDropdown }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ className, children }) => {
  const { toggleOpen } = useContext(SelectContext);

  return (
    <button
      onClick={toggleOpen}
      className={clsx(
        'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    >
      {children}
    </button>
  );
};

export const SelectContent = ({ children }) => {
  const { isOpen, closeDropdown } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div className="absolute mt-1 w-full rounded-md border border-input bg-background shadow-lg z-10">
      <div onClick={closeDropdown}>{children}</div>
    </div>
  );
};

export const SelectItem = ({ value, children }) => {
  const { onValueChange, closeDropdown } = useContext(SelectContext);

  return (
    <div
      onClick={() => {
        onValueChange(value);
        closeDropdown();
      }}
      className="px-3 py-2 text-sm text-primary hover:bg-primary hover:text-white cursor-pointer"
    >
      {children}
    </div>
  );
};

export const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectContext);

  return <span>{value || placeholder}</span>;
};
