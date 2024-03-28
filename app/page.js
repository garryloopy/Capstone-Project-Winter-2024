"use client";
import AdminModal from "./(admin)/components/AdminModal";
import NewFlavor from "@/components/NewFlavor";
import About from "@/components/About";
import { useSession } from "next-auth/react";
import Slideshow from "@/components/sliderTest";
import './slides.css';



export default function HomePage() {
  const session = useSession();
  const {status} = session;
  return (
    <section className="md:px-[4rem] px-[2rem] py-[2rem] text-white flex flex-col items-center justify-center my-[6rem]">
      <div className="flex flex-wrap justify-center items-start">
        <div className="w-full md:w-1/2">
          <NewFlavor />
        </div>
        <div className="w-full md:w-1/2 md:mt-0 rounded border-4"> {/* we can adjust the margin top here, this is to accommodate different resolution */}
          <Slideshow />
        </div>
      </div>      <About />

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

