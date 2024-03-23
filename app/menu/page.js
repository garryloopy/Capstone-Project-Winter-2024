"use client";
import ClientMenu from "@/components/ClientMenu";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import MenuScroll from "@/components/MenuScroll";
import React, { useEffect, useState } from "react";

function Menu() {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [menuListSearch, setMenuListSearch] = useState([]);

  async function getAllMenu() {
    setLoading(true);
    try {
      const res = await fetch("/api/getMenuList", {
        cache: "no-store",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setMenuList(data);
       
      } else {
        console.log("Failed to fetch menu list");
      }
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching the menu list:", error);
      throw error;
    }
  }

 // handle change search input
  const handleSearchChange = (ev) => {
    let inputValue = ev.target.value 
    setSearch(inputValue);
     if (inputValue !== "") {
       let searchList = menuList.filter((menu) =>
         menu.title.toLowerCase().startsWith(inputValue.toLowerCase())
       );
       setMenuListSearch(searchList);
     } else {
       setMenuListSearch([]);
     }
  }

  //handle submit search input
  const handleSearchSubmit = (ev) => {
    ev.preventDefault()
     if (search !== "") {
       let searchList = menuList.filter((menu) =>
         menu.title.toLowerCase().startsWith(search.toLowerCase())
       );
       setMenuListSearch(searchList);
     } else {
       setMenuListSearch([]);
     }

  }
  useEffect(() => {
      getAllMenu();
  
  }, []);

  return (
    <>
      <MenuScroll />
      {loading ? (
        <Loading />
      ) : (
        <section className="pt-[2rem] pb-[12rem] pl-[12rem] pr-[12rem] flex flex-col justify-center items-center gap-6">
          <SubHeader header2="Menu" />

          {/* search bar */}
          <form className="md:max-w-[50%] w-full flex my-[2rem] justify-center" onSubmit={handleSearchSubmit}>
            <input
              className="w-full flex-[1.5] min-h-[50px] text-[20px] bg-orange-100 border border-orange-500 border-r-0 px-[1rem] rounded-tl-[5px] rounded-bl-[5px] tracking-wider"
              type="search"
              placeholder="search"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              className="min-h-[50px] font-bold text-[15px] bg-orange-500 cursor-pointer px-[1rem] rounded-tr-[5px] rounded-br-[5px] text-white flex-[0.5] tracking-wider"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-col-2 grid-cols-1 gap-4 mt-6 mb-8">
            {menuListSearch?.length > 0
              ? menuListSearch.map((menu) => (
                  <ClientMenu key={menu._id} {...menu} />
                ))
              : menuList.map((menu) => <ClientMenu key={menu._id} {...menu} />)}
          </div>
        </section>
      )}
    </>
  );
}

export default Menu;
