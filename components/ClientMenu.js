import React from 'react'

const ClientMenu = (menuList) => {
  return (
    <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
      <h2>{menuList.title}</h2>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-orange-400 text-white px-4 py-2 rounded">
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default ClientMenu