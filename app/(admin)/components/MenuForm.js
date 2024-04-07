"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { deletePhoto, uploadImage } from "@/actions/uploadImage";
import MenuExtraForm from "./MenuExtraForm";
import Link from "next/link";
const MenuForm = ({ handleSubmit, buttonText, menuList }) => {
  const [imageData, setImageData] = useState();
  const [menuInput, setMenuInput] = useState({
    title: "",
    description: "",
    price: "",
    image: "/images/no-photo.png",
    public_id: "",
    discount: 0,
  });
  const [sizes, setSizes] = useState(menuList?.sizes || []);
  const [extra, setExtra] = useState(menuList?.extra || []);

  useEffect(() => {
    if (menuList) {
      setMenuInput(menuList);
    }
  }, [menuList]);

  useEffect(() => {
    if (imageData) {
      setMenuInput((prev) => ({
        ...prev,
        image: imageData.url,
        public_id: imageData.public_id,
      }));
    }
  }, [imageData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (ev) => {
    const file = ev.target.files[0];
    if (file && file.size < 1024 * 1024) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadSetting = new Promise(async (resolve, reject) => {
        const res = await uploadImage(formData);
        if (res) {
          setImageData(res.photoData[0]);
          resolve();
        } else {
          console.error("Failed to upload image");
          reject();
        }
      });
      await toast.promise(uploadSetting, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Unable to upload image.",
      });
    }
  };
  return (
    <div className="w-full lg:w-[50%] my-[3rem] rounded-xl overflow-hidden ring-1 ring-lime-400 shadow-lg shadow-lime-100 bg-white">
      <div className="bg-yellow-50/10 p-12 flex flex-col gap-8 justify-center">
        <div className="grid place-content-center w-full h-max">
          <div className="size-96 bg-white ring-1 ring-lime-400 rounded-lg flex flex-col justify-evenly items-center">
            {/* Image container  */}
            <div className="size-1/2 ring-1 ring-gray-400 shadow-md rounded-full relative overflow-hidden">
              {menuInput.image && (
                <Image
                  src={menuInput.image}
                  alt="Menu item image"
                  fill={true}
                  sizes="25vw"
                  className="object-cover"
                />
              )}
            </div>

            <label className="flex flex-col gap-4 justify-center items-center">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="px-8 py-2 bg-white shadow-md text-[0.8rem] ring-1 ring-lime-400 rounded-lg hover:bg-lime-400 cursor-pointer">
                {menuList ? "Edit image" : "Upload image"}
              </span>
            </label>
          </div>
        </div>
        {/* <div className=" bg-white rounded-md flex ring-1 ring-gray-300 flex-col gap-6 justify-center items-center mx-auto my-6 p-12 shadow-lg">
          {menuInput.image && (
            <div className="grid place-items-center size-24">
              <Image
                src={menuInput.image}
                alt="Menu item image"
                width={100}
                height={100}
              />
            </div>
          )}
          <label className="flex flex-col gap-4 justify-center items-center">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="px-8 py-2 bg-white shadow-md text-[0.8rem] ring-1 ring-yellow-400 rounded-lg hover:bg-yellow-400 cursor-pointer">
              {menuList ? "Edit image" : "Upload image"}
            </span>
          </label>
        </div> */}
        <form
          className="flex flex-col justify-center items-center grow"
          onSubmit={(ev) =>
            handleSubmit(ev, setMenuInput, setSizes, setExtra, {
              ...menuInput,
              sizes,
              extra,
            })
          }
        >
          <label className="w-full">
            <span className="text-sm text-gray-400 font-semibold">Title</span>
            <input
              type="text"
              className="form_input"
              name="title"
              placeholder="Title"
              value={menuInput.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="w-full">
            <span className="text-sm text-gray-400 font-semibold">
              Description
            </span>
            <input
              type="text"
              className="form_input"
              name="description"
              placeholder="Description"
              value={menuInput.description}
              onChange={handleChange}
              required
            />
          </label>

          <label className="w-full">
            <span className="text-sm text-gray-400 font-semibold">
              Base price
            </span>
            <input
              type="text"
              className="form_input"
              name="price"
              placeholder="Price"
              value={menuInput.price}
              onChange={handleChange}
              required
            />
          </label>

          <label className="w-full">
            <span className="text-sm text-gray-400 font-semibold">
              Discount
            </span>
            <input
              type="text"
              className="form_input"
              name="discount"
              placeholder="Discount"
              value={menuInput.discount}
              onChange={handleChange}
            />
          </label>

          <MenuExtraForm
            props={sizes}
            setProps={setSizes}
            title="Sizes"
            buttonTitle="Add size"
          />
          <MenuExtraForm
            props={extra}
            setProps={setExtra}
            title="Extra"
            buttonTitle="Add Extra"
          />

          <button type="submit" className="sign_button">
            {buttonText}
          </button>
          {menuList && (
            <Link
              className="w-full rounded-md mt-4 text-center p-2 text-sm border border-gray-300 text-black font-semibold hover:bg-lime-400 shadow-md"
              href="/menu-list"
            >
              Cancel
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
