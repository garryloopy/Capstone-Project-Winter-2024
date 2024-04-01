"use client";
import ClientMenu from "@/components/ClientMenu";
import Loading from "@/components/Loading";
import SubHeader from "@/components/SubHeader";
import MenuScroll from "@/components/MenuScroll";
import React, { useEffect, useState } from "react";
import Search from "../icons/Search";

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
    let inputValue = ev.target.value;
    setSearch(inputValue);
    if (inputValue !== "") {
      let searchList = menuList.filter((menu) =>
        menu.title.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setMenuListSearch(searchList);
    } else {
      setMenuListSearch([]);
    }
  };

  //handle submit search input
  // const handleSearchSubmit = (ev) => {
  //   ev.preventDefault();
  //   if (search !== "") {
  //     let searchList = menuList.filter((menu) =>
  //       menu.title.toLowerCase().startsWith(search.toLowerCase())
  //     );
  //     setMenuListSearch(searchList);
  //   } else {
  //     setMenuListSearch([]);
  //   }
  // };
  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <>
      <MenuScroll />
      {loading ? (
        <Loading />
      ) : (
        <section className="md:p-[6rem] p-4 mt-32 flex flex-col justify-center items-center gap-6">
          <SubHeader header2="Menu" />

          {/* search bar */}
          <form className="md:max-w-[50%] w-full flex my-[2rem] justify-center">
            <label className="h-14  text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
              <input
                className=" w-full h-full outline-none peer bg-inherit p-2 text-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400"
                type="text"
                value={search}
                onChange={handleSearchChange}
              />
              <div
                className={`absolute inset-0 flex items-center p-2 ${
                  search.length > 0 && "-translate-y-7  "
                }  pointer-events-none peer-valid:text-gray-400 opacity-50 peer-focus:opacity-100 transition-all duration-300 peer-focus:-translate-y-7 group-hover:opacity-100`}
              >
                <p className="font-semibold text-sm bg-white rounded-md px-1">
                  Search
                </p>
              </div>

              <div className="absolute right-[3%] top-[22%]">
                <Search className="text-gray-400 w-6 h-6" />
              </div>
            </label>
            {/* <button
              className="min-h-[50px] font-bold text-[15px] bg-orange-500 cursor-pointer px-[1rem] rounded-tr-[5px] rounded-br-[5px] text-white flex-[0.5] tracking-wider"
              type="submit"
            >
              Search
            </button> */}
          </form>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-2 grid-cols-1 gap-4 mt-6 mb-8">
            {!search && menuList.length > 0 ? (
              menuList.map((menu) => <ClientMenu key={menu._id} {...menu} />)
            ) : menuListSearch?.length > 0 ? (
              menuListSearch.map((menu) => (
                <ClientMenu key={menu._id} {...menu} />
              ))
            ) : (
              <div>
                <p className=" text-white text-lg">
                  Sorry, There is no matching menu.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Menu;
