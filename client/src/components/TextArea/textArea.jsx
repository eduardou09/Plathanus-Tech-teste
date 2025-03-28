import React from 'react';

const TextArea = React.forwardRef(({
  label,
  placeholder,
  error,
  className = "",
  rows = 4,
  defaultValue,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="font-semibold text-sm block mb-">{label}</label>}
      
      <textarea
        ref={ref}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className={`rounded-[12px] w-full px-4 py-2 border ${
            error ? 'border-red-500' : 'border-[#828282]'
          } bg-[#E8E8E8]`}
        {...props}
      />
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;