import React, { useState } from "react";
import Link from "next/link";

const AdminModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
<<<<<<< Updated upstream
        <div className="fixed bottom-0 right-[.1rem] lg:mr-4 lg:mb-4 text-white">
          <div className="bg-black/60 p-2 rounded-md shadow-md border flex flex-col text-center ">
            <span
              className="text-gray-500 font-bold text-2xl p-2 pt-1 pb-1 rounded-md hover:bg-red-400 cursor-pointer self-end"
              onClick={handleClose}
=======
        <div className="fixed bottom-0 right-[.1rem] w-[30rem] h-48 bg-gray-800/95 lg:mr-4 lg:mb-4 text-gray-50 border border-gray-600 rounded-md">
          {/* Close button for top right  */}
          <button
            className="absolute top-6 right-6 size-7 grid place-content-center rounded-md hover:bg-red-400 text-slate-50 hover:text-slate-800"
            onClick={handleClose}
          >
            <IoClose size={32} />
          </button>

          {/* Container  */}
          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <p>Sign in as admin to access the dashboard.</p>
            <Link
              href="/sign-in"
              className="px-4 py-2 gap-4 h-10 w-40 flex flex-row items-center justify-start text-slate-800 font-semibold bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-400 rounded-md shadow-md"
>>>>>>> Stashed changes
            >
              &times;
            </span>
            <div className="p-2 flex flex-col justify-center items-center">
              <p>Sign in as admin to access the dashboard.</p>
              <Link
                className="px-4 py-1 border border-gray-400 rounded-md my-6 hover:bg-white hover:text-black"
                href="/sign-in"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModal;
