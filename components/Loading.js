import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ isLoading = true }) => {
  return isLoading ? (
    <div className="h-screen z-20 flex items-center justify-center">
      <TailSpin color="#7c3aed" visible={isLoading} />
    </div>
  ) : (
    <></>
  );
};

export default Loading;
