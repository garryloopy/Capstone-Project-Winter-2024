"use client";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import MenuForm from "@/app/(admin)/components/MenuForm";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import { useLoadingState } from "@/components/useLoadingState";

//get menu list
async function getMenuList() {
  const res = await fetch("/api/getMenuList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache", // Add cache-control header to bypass cache
    },
  });
  if (!res.ok) return notFound();
  return res.json();
}

const EditMenuItems = () => {
  const { id } = useParams();
  const session = useSession();
  const { status } = session;
  const [menuList, setMenuList] = useState();
  const loading = useLoadingState();

  useEffect(() => {
    async function getData() {
      const data = await getMenuList();
      const item = data.find((meal) => meal._id === id);
      setMenuList(item);
    }
    getData();
  }, [id]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  const handleSubmit = async (ev, setMenuList, setSizes, setExtra, data) => {
    ev.preventDefault();
    try {
      const saveSetting = new Promise(async (resolve, reject) => {
        const res = await fetch("/api/updateMenu", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          resolve();

          window.location.href = "/menu-list";
        } else {
          reject();
        }
      });

      toast.promise(saveSetting, {
        loading: "Updating item...",
        success: "Item is updated",
        error: "Error: Item is not updated",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="section__padding my-10 w-full flex flex-col justify-center items-center mt-56">
          <SubHeader header2="Edit menu" />

          {menuList && (
            <MenuForm
              handleSubmit={handleSubmit}
              buttonText="Save"
              menuList={menuList}
            />
          )}
        </section>
      )}
    </>
  );
};

export default EditMenuItems;
