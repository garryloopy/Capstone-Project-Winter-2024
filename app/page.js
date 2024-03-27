"use client";
import AdminModal from "./(admin)/components/AdminModal";
import NewFlavor from "@/components/NewFlavor";
import About from "@/components/About";
import { useSession } from "next-auth/react";


export default function HomePage() {
  const session = useSession();
  const {status} = session;
  return (
    <section className=" text-white flex flex-col items-center justify-center my-[6rem]">
      <NewFlavor />
      <About />

      {status === "unauthenticated" ? (
        <div>
          <AdminModal />
        </div>
      ) : (
        null
      )}
    </section>
  );
}

