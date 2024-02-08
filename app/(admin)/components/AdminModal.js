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
        <div className="fixed bottom-0 right-[.1rem] lg:mr-4 lg:mb-4 text-white">
          <div className="bg-black/60 p-2 rounded-md shadow-md border flex flex-col ">
            <span
              className="text-gray-500 font-bold text-2xl p-2 pt-1 pb-1 rounded-md hover:bg-red-400 cursor-pointer self-end"
              onClick={handleClose}
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
