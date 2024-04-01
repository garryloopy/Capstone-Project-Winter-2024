import React from 'react'

const InputAnimation = ({text, stateValue}) => {
  return (
    <div
      className={`absolute inset-0 flex items-center p-2 ${
        stateValue.length > 0 && "-translate-y-5  "
      }  pointer-events-none peer-valid:text-gray-400 opacity-50 peer-focus:opacity-100 transition-all duration-300 peer-focus:-translate-y-5 group-hover:opacity-100`}
    >
      <p className="font-semibold text-sm bg-gray-100 rounded-md px-1 text-gray-400">
        {text}
      </p>
    </div>
  );
}

export default InputAnimation