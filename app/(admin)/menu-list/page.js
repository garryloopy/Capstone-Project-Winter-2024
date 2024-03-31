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
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { withSwal } from "react-sweetalert2";
import { deletePhoto } from "@/actions/uploadImage";
import MenuScroll from "@/components/MenuScroll";

const AdminPage = ({ swal }) => {
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
          resolve();
          // Reset form fields

          setMenuList({
            title: "",
            description: "",
            price: "",
            image: "/images/no-photo.png",
          });

          setSizes([]);
          setIngredients([]);
          getMenuList();
        } else {
          reject();
        }
      });
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

  //delete menu
  const handleDeleteMenu = (item) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${item.title}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        reverseButtons: true,
        showLoaderOnConfirm: true, // Show loading indicator
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await fetch("/api/deleteMenu", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ _id: item._id }),
            });
            if (res.ok) {
              const data = await res.json();
              swal.fire("Deleted", data.message, "success");
              if (item.public_id) {
                await deletePhoto(item.public_id);
              }
              await getMenuList();
            } else {
              // Handle failure to delete
              const data = await res.json();
              swal.fire("Error", data.message, "error");
            }
          } catch (error) {
            // Handle fetch errors
            console.error("An error occurred while deleting the menu:", error);
            swal.fire(
              "Error",
              "An error occurred while deleting the category",
              "error"
            );
          }
        }
      });
  };

  return (
    <>
      <MenuScroll />
      <section className="flex flex-col justify-center items-center md:p-[6rem] p-4">
        <AdminNavbar path={path} />
        <SubHeader header2="Create new Menu" />
        <MenuForm handleSubmit={handleSubmit} buttonText="Create Menu" />
        <div className="w-[90%]">
          <hr className="border-0 w-full bg-yellow-400 block h-[1px] " />
        </div>
        <SubHeader header2="Menu List" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 my-[5rem] w-[80%]">
          {menuList &&
            menuList.map((item) => (
              <div
                key={item._id}
                /* this is for admin menu list */
                className="bg-neutral-200  p-4 rounded-lg text-center hover:shadow-md hover:shadow-yellow-400 flex flex-col justify-around"
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
                      style={{ color: "#000" }}
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
                      style={{ color: "#000" }}
                    />
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default withSwal(AdminPage);
