import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const ValidateInput = ({clientInfo, isValid}) => {
  return (
    <div className="flex items-center justify-center">
      {clientInfo && isValid ? (
        <FontAwesomeIcon
          className="absolute top-[20%] right-[3%]"
          icon={faCheck}
          style={{ color: "green" }}
        />
      ) : clientInfo && !isValid ? (
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-[20%] right-[3%]"
          style={{ color: "red" }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ValidateInput