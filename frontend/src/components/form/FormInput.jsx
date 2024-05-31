import React from 'react';

export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-light-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-black focus:border-black p-1 dark:text-dark text-black peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold dark:text-black text-light-subtle p-2 dark:peer-focus:text-white peer-focus:text-black transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
