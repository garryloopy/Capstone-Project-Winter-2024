import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const MenuExtraForm = ({props, setProps, title, buttonTitle}) => {
  const [isOpen, setIsOpen] = useState(false)

  


  const handleAddProps = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const handleEditProps = (ev, index, type) => {
    const newValue = ev.target.value;

    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][type] = newValue;
      return newProps;
    });
  };

  const handleDeleteProp = (propRemoved) => {
    setProps((prev) => prev.filter((value, index) => index !== propRemoved));
  };
  return (
    <div className=" flex flex-col border border-gray-300 p-2 rounded-md my-2 w-full text-sm gap-2 bg-orange-100">
      <div className="text-gray-700 flex gap-2 ">
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FontAwesomeIcon
                icon={faChevronDown}
                size="sm"
                className="bg-white p-1"
              />
            ) : (
              <FontAwesomeIcon
                className="bg-white p-1"
                icon={faChevronUp}
                size="sm"
              />
            )}
          </button>
        </div>
        <span>{title}</span>
        <span>({props.length})</span>
      </div>

      {props &&
        props.map((size, index) => (
          <div
            key={index}
            className={` ${
              isOpen ? "flex " : "hidden"
            } items-center mb-4 gap-2 overflow-x-hidden`}
          >
              <label className="w-full">
                <span className="text-gray-400 text-[.7rem] w-full ">{title} Type</span>
                <input
                  className="p-2 rounded-md w-full"
                  type="text"
                  placeholder={title}
                  value={size?.name}
                  onChange={(ev) => handleEditProps(ev, index, "name")}
                />
              </label>
            <label className="w-full">
              <span className="text-gray-400 text-[.7rem] ">Price</span>
              <input
                className="p-2 rounded-md w-full"
                type="text"
                placeholder="Extra Price"
                value={size?.price}
                onChange={(ev) => handleEditProps(ev, index, "price")}
              />
            </label>
            <div className="bg-white p-2 mt-5 rounded-md">
              <button type="button" onClick={() => handleDeleteProp(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

      <button
        type="button"
        onClick={handleAddProps}
        className="bg-white py-1 rounded-md flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faPlus} />
        {buttonTitle}
      </button>
    </div>
  );
}

export default MenuExtraForm