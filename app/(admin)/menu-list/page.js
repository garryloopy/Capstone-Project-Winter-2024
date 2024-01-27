"use client"

import SubHeader from '@/components/SubHeader'
import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from "next/navigation";
import Loading from '@/components/Loading';

const AdminPage = () => {
  const session = useSession();
  const { status } = session;
  const path = usePathname()

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return redirect("/sign-in");
  }
  return (
    <section>
     <SubHeader header2="Dashboard"/>
     <AdminNavbar path={path}/>
    </section>
  )
}

export default AdminPage