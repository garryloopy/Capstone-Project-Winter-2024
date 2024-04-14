"use client";
import MenuScroll from "@/components/MenuScroll";
import { usePathname } from "next/navigation";
import AdminNavbar from "../components/AdminNavbar";
import SubHeader from "@/components/SubHeader";
import Calendar from "./Calendar";

const reminder = () => {
  const path = usePathname();

  return (
    <>
      <MenuScroll />
      <section className="flex flex-col justify-center items-center md:p-[6rem] p-4">
        <AdminNavbar path={path} />
        <SubHeader header2="Reminder" />
        <div>
          <Calendar />
        </div>
      </section>
    </>
  );
};

export default reminder;
