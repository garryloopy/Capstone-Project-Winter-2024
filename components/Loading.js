import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ isLoading = true }) => {
  return isLoading ? (
    <div className="fixed top-0 left-0 h-full w-full z-20 flex flex-col gap-8 items-center justify-center">
      <TailSpin color="#fb923c" visible={isLoading} />
      <p className="text-xl font-medium text-gray-600">Loading...</p>
    </div>
  ) : (
    <></>
  );
};

export default Loading;
