import React, { useState } from "react";
import Link from "next/link";

import { IoClose, IoLogInOutline } from "react-icons/io5";

const AdminModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed bottom-0 right-[.1rem] w-[30rem] h-48 bg-gray-800/95 lg:mr-4 lg:mb-4 text-gray-50 border border-gray-600 rounded-md">
          {/* Close button for top right  */}
          <button
            className="absolute top-6 right-6 size-7 grid place-content-center rounded-md hover:bg-slate-100 text-slate-50 hover:text-slate-800"
            onClick={handleClose}
          >
            <IoClose size={32} />
          </button>

          {/* Container  */}
          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <p>Sign in as admin to access the dashboard.</p>
            <Link
              href="/sign-in"
              className="gap-4 h-10 w-40 flex flex-row items-center justify-center text-slate-800 font-semibold bg-zinc-100 rounded-md shadow-md hover:bg-lime-300"
            >
              <IoLogInOutline size={24} />
              Sign in
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModal;
