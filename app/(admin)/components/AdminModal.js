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
        <div className="fixed bottom-0 right-[.1rem] w-[30rem] h-48 bg-gray-800/50 backdrop-blur-sm lg:mr-4 lg:mb-4 text-gray-50 border border-gray-600 rounded-md">
          {/* Close button for top right  */}
          <button
            className="absolute grid rounded-md top-6 right-6 size-7 place-content-center hover:bg-slate-100 text-slate-50 hover:text-slate-800"
            onClick={handleClose}
          >
            <IoClose size={32} />
          </button>

          {/* Container  */}
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <p>Sign in as admin to access the dashboard.</p>
            <Link
              href="/sign-in"
              className="flex flex-row items-center justify-center w-40 h-10 gap-4 font-semibold bg-yellow-300 rounded-md shadow-md text-slate-800 hover:bg-zinc-100"
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
