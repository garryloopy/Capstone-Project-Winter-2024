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
        <div className="fixed bottom-0 right-[.1rem] lg:mr-4 lg:mb-4">
          <div className="bg-white/80 p-4 rounded-md shadow-md border flex flex-col">
           
              <span
                className="text-gray-600 font-bold text-2xl p-1 hover:bg-red-400 cursor-pointer self-end"
                onClick={handleClose}
              >
                &times;
              </span>
            <div className="p-4 text-black flex flex-col justify-center items-center">
              <p>Sign in as an admin to access the dashboard.</p>
              <Link
                className="px-4 py-2 border border-gray-400 rounded-md my-6 hover:bg-black hover:text-white"
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
