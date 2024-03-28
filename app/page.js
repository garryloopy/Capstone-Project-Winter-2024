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
      <div className="slide-container">
        <Slideshow />
      </div>
      {/* <NewFlavor /> */}

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

