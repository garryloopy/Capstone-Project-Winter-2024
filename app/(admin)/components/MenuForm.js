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
    <div className="w-full lg:w-[50%] my-[3rem] rounded-xl overflow-hidden ring-1 ring-neutral-400">
      <div className="flex flex-col justify-center gap-8 p-12 bg-gray-50">
        <div className="grid w-full place-content-center h-max">
          <div className="flex flex-col items-center bg-white rounded-lg size-96 ring-1 ring-gray-400 justify-evenly">
            {/* Image container  */}
            <div className="relative overflow-hidden rounded-full shadow-md size-1/2 ring-1 ring-emerald-500">
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

            <label className="flex flex-col items-center justify-center gap-4">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="px-8 py-2 bg-neutral-100 hover:bg-lime-300/85 shadow-md text-[0.8rem] ring-1 ring-emerald-500 rounded-lg cursor-pointer">
                {menuList ? "Edit image" : "Upload image"}
              </span>
            </label>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center gap-6 p-12 mx-auto my-6 bg-white rounded-md shadow-lg ring-1 ring-gray-300">
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
          <label className="flex flex-col items-center justify-center gap-4">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="px-8 py-2 bg-white shadow-md text-[0.8rem] ring-1 ring-yellow-400 rounded-lg hover:bg-yellow-400 cursor-pointer">
              {menuList ? "Edit image" : "Upload image"}
            </span>
          </label>
        </div> */}
        <form
          className="flex flex-col items-center justify-center grow"
          onSubmit={(ev) =>
            handleSubmit(ev, setMenuInput, setSizes, setExtra, {
              ...menuInput,
              sizes,
              extra,
            })
          }
        >
          <label className="w-full">
            <span className="text-sm font-semibold text-gray-500">Title</span>
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
            <span className="text-sm font-semibold text-gray-500">
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
            <span className="text-sm font-semibold text-gray-500">
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
            <span className="text-sm font-semibold text-gray-500">
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
              className="w-full p-2 mt-4 text-sm font-semibold text-center text-black border border-gray-300 rounded-md shadow-md hover:bg-amber-400"
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
