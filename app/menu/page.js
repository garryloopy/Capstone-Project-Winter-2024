
/**
 * This is a menu page
 * @returns 
 */
import React from 'react';

// temporary menu display
// to be deleted after the actual menu is implemented
// 


function Menu() {
  return (
    <div>
        <div>menu</div>

        <div className="flex flex-col items-center">


            <div className="flex mt-20">
                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 1</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>

                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 2</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>

                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 3</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>
            </div>

            <div className="flex mb-20">
                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 4</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>

                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 5</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>

                <div className="container relative group text-slate-100 h-32 w-48 m-7 border-4 rounded-md border-slate-300 flex items-center justify-center">
                <span>Food 6</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-orange-400 text-white px-4 py-2 rounded">Add to Order</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Menu;

