import React, { useState } from "react";
import Link from "next/link";

import { IoLogOutOutline, IoClose } from "react-icons/io5";

import { IoIosClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

const AdminModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed bottom-0 right-[.1rem] w-[30rem] h-48 bg-gray-800/95 lg:mr-4 lg:mb-4 text-gray-50 border border-gray-600 rounded-md">
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
              className="px-4 py-2 gap-4 h-10 w-40 flex flex-row items-center justify-start text-slate-800 font-semibold bg-yellow-400 rounded-md shadow-md"
            >
              <IoLogOutOutline size={24} />
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModal;
