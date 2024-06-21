"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const MobileSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
    console.log(encodedSearchQuery);
  };

  return (
    // <form className="mt-4 w-full relative left-1 right-1" onSubmit={onSearch}>
    //   <input
    //     type="text"
    //     placeholder="What are you looking for?"
    //     value={searchQuery}
    //     onChange={(event) => setSearchQuery(event.target.value)}
    //     className="px-6 py-3 text-black border border-zinc-800 rounded-xl w-full"
    //   />
    //   <button type="submit" className="relative  left-[10rem]">
    //     <IoSearch className="h-8" />
    //   </button>
    // </form>
    <form
    className="flex items-center bg-white mt-4 dark:bg-zinc-800 rounded-full p-2"
    onSubmit={onSearch}>
      <input
        type="text"
        placeholder="What are you looking for?"
        className="focus:outline-none w-full px-6 text-black"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button type="submit" className="mr-5">
        <IoSearch className="h-8" />
      </button>
    </form>
  );
};

export default MobileSearch;
