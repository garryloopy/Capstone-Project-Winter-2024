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
    <div className=" w-full lg:w-[50%] p-4 my-[3rem] rounded-md flex flex-col md:flex-row gap-8 justify-center border-2 border-yellow-400 shadow-lg bg-gray-100/80">
      <div className=" bg-slate-200 rounded-md flex flex-col gap-4 justify-center items-center mx-auto my-6 p-6 max-h-[15rem]">
        {menuInput.image && (
          <div className=" flex justify-center items-center ">
            <Image
              src={menuInput.image}
              alt="profile-image"
              width={100}
              height={100}
              className="circular-image"
            />
          </div>
        )}
        <label className="flex flex-col gap-4 justify-center items-center">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="px-2 py-2 bg-gray-200 text-[0.8rem] border-2 border-yellow-400 rounded-md hover:bg-yellow-400 ">
            {menuList ? "Edit" : "Upload"}
          </span>
        </label>
      </div>
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
          <span className="text-xs text-gray-800">Title</span>
          <input
            type="text"
            className="form_input "
            name="title"
            placeholder="Title"
            value={menuInput.title}
            onChange={handleChange}
            required
          />
        </label>
        <label className="w-full">
          <span className="text-xs text-gray-800">Description</span>
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
          <span className="text-xs text-gray-800">Price</span>
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
            className="p-1 border-2 border-yellow-400 w-full text-center my-2 rounded-md hover:bg-yellow-400 "
            href="/menu-list"
          >
            Cancel
          </Link>
        )}
      </form>
    </div>
  );
};

export default MenuForm;
