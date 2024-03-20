"use client";

import Link from "next/link";

import SubHeader from "@/components/SubHeader";
import React from "react";
import AdminNavbar from "@/app/(admin)/components/AdminNavbar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/Loading";

import { FaAngleLeft } from "react-icons/fa6";

export default function OrderDetailsPage({ params }) {
  const session = useSession();
  const { status } = session;
  const path = usePathname();

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }

  return (
    <section className="flex flex-col items-center w-full h-screen px-12 py-24">
      <AdminNavbar path={path} />
      <SubHeader header2="Order Details" />
      <div className="bg-gray-200 w-full h-full">
        <div className="relative h-16 w-full border border-b-gray-300 px-6 py-12">
          <Link
            href="/orders"
            className="flex flex-row items-center gap-1 w-max h-full text-xl font-medium text-gray-600 hover:text-gray-950 transition-colors duration-200"
          >
            <FaAngleLeft size={28} className="text-orange-600" />
            Back to orders
          </Link>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-2xl font-medium text-gray-600">
              Order: {params.id}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
