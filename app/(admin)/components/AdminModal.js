import React, { useState } from "react";
import Link from "next/link";

import { IoClose, IoLogInOutline } from "react-icons/io5";

const AdminModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed bottom-0 right-0 lg:right-[.1rem] lg:w-[30rem] w-full h-48 bg-gray-800/95 lg:mr-4 lg:mb-4 text-gray-50 border border-gray-600 rounded-md">
          <button
            className="absolute top-6 right-6 size-7 grid place-content-center rounded-md hover:bg-red-400 text-slate-50 hover:text-slate-800"
            onClick={handleClose}
          >
            <IoClose size={32} />
          </button>

          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <p>Sign in as admin to access the dashboard.</p>
            <Link
              href="/sign-in"
              className="gap-4 h-10 w-40 flex flex-row items-center justify-center text-slate-800 font-semibold bg-yellow-400 rounded-md shadow-md"
            >
              <IoLogInOutline size={24} />
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModal;
