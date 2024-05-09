import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const MenuExtraForm = ({ props, setProps, title, buttonTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex flex-col w-full gap-2 px-2 py-4 my-2 text-sm rounded-md outline-none  ring-1 ring-gray-400 hover:ring-2 hover:ring-emerald-500">
      <div className="flex items-center gap-2 font-semibold text-gray-400 text-md ">
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="md"
              className={`p-1 ${
                isOpen && "rotate-180"
              } rotate-0 transition-transform duration-100`}
            />
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
            } items-center sm:mx-4 mx-2 sm:gap-4 gap-1`}
          >
            <label className="w-full">
              <span className="w-full font-semibold text-gray-500">
                {title} Type
              </span>
              <input
                className="mt-[.3rem] p-2 text-sm text-gray-600 rounded-md w-full outline-none ring-1 ring-gray-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:shadow-md"
                type="text"
                placeholder={title}
                value={size?.name}
                onChange={(ev) => handleEditProps(ev, index, "name")}
              />
            </label>
            <label className="w-full">
              <span className="w-full font-semibold text-gray-500 text-md">
                Price
              </span>
              <input
                className="mt-[.3rem] p-2 text-sm text-gray-600 rounded-md w-full outline-none ring-1 ring-gray-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:shadow-md"
                type="text"
                placeholder="Extra Price"
                value={size?.price}
                onChange={(ev) => handleEditProps(ev, index, "price")}
              />
            </label>
            <div className="bg-white rounded-lg mt-[1.5rem]">
              <button
                type="button"
                className="overflow-hidden bg-white border rounded-md size-10 hover:bg-red-400/85"
                onClick={() => handleDeleteProp(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}


      {/* this buttons is for "+ Add Extra" */}
      <button
        type="button"
        onClick={handleAddProps}
        className="flex items-center justify-center gap-2 py-2 mt-6 font-semibold bg-yellow-300 rounded-md shadow-md hover:bg-lime-200 ring-1 ring-emerald-500 active:bg-lime-100"
      >
        <FontAwesomeIcon icon={faPlus} />
        {buttonTitle}
      </button>
    </div>
  );
};

export default MenuExtraForm;
