"use client";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import MenuForm from "../components/MenuForm";

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
    console.log(data);
    try {
      const res = await fetch("/api/postMenuList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("An error occurred while creating a new item:", error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <SubHeader header2="Dashboard" />
      <AdminNavbar path={path} />
      <MenuForm handleSubmit={handleSubmit} buttonText="Create Menu" />
    </section>
  );
};

export default AdminPage;
