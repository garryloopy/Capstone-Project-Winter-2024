"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AdminModal from "./(admin)/components/AdminModal";
import NewFlavor from "@/components/NewFlavor";
import About from "@/components/About";
export default function HomePage() {
  return (
    <section className="md:px-[4rem] px-[2rem] py-[2rem] text-white flex flex-col items-center justify-center my-[6rem]">
      <NewFlavor />
      <About />

      <div>
        <AdminModal />
      </div>
    </section>
  );
}
