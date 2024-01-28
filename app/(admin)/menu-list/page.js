"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import MenuForm from "../components/MenuForm";
import toast, { Toaster } from "react-hot-toast";


const AdminPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

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
      <SubHeader header2="Dashboard" />
      <AdminNavbar path={path} />
      <MenuForm handleSubmit={handleSubmit} buttonText="Create Menu" />
      <div className="w-[90%]">
        <hr className="border-0 w-full bg-orange-300 block h-[1px]" />
      </div>
    </section>
  );
};

export default AdminPage;
