"use client";

import SubHeader from "@/components/SubHeader";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import MenuForm from "../components/MenuForm";
import toast, { Toaster } from "react-hot-toast";
import SingleMenu from "../components/SingleMenu";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


const AdminPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();
  const [menuList, setMenuList] = useState([]);

  async function getMenuList() {
    try {
      const res = await fetch("/api/getMenuList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setMenuList(data);
      } else {
        console.log("Failed to fetch menu list");
      }
    } catch (error) {
      console.error("An error occurred while fetching the menu list:", error);
      throw error;
    }
  }

  useEffect(() => {
    getMenuList();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  const handleSubmit = async (
    ev,
    setMenuList,
    setSizes,
    setIngredients,
    data
  ) => {
    ev.preventDefault();
    try {
      const uploadSetting = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/createNewMenu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
       if (res.ok) {
        resolve()
        // Reset form fields

        setMenuList({
          title: "",
          description: "",
          price: "",
          image: "/images/no-photo.png",
        });

        setSizes([]);
        setIngredients([]);
        getMenuList()

      } else {
        reject()
      }
    })
     await toast.promise(uploadSetting, {
       loading: "Loading ...",
       success: "New menu is created",
       error: "Unable to create new menu.",
     });
    } catch (error) {
      console.error("An error occurred while creating a new item:", error);
      toast.error("An error occurred while creating a new item");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <AdminNavbar path={path} />
      <SubHeader header2="Create new Menu" />
      <MenuForm handleSubmit={handleSubmit} buttonText="Create Menu" />
      <div className="w-[90%]">
        <hr className="border-0 w-full bg-orange-300 block h-[1px] " />
      </div>
      <SubHeader header2="Menu List" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-8 my-[5rem]">
        {menuList &&
          menuList.map((item) => (
            <div
              key={item._id}
              className="bg-orange-100/80 p-4 rounded-lg text-center hover:shadow-md hover:shadow-orange-400 flex flex-col justify-around"
            >
              <SingleMenu {...item} />
              <div className="flex gap-4 justify-center items-center mt-6">
                <Link
                  className={`sign_button text-sm flex items-center justify-center gap-2 `}
                  href={`/menu-list/edit/${item._id}`}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="sm"
                    style={{ color: "#EAEAEA" }}
                  />
                  Edit
                </Link>
                <button
                  className={`sign_button text-sm flex items-center justify-center gap-2`}
                  onClick={() => handleDeleteMenu(item)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="sm"
                    style={{ color: "#EAEAEA" }}
                  />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AdminPage;
